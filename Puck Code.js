setWatch(function() {
  var t0 = Date.now();
  var i = 0;
  var begin = Date.now();
  var again = begin + 8000;
  var c = 0;
  digitalWrite(D29,true);
  digitalWrite(D28,false);
  LED1.write(true);
  while (i <= 50) {
    if (Date.now() - begin >= 150) {
        digitalWrite(D29,false);
        digitalWrite(D28,true);
        again = Date.now();
        begin = Date.now() + 8000;
        c = 0;
    }
    if (Date.now() - again >= 150) {
        digitalWrite(D29,true);
        digitalWrite(D28,false);
        i = i + 1;
        begin = Date.now();
        again = Date.now() + 8000;
        c = 1;
    }
    if (i >= 40) {
      LED1.write(false);
      digitalWrite(D29,false);
      digitalWrite(D28,false);
    }
    if (Date.now() - t0 >= 10) {
      var d = analogRead(30);
      Bluetooth.println(`${JSON.stringify({V0: d, led: c})}`);
      t0 = Date.now();
    }
  }
}, BTN, {edge: "rising", debounce:50, repeat:true});