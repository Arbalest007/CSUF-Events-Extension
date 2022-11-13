const { Builder, By } = require('selenium-webdriver');
const fs = require('fs')
async function start() {
    let driver = await new Builder().forBrowser('chrome').build()
    await driver.get('http://calendar.fullerton.edu/');
    await driver.manage().setTimeouts({ implicit: 4000 });

    let eventlist = driver.findElements(By.xpath('//ul[@class="EventContainer_UL"]//div[@class="EventCard_Shell Events_CalendarListDetails "]'))

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
            fs.appendFile('event.json', info_to_file + '\n', err => {
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