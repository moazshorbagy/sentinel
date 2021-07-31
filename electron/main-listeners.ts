import { BrowserWindow, ipcMain } from 'electron';

/**
 * This comes from bridge integration, check bridge.ts
 * 
 * Here we handle invokes coming from the renderer process.
 */
export function registerIPCHandlers(mainWindow: BrowserWindow): Promise<void> {
    ipcMain.handle('minimize-event', () => {
        mainWindow.minimize();
    });

    ipcMain.handle('maximize-event', () => {
        mainWindow.maximize();
    });

    ipcMain.handle('unmaximize-event', () => {
        mainWindow.unmaximize();
    });

    ipcMain.handle('close-event', () => {
        mainWindow.close();
    });

    return Promise.resolve();
}

/**
 * Here we set listeners for events coming from the main window and send it
 * to the renderer process. 
 */
export function registerWindowListeners(mainWindow: BrowserWindow): void {
    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('maximized');
    });

    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('unmaximized');
    });
}
