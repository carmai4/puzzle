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

  it('Then: I shall be able to undo adding a book to the reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // search for 'haskell' books
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('haskell');
    await form.submit();

    // current reading list
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
    const itemsBefore = await $$('.reading-list-item');
    const closeReadingList = await $('h2 button.mat-icon-button');
    await closeReadingList.click();

    // add new book
    const addButton = await $$('button[test-id="add-to-reading-list"][ng-reflect-disabled="false"]').first();
    await addButton.click();
    
    // to be able to locate snackbar element
    // otherwise, protractor stops to wait for snackbar to time out and disappear
    await browser.waitForAngularEnabled(false);

    const undoAddButton = $('simple-snack-bar button');
    // click undoAddButton
    await undoAddButton.click();

    await readingListToggle.click();
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    // check that the number of reading list items did not change
    // after adding a book then clicking undo
    const itemsAfter = await $$('.reading-list-item');
    expect(itemsAfter.length).toEqual(itemsBefore.length);
  });

  it('Then: I shall be able to undo removing a book from the reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // current reading list
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    // reading list items before removing a book
    const itemsBefore = await $$('.reading-list-item');

    // remove a book
    const removeButton = $$('button[test-id="remove-from-reading-list"]').first();
    await removeButton.click();

    // to be able to locate snackbar element
    // otherwise, protractor stops to wait for snackbar to time out and disappear
    await browser.waitForAngularEnabled(false);

    const undoRemoveButton = $('simple-snack-bar button');
    // click undo
    await undoRemoveButton.click();

    // check that the number of reading list items did not change
    // after removing a book then clicking undo
    const itemsAfter = await $$('.reading-list-item');
    expect(itemsAfter.length).toEqual(itemsBefore.length);

    // set it back to default
    await browser.waitForAngularEnabled(true);
  });
});
