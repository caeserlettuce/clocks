var now = new Date();

var fto = {
  "hours": 0,
  "minutes": 0,
  "seconds": 0,
  "prev_hours": 0,
  "prev_minutes": 0,
  "prev_seconds": 0,
}
var apfto = {
  "hours": 0,
  "minutes": 0,
  "seconds": 0,
  "ampm": "AM",
  "prev_hours": 0,
  "prev_minutes": 0,
  "prev_seconds": 0,
  "prev_ampm": "AM"
}
var flpo = {
  "flippy_hours": 0,
  "flippy_minutes": 0,
  "flippy_seconds": 0,
  "prev_flippy_hours": 0,
  "prev_flippy_minutes": 0,
  "prev_flippy_seconds": 0,
}
var apflpo = {
  "flippy_ampm_hours": 0,
  "flippy_ampm_minutes": 0,
  "flippy_ampm_seconds": 0,
  "flippy_ampm_ampm": "AM",
  "prev_flippy_ampm_hours": 0,
  "prev_flippy_ampm_minutes": 0,
  "prev_flippy_ampm_seconds": 0,
  "prev_flippy_ampm_ampm": "AM",
}
var cfto = {
  "hours": 0,
  "minutes": 0,
  "seconds": 0,
  "prev_hours": 0,
  "prev_minutes": 0,
  "prev_seconds": 0,
  "hours_angle": [
    0,
    0
  ],
  "minutes_angle": [
    0,
    0
  ],
  "seconds_angle": [
    0,
    0
  ]
}

function doublefy(num) {
  if (`${num}`.length == 1) {
    num = `0${num}`;
  } else {
    num = `${num}`;
  }
  return num
}

function tripledecify(num) {
  var out;
  var tm = `${num}`.split(".");
  if (tm.length == 1) {
    out = `${num}.000`;
  } else {
    if (tm[1].length == 1) {
      out = `${num}00`;
    } else if (tm[1].length == 2) {
      out = `${num}0`;
    } else {
      out = `${num}`;
    }
  }
  return out
}

function do_num(num1, num2, elm) {
  if (num1 != num2) {
    document.querySelector(`.playertime #${elm}`).style.transitionDuration = "500ms";
    document.querySelector(`.playertime #${elm}_1`).innerHTML = `${num1}`;
    document.querySelector(`.playertime #${elm}_2`).innerHTML = `${num2}`;
    document.querySelector(`.playertime #${elm}`).style.marginTop = "-1.2em";
    setTimeout(() => {
      document.querySelector(`.playertime #${elm}`).style.transitionDuration = "0ms";
      document.querySelector(`.playertime #${elm}`).style.marginTop = "0px";
      document.querySelector(`.playertime #${elm}_2`).innerHTML = `${num1}`;
      document.querySelector(`.playertime #${elm}_1`).innerHTML = `${num2}`;
    }, 500);
  }
}

function fancy_time(seconds) {
  // console.log(seconds)
  var floor_seconds = Math.floor(seconds);
  var hours_exist;
  fto["hours"] = Math.floor(floor_seconds / 3600);
  fto["minutes"] = Math.floor((floor_seconds - (fto["hours"] * 3600)) / 60);
  fto["seconds"] = floor_seconds - (fto["hours"] * 3600) - (fto["minutes"] * 60);

  // console.log(fto["hours"])
  // console.log(fto["minutes"])
  // console.log(fto["seconds"])

  if (fto["hours"] > 0) {
    hours_checked = true;
    hours_exist = true;
  }
  if (hours_exist == true) {
    var split_hours = doublefy(fto["hours"]).split("");
    var split_prev_hours = doublefy(fto["prev_hours"]).split("");
    do_num(split_prev_hours[0], split_hours[0], "h1");
    do_num(split_prev_hours[1], split_hours[1], "h2");
  }
  
  var split_minutes = doublefy(fto["minutes"]).split("");
  var split_prev_minutes = doublefy(fto["prev_minutes"]).split("");
  do_num(split_prev_minutes[0], split_minutes[0], "m1");
  do_num(split_prev_minutes[1], split_minutes[1], "m2");
  var split_seconds = doublefy(fto["seconds"]).split("");
  var split_prev_seconds = doublefy(fto["prev_seconds"]).split("");
  do_num(split_prev_seconds[0], split_seconds[0], "s1");
  do_num(split_prev_seconds[1], split_seconds[1], "s2");

  fto["prev_hours"] = fto["hours"];
  fto["prev_minutes"] = fto["minutes"];
  fto["prev_seconds"] = fto["seconds"];
}



