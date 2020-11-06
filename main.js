// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu, ipcMain} = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null; // 主窗口
let loadingWindow = null; // 加载窗口
let tray = null;

// 更新托盘
function updateTray() {
  const icon = path.normalize(`${__dirname}/resources/assets/icon/tray.jpg`); // 托盘图标
  if(tray === null) {
    tray = new Tray(icon);
  }
  const contextMenu = Menu.buildFromTemplate([ // 托盘右键菜单
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
}
let flashInterval = null; // 闪烁定时器
let flashTransparent = true;
// 托盘闪烁 -- 通过一张透明图片和托盘图标切换实现闪烁效果
// flash true开始闪烁，false结束闪烁
function trayFlash(flash = true) { 
  const icons = [path.normalize(`${__dirname}/resources/assets/icon/tray.jpg`), path.normalize(`${__dirname}/resources/assets/icon/tray-transparent.png`)];
  if(tray === null) {
    tray = new Tray(icons[0]);
  }
  if (flash) {
    if (!flashInterval) {
      flashInterval = setInterval(() => {
        flashTransparent = !flashTransparent;
        const iconsIndex = flashTransparent ? 0:1;
        tray.setImage(icons[iconsIndex]);
      }, 400);
    }
  } else {
    if (flashInterval) {
      clearInterval(flashInterval);
      flashInterval = null;
    }
    if(tray){
      tray.setImage(icons[0]);
    }
  }
}

// 创建加载窗口
function createLoadingWindow() {
  loadingWindow = new BrowserWindow(Object.assign({
    width: 580,
    height: 200,
    frame: false,
    show: false
  }, {parent: mainWindow}));

  // 加载窗口的页面，可以自己修改
  loadingWindow.loadURL(path.normalize(`${__dirname}/resources/loading.html`));

  loadingWindow.on('closed', () => {
    loadingWindow = null;
  });
  loadingWindow.webContents.on('did-finish-load', () => {
    loadingWindow.show();
  });
}

// 创建主窗口
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL(path.normalize(`file://${__dirname}/dist/index.html`));
  } else {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://127.0.0.1:8000/');
  }

  mainWindow.webContents.on('did-finish-load', () => {
    if (loadingWindow) { // 把加载的窗口关闭
      loadingWindow.close();
    }
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createLoadingWindow(); // 创建加载窗口
  updateTray(); // 创建托盘
  createWindow(); // 创建窗口，创建好后，加载窗口消失

  // 监听事件
  ipcMain.on('ipcRendererTest', () => {
    console.log('ipcRendererTest123456');
  });
  ipcMain.on('flashTray', () => {
    trayFlash();
  });
  ipcMain.on('cancelFlashTray', () => {
    trayFlash(false);
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
