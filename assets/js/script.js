// select all items in the hour block
let hourBlockChildren = $("#hourBlock").children();
let getEventList = () => JSON.parse(localStorage.getItem("events")) || [];

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
  let compareID;

  // set up tag to compare against
  if (currentHour < 10) {
    compareID = "hour-09";
  } else {
    compareID = "hour-" + currentHour;
  }

  for (let i = 0; i < hourBlockChildren.length; i++) {
    if (hourBlockChildren[i].id < compareID) {
      $(hourBlockChildren[i]).children().eq(1).removeClass("future present");
      $(hourBlockChildren[i]).children().eq(1).addClass("past");
    } else if (hourBlockChildren[i].id === compareID) {
      $(hourBlockChildren[i]).children().eq(1).removeClass("future past");
      $(hourBlockChildren[i]).children().eq(1).addClass("present");
    } else {
      $(hourBlockChildren[i]).children().eq(1).removeClass("present past");
      $(hourBlockChildren[i]).children().eq(1).addClass("future");
    }
  }
}

// read in events from localStorage and display in the proper hour
function displayEvents() {
  let eventList = getEventList();

  for (let index = 0; index < eventList.length; index++) {
    $("#" + eventList[index].tag)
      .children()
      .eq(1)
      .val(eventList[index].activity);
  }
}

// when a save button is clicked, this will grab the text from the textarea associated with that button and save it into localStorage "events"
function saveEvents(event) {
  event.preventDefault();
  let target = event.target; // button clicked on
  let eventList = getEventList();
  let existsAtIndex = -1; // flag to check if it already exists in the eventList

  // create the object
  let newEvent = {
    tag: $(target).closest(".row").attr("id"),
    activity: $(target).siblings("textarea").val(),
  };

  // search the eventlist to see if the tag already exist - if so set exixtsAtIndex
  for (let i = 0; i < eventList.length; i++) {
    if (eventList[i].tag === newEvent.tag) {
      existsAtIndex = i;
    }
  }

  if (existsAtIndex === -1 && newEvent.activity === "") {
    return; //nothing to save or overwrite -- leave function
  } else if (existsAtIndex === -1) {
    // new event!
    eventList.push(newEvent);
  } else {
    // event already exists
    if (newEvent.activity === "") {
      // delete the event
      eventList.splice(existsAtIndex, 1);
    } else {
      // edit the event
      eventList.splice(existsAtIndex, 1, newEvent);
    }
  }

  localStorage.setItem("events", JSON.stringify(eventList));
}

// eventList set the date at the top of the calendar
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// create save button click events
$("#hourBlock").on("click", ".saveBtn", saveEvents);

// these all execut on page load
setUpdateHoursTimer();
setPastPresent();
displayEvents();
