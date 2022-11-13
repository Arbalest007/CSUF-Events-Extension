const {google} = require('googleapis');
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.calendarId;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const TIMEOFFSET = '-08:00';

const dateTimeForCalendar = () => {
    const date = new Date();
    const year = date.getFullYear();

    let month = date.getMonth() + 1;
    if(month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if(day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if(hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if(minute < 10) {
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

        if(response['status'] == 200 && response['statusText'] === 'OK') {
            return 'Event inserted successfully';
        } else {
            return 'Failed to insert event';
        }
    } catch(error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

let dateTime = dateTimeForCalendar();
let event = {
    'summary': `This is the summary`,
    'description': `This is the description`,
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
    } catch(error) {
        console.log(error);
    }
};

insertNewEvent(event);