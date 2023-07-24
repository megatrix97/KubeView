const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')


let window

const createWindow = () => {
    window = new BrowserWindow({
        width: 500,
        height: 500,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    
    window.loadFile('start-screen.html')
}

let ctrlPressCount = 0
let ctrlPressTimer = null

ipcMain.on('ctrlPressed', () => {
    ctrlPressCount += 1
    if (ctrlPressCount === 1) {
        ctrlPressTimer = setTimeout(() => {
            ctrlPressCount = 0
        }, 500)
    } else if (ctrlPressCount === 2) {
        clearTimeout(ctrlPressTimer)
        ctrlPressCount = 0
        window.webContents.send('toggleSearchBarVisibility')
    }
})

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform != "darwin") app.quit()
})