function do_ampm_num(num1, num2, elm) {
  //console.log(num1, num2)
  if (num1 != num2 || num1 != document.querySelector(`.ampmplayertime #${elm}_1`).innerHTML) {
    document.querySelector(`.ampmplayertime #${elm}`).style.transitionDuration = "500ms";
    document.querySelector(`.ampmplayertime #${elm}_1`).innerHTML = `${num1}`;
    document.querySelector(`.ampmplayertime #${elm}_2`).innerHTML = `${num2}`;
    document.querySelector(`.ampmplayertime #${elm}`).style.marginTop = "-1.2em";
    setTimeout(() => {
      document.querySelector(`.ampmplayertime #${elm}`).style.transitionDuration = "0ms";
      document.querySelector(`.ampmplayertime #${elm}`).style.marginTop = "0px";
      document.querySelector(`.ampmplayertime #${elm}_2`).innerHTML = `${num1}`;
      document.querySelector(`.ampmplayertime #${elm}_1`).innerHTML = `${num2}`;
    }, 500);
  }
}

function fancy_ampm_time(seconds) {
  // console.log(seconds)
  var floor_seconds = Math.floor(seconds);
  var hours_exist;
  var is_pm = false;
  apfto["hours"] = Math.floor(floor_seconds / 3600);
  apfto["minutes"] = Math.floor((floor_seconds - (apfto["hours"] * 3600)) / 60);
  apfto["seconds"] = floor_seconds - (apfto["hours"] * 3600) - (apfto["minutes"] * 60);

  if (apfto["hours"] > 12) {
    apfto["hours"] += -12;
    apfto["ampm"] = "PM"
    is_pm = true;
  } else {
    apfto["ampm"] = "AM"
  }
  if (apfto["hours"] == 0) {
    apfto["hours"] = 12;
  }

  //  console.log(apfto["hours"])
  //  console.log(apfto["minutes"])
  //  console.log(apfto["seconds"])

  if (apfto["hours"] > 0) {
    hours_checked = true;
    hours_exist = true;
  }
  if (hours_exist == true) {
    var split_hours = doublefy(apfto["hours"]).split("");
    var split_prev_hours = doublefy(apfto["prev_hours"]).split("");
    do_ampm_num(split_prev_hours[0], split_hours[0], "h1");
    do_ampm_num(split_prev_hours[1], split_hours[1], "h2");
  }
  var split_minutes = doublefy(apfto["minutes"]).split("");
  var split_prev_minutes = doublefy(apfto["prev_minutes"]).split("");
  do_ampm_num(split_prev_minutes[0], split_minutes[0], "m1");
  do_ampm_num(split_prev_minutes[1], split_minutes[1], "m2");
  var split_seconds = doublefy(apfto["seconds"]).split("");
  var split_prev_seconds = doublefy(apfto["prev_seconds"]).split("");
  do_ampm_num(split_prev_seconds[0], split_seconds[0], "s1");
  do_ampm_num(split_prev_seconds[1], split_seconds[1], "s2");

  do_ampm_num(apfto["prev_ampm"], apfto["ampm"], "ampm");

  apfto["prev_hours"] = apfto["hours"];
  apfto["prev_minutes"] = apfto["minutes"];
  apfto["prev_seconds"] = apfto["seconds"];
  apfto["prev_ampm"] = apfto["ampm"];
}


function analog_hand(val, max, elm) {
  var angle = (360 / max) * val;
  // console.log("angle", elm, angle);
  document.querySelector(`.analog-clock .${elm}-hand`).style = `transform: translate(10px, 10px) rotate(${angle}deg)`;
}

function fancy_analog_clock(seconds) {
  var floor_seconds = Math.floor(seconds);
  var the_hours = Math.floor(floor_seconds / 3600);
  var the_minutes = Math.floor((floor_seconds - (the_hours * 3600)) / 60);
  var the_seconds = floor_seconds - (the_hours * 3600) - (the_minutes * 60);

  // console.log("hours", the_hours)
  // console.log("minutes", the_minutes)
  // console.log("seconds", the_seconds)

  if (the_hours > 12) {
    the_hours += -12;
    apfto["ampm"] = "PM"
    is_pm = true;
  } else {
    apfto["ampm"] = "AM"
  }
  if (the_hours == 0) {
    the_hours = 12;
  }
  analog_hand((the_hours * 60 * 60) + (the_minutes * 60) + the_seconds, 60 * 60 * 12, "hour");
  analog_hand(( (the_minutes * 60) + the_seconds ), 3600, "minute");
  analog_hand(the_seconds, 60, "second");
}


