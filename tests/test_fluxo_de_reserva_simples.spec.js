// Bibliotecas
import { test, expect } from '@playwright/test'

// Funções ou Métodos (função tem retorno, método não)
test('Fluxo de Reserva - Script Simples', async ({ page }) => {
    // Abrir o navegador
    await page.goto('https://www.blazedemo.com')
    // Seleciona a cidade de origem e de destino do vôo, e clica no botão Find Flights
    await page.locator('select[name="fromPort"]').selectOption('São Paolo')
    await page.locator('select[name="toPort"]').selectOption('London')
    await page.locator ('.btn.btn-primary').click()

    // Transição da Página
    // Verificar se estamos na página certa baseado em um texto ancora
    await expect(page.locator('h3')).toHaveText('Flights from São Paolo to London:')
    // Selecionar o vôo desejado
    // await page.locator('.btn-small').click() // Clicar no primeiro botão
    await page.getByRole('row', { name: 'Choose This Flight 234 United Airlines'}).getByRole('button').click()
    // Transição de Página
    // Verificar se estamos na página certa baseado em parte da URL
    await expect(page).toHaveURL(/purchase\.php/)
    // Preencher a caixa de texto cujo id é inputName com o texto Suenne
    await page.locator('#inputName').fill('Suenne')
    // Selecionar a bandeira como Amex
    await page.locator('#cardType').selectOption('amex')
    // Marcar o check box Remember Me
    await page. locator('#rememberMe').check()
    // Clique no botão Purchase
    await page.locator('.btn-primary').click()

    // Transição de Página
    // Verificar se estamos na página certa baseado em parte da URL
    await expect(page).toHaveURL(/confirmation\.php/)
    // Verificar a mensagem de agradecimento e o preço
    await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!')
    await expect(page.getByRole('row', { name: 'Amount 555 USD' })).toBeVisible()

})
