###### Project: CSUF Events Google Chrome Extension
###### Authors: Sami Bajwa, Patrick Lin, Nicholas Jones
###### Current Version: 1.00

# About
CSUF Events is a browser extension built for Google Chrome. The extension depends on data scraped rom the official [CSUF calendar webpage](http://calendar.fullerton.edu/) utilizing the Selenium webdriver. This data is then parsed and packaged into an appropriate JSON format which we insert into a Google Calendar by calling the Google Calendar API. Finally, the calendar is embedded into the extension's UI in a compact layout to provide user's with an overview of upcoming campus events.

# Technologies and Languages
* Javascript
* HTML
* CSS
* Node.js
* Google Calendar API
* Selenium Webdriver

# Installation Instructions

1. Clone or download the repository as a ZIP archive, then extract it.
2. Navigate to "_chrome://extensions/_" in your Google Chrome search bar.
3. Toggle Developer Mode.

   ![Steps 2 & 3](https://github.com/Arbalest007/CSUF-Events-Extension/blob/4121b798e427ad0be989ddc424e1c9a0ffb3896b/images/Instruction%201.png)

4. Select **Load Unpacked**, navigate to the directory containing the repository's folder, then confirm.

   ![Step 4](https://github.com/Arbalest007/CSUF-Events-Extension/blob/4121b798e427ad0be989ddc424e1c9a0ffb3896b/images/Instruction%202.png)

5. The extension should now be loaded onto your web browser!

   ![Installation Complete!]