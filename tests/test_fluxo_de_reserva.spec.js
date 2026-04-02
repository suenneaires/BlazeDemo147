// Importações / Bibliotecas / Frameworks

import { test, expect } from '@playwright/test';

// Função ou método
test('Fluxo de Reserva - Cenario Positivo', async ({ page }) => {
  // Abre o navegador na URL
  await page.goto('https://www.blazedemo.com/');
  // Seleciona a origem como São Paolo
  await page.locator('select[name="fromPort"]').selectOption('São Paolo');
  // Seleciona o destino como London
  await page.locator('select[name="toPort"]').selectOption('London');
  // Clicar no botao Find Flights
  // await page.locator('.btn.btn-primary').click(); // exemplo de alternativa para o click
  await page.getByRole('button', { name: 'Find Flights' }).click();

  // Mudar de página
  // Verificação do texto esperado
  await expect(page.getByRole('heading')).toContainText('Flights from São Paolo to London:');
  
  // Selecionou um vôo
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
  
  // Muda de página
  // Preenchimento de campos no formulário
  await page.getByRole('textbox', { name: 'Name', exact: true }).click();        // clica no campo Nome
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Jose');  // preenche o nome
  await page.locator('#cardType').selectOption('amex');                        // seleciona a bandeira do cartão
  await page.getByRole('checkbox', { name: 'Remember me' }).check();  // Seleciona o check box

  // Muda de página

  await page.getByRole('button', { name: 'Purchase Flight' }).click();  // clica no botão Purchase Flight
  // Verifica o texto de agradecimento
  await page.getByRole('heading', { name: 'Thank you for your purchase' }).click();
  await expect(page.getByRole('heading')).toContainText('Thank you for your purchase today!');
  // Verifica o preço (de forma grosseira)
  await page.getByRole('cell', { name: 'USD' }).click();
  await expect(page.locator('tbody')).toContainText('555 USD');
});