/*----------------------------popup.js----------------------------------------------------------
|  Author: Patrick Lin, Nicholas Jones, Sami Bajwa                                                    |
|  Group Name: Some Group Name                                                                        |
|  Emails: pjlin@csu.fullerton.edu, nicholasj898@csu.fullerton.edu, samibajwa@csu.fullerton.edu       |
|  Class: CPSC 254                                                                                    |
|  Instructor: Professor Chen                                                                         |
|  Purpose: This script refreshes the extension to reflect any new events that were added to the      |
|  calendar.                                                                                          |
|  Dependencies: Google Calendar API, Selenium API                                                    |
|  Known Bugs: N/A                                                                                    |
|  Licensing Information: You are free to use or extend this project for educational purposes         |
|  provided that you (1) retain this notice, and (2) provide clear attribution to the developers of   |
|  the project by adding a link to our Github repository:                                             |
|  https://github.com/Arbalest007/CSUF-Events-Extension                                               |
------------------------------------------------------------------------------------------------------*/

//const chrome = require("selenium-webdriver/chrome");

let updateEvents = document.getElementById("updateEvents");

updateEvents.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  window.location.reload();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapeEventsFromCalendar,
  });
});