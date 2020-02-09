const { app, BrowserWindow } = require('electron');
const { os } = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log(addresses);
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        background: '#ffffff',
        icon: 'file://${__dirname]/distassets/logo.png'
    });

    win.loadURL('http://compas.sytes.net:8081');

    win.on('closed', function () {
        win = null
    })

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (win == null) {
        createWindow();
    }
})

