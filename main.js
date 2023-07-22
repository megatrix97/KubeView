const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    window = new BrowserWindow({
        width: 500,
        height: 500,
        autoHideMenuBar: true
    })
    
    window.loadFile('start-screen.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform != "darwin") app.quit()
})