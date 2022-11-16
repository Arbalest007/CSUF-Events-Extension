/*----------------------------calendar.js--------------------------------------------------------------
|  Author: Patrick Lin, Nicholas Jones, Sami Bajwa                                                    |
|  Group Name: Some group name                                                                        |
|  Emails: pjlin@csu.fullerton.edu, nicholasj898@csu.fullerton.edu, samibajwa@csu.fullerton.edu       |
|  Class: CPSC 254                                                                                    |
|  Instructor: Professor Chen                                                                         |
|  Purpose: This program is a google chrome extension that displays all of the future events          |
|  that will take place at the school California State University, Fullerton.                         |
|  Dependencies: Google API, Selenium API                                                             |
|  Known Bugs: N/A                                                                                    |
|  Licensing Information: You are free to use or extend this project for educational purposes         |
|  provided that you (1) retain this notice, and (2) provide clear attribution to the developers of   |
|  the project by adding a link to our Github repository:                                             |
|  https://github.com/Arbalest007/CSUF-Events-Extension                                               |
------------------------------------------------------------------------------------------------------*/

const fetch = require("node-fetch");
const { google } = require("googleapis");
require("dotenv").config();
const fs = require("fs");

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.calendarId;
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({
  version: "v3",
});
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

const TIMEOFFSET = "-08:00";

const convertNoon = (input) => {
  inputArray = input.split(" ");

  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == "Noon") {
      inputArray[i] = "12";
      inputArray.splice(i + 1, 0, "pm");
    }
  }

  return inputArray;
};

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (minutes == null) {
    minutes = "00";
  }

  if (modifier === "pm") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

const convertFullString = (s) => {
  let time_array = [];
  let l = 0;
  for (let r = 1; r < s.length; r++) {
    if ((s[r] == "m" && s[r - 1] == "p") || (s[r] == "m" && s[r - 1] == "a")) {
      let time_string = s.slice(l, r + 1);
      time_array.push(time_string);
      l = r;
      // console.log(parseInt(s[l]));
    }
    while (isNaN(parseInt(s[l])) && l < s.length) {
      l += 1;
    }
  }

  let time1 = convertTime12to24(time_array[0]);
  let time2 = convertTime12to24(time_array[1]);

  return `${time1} to ${time2}`;
};

const parseTime = (s) => {
  inputArray = convertNoon(s);
  inputArray = convertFullString(
    inputArray.toString().replaceAll(",", " ")
  ).split(" ");

  return inputArray;
};

const insertEvent = async (event) => {
  try {
    const response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    });

    if (response["status"] == 200 && response["statusText"] === "OK") {
      return "Event inserted successfully";
    } else {
      return "Failed to insert event";
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};

const insertNewEvent = async (event) => {
  try {
    const res = await insertEvent(event);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

async function getEvents() {
  const eventList = await fetch(
    "https://raw.githubusercontent.com/Arbalest007/CSUF-Events-Extension/main/event.json"
  )
    .then((eventList) => eventList.json())
    .then((data) => initializeCalendar(data.events));
}

function removeLastCharacter(filename) {
  const stat = fs.statSync(filename);
  const fileSize = stat.size;

  fs.truncate(filename, fileSize - 2, function () {
    console.log("Last 2 Deleted!");
  });

  fs.appendFile("event.json", "\n]}", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

async function initializeCalendar(data) {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  let event = {
    summary: `This is the summary`,
    description: `This is the description.`,
    start: {
      dateTime: "Empty",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "Empty",
      timeZone: "America/Los_Angeles",
    },
  };

  for (i = 0; i < data.length; i++) {
    event["summary"] = data[i].event_title;
    event["description"] = data[i].link.replaceAll("Share URL:\n", "");

    timeString = data[i].event_time;
    cleanString = convertNoon(timeString);

    finalTime = parseTime(timeString);
    month = 1 + months.indexOf(data[i].event_month);
    year = 0;

    if (month < 11) {
      year = 2023;
    } else {
      year = 2022;
    }

    day = data[i].event_day;
    startTime = finalTime[0];
    endTime = finalTime[2];

    startTimeFinal = `${year}-${month}-${day}T${startTime}:00.000${TIMEOFFSET}`;
    endTimeFinal = `${year}-${month}-${day}T${endTime}:00.000${TIMEOFFSET}`;

    event["start"].dateTime = startTimeFinal;
    event["end"].dateTime = endTimeFinal;

    insertNewEvent(event);
    await timer(3000);
  }
}

getEvents();
