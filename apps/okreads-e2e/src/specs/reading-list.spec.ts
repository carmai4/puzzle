import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I shall be able to mark a book as finished', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // search for 'c++' books
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('c++');
    await form.submit();

    // add a book to reading list
    const addButton = await $$('button[test-id="add-book"][ng-reflect-disabled="false"]').first();
    await addButton.click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    const markFinishedButton = await $('.not-finished button.mat-icon-button');
    await markFinishedButton.click();

    const markedFinished = await $('.finished button.mat-icon-button');
    expect(markedFinished).toBeTruthy();

    const finishedDate = await $('span.finished-date');
    expect(finishedDate).toBeTruthy();

    await markedFinished.click();
    const notFinished = await $('.not-finished button.mat-icon-button');
    expect(notFinished).toBeTruthy();
  });
});
