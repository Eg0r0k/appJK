import { isTauri } from "@tauri-apps/api/core";

interface SaveFileOptions {
  fileName: string;
  fileType: string;
  filters?: { name: string; extensions: string[] }[];
}

export const useFileSaver = () => {
  const getDefaultExtension = (
    filters?: { name: string; extensions: string[] }[]
  ): string | null => {
    if (!filters || filters.length === 0) return null;
    return filters[0].extensions[0]?.replace(/^\./, "") || null;
  };

  const ensureFileExtension = (
    fileName: string,
    defaultExt?: string | null
  ): string => {
    const hasExtension = fileName.includes(".");
    if (hasExtension) return fileName;
    return defaultExt ? `${fileName}.${defaultExt}` : fileName;
  };

  const saveFile = async (
    data: ArrayBuffer | BlobPart[] | Blob,
    options: SaveFileOptions
  ): Promise<boolean> => {
    const { fileName, fileType, filters } = options;

    try {
      if (isTauri()) {
        const { save } = await import("@tauri-apps/plugin-dialog");
        const { writeFile } = await import("@tauri-apps/plugin-fs");

        const defaultExt = getDefaultExtension(filters);
        const targetFileName = ensureFileExtension(fileName, defaultExt);

        const filePath = await save({
          title: "Сохранить файл",
          defaultPath: targetFileName,
          filters: filters?.length
            ? filters
            : [{ name: "All Files", extensions: ["*"] }],
        });

        if (!filePath) return false;

        let buffer: Uint8Array;

        if (data instanceof Blob) {
          buffer = new Uint8Array(await data.arrayBuffer());
        } else if (data instanceof ArrayBuffer) {
          buffer = new Uint8Array(data);
        } else if (ArrayBuffer.isView(data)) {
          buffer = new Uint8Array(data.buffer);
        } else {
          const blob = new Blob(data, { type: fileType });
          buffer = new Uint8Array(await blob.arrayBuffer());
        }
        //Если буфер так и не был ничем заполнен
        if (!buffer || buffer.length === 0) {
          throw new Error("Пустой буфер данных");
        }

        await writeFile(filePath, buffer);
        return true;
      } else {
        let blob: Blob;
        if (data instanceof Blob) {
          blob = data;
        } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
          blob = new Blob([data], { type: fileType });
        } else {
          blob = new Blob(data, { type: fileType });
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = ensureFileExtension(
          fileName,
          getDefaultExtension(filters)
        );
        link.style.position = "absolute";
        link.style.left = "-9999px";
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);

        return true;
      }
    } catch (error: any) {
      throw new Error(`Не удалось сохранить файл: ${error.message}`);
    }
  };

  return { saveFile };
};
