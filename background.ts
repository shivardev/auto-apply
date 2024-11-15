import { sendData } from "~siteScripts/utils";
import logoUrl from "raw:~/assets/icon.png";
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
    if (message.name === "ping") {
        console.log("Error becuase of Queue Name is not found");
        chrome.notifications.create({
          type: 'basic',
          iconUrl: "../../icon.754ef436.png", // Replace with your icon URL
          title: 'Extension Error',
          message: JSON.stringify(message.body.error)  + " Contact Developer for help.",
          priority: 2
        });
        sendResponse({ message: "Hello from popup" });
      }
});
