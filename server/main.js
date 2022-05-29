import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import path from "path";

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  const devFile = "http://localhost:3000";
  const prodFile = "file://" + path.join( process.cwd(), "build", "index.html")
  mainWindow.loadURL( isDev ? devFile : prodFile );

  if (isDev)
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin")
    return app.quit();
});
