const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  let browser;
  try {
    console.log("opening the browser");
    browser = await puppeteer.launch({
      headless: false,
      // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const page = await browser.newPage();
    await page.goto("https://www.instagram.com/accounts/login/");
    await page.waitForSelector('input[name="username"]');
    //enter Username
    await page.type('input[name="username"]', "YOUR USERNAME");
    //enter Password
    await page.type('input[name="password"]', "YOUR PASSWORD");
    await page.click('button[type="submit"]');

    await page.waitFor(6000);

    //jogezai001

    //Redirecting to current_follow_requests
    await page.goto(
      "https://www.instagram.com/accounts/access_tool/current_follow_requests"
    );

    //cliking view more button
    do {
      await page.click(
        "section._9eogI.E3X2T > main.SCxLW.o64aR  > div.BvMHM.EzUlV.XfvCs > article.PVkFi > main.fIcML > button.sqdOP.L3NKy.y3zKF",
        console.log("button is clicked")
      );
      await page.waitFor(2000);
    } while (
      (await page.$(
        "section._9eogI.E3X2T > main.SCxLW.o64aR  > div.BvMHM.EzUlV.XfvCs > article.PVkFi > main.fIcML > button.sqdOP.L3NKy.y3zKF"
      )) !== null
    );

    let sentReq = [];

    const tweets = await page.$$('div[class="-utLf"]');
    //getting usernames of panding request
    for (let i = 0; i < tweets.length; i++) {
      const tweet = await (
        await tweets[i].getProperty("innerText")
      ).jsonValue();
      sentReq.push(tweet);
    }
    console.log(sentReq);

    const url = "https://www.instagram.com/";
    const finlUrl = [];

    //making urls
    for (i = 0; i < tweets.length; i++) {
      finlUrl.push(url.concat(sentReq[i]));
    }

    console.log(finlUrl);
    console.log("Total pending req ==> ", tweets.length);
    var finalUrl = JSON.stringify(finlUrl);
    fs.writeFile("./unfollw.json", finalUrl, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });

    //cancelling requests
    for (i = 0; i < sentReq.length; i++) {
      await page.goto(finlUrl[i]);
      await page.waitFor(1000);
      await page.waitForSelector(
        "main.SCxLW.o64aR",
        console.log("Selector founded in Main Class")
      );

      //clicking requested
      await page.waitFor(3000);
      await page.click(
        "div.v9tJq.AAaSh.VfzDr > header.zw3Ow   > section.wW3k- > div.XBGH5 > div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm.bPdm3 > div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm > div.qF0y9.Igw0E.IwRSH.eGOV_.vwCYk > button.sqdOP.L3NKy._8A5w5",
        console.log("Requsted button is clicked")
      );
      await page.waitFor(1000);
      await page.waitForSelector("div.RnEpo.Yx5HN");
      //clicking popup
      await page.click(
        "div.pbNvD.fPMEg > div._1XyCr > div.piCib > div.mt3GC > button.aOOlW.-Cab_",
        console.log("Unfollow button is clicked ")
      );

      await page.waitFor(1000);

      //confirming request is cancelled
      await page.goto(finlUrl[i]);
      await page.waitForSelector(
        "main.SCxLW.o64aR",
        console.log("Selector founded second time")
      );

      // code under construction

      await page.waitForSelector(
        "div.v9tJq.AAaSh.VfzDr > header.zw3Ow   > section.wW3k- > div.XBGH5 > div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm.bPdm3 > div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm > div.qF0y9.Igw0E.IwRSH.eGOV_.vwCYk > button"
      );
      let element = await page.$(
        "div.v9tJq.AAaSh.VfzDr > header.zw3Ow   > section.wW3k- > div.XBGH5 > div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm.bPdm3 > div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm > div.qF0y9.Igw0E.IwRSH.eGOV_.vwCYk > button"
      );
      let value = await page.evaluate((el) => el.textContent, element);

      console.log("button value is ==> ", value);

      if (value === "Requested") {
        do {
          await page.goto(finlUrl[i]);
          //clicking requested
          await page.waitForSelector(
            "main.SCxLW.o64aR",
            console.log("Selector founded in do while loop")
          );
          await page.waitFor(2500);
          await page.click(
            "div.v9tJq.AAaSh.VfzDr > header.zw3Ow   > section.wW3k- > div.XBGH5 > div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm.bPdm3 > div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm > div.qF0y9.Igw0E.IwRSH.eGOV_.vwCYk > button.sqdOP.L3NKy._8A5w5",
            console.log("Requsted button is clicked")
          );
          await page.waitFor(1000);
          await page.waitForSelector("div.RnEpo.Yx5HN");
          //clicking popup
          await page.click(
            "div.pbNvD.fPMEg > div._1XyCr > div.piCib > div.mt3GC > button.aOOlW.-Cab_",
            console.log("Unfollow button is clicked ")
          );

          await page.waitFor(1000);

          await page.waitFor(1000);
          console.log("Unfolowing ");

          //updating selector value
          await page.goto(finlUrl[i]);
          await page.waitForSelector(
            "div.v9tJq.AAaSh.VfzDr > header.vtbgv  > section.zwlfE > div.nZSzR > div.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm.bPdm3 > div.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm > div.Igw0E.IwRSH.eGOV_.vwCYk > button"
          );
          element = await page.$(
            "div.v9tJq.AAaSh.VfzDr > header.vtbgv  > section.zwlfE > div.nZSzR > div.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm.bPdm3 > div.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm > div.Igw0E.IwRSH.eGOV_.vwCYk > button"
          );
          value = await page.evaluate((el) => el.textContent, element);

          console.log("button value in do while loop ==> ", value);
        } while (value === "Requested");
      }
    }

    await page.waitFor(3000);
  } catch (err) {
    console.log("Could not create ", err);
  }

  await browser.close();
})();
