//const chrome = require("selenium-webdriver/chrome");

let updateEvents = document.getElementById
('updateEvents');

updateEvents.addEventListener("click", async () => {
    alert('All CSUF events are up to date!');
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEventsFromCalendar,
    });
})
/*
function scrapeEventsFromCalendar() {
    alert('All CSUF events are up to date!');
}
*/