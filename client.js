import * as alt from 'alt';

let view = new alt.WebView("http://resources/speedo/html/index.html");

let localPlayer = alt.Player.local;
let speedoShown = false;

let playerVehicle = false;



alt.setInterval(() => {
    if (!playerVehicle) return;
    if (speedoShown) {
        view.emit('drawSpeedo', playerVehicle.speed, playerVehicle.gear, playerVehicle.rpm)
    }
}, 1);

view.on('speedoLoaded', () => {
    speedoShown = true;
});

view.on('speedoUnloaded', () => {
    speedoShown = false;
})


alt.onServer("playerEnterVehicle", (vehicle, seat) => {
    playerVehicle = vehicle;
    if (seat == 1) { //driver
        if (!speedoShown) {
            view.emit('showSpeedo', true);
        }
    }
})

alt.onServer("playerLeftVehicle", (seat) => {
    playerVehicle = false;
    if (seat == 1) { //driver
        if (speedoShown) {
            view.emit('showSpeedo', false);
        }
    }
})

alt.onServer("playerChangedVehicleSeat", (vehicle, seat) => {
    playerVehicle = vehicle;
    if (seat == 1) { //driver
        if (!speedoShown) {
            view.emit('showSpeedo', true);
        }
    }
})