/*----------------------------scraper.js----------------------------------------------------------
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

const { Builder, By } = require('selenium-webdriver');
const fs = require('fs')

async function start() {
    let driver = await new Builder().forBrowser('chrome').build()
    await driver.get('http://calendar.fullerton.edu/');
    await driver.manage().setTimeouts({ implicit: 4000 });

    let eventlist = driver.findElements(By.xpath('//ul[@class="EventContainer_UL"]//div[@class="EventCard_Shell Events_CalendarListDetails "]'))

    counter = 0

    for (let event of await eventlist) {
        let detail = await event.findElement(By.css('a')).click()
        let page = await driver.findElement(By.className('blackout_on'))
        try {
            let destination = await page.findElement(By.xpath('//*[@id="EventFullFrame"]/div/div[2]/div[2]/div[2]/div/p[1]')).getText()
            let info = {
                location: destination,
                event_title: await event.findElement(By.className('EventTitle')).getText(),
                event_time: await event.findElement(By.className('EventTime')).getText(),
                event_month: await driver.findElement(By.xpath('//p[@class="EventFull_month"]')).getText(),
                event_day: await driver.findElement(By.xpath('//p[@class="EventFull_day"]')).getText(),
                link: await page.findElement(By.xpath('//*[@id="EventFullFrame"]/div/div[2]/div[2]/div[2]/div/p[2]')).getText()
            }
            let info_to_file = JSON.stringify(info);

            if(counter == 0) {
                fs.appendFile('event.json', "{ \"events\": [\n",err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
                counter++;
            }
            
            fs.appendFile('event.json', info_to_file + ',\n', err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
        catch (error) {
            let info = {
                location: 'Xpath Error',
                event_title: await event.findElement(By.className('EventTitle')).getText(),
                event_time: await event.findElement(By.className('EventTime')).getText(),
                event_month: await driver.findElement(By.xpath('//p[@class="EventFull_month"]')).getText(),
                event_day: await driver.findElement(By.xpath('//p[@class="EventFull_day"]')).getText(),
                link: 'Xpath Error'
            }
            let info_to_file = JSON.stringify(info);
            fs.appendFile('event.json', info_to_file + '\n', err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
        let close = await page.findElement(By.css('input')).click()
    }
}

start()