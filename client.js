import alt from 'alt';

let view = new alt.WebView("http://resources/speedo/html/index.html");

let localPlayer = alt.getLocalPlayer();
let speedoShown = false;




alt.on('update', () => {
    if(!localPlayer){
        localPlayer = alt.getLocalPlayer();
    }
    let veh = localPlayer.vehicle;
    if (veh !== null && speedoShown){
        view.emit('drawSpeedo', Math.ceil(veh.speed*2.236936), veh.gear, veh.rpm)
    }

  });


view.on('speedoLoaded', () => {
    speedoShown = true;
});

view.on('speedoUnloaded', () => {
    speedoShown = false;
})


alt.onServer("playerEnterVehicle", (seat) => {
    if (seat == 1){ //driver
        if (!speedoShown){
          view.emit('showSpeedo', true);
        }
    }
})

alt.onServer("playerLeftVehicle", (seat) => {
    if (seat == 1){ //driver
        if (speedoShown){
          view.emit('showSpeedo', false);
        }
    }
})

alt.onServer("playerChangedVehicleSeat", (seat) => {
    if (seat == 1){ //driver
        if (!speedoShown){
          view.emit('showSpeedo', true);
        }
    }
})