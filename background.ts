import { sendData } from "~siteScripts/utils";

export { }
console.log(
    "Live now; make now always the most precious time. Now will never come again.from backgrpound"
)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(" In background");

    if (message.type === 'json_data') {
        // Forward message to popup script
        console.log("This is from background");
        console.log(message.data);
        sendData(message.data)
    }
});