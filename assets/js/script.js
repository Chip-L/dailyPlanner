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

let timeLength;

// console.log(moment().format("dddd, MMMM Do"));

$("#currentDay").text(moment().format("dddd, MMMM Do"));

function getUntilNextHour() {
  let currentMinute = moment().minute();
  let nexthour = 60 - currentMinute;

  timeLength = nexthour * 60 * 1000;
}

function setUpdateHoursTimer() {
  let updateHourTimer = setInterval(() => {
    setPastPresent();
  }, timeLength);
}

// select all items in the hour block
// interate through them and if id is earlier than current hour then add past class if == to current hour then add present class

function setPastPresent() {
  let hourBlockChildren = [];
  let currentHour = moment().hours();
  let compareTag;

  hourBlockChildren = $("#hourBlock").children();

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

getUntilNextHour();
setUpdateHoursTimer();
setPastPresent();
