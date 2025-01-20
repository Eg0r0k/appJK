import { isTauri } from "@tauri-apps/api/core";

interface SaveFileOptions {
  fileName: string; 
  fileType: string;
  filters?: { name: string; extensions: string[] }[]; 
}

export const useFileSaver = () => {
  const saveFile = async (
    data: ArrayBuffer | BlobPart[] | Blob,
    options: SaveFileOptions
  ): Promise<boolean> => {
    const { fileName, fileType, filters } = options;

    if (isTauri()) {
      const { save } = await import("@tauri-apps/plugin-dialog");
      const { writeFile } = await import("@tauri-apps/plugin-fs");

      const filePath = await save({
        title: "Сохранить файл",
        filters: filters || [{ name: "All Files", extensions: ["*"] }],
      });

      if (filePath) {
        let buffer: Uint8Array;
        if (data instanceof Blob) {
          buffer = new Uint8Array(await data.arrayBuffer());
        } else if (data instanceof ArrayBuffer) {
          buffer = new Uint8Array(data);
        } else {
          const blob = new Blob(data, { type: fileType });
          buffer = new Uint8Array(await blob.arrayBuffer());
        }
        await writeFile(filePath, buffer);
        return true;
      }
    } else {
      let blob: Blob;
      if (data instanceof Blob) {
        blob = data;
      } else if (data instanceof ArrayBuffer) {
        blob = new Blob([data], { type: fileType });
      } else {
        blob = new Blob(data, { type: fileType });
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
      return true;
    }

    return false;
  };

  return { saveFile };
};
