// Import Playwright
const { test, expect } = require('@playwright/test');


test('Validate fields on the event page', async ({ page }) => {

    // Validate the URL
    const url = 'https://www.sitickets.com/event/test-qa-long-term';
    await page.goto(url);
    expect(page.url()).toBe(url);

 
    // Validate title
    const title1 = '//*[@id="__next"]/div[2]/div[2]/div[4]/div[2]/div[1]/div[1]/div[1]/h2/div';
    const eventTitle = await page.locator(title1).textContent();
    expect(eventTitle).toBe('Test QA Long Term 121212');


    // Validate the event date
   
    //const eventDate = await page.locator('//div[2]/div[2]/div[4]/div[2]/div[1]/div[1]/div[3]/p/text()[1]').toBeVisible();  // Returns the whole string with the address
    //console.log('this is the event date', eventDate)
    //expect(eventDate).toContainText("Mon, Dec 1 2025 9:30 AM");         // Matches the date
    

    // Validate the event location
    //const eventLocation = await page.getByText('North Austin, Travis County, 12221 N Mopac Expy, Austin, TX, 78758-2401');
    //expect(eventLocation).toContainText('North Austin, Travis County, 12221 N Mopac Expy, Austin, TX, 78758-2401');


   
    // Validate the event description
    const eventDescription = await page.getByText('this is an edit 232323 edit')
    expect(eventDescription).toContainText('this is an edit 232323 edit');
});
