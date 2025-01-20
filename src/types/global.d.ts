interface Window {
  __TAURI__?: {
    invoke: (command: string, payload?: any) => Promise<any>;
  };
}
