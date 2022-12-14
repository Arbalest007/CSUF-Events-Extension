/*----------------------------darktheme.js----------------------------------------------------------
|  Author: Patrick Lin, Nicholas Jones, Sami Bajwa                                                    |
|  Group Name: Some Group Name                                                                        |
|  Emails: pjlin@csu.fullerton.edu, nicholasj898@csu.fullerton.edu, samibajwa@csu.fullerton.edu       |
|  Class: CPSC 254                                                                                    |
|  Instructor: Professor Chen                                                                         |
|  Purpose: This script defines the behavior for the "Change Theme" button to alter the background    |
|  color of the extension as per the user's preferenceds                                              |
|  Dependencies: Google Calendar API, Selenium API                                                    |
|  Known Bugs: N/A                                                                                    |
|  Licensing Information: You are free to use or extend this project for educational purposes         |
|  provided that you (1) retain this notice, and (2) provide clear attribution to the developers of   |
|  the project by adding a link to our Github repository:                                             |
|  https://github.com/Arbalest007/CSUF-Events-Extension                                               |
------------------------------------------------------------------------------------------------------*/

const btn = document.getElementById("btn");
let clickState = 0;

btn.addEventListener("click", function onClick(event) {
  clickState++;

  if (clickState == 1) {
    var foobarElement = document.getElementById("foobar");
    foobarElement.style.backgroundImage = "";
    foobarElement.style.background = "";
    foobarElement.style.backgroundUrl = "";
    foobarElement.style.backgroundColor = "";

    document.body.style.backgroundColor = "black";
    localStorage.setItem("clickState", clickState);
  } else if (clickState == 2) {
    var foobarElement = document.getElementById("foobar");
    foobarElement.style.backgroundImage = "";
    foobarElement.style.background = "";
    foobarElement.style.backgroundUrl = "";
    foobarElement.style.backgroundColor = "";

    document.body.style.backgroundColor = "brown";
    localStorage.setItem("event", "cyan");
  } else if (clickState == 3) {
    var foobarElement = document.getElementById("foobar");
    foobarElement.style.backgroundImage = "";
    foobarElement.style.background = "";
    foobarElement.style.backgroundUrl = "";
    foobarElement.style.backgroundColor = "";

    document.body.style.backgroundColor = "green";
    localStorage.setItem("clickState", clickState);
  } else if (clickState == 4) {
    var foobarElement = document.getElementById("foobar");
    foobarElement.style.backgroundImage = "";
    foobarElement.style.background = "";
    foobarElement.style.backgroundUrl = "";
    foobarElement.style.backgroundColor = "";

    document.body.style.backgroundColor = "rgb(100, 50, 119)";
    localStorage.setItem("clickState", clickState);
  } else if (clickState == 5) {
    var foobarElement = document.getElementById("foobar");
    foobarElement.style.backgroundImage = "";
    foobarElement.style.background = "";
    foobarElement.style.backgroundUrl = "";
    foobarElement.style.backgroundColor = "";

    document.body.style.backgroundColor = "rgb(200, 68, 112)";
    localStorage.setItem("clickState", clickState);
  } else if (clickState == 6) {
    var foobarElement = document.getElementById("foobar");
    foobarElement.style.backgroundImage = "";
    foobarElement.style.background = "";
    foobarElement.style.backgroundUrl = "";
    foobarElement.style.backgroundColor = "";

    document.body.style.backgroundColor = "rgb(80, 20, 122)";
    localStorage.setItem("clickState", clickState);
  } else if (clickState == 7) {
    var foobarElement = document.getElementById("foobar");
    foobarElement.style.backgroundImage = "";
    foobarElement.style.background = "";
    foobarElement.style.backgroundUrl = "";
    foobarElement.style.backgroundColor = "";

    document.body.style.backgroundColor = "rgb(14, 58, 116)";
    localStorage.setItem("clickState", clickState);
    clickState = 0;
  }
});
