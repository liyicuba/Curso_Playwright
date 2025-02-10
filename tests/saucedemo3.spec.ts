import { test, expect } from '@playwright/test';

test('purchase an item', async ({ page }) => {
    //test.setTimeout(120_000)

    await page.goto('https://www.saucedemo.com')

    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

    const randomIndex = Math.floor(Math.random() * itemsContainer.length)

    const randomItem = itemsContainer[randomIndex]

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    console.log('Price: ',  {expectedPrice}, 'Name:', {expectedName}, 'Description:', {expectedDescription} )

    await randomItem.getByRole('button', {name: 'Add to Cart'}).click()

    await page.locator('a.shopping_cart_link').click()
      
    expect(page.getByRole('button', {name: 'checkout'})).toBeVisible

    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualdDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectedName)
    expect(actualdDescription).toEqual(expectedDescription)
    expect(actualPrice).toEqual(expectedPrice)
    
    await page.getByRole('button', {name: 'Checkout'}).click()

    await page.getByRole('textbox', {name: 'First Name'}).fill('Lina')
    await page.getByRole('textbox', {name: 'Last Name'}).fill('sauce')
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('1234')
    await page.getByRole('button', {name: 'Continue'}).click()
    await page.getByRole('button', {name: 'Finish'}).click()

    expect(page.getByRole('banner', {name: 'Pony Express'})).toBeVisible

 });