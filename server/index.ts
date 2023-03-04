import * as path from 'path'
import * as url from 'url'
import { app, BrowserWindow, } from 'electron'

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 900,
    webPreferences: {
      // preload: path.join(__dirname, './dist/main.js'),
      webSecurity: false,
      nodeIntegration: true,
      devTools: true,
    },
    backgroundColor: '#2e2c29',
    darkTheme: true,
    title: 'YouComic Supervisor',
    width: 1700,
    frame: true,
    minWidth: 1300,
    minHeight: 900,
  })
  if (process.env.NODE_ENV === 'development2') {
    if (process.env.DEV_TOOLS) {
      mainWindow.webContents.openDevTools()
    }
    const a = url.format({
      pathname: path.join(__dirname, './dist/index.html'),
      protocol: 'file:',
      slashes: true,
    })
    console.log(a)
    mainWindow.loadURL('file:///Users/yangxiongbo/source/js/toptodo/dist/index.html')
    // mainWindow.loadURL('http://localhost:8000/');
    mainWindow.webContents.openDevTools()
  } else {
    const a = url.format({
      pathname: path.join('', 'file:///Users/yangxiongbo/source/js/toptodo/dist/index.html'),
      protocol: 'file:',
      slashes: true,
    })
    const b = url.format({
      pathname: path.join(__dirname, 'file:///Users/yangxiongbo/source/js/toptodo/dist/index.html'),
      protocol: 'file:',
      slashes: true,
    })
    const c = url.format({
      pathname: 'file:///Users/yangxiongbo/source/js/toptodo/dist/index.html)',
      protocol: 'file:',
      slashes: true,
    })
    console.log('Hello1-----------------')
    console.log(a)
    console.log('Hello2-----------------')
    console.log(b)
    console.log('Hello3-----------------')
    console.log(path.join('', 'file:///Users/yangxiongbo/source/js/toptodo/dist/index.html'))
    console.log('Hello3-----------------')
    console.log(path.join(__dirname, './../index.html'))
    console.log('Hello-----------------')
    console.log(__filename)
    console.log('Hello-----------------')
    console.log(__dirname)
    console.log('Hello-----------------')

    // mainWindow.loadURL(
    //  url.format({
    //    pathname: '/dist/index.html',
    // pathname: path.join(__dirname, '/.../dist/index.html'),
    // protocol: 'file:',
    //    slashes: true,
    //  })
    // )
    // mainWindow.loadFile(path.join(__dirname, './../index.html'))
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://127.0.0.1:8000')
    // mainWindow.loadURL('file:///Users/yangxiongbo/source/js/toptodo/dist/index.html')
    // mainWindow.loadURL('https://www.sina.com.cn')
    // mainWindow.loadFile('file:///Users/yangxiongbo/source/js/toptodo/dist/index.html')
  }
  mainWindow.on('closed', () => {
    // mainWindow = null
  })

  mainWindow.setMenu(null)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) { createWindow() }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
