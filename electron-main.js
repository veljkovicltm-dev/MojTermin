
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  // Kreiramo prozor bez standardnog menija za moderan izgled
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    title: "MojTermin Desktop",
    backgroundColor: '#f8fafc',
    icon: path.join(__dirname, 'icon.png'), // Ovde ide tvoja ikonica
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: true
    }
  });

  // U produkciji ovde stavljaš URL svog sajta
  // win.loadURL('https://tvoj-sajt.rs');
  
  // Za razvoj koristimo localhost
  win.loadURL('http://localhost:3000');

  // Uklanjamo gornji meni (File, Edit, View...)
  win.setMenuBarVisibility(false);

  // Otvaranje eksternih linkova u sistemskom browseru (npr. Google Maps)
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Inicijalizacija aplikacije
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Gašenje aplikacije
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