function do_flippy_num(num1, num2, elm) {
  //console.log(num1, num2)
  if (num1 != num2 || num1 != document.querySelector(`.flippy-clock .${elm} .b .h1 text`).innerHTML) {
    document.querySelector(`.flippy-clock .${elm} .t .h2`).style.transitionDuration = "150ms";
    document.querySelector(`.flippy-clock .${elm} .b .h2`).style.transitionDuration = "150ms";

    document.querySelector(`.flippy-clock .${elm} .t .h1 text`).innerHTML = `${num1}`;
    document.querySelector(`.flippy-clock .${elm} .b .h1 text`).innerHTML = `${num2}`;
    document.querySelector(`.flippy-clock .${elm} .t .h2 text`).innerHTML = `${num2}`;
    document.querySelector(`.flippy-clock .${elm} .b .h2 text`).innerHTML = `${num1}`;
    
    document.querySelector(`.flippy-clock .${elm} .t .h2`).style.transform = `rotate3d(1, 0, 0, 270deg)`
    // document.querySelector(`.flippy-clock #${elm}`).style.marginTop = "-1.2em";
    setTimeout( () => {
      document.querySelector(`.flippy-clock .${elm} .b .h2`).style.transform = `rotate3d(1, 0, 0, 0deg)`
    }, 75);

    setTimeout(() => {
      document.querySelector(`.flippy-clock .${elm} .t .h2`).style.transitionDuration = "0ms";
      document.querySelector(`.flippy-clock .${elm} .b .h2`).style.transitionDuration = "0ms";
      // document.querySelector(`.flippy-clock #${elm}`).style.marginTop = "0px";
      document.querySelector(`.flippy-clock .${elm} .t .h1 text`).innerHTML = `${num2}`;
      document.querySelector(`.flippy-clock .${elm} .b .h1 text`).innerHTML = `${num1}`;
      document.querySelector(`.flippy-clock .${elm} .t .h2 text`).innerHTML = `${num1}`;
      document.querySelector(`.flippy-clock .${elm} .b .h2 text`).innerHTML = `${num2}`;

      document.querySelector(`.flippy-clock .${elm} .t .h2`).style.transform = `rotate3d(1, 0, 0, 0deg)`
      document.querySelector(`.flippy-clock .${elm} .b .h2`).style.transform = `rotate3d(1, 0, 0, 90deg)`
    }, 150);
  }
}

function flippy_time(seconds) {
  // console.log(seconds)
  var floor_seconds = Math.floor(seconds);
  var hours_exist;
  flpo["flippy_hours"] = Math.floor(floor_seconds / 3600);
  flpo["flippy_minutes"] = Math.floor((floor_seconds - (flpo["flippy_hours"] * 3600)) / 60);
  flpo["flippy_seconds"] = floor_seconds - (flpo["flippy_hours"] * 3600) - (flpo["flippy_minutes"] * 60);

  // console.log(fto["hours"])
  // console.log(fto["minutes"])
  // console.log(fto["seconds"])

  if (flpo["flippy_hours"] > 0) {
    hours_checked = true;
    hours_exist = true;
  }
  if (hours_exist == true) {
    var split_hours = doublefy(flpo["flippy_hours"]).split("");
    var split_prev_hours = doublefy(flpo["prev_flippy_hours"]).split("");
    do_flippy_num(split_hours[0], split_prev_hours[0], "f1");
    do_flippy_num(split_hours[1], split_prev_hours[1], "f2");
  }
  
  var split_minutes = doublefy(flpo["flippy_minutes"]).split("");
  var split_prev_minutes = doublefy(flpo["prev_flippy_minutes"]).split("");
  do_flippy_num(split_minutes[0], split_prev_minutes[0], "f3");
  do_flippy_num(split_minutes[1], split_prev_minutes[1], "f4");
  var split_seconds = doublefy(flpo["flippy_seconds"]).split("");
  var split_prev_seconds = doublefy(flpo["prev_flippy_seconds"]).split("");
  do_flippy_num(split_seconds[0], split_prev_seconds[0], "f5");
  do_flippy_num(split_seconds[1], split_prev_seconds[1], "f6");

  flpo["prev_flippy_hours"] = flpo["flippy_hours"];
  flpo["prev_flippy_minutes"] = flpo["flippy_minutes"];
  flpo["prev_flippy_seconds"] = flpo["flippy_seconds"];
}

