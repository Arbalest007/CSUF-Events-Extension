//const chrome = require("selenium-webdriver/chrome");

let updateEvents = document.getElementById
('updateEvents');

updateEvents.addEventListener("click", async () => {
    
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    window.location.reload();
    const delay = ms => new Promise(res => setTimeout(res, ms));
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEventsFromCalendar,
    });
    await setTimeout(5000);
})

function secondFunction(){
    // call first function and pass in a callback function which
    // first function runs when it has completed
    updateEvents(function() {
        alert('All CSUF events are up to date!');
    });    
}

function scrapeEventsFromCalendar() {
    alert('Failed to update calendar.');
}
