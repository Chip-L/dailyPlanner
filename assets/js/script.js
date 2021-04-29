//THEN the current day is displayed at the top of the calendar

//THEN I am presented with timeblocks for standard business hours <-- done in HTML

//THEN each timeblock is color coded to indicate whether it is in the past, present, or future

//THEN I can enter an event <-- done in HTML

// THEN the text for that event is saved in local storage

// THEN the saved events persist

//

// set up interval for the timer. Check every hour and upon entry as to the current time and then increment the timeblock accordingly. <-- done

//Upon entry,
// find current time and subtract from next hour - this is the first interval length. --- done
//  Set the current date in header -- done
//  get stored data and populate that into the time blocks

//  add eventlistener to the save button
// determine the button and save that button's text area to local storage

// select all items in the hour block
let hourBlockChildren = $("#hourBlock").children();

function setUpdateHoursTimer() {
  let timeLength;
  let minutesToNextHour = 60 - moment().minute();

  // set timeLength to countdown to the next hour
  timeLength = minutesToNextHour * 60000; // convert min to ms

  // start timer (probably don't need the variable)
  let updateHourTimer = setInterval(() => {
    timeLength = 3600000; // reset interval to hourly
    console.log("in interval", timeLength);
    setPastPresent();
  }, timeLength);
}

// interate through them and if id is earlier than current hour then add past class if == to current hour then add present class
function setPastPresent() {
  let currentHour = moment().hours();
  let compareTag;

  // currentHour = 16;

  // set up tag to compare against
  if (currentHour < 10) {
    compareTag = "hour-09";
  } else {
    compareTag = "hour-" + currentHour;
  }

  for (let i = 0; i < hourBlockChildren.length; i++) {
    if (hourBlockChildren[i].id < compareTag) {
      $(hourBlockChildren[i]).children().eq(1).addClass("past");
      $(hourBlockChildren[i]).children().eq(1).removeClass("future");
    } else if (hourBlockChildren[i].id === compareTag) {
      $(hourBlockChildren[i]).children().eq(1).addClass("present");
      $(hourBlockChildren[i]).children().eq(1).removeClass("future");
    }
  }
}

console.log(moment().format("l"));

// read in events from localStorage. if they are for today, display in the proper hour
function displayEvents() {
  let eventList = JSON.parse(localStorage.getItem("events")) || [];

  for (let index = 0; index < eventList.length; index++) {
    if (eventList[index].date === moment().format("l")) {
      $("#" + eventList[index].tag)
        .eq(1)
        .val(eventList[index]);
    }
  }
}

// eventList set the date at the top of the calendar
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// these all execut on page load
setUpdateHoursTimer();
setPastPresent();
