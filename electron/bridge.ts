import { contextBridge, ipcRenderer } from 'electron';

/**
 * Has functions that interact with the main (electron) process
 * without security problems.
 * 
 * Functions here can be accessed from the renderer process
 * using `window.Main.someFunction`.
 */
export const api = {
    /**
     * Tells the main process to minimize the window.
     */
    minimize: (): void => {
        ipcRenderer.invoke('minimize-event');
    },

    /**
     * Tells the main process to maximize the window.
     */
    maximize: (): void => {
        ipcRenderer.invoke('maximize-event');
    },

    /**
     * Tells the main process to restore down the window.
     */
    unmaximize: (): void => {
        ipcRenderer.invoke('unmaximize-event');
    },

    /**
     * Tells the main process to close the window.
     */
    close: (): void => {
        ipcRenderer.invoke('close-event');
    },

    /**
     * Listens to `channel`, when a new message arrives `callback`
     * would be called.
     */
    on: (channel: string, callback: Function): void => {
        ipcRenderer.on(channel, () => callback());
    }
};

contextBridge.exposeInMainWorld('Main', api);
