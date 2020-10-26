import { $, $$, browser, ExpectedConditions, Key } from 'protractor';

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

    await input.sendKeys('ja');
    // search term is 'ja'

    const jaItems = await $$('[data-testing="book-item"]');
    expect(jaItems.length).toBeGreaterThan(1);

    await input.sendKeys('v');
    // search term is now 'jav'
    const javItems = await $$('[data-testing="book-item"]');
    expect(javItems.length).toBeGreaterThan(1);

    // results have been updated accordingly
    expect(jaItems === javItems).toEqual(false);

    await input.sendKeys('as');
    // search term is now 'javas'
    const javasItems = await $$('[data-testing="book-item"]');
    expect(javasItems.length).toBeGreaterThan(1);

    await input.sendKeys('cript');
    // search term is now 'javascript'
    const javascriptItems = await $$('[data-testing="book-item"]');
    expect(javascriptItems.length).toBeGreaterThan(1);

    await input.sendKeys(Key.BACK_SPACE);
    await input.sendKeys(Key.BACK_SPACE);
    // search term is now 'javascri'
    const javascriItems = await $$('[data-testing="book-item"]');
    expect(javascriItems.length).toBeGreaterThan(1);

    await input.sendKeys(Key.BACK_SPACE);
    await input.sendKeys(Key.BACK_SPACE);
    // search term is now 'javasc'
    await input.sendKeys(Key.BACK_SPACE);
    const javascItems = await $$('[data-testing="book-item"]');
    expect(javascItems.length).toBeGreaterThan(1);
    // search term is now 'javas'
    const javasItems2 = await $$('[data-testing="book-item"]');
    expect(javasItems2.length).toBeGreaterThan(1);

    await input.sendKeys(Key.BACK_SPACE);
    // search term is now 'java'
    const javaItems = await $$('[data-testing="book-item"]');
    expect(javaItems.length).toBeGreaterThan(1);
    expect(javaItems === javascriItems).toEqual(false);
  });
});
