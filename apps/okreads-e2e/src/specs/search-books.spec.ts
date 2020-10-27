import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  it('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const input = await $('input[type="search"]');

    await input.sendKeys('j');
    // search term is 'j'

    const items1 = await $$('[data-testing="book-item"]');
    expect(items1.length).toBeGreaterThan(1);

    await input.sendKeys('a');
    // search term is now 'ja'
    const items2 = await $$('[data-testing="book-item"]');
    expect(items2.length).toBeGreaterThan(1);

    await input.sendKeys('v');
    // search term is now 'jav'
    const items3 = await $$('[data-testing="book-item"]');
    expect(items3.length).toBeGreaterThan(1);

    await input.sendKeys('a');
    // search term is now 'java'
    const items4 = await $$('[data-testing="book-item"]');
    expect(items4.length).toBeGreaterThan(1);
  });
});
