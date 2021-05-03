// when button is pressed
setWatch(function() {
  // set the accel updater
  var d = [];
  var c = 0;
  var i = 0;
  var begin = Date.now();
  var again = begin + 8000;
  var t0 = begin;
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
  var blue_sum = 0;
  var green_sum = 0;
  for (var j = 0; j < c.length; j++) {
    if (c[j] === 0) {
      blue.push(d[j]);
      blue_sum = blue_sum + d[j];
    }
    if (c[j] === 1) {
      green.push(d[j]);
      green_sum = green_sum + d[j];
    }
  }

  var blue_intensity = blue_sum / blue.length;
  var green_intensity = green_sum / green.length;

  Bluetooth.println(`${JSON.stringify({Blue: blue_intensity, Green: green_intensity})}`);

}, BTN, {edge: "rising", debounce:50, repeat:false});