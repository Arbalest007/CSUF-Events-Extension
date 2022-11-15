const fetch = require('node-fetch');
const { google } = require('googleapis');
require('dotenv').config();
const fs = require('fs')

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.calendarId;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({
    version: "v3"
});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const TIMEOFFSET = '-08:00';

const convertNoon = (input) => {
    inputArray = input.split(" ");

    for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i] == "Noon") {
            inputArray[i] = "12";
            inputArray.splice(i + 1, 0, "pm");
        }
    }

    return inputArray;
}

const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if(minutes == null) {
        minutes = '00';
    }

    if (modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}


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
}

const parseTime = (s) => {
    inputArray = convertNoon(s);
    inputArray = convertFullString(inputArray.toString().replaceAll(",", " ")).split(" ");

    return inputArray;
}

const dateTimeForCalendar = () => {
    const date = new Date();
    const year = date.getFullYear();

    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    const newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;
    const event = new Date(Date.parse(newDateTime));

    const startDate = event;
    const endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

    return {
        'start': startDate,
        'end': endDate
    }
};

const insertEvent = async (event) => {
    try {
        const response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });

        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 'Event inserted successfully';
        } else {
            return 'Failed to insert event';
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

let dateTime = dateTimeForCalendar();
let event = {
    'summary': `This is the summary`,
    'description': `This is the description.`,
    'start': {
        'dateTime': dateTime['start'],
        'timeZone': 'Asia/Kolkata'
    },
    'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'Asia/Kolkata'
    }
};

const insertNewEvent = async (event) => {
    try {
        const res = await insertEvent(event);
        console.log(res)
    } catch (error) {
        console.log(error);
    }
};

async function getEvents() {
    const eventList = await fetch('https://gist.githubusercontent.com/anthonyn5600/42f598c9b99ba68207cce175605b5578/raw/d38c88bac82c4b5d7b0ae7e0ec7d2bea8d622562/event.json')
        .then(eventList => eventList.json())
        .then(data => initializeCalendar(data));
}

function removeLastCharacter(filename) {
    const stat = fs.statSync(filename)
    const fileSize = stat.size
  
    fs.truncate(filename, fileSize - 2, function() {
        console.log("Last 2 Deleted!")
    })

    fs.appendFile('event.json', '\n]}', err => {
        if (err) {
            console.error(err)
            return
        }
    })
}

// function initializeCalendar(data) {
//     for(i = 0; i < 1; i++) {
//         console.log(${data[i].location});
//     }
// }

removeLastCharacter('event.json')
//getEvents();

let s = "1:25 pm";
let s1 = "12:45 am to 12:45 pm";
console.log(convertTime12to24(s));
console.log(convertFullString(s1));
console.log(convertNoon("Noon to Noon"));
console.log(parseTime("12 am to 12 am"));