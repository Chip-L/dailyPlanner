//THEN the current day is displayed at the top of the calendar

//THEN I am presented with timeblocks for standard business hours <-- do in HTML

//THEN each timeblock is color coded to indicate whether it is in the past, present, or future

//THEN I can enter an event <-- done in HTML

// THEN the text for that event is saved in local storage

// THEN the saved events persist

// read from local storage and populate

// set up interval for the timer. Check every hour and upon entry as to the current time and then increment the timeblock accordingly.

//Upon entry,
// find current time and subtract from next hour - this is the first interval length.
// Set the current date in header
// get stored data and populate that into the time blocks

// add eventlistener to the save button
// determine the button and save that button's text area to local storage

let timeLength;

console.log(moment().format("dddd, MMMM Do"));

$("#currentDay").text(moment().format("dddd, MMMM Do"));

function getUntilNextHour() {
  let currentHour = moment().hours();
  let currentMinute = moment().minute();
  let nexthour = 60 - currentMinute;

  timeLength = nexthour * 60 * 1000;

  console.log(currentHour);
  console.log(currentMinute);
  console.log(nexthour);
  //nexthour - currenttime
}

function setUpdateHours() {
  let updateHourTimer = setInterval(() => {
    setPastPresent;
  }, timeLength);
}

getUntilNextHour();
