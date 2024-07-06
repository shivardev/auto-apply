import { sendData, type RabbitMsg } from "./utils"

export interface DiceData {
  queueName: string
}
console.log("This is Dice apply and Email")
export class DiceApply {
  data: DiceData
  constructor(parameters: DiceData) {
    this.data = {
      queueName: parameters.queueName
    };
  }
  runthis() {
    setTimeout(async () => {
      const url = window.location.href

      if (window.location.href.includes("application-submitted")) {
        console.log("Application success full")

        this.closeTab()
      } else if (window.location.href.includes("submit")) {
        console.log("Submit URL found")

        this.clickFinalApply()
      } else if (window.location.href.includes("apply")) {
        console.log("Apply URL found")
        this.clickNextButton()
      } else if (window.location.href.includes("job-detail")) {
        console.log("Job Detail URL found")
        const nextDataElement = document.getElementById("__NEXT_DATA__")
        var location = ""
        try {
          location = document.querySelector(
            "#jobdetails > div > ul > li.job-header_jobDetail__ZGjiQ.text-center.font-sans.text-sm.non-italic.font-normal.leading-5.text-dice-black-900.md\\:mr-4.md\\:ml-1.md\\:text-left.md\\:text-base.md\\:flex-nowrap"
          ).innerHTML
        } catch (error) {
          console.log("Location not found")
        }
        if (nextDataElement) {
          const nextDataContent = nextDataElement.innerHTML
          const currentUrl = window.location.href

          var id = this.get_job_id(currentUrl)
          console.log(id)
          var email = this.getEmail(id, nextDataElement)
          console.log(email)
          console.log(location)
          const message: RabbitMsg = {
            email: email,
            location: location,
            jobtitle: this.getJobTitle(id, nextDataElement),
            queueName: this.data.queueName
          }
          const jsonData = {
            message: JSON.stringify(message)
          }


          await sendData(jsonData)
          this.clickInitialButton()
        } else {
          console.log('Element with id "__NEXT_DATA__" not found')
        }

      } else {
      }
    }, 3000)
  }

  clickNextButton() {
    // Find the Next button on the new page
    const nextButton =
      document.querySelector("#app > div > span > seds-container > seds-row > seds-column > seds-column > div > main > div.navigation-buttons.btn-right > button.seds-button-primary.btn-next")

    // const nextButton = document.querySelector(
    //   "#app > div > span > div > main > div.navigation-buttons > button.btn.btn-primary.btn-next.btn-block"
    // )
    // Check if the Next button is found

    if (nextButton) {
      console.log("clicking Next")
      // Simulate a click event on the Next button
      //@ts-ignore
      nextButton.click()
      setTimeout(() => {
        this.clickFinalApply()
        setTimeout(() => { }, 2000)
      }, 1000)
    } else {
      console.error("Next button not found on the new page!")
    }
  }

  // Function to click the initial button
  clickInitialButton() {
    // Find the initial button on the original page
    const initialButton = document
      .querySelector("#applyButton > apply-button-wc")
      .shadowRoot.querySelector("apply-button > div > button")

    // Check if the initial button is found
    if (initialButton) {
      // Simulate a click event on the initial button
      console.log("clicking Apply")
      //@ts-ignore
      initialButton.click()
    } else {
      console.error("Initial button not found!")
    }
  }
  clickFinalApply() {
    const finalApply = document.querySelector("#app > div > span > seds-container > seds-row > seds-column > seds-column > div > main > div.navigation-buttons > button.seds-button-primary.btn-next")
    // Check if the initial button is found
    if (finalApply) {
      // Simulate a click event on the initial button
      console.log("clicking Final Apply")
      //@ts-ignore

      finalApply.click()
    } else {
      console.error("Submit button not found!")
    }
  }
  closeTab() {
    // Close the current tab
    window.close()
  }

  get_job_id(url) {
    return url.substring(32, 32 + 36)
  }


  getEmail(id, nextDataElement) {
    const JsonId = `getJobById("${id}")`
    const nextDataContent = nextDataElement.innerHTML

    if (!nextDataContent) {
      console.error("Next data element is empty")
      return
    }

    const employee_data = JSON.parse(nextDataContent)

    return employee_data.props.pageProps.initialState.api.queries[JsonId]?.data
      ?.applicationDetail?.email
  }

  getJobTitle(id, nextDataElement) {
    const JsonId = `getJobById("${id}")`
    const nextDataContent = nextDataElement.innerHTML

    if (!nextDataContent) {
      console.error("Next data element is empty")
      return
    }

    const employee_data = JSON.parse(nextDataContent)

    return employee_data.props.pageProps.initialState.api.queries[JsonId]?.data
      ?.title
  }

  get_Name(email) {
    /** Function takes the email id and gets the name by traversing each letter until a non-letter is found. */
    // Find the first index of a non-alphanumeric character (., @, or anything else)
    const delimiterIndex = email
      .split("")
      .findIndex(char => !/[A-Za-z0-9]/.test(char))

    // Extract the name using slicing
    const name = delimiterIndex !== -1 ? email.slice(0, delimiterIndex) : email

    return name
  }
}
