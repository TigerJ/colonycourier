bindButtonToKey = function(pad, myButton, myKey){
        if (myButton) {
          if( document.createEvent ) {
            var evObj = document.createEvent('Event');
            evObj.initEvent( 'keydown', true, false );;
            evObj.keyCode = myKey;
            window.dispatchEvent(evObj);
          } else if( document.createEventObject ) {
            console.log('createEventObject');
          }
        }
        else {
          if( document.createEvent ) {
            var evObj = document.createEvent('Event');
            evObj.initEvent( 'keyup', true, false );;
            evObj.keyCode = myKey;
            window.dispatchEvent(evObj);
          } else if( document.createEventObject ) {
            console.log('createEventObject');
          }
        }
    }
$(document).ready(function() {
		var gamepad = new Gamepad();

		gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
			console.log('Connected', device);

		});
		gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
			console.log('Disconnected', device);
		});
		gamepad.bind(Gamepad.Event.UNSUPPORTED, function(device) {
			console.log('Unsupported controller connected', device);
		});
		gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
			if (gamepads[0].state.A)
				console.log("i jump");
			bindButtonToKey(gamepads[0],gamepads[0].state.A,90);
			bindButtonToKey(gamepads[0],gamepads[0].state.B,51);
			bindButtonToKey(gamepads[0],gamepads[0].state.DPAD_LEFT,37);
			bindButtonToKey(gamepads[0],gamepads[0].state.DPAD_RIGHT,39);
			bindButtonToKey(gamepads[0],gamepads[0].state.DPAD_UP,38);
			bindButtonToKey(gamepads[0],gamepads[0].state.DPAD_DOWN,40);
			bindButtonToKey(gamepads[0],gamepads[0].state.DPAD_DOWN,40);
			bindButtonToKey(gamepads[0],gamepads[0].state.X,88);
			bindButtonToKey(gamepads[0],gamepads[0].state.RB,49);
			bindButtonToKey(gamepads[0],gamepads[0].state.LB,50);
			//console.log(gamepads[0].state);
			/*if(lrefGp1.state.A>.5)// && ig.input.state('jump')==false
			{
				
			}
			else
			{
				
			}*/
			/*var wrap,
				control,
				value,
				i;
			
			for (i = 0; i < gamepads.length; i++) {
				wrap = $('#gamepad-' + i);
				
				for (control in gamepads[i].state) {
					value = gamepads[i].state[control];
					
					$('#state-' + gamepads[i].index + '-' + control + '').html(value);
				}
			}*/
		});
		if (!gamepad.init()) {
			alert('Your browser does not support gamepads, get the latest Google Chrome or Firefox.');
		}
	});