function do_flippy_ampm_num(num1, num2, elm) {
  //console.log(num1, num2)
  if (num1 != num2 || num1 != document.querySelector(`.flippy-clock-ampm .${elm} .b .h1 text`).innerHTML) {
    document.querySelector(`.flippy-clock-ampm .${elm} .t .h2`).style.transitionDuration = "150ms";
    document.querySelector(`.flippy-clock-ampm .${elm} .b .h2`).style.transitionDuration = "150ms";

    document.querySelector(`.flippy-clock-ampm .${elm} .t .h1 text`).innerHTML = `${num1}`;
    document.querySelector(`.flippy-clock-ampm .${elm} .b .h1 text`).innerHTML = `${num2}`;
    document.querySelector(`.flippy-clock-ampm .${elm} .t .h2 text`).innerHTML = `${num2}`;
    document.querySelector(`.flippy-clock-ampm .${elm} .b .h2 text`).innerHTML = `${num1}`;
    
    document.querySelector(`.flippy-clock-ampm .${elm} .t .h2`).style.transform = `rotate3d(1, 0, 0, 270deg)`
    // document.querySelector(`.flippy-clock #${elm}`).style.marginTop = "-1.2em";
    setTimeout( () => {
      document.querySelector(`.flippy-clock-ampm .${elm} .b .h2`).style.transform = `rotate3d(1, 0, 0, 0deg)`
    }, 75);

    setTimeout(() => {
      document.querySelector(`.flippy-clock-ampm .${elm} .t .h2`).style.transitionDuration = "0ms";
      document.querySelector(`.flippy-clock-ampm .${elm} .b .h2`).style.transitionDuration = "0ms";
      // document.querySelector(`.flippy-clock #${elm}`).style.marginTop = "0px";
      document.querySelector(`.flippy-clock-ampm .${elm} .t .h1 text`).innerHTML = `${num2}`;
      document.querySelector(`.flippy-clock-ampm .${elm} .b .h1 text`).innerHTML = `${num1}`;
      document.querySelector(`.flippy-clock-ampm .${elm} .t .h2 text`).innerHTML = `${num1}`;
      document.querySelector(`.flippy-clock-ampm .${elm} .b .h2 text`).innerHTML = `${num2}`;

      document.querySelector(`.flippy-clock-ampm .${elm} .t .h2`).style.transform = `rotate3d(1, 0, 0, 0deg)`
      document.querySelector(`.flippy-clock-ampm .${elm} .b .h2`).style.transform = `rotate3d(1, 0, 0, 90deg)`
    }, 150);
  }
}

function flippy_ampm_time(seconds) {
  // console.log(seconds)
  var floor_seconds = Math.floor(seconds);
  var hours_exist;
  var afternoon = false;
  apflpo["flippy_ampm_hours"] = Math.floor(floor_seconds / 3600);
  if (apflpo["flippy_ampm_hours"] >= 12) {
    if (apflpo["flippy_ampm_hours"] > 12) {apflpo["flippy_ampm_hours"] += -12;
    }
    apflpo["flippy_ampm_ampm"] = "PM";
  } else {
    apflpo["flippy_ampm_ampm"] = "AM";
  }
  apflpo["flippy_ampm_minutes"] = Math.floor((floor_seconds - (apflpo["flippy_ampm_hours"] * 3600)) / 60);
  apflpo["flippy_ampm_seconds"] = floor_seconds - (apflpo["flippy_ampm_hours"] * 3600) - (apflpo["flippy_ampm_minutes"] * 60);

  // console.log(fto["hours"])
  // console.log(fto["minutes"])
  // console.log(fto["seconds"])

  if (apflpo["flippy_ampm_hours"] > 0) {
    hours_checked = true;
    hours_exist = true;
  }
  if (hours_exist == true) {
    var split_hours = doublefy(apflpo["flippy_ampm_hours"]).split("");
    var split_prev_hours = doublefy(apflpo["prev_flippy_ampm_hours"]).split("");
    do_flippy_ampm_num(split_hours[0], split_prev_hours[0], "f1");
    do_flippy_ampm_num(split_hours[1], split_prev_hours[1], "f2");
  }
  
  var split_minutes = doublefy(apflpo["flippy_ampm_minutes"]).split("");
  var split_prev_minutes = doublefy(apflpo["prev_flippy_ampm_minutes"]).split("");
  do_flippy_ampm_num(split_minutes[0], split_prev_minutes[0], "f3");
  do_flippy_ampm_num(split_minutes[1], split_prev_minutes[1], "f4");
  var split_seconds = doublefy(apflpo["flippy_ampm_seconds"]).split("");
  var split_prev_seconds = doublefy(apflpo["prev_flippy_ampm_seconds"]).split("");
  do_flippy_ampm_num(split_seconds[0], split_prev_seconds[0], "f5");
  do_flippy_ampm_num(split_seconds[1], split_prev_seconds[1], "f6");
  var split_ampm = apflpo["flippy_ampm_ampm"].split("");
  var split_prev_ampm = apflpo["prev_flippy_ampm_ampm"].split("");
  do_flippy_ampm_num(split_ampm[0], split_prev_ampm[0], "f7");
  do_flippy_ampm_num(split_ampm[1], split_prev_ampm[1], "f8");

  apflpo["prev_flippy_ampm_hours"] = apflpo["flippy_ampm_hours"];
  apflpo["prev_flippy_ampm_minutes"] = apflpo["flippy_ampm_minutes"];
  apflpo["prev_flippy_ampm_seconds"] = apflpo["flippy_ampm_seconds"];
  apflpo["prev_flippy_ampm_ampm"] = apflpo["flippy_ampm_ampm"];
}

