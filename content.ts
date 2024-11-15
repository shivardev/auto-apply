import { Storage } from "@plasmohq/storage";
import type { PlasmoCSConfig } from "plasmo"
import type { UserData } from "~popup";
import { DiceApply } from "~siteScripts/diceApplyandEmail";
import { JobDiva } from "~siteScripts/jobdiva";
const storage = new Storage({
    area: "local",
})
export const config: PlasmoCSConfig = {
    matches: ["https://www.dice.com/*", "https://www1.jobdiva.com/*", "https://www2.jobdiva.com/*"],
    all_frames: true
}
let userData: UserData
const runthis = async () => {
    await storage.get("userData").then((data) => {
        userData = data as unknown as UserData
        if (userData) {
            console.log(`Found the email ${userData.email}`)
            setTimeout(async () => {
                const url = window.location.href
                console.log(url)

                if (url.includes("dice.com")) {
                    console.log("This is Dice")
                    const dice = new DiceApply({ queueName: userData.queueName })
                    dice.runthis()
                }
                else if (url.includes("jobdiva.com")) {
                    console.log("This is JobDiva")
                    const mobDiva = new JobDiva({ emailid: userData.email, firstName: userData.firstName, LastName: userData.lastName, msgBody: userData.body, queueName: userData.queueName })
                    mobDiva.runThis()
                }
            }, 2000);
        } else {
            console.log(`Please enter the values ${userData}`)
        }
    })
}

runthis()
