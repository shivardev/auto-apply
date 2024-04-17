import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://www.dice.com/*"],
  all_frames: true
}
console.log("THIS IS STILL WORKING")

setTimeout(() => {
    // const applyButton = document.querySelector<HTMLElement>('apply-button-wc[job-id="aa2ade21-a75c-4f8d-b6e9-846405058f38"]');
    if (window.location.href.includes('application-submitted')) {
        console.log('Application success full');
        closeTab()


    }

    else if (window.location.href.includes('submit')) {
        console.log('Submit URL found');

        // Assuming the script is executed on the page with the 'Apply' keyword,
        // call the function to click the Next button on the new page
        clickFinalApply();
    } else if (window.location.href.includes('apply')) {
        console.log('Apply URL found');

        // Assuming the script is executed on the page with the 'Apply' keyword,
        // call the function to click the Next button on the new page
        clickNextButton();
    } else if (window.location.href.includes('job-detail')) {
        console.log('Job Detail URL found');

        // Assuming the script is executed on the initial page,
        // call the function to click the initial button
        clickInitialButton();
    }
    else {

    }


}, 3000);
function clickNextButton() {
    // Find the Next button on the new page
    const nextButton = document.querySelector<HTMLElement>("#app > div > span > div > main > div.navigation-buttons > button.btn.btn-primary.btn-next.btn-block")
    // Check if the Next button is found

    if (nextButton) {
        console.log('clicking Next');
        // Simulate a click event on the Next button
        nextButton.click();
        setTimeout(() => {
            clickFinalApply()
            setTimeout(() => {
            }, 2000);
        }, 1000);
    } else {
        console.error('Next button not found on the new page!');
    }
}

// Function to click the initial button
function clickInitialButton() {
    // Find the initial button on the original page
    const initialButton = document.querySelector<HTMLElement>("#applyButton > apply-button-wc").shadowRoot.querySelector("apply-button > div > button")

    // Check if the initial button is found
    if (initialButton) {
        // Simulate a click event on the initial button
        console.log('clicking Apply');

        initialButton.click();
    } else {
        console.error('Initial button not found!');
    }
}
function clickFinalApply() {
    const finalApply = document.querySelector<HTMLElement>("#app > div > span > div > main > div.navigation-buttons > button.btn.btn-primary.btn-next.btn-split")
    // Check if the initial button is found
    if (finalApply) {
        // Simulate a click event on the initial button
        console.log('clicking Final Apply');

        finalApply.click();
    } else {
        console.error('Initial button not found!');
    }
}
function closeTab() {
    // Close the current tab
    window.close();
}