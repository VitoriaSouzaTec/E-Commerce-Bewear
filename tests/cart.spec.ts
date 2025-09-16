// tests/cart.spec.ts
// eslint-disable-next-line simple-import-sort/imports
import { test, expect } from '@playwright/test';



test('should complete the checkout process', async ({ page }) => {
  // 1. Navegar para a página de um produto (use a URL de um produto real)
  await page.goto('http://localhost:3000/product-variant/mochila-preta');

  // 2. Clicar no botão "Comprar agora"
  await page.getByRole('button', { name: 'Comprar agora' }).click();
  await page.getByRole('button', { name: 'Adicionar novo endereço' }).click();

  // 3. O Playwright te leva para a página de checkout.
  // Agora você precisa preencher os dados do formulário de pagamento
  // (Adapte os seletores para o seu formulário)
  await page.getByLabel('Nome completo').fill('João da Silva');
  await page.getByLabel('Email').fill('joao@exemplo.com');
  await page.getByLabel('Celular').fill('123456788');
  await page.getByLabel('CPF').fill('00000000000');
  await page.getByLabel('CEP').fill('12345-678');
  await page.getByLabel('Número').fill('1234');
  await page.getByLabel('Bairro').fill('popo');
  await page.getByLabel('Estado').fill('po');
  await page.getByLabel('Endereço').fill('rua tal');
  await page.getByLabel('Cidade').fill('Fort');

await page.getByRole('button', { name: 'Salvar endereço' }).click();
await page.getByRole('button', { name: 'Ir para pagamento' }).click();
await page.getByRole('button', { name: 'Ir para pagamento' }).click();

  
  // 4. Clicar no botão de finalização do pagamento
  await page.getByRole('button', { name: 'Finalizar Pagamento' }).click();

  // 5. Verificar se a página de confirmação de compra foi exibida
  await expect(page.getByText('Compra realizada com sucesso!')).toBeVisible();
});