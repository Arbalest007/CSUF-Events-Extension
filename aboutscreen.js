/*----------------------------aboutscreen.js----------------------------------------------------------
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

let aboutInfo = document.getElementById("aboutInfo");

aboutInfo.addEventListener("click", () => {
  alert(
    "CPSC 254 Semester Project\nVersion 0.92\nMade by Sami Bajwa, Patrick Lin, and Nicholas Jones\nThis extension allows you to view previous and upcoming CSUF\
    events all on one calendar, without needing to go to the official website."
  );
});
