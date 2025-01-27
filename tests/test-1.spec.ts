import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mercadolibre.com/');
  await page.getByRole('link', { name: 'Argentina' }).click();
  await page.getByPlaceholder('Buscar productos, marcas y má').click();
  await page.getByPlaceholder('Buscar productos, marcas y má').fill('iphone');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('link', { name: 'Apple iPhone 16 (128 GB) - Blanco - Distribuidor Autorizado' }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
});

test('test locators', async ({ page }) => {
  
  await page.goto('https://www.mercadolibre.com.ar/')
  //await page.getByRole('link', {name: 'Mis Compras'}).click()
  await page.getByRole('link', {name: 'Ingresá', exact: true}).click()

  await page.pause()

});