function do_continuous_num(elm, time, place) {
  console.log(elm);

  var angle = (-1.2 * 10) + (1.2 * ( cfto[`${time}_angle`][place]) );
  console.log("ANGLE!!", angle)

  document.querySelector(`.continuous-playertime #${elm}`).style.transitionDuration = `1000ms`;
  document.querySelector(`.continuous-playertime #${elm}`).style.marginTop = `${angle}em`;

  if (parseInt(cfto[`${time}`].split("")[1]) == 0 && parseInt(cfto[`prev_${time}`].split("")[1] == 9)) {
    setTimeout(() => {
      document.querySelector(`.continuous-playertime #${elm}`).style.transitionDuration = "0ms";
      document.querySelector(`.continuous-playertime #${elm}`).style.marginTop = `${(-1.2 * 10)}em`;
    }, 1000)
    
  }
  
  
  // LOWER THE AMOUNT OF NUMBERS IN EACH NUMBER REEL TO 0-6 AND THEN 0

  


  
  
}

function fancy_continuous_time(seconds) {
  // console.log(seconds)
  var floor_seconds = Math.floor(seconds);
  var hours_exist;
  cfto["hours"] = Math.floor(floor_seconds / 3600);
  cfto["minutes"] = Math.floor((floor_seconds - (cfto["hours"] * 3600)) / 60);
  cfto["seconds"] = floor_seconds - (cfto["hours"] * 3600) - (cfto["minutes"] * 60);

   console.log(cfto["hours"])
   console.log(cfto["minutes"])
   console.log(cfto["seconds"])

  if (cfto["hours"] > 0) {
    hours_checked = true;
    hours_exist = true;
  }

  var split_hours = doublefy(cfto["hours"]).split("");
  var split_prev_hours = doublefy(cfto["prev_hours"]).split("");
  var split_minutes = doublefy(cfto["minutes"]).split("");
  var split_prev_minutes = doublefy(cfto["prev_minutes"]).split("");
  var split_seconds = doublefy(cfto["seconds"]).split("");
  var split_prev_seconds = doublefy(cfto["prev_seconds"]).split("");

  // angles
  cfto["seconds_angle"][0] = parseInt(split_seconds[0]) + (parseInt(split_seconds[1]) / 10);
  
  
  
  // do_continuous_num("h1", "hours", 0);
  // do_continuous_num("h2", "hours", 1);
  // do_continuous_num("m1", "minutes", 0);
  // do_continuous_num("m2", "minutes", 1);
  do_continuous_num("s1", "seconds", 0);
  do_continuous_num("s2", "seconds", 1);

  cfto["prev_hours"] = cfto["hours"];
  cfto["prev_minutes"] = cfto["minutes"];
  cfto["prev_seconds"] = cfto["seconds"];
}





var time_loop_int = 0;

var time_loop = setInterval(() => {

  now = new Date();

  if (time_loop_int % 10 == 0) { // every second!!
    var day_seconds = now.getSeconds() + (now.getMinutes() * 60) + (now.getHours() * 60 * 60);
    var ampm_day_seconds = day_seconds * 1;
    fancy_time(day_seconds);
    fancy_ampm_time(ampm_day_seconds);
    fancy_analog_clock(ampm_day_seconds);
    flippy_time(day_seconds);
    flippy_ampm_time(day_seconds);
    fancy_continuous_time(day_seconds);
  }


  time_loop_int += 1;
}, 100);

clearInterval(time_loop)