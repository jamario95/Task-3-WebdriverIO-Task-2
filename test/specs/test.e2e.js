const { expect, browser, $ } = require('@wdio/globals');

describe('Create a pastebin post', () => {
  it('should create a new paste with specific attributes', async () => {
    // Open the pastebin website
    await browser.url('https://pastebin.com/');
    // Enter the code
    const text =
      ' git config --global user.name  "New Sheriff in Town"\ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force';
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
    // await browser.pause(10000);
    // Click the button to create the paste
    await $('.form-btn-container button').click();
  });

  it('should match the paste name', async () => {
    const pasteName = 'how to gain dominance among developers';
    await browser.url('https://pastebin.com/QLdG1VNg');
    await $('div.info-top > h1').waitForDisplayed();
    const pageTitle = await $('div.info-top > h1').getText();
    // Use WebdriverIO's built-in assertion method
    await expect(pageTitle).toBe(pasteName);
  });

  it('should syntax be suspended for bash', async () => {
    await browser.url('https://pastebin.com/QLdG1VNg');
    await $('div.left > a.btn.-small.h_800').waitForDisplayed();
    const syntax = await $('div.left > a.btn.-small.h_800').getText();

    await expect(syntax).toBe('Bash');
  });

  it('should have correct code', async () => {
    const firstLine = 'git config --global user.name  "New Sheriff in Town"';
    const secondLine = 'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")';
    const thirdLine = 'git push origin master --force';

    await browser.url('https://pastebin.com/QLdG1VNg');
    await $('div.highlighted-code > div.source.bash').waitForDisplayed();

    const syntaxOne = await $('div.source.bash > ol > li:nth-child(1)').getText();
    await expect(syntaxOne).toBe(firstLine);

    const syntaxTwo = await $('div.source.bash > ol > li:nth-child(2)').getText();
    await expect(syntaxTwo).toBe(secondLine);

    const syntaxThree = await $('div.source.bash > ol > li:nth-child(3)').getText();
    await expect(syntaxThree).toBe(thirdLine);
  });
});
