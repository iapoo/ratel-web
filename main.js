const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const createWindow = () => {
  Menu.setApplicationMenu(null) // null值取消顶部菜单栏
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: "./icons/icon.ico", // 设置窗口左上角的图标
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    },
  });
  //win.webContents.openDevTools();
  win.loadFile("dist/index.html"); //本地地址
};
app.whenReady().then(createWindow);
