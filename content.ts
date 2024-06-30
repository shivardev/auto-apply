import type { PlasmoCSConfig } from "plasmo"
import { dicceApply } from "~siteScripts/diceApplyandEmail";

export const config: PlasmoCSConfig = {
    matches: ["https://www.dice.com/*", "https://www1.jobdiva.com/*"],
    all_frames: true
}
console.log("THIS IS STILL WORKING")

setTimeout(async () => {
    const url = window.location.href
    if(url.includes("dice.com")){
        console.log("This is Dice")
        dicceApply()
    }
    console.log('check')

}, 3000);

