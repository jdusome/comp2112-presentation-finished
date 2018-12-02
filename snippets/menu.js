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