const { expect, browser, $ } = require('@wdio/globals');

describe('Create a pastebin post', () => {
  it('should create a new paste with specific attributes', async () => {
    // Open the pastebin website
    await browser.url('https://pastebin.com/');
    // Enter the code
    const text =
      'git config --global user.name  "New Sheriff in Town"\ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force';
    await $('#postform-text').setValue(text);
    // Enter the paste name
    const pasteName = 'how to gain dominance among developers';
    await $('#postform-name').setValue(pasteName);
    // Click on the paste expiration dropdown
    await $('#select2-postform-expiration-container').click();
    // Select the option for 10 Minutes expiration
    await $('.select2-results__option[id*="10M"]').click();
    // Click on Syntax highlight
    await $('#select2-postform-format-container').click();
    // Press the down arrow key to navigate to the Bash option
    await browser.keys('ArrowDown');
    // Press Enter to select the Bash option
    await browser.keys('Enter');
    // Click the button to create the paste
    await $('.form-btn-container button').click();

    await $('div.info-top > h1').waitForDisplayed();
    const pageTitle = await $('div.info-top > h1').getText();
    // Checking page Title
    await expect(pageTitle).toBe(pasteName);

    await $('div.left > a.btn.-small.h_800').waitForDisplayed();
    const syntax = await $('div.left > a.btn.-small.h_800').getText();
    // Checking correct syntax
    await expect(syntax).toBe('Bash');

    const firstLine = 'git config --global user.name  "New Sheriff in Town"';
    const secondLine = 'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")';
    const thirdLine = 'git push origin master --force';

    await $('div.highlighted-code > div.source.bash').waitForDisplayed();

    const syntaxOne = await $('div.source.bash > ol > li:nth-child(1)').getText();
    // Checking line 1
    await expect(syntaxOne).toBe(firstLine);

    const syntaxTwo = await $('div.source.bash > ol > li:nth-child(2)').getText();
    // Checking line 2
    await expect(syntaxTwo).toBe(secondLine);

    const syntaxThree = await $('div.source.bash > ol > li:nth-child(3)').getText();
    // Checking line 3
    await expect(syntaxThree).toBe(thirdLine);
  });
});
