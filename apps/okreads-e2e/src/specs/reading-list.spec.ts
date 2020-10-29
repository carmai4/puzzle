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
    const itemsBeforeUndo = await $$('.reading-list-item');
    const closeReadingList = await $('h2 button.mat-icon-button');
    await closeReadingList.click();

    // add new book
    const addButton = await $('button[test-id="add-to-reading-list"][ng-reflect-disabled="false"]');
    await addButton.click();
    
    // to be able to locate snackbar element
    // otherwise, protractor stops to wait for snackbar to time out and disappear
    await browser.waitForAngularEnabled(false);

    const undoAddButton = await $('#snack-bar-button');
    // click undoAddButton
    await undoAddButton.click();

    const readingListToggle2 = $('[data-testing="toggle-reading-list"]');

    // reading list after undo
    await browser.wait(
      ExpectedConditions.presenceOf(
        readingListToggle2
      )
    );
    await readingListToggle2.click();
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    // check that the number of reading list items did not change
    // after adding a book then clicking undo
    const itemsAfterUndo = await $$('.reading-list-item');
    expect(itemsAfterUndo.length).toEqual(itemsBeforeUndo.length);
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
    const removeButton = await $('button[test-id="remove-from-reading-list"]');
    await removeButton.click();

    // to be able to locate snackbar element
    // otherwise, protractor stops to wait for snackbar to time out and disappear
    await browser.waitForAngularEnabled(false);

    const undoRemoveButton = await $('#snack-bar-button');
    // click undo
    await undoRemoveButton.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    // check that the number of reading list items did not change
    // after removing a book then clicking undo
    const itemsAfter = await $$('.reading-list-item');
    expect(itemsAfter.length).toEqual(itemsBefore.length);
  });
});
