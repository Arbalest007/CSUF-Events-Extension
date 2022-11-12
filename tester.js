const express = require('express')
const { Builder, By } = require('selenium-webdriver');

const app = express()
const port = 3000
app.get('/', async (request, response) => {
    // Web Scraping Code here
    try {
      const data = await WebScrapingLocalTest();
      response.status(200).json(data);
    } catch (error) {
      response.status(500).json({
        message: 'Server error occurred',
      });
    }
   });
   app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
   });
    
   async function WebScrapingLocalTest() {
    try {
      driver = await new Builder().forBrowser('chrome').build();
      await driver.get('http://calendar.fullerton.edu/');
      const csufEvents = await driver.findElements(By.xpath('//ul[@class="EventContainer_UL"]//div[@class="EventCard_Shell Events_CalendarListDetails "]'));
      //return await getVideos(allVideos);
    } catch (error) {
      throw new Error(error);
    } finally {
      await driver.quit();
    }
   }

//    async function getVideos(videos) {
//     let videoDetails = [];
//     try {
//       for (const video of videos) {
//         const title = await video.findElement(By.id('video-title')).getText();
//         const views = await video
//           .findElement(By.xpath(".//*[@id='metadata-line']/span[1]"))
//           .getText();
//         const date = await video
//           .findElement(By.xpath(".//*[@id='metadata-line']/span[2]"))
//           .getText();
//         videoDetails.push({
//           title: title ?? '',
//           views: views ?? '',
//           publishedDate: date ?? '',
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     return videoDetails;
//    }