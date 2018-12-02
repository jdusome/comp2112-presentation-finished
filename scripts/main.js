/*
//================================================================================
// Variables
//================================================================================
*/
let calcWindow;

// Import Electron and Core Modules
const electron = require('electron');
const url = require('url');
const path = require('path');

//Menu
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', //Shortcut: Darwin = Value on Mac, Otherwise Windows or Linux
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Themes',
        submenu: [
            {
                label: 'Light Theme',
                click() {
                    //Raise Theme Switch Event
                    calcWindow.webContents.send('main:switch-theme', 'light');
                }
            },
            {
                label: 'Dark Theme',
                click() {
                    //Raise Theme Switch Event
                    calcWindow.webContents.send('main:switch-theme', 'dark');
                }
            },
            {
                label: 'Colour Theme',
                click() {
                    //Raise Theme Switch Event
                    calcWindow.webContents.send('main:switch-theme', 'colour');
                }
            }
        ]
    }
];

/*
//================================================================================
// Initialize
//================================================================================
*/

// Pull App and BrowserWindow from Electron
const { app, BrowserWindow, Menu } = electron;

//Set Environment 
process.env.NODE_ENV = 'development';

//App Ready
app.on('ready', function () {

    //Initialize Menu
    initializeMainMenu();

    //Create Calculator Window
    calcWindow = createWindow(650, 800, "Simple Calculator", "../index.html", "file:", true);

    //Quit App When Calc Window is Closed
    calcWindow.on('closed', function () {
        app.quit();
    });

});

/*
//================================================================================
// Functions
//================================================================================
*/

/**
 * This function is used to create a window
 * @param {Number} width - width in pixels
 * @param {Number} height - height in pixels
 * @param {String} title - title of the window
 * @param {String} filePath - path of the file, relative to current directory
 * @param {String} protocol - url protocol
 * @param {Boolean} slashes
 */
function createWindow(width, height, title, filePath, protocol, slashes) {

    //Create a new Window
    window = new BrowserWindow({
        width: width,
        height: height,
        title: title
    });

    //Load HTML into the Window (file://dirname/index.html)
    window.loadURL(url.format({
        pathname: path.join(__dirname, filePath), //__dirname = current directory
        protocol: protocol,
        slashes: slashes
    }));

    //Garbage Collection Handler
    window.on('close', function () {
        window = null;
    });

    //Return Window
    return window;
};

/**
 * This function is used to Initialize the Main Menu
 */
function initializeMainMenu(){

    //If Mac, Add Empty Object to Menu to Account for Electron Button
    if (process.platform == 'darwin') {
        menuTemplate.unshift({});
    }

    //Add Developer Tools Item if Not in Production
    if (process.env.NODE_ENV != 'production') {
        menuTemplate.push({
            label: 'Developer Tools',
            submenu: [
                {
                    label: 'Toggle DevTools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I', //Shortcut: Darwin = Value on Mac, Otherwise Windows or Linux
                    click(menuItem, focusedWindow) {
                        focusedWindow.toggleDevTools(); //Make Dev Tools Pop Up for Focused Window
                    }
                },
                {
                    //Refresh Button
                    role: 'reload'
                }
            ]
        });
    };

    //Build Menu
    const mainMenu = Menu.buildFromTemplate(menuTemplate);

    //Set Application Menu
    Menu.setApplicationMenu(mainMenu);
};