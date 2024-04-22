import type { PlasmoCSConfig } from "plasmo"
import axios from 'axios';
import { time } from "console";

export const config: PlasmoCSConfig = {
    matches: ["https://www.dice.com/*","https://www1.jobdiva.com/*"],
    all_frames: true
}
console.log("THIS IS STILL WORKING")

setTimeout(async () => {
    const url = window.location.href
    if(url.includes('jobdiva')){
        document.querySelector("#root > div > div > div:nth-child(4) > div:nth-child(1) > button").click()
        setTimeout(() => {
        document.querySelector("#applyOptionsModal > div > div > div.modal-body > div > button:nth-child(3)").click()
        document.querySelector("#quickApplyModal > div > div > div.modal-body > div > div:nth-child(1) > input").value= "konda.shivaradhan8@gmail.com"    
        }, 1000);
    }

    // const applyButton = document.querySelector<HTMLElement>('apply-button-wc[job-id="aa2ade21-a75c-4f8d-b6e9-846405058f38"]');
    if (window.location.href.includes('application-submitted')) {
        console.log('Application success full');
        // send to msg


        closeTab()
        // chrome.tabs.create({ url: "https://example.com" });
        // window.open("https://example.com")
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
        const nextDataElement = document.getElementById('__NEXT_DATA__');

        if (nextDataElement) {
            // Get the content of the element
            const nextDataContent = nextDataElement.innerHTML;
            console.log(nextDataContent);
            // Get the current URL
            const currentUrl = window.location.href;

            // Log the URL to the console
            console.log('Current URL:', currentUrl);
            var id = get_job_id(currentUrl)
            console.log(id)
            var email = getEmail(id, nextDataElement)
            console.log(email)
            const jsonData = {
                message: JSON.stringify({ email: email, jobtitle: getJobTitle(id, nextDataElement) }),
            };
            chrome.runtime.sendMessage({ type: 'json_data', data: jsonData });
            clickInitialButton();

        } else {
            console.log('Element with id "__NEXT_DATA__" not found');
        }


        // Send message to background script
        // chrome.runtime.sendMessage({ type: 'json_data', data: jsonData });

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
        //@ts-ignore
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

function get_job_id(url: string): string {
    return url.substring(32, 32 + 36);
}

const url = 'http://localhost:5000/add_msg'
async function sendData(data) {
    console.log(" THIS IS again from function");
    // Default options are marked with *
    try {
        const response = await axios.post('http://10.0.0.57:5000/add_msg', {
            message: "This is from extension"
        });

        console.log('Response:', response.data);
        // Handle successful response here
    } catch (error) {
        console.error('Error:', error);
        // Handle error here
    }
    // return await response.json(); // parses JSON response into native JavaScript objects
}

interface EmployeeData {
    props: {
        pageProps: {
            initialState: {
                api: {
                    queries: {
                        [key: string]: {
                            data: {
                                applicationDetail: {
                                    email: string;
                                };
                                title: string;
                            };
                        };
                    };
                };
            };
        };
    };
}

function getEmail(id: string, nextDataElement: HTMLElement): string | undefined {
    const JsonId: string = `getJobById("${id}")`;
    const nextDataContent: string | undefined = nextDataElement.innerHTML;

    if (!nextDataContent) {
        console.error('Next data element is empty');
        return;
    }

    const employee_data: EmployeeData = JSON.parse(nextDataContent);

    return employee_data.props.pageProps.initialState.api.queries[JsonId]?.data?.applicationDetail?.email;
}

function getJobTitle(id: string, nextDataElement: HTMLElement): string | undefined {
    const JsonId: string = `getJobById("${id}")`;
    const nextDataContent: string | undefined = nextDataElement.innerHTML;

    if (!nextDataContent) {
        console.error('Next data element is empty');
        return;
    }

    const employee_data: EmployeeData = JSON.parse(nextDataContent);

    return employee_data.props.pageProps.initialState.api.queries[JsonId]?.data?.title;
}

function get_Name(email: string): string {
    /** Function takes the email id and gets the name by traversing each letter until a non-letter is found. */
    // Find the first index of a non-alphanumeric character (., @, or anything else)
    const delimiterIndex: number = email.split('').findIndex(char => !/[A-Za-z0-9]/.test(char));

    // Extract the name using slicing
    const name: string = delimiterIndex !== -1 ? email.slice(0, delimiterIndex) : email;

    return name;
}
