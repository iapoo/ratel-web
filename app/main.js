const { app, BrowserWindow, Menu } = require('electron')
const os = require('os')
const path = require('path')

const platform = os.platform()
const createWindow = () => {
  Menu.setApplicationMenu(null) // null值取消顶部菜单栏
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: `static/favicon.ico`, // 设置窗口左上角的图标
    //frame: false,
    titleBarStyle: platform === 'darwin' || platform === 'win32' ? 'hidden' : undefined,
    trafficLightPosition: platform === 'darwin' ? { x: 10, y: 12 } : undefined,
    titleBarOverlay:
      platform === 'win32'
        ? {
            color: 'rgba(0,0,0,0)',
            height: 38,
            symbolColor: 'darkgray',
          }
        : undefined,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    },
  })
  //win.webContents.openDevTools()
  win.loadFile(`dist/index.html`) //本地地址
}
app.whenReady().then(createWindow)
