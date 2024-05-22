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
  fto["flippy_hours"] = Math.floor(floor_seconds / 3600);
  fto["flippy_minutes"] = Math.floor((floor_seconds - (fto["flippy_hours"] * 3600)) / 60);
  fto["flippy_seconds"] = floor_seconds - (fto["flippy_hours"] * 3600) - (fto["flippy_minutes"] * 60);

  // console.log(fto["hours"])
  // console.log(fto["minutes"])
  // console.log(fto["seconds"])

  if (fto["hours"] > 0) {
    hours_checked = true;
    hours_exist = true;
  }
  if (hours_exist == true) {
    var split_hours = doublefy(fto["flippy_hours"]).split("");
    var split_prev_hours = doublefy(fto["prev_flippy_hours"]).split("");
    do_flippy_num(split_hours[0], split_prev_hours[0], "f1");
    do_flippy_num(split_hours[1], split_prev_hours[1], "f2");
  }
  
  var split_minutes = doublefy(fto["flippy_minutes"]).split("");
  var split_prev_minutes = doublefy(fto["prev_flippy_minutes"]).split("");
  do_flippy_num(split_minutes[0], split_prev_minutes[0], "f3");
  do_flippy_num(split_minutes[1], split_prev_minutes[1], "f4");
  var split_seconds = doublefy(fto["flippy_seconds"]).split("");
  var split_prev_seconds = doublefy(fto["prev_flippy_seconds"]).split("");
  do_flippy_num(split_seconds[0], split_prev_seconds[0], "f5");
  do_flippy_num(split_seconds[1], split_prev_seconds[1], "f6");

  fto["prev_flippy_hours"] = fto["flippy_hours"];
  fto["prev_flippy_minutes"] = fto["flippy_minutes"];
  fto["prev_flippy_seconds"] = fto["flippy_seconds"];
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
  }


  time_loop_int += 1;
}, 100);