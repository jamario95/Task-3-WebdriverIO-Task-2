const { expect, browser, $ } = require('@wdio/globals');

describe('Create a pastebin post', () => {
  it('should create a new paste with specific attributes', async () => {
    // Open the pastebin website
    await browser.url('https://pastebin.com/');

    // Enter the code
    const text = 'git reset $(git commit-tree HEAD^{tree} -m "Legacy code" \ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force '
    await $('#postform-text').setValue();

    // Enter the paste name
    await $('#postform-name').setValue('helloweb');

    // Click on the paste expiration dropdown
    await $('#select2-postform-expiration-container').click();

    // Select the option for 10 Minutes expiration
    await $('.select2-results__option[id*="10M"]').click();

    // Click the button to create the paste
    await $('.form-btn-container button').click();
  });
});

