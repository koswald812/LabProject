// when button is pressed
setWatch(function() {
    // set the accel updater
    var d = [];
    var c = 0;
    var i = 0;
    var begin = Date.now();
    var again = begin + 8000;
    var t0 = begin;
    var j = 0;
    var color = [];
      
    digitalWrite(D29,true);
    digitalWrite(D28,false);

    // turn on the accelerometer and LED
    LED1.write(true);
    
    // in 20 seconds, stop reading data, turn off the LED.
    while (i >= 0) {    
        if (Date.now() - begin >= 150) {
            digitalWrite(D29,false);
            digitalWrite(D28,true);
            c = 1;
            again = Date.now();
            begin = Date.now() + 8000;
        }
        
        if (Date.now() - again >= 150) {
            digitalWrite(D29,true);
            digitalWrite(D28,false);
            c = 0;
            i = i + 1;
            begin = Date.now();
            again = Date.now() + 8000;
        }

        if (Date.now() - t0 >= 30) {
            d.push(analogRead(30));
            color.push(c);
            t0 = Date.now();
        }
              
        if (i >= 40) {
          digitalWrite(D29,false);
          digitalWrite(D28,false);
          i = -1;
          LED1.write(false);
        }
    }

    Bluetooth.println(`${JSON.stringify({V0: d, led: color})}`);
  
    var blue = [];
    var green = [];
    for (var i = 0; i < c.length; i++) {
      if (c[i] === 0) {
        blue.push(d[i]);
      }
      if (c[i] === 1) {
        green.push(d[i]);
      }
    }
  
  var blue_intensity = blue.mean();
  var green_intensity = green.mean();
  
  Bluetooth.println(`${JSON.stringify({Blue: blue_intensity, Green: green_intensity})}`);
  
}, BTN, {edge: "rising", debounce:50, repeat:false});