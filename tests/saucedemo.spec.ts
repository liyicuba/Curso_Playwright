import { test, expect } from '@playwright/test';

test('purchase an item', async ({ page }) => {

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

/*
 Cambié el locator porque problema era que no lo encontraba pero tampoco funcionó
    //const actualdDescription = await randomItem.locator('#cart_contents_container .inventory_item_desc').innerText()
    //const actualName = await randomItem.locator('#cart_contents_container .inventory_item_name').innerText()
    //const actualPrice = await randomItem.locator('#cart_contents_container .inventory_item_price').innerText()*/

    const actualdDescription = await page.locator('.inventory_item_desc').innerText()
    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectedName)
    expect(actualdDescription).toEqual(expectedDescription)
    expect(actualPrice).toEqual(expectedPrice)
 
 });