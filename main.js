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

let shiftPressCount = 0
let shiftPressTimer = null

ipcMain.on('ctrlPressed', () => {
    shiftPressCount += 1
    if (shiftPressCount === 1) {
        shiftPressTimer = setTimeout(() => {
            shiftPressCount = 0
        }, 500)
    } else if (shiftPressCount === 2) {
        clearTimeout(shiftPressTimer)
        shiftPressCount = 0
        window.webContents.send('toggleInputBoxVisibility')
    }
})

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform != "darwin") app.quit()
})