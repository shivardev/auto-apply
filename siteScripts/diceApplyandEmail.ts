

console.log("This is Dice apply and Email")
export function dicceApply(){
setTimeout(async () => {

  const url = window.location.href

  // const applyButton = document.querySelector<HTMLElement>('apply-button-wc[job-id="aa2ade21-a75c-4f8d-b6e9-846405058f38"]');
  if (window.location.href.includes("application-submitted")) {
    console.log("Application success full")

    closeTab()
  } else if (window.location.href.includes("submit")) {
    console.log("Submit URL found")

    clickFinalApply()
  } else if (window.location.href.includes("apply")) {
    console.log("Apply URL found")
    clickNextButton()
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

      var id = get_job_id(currentUrl)
      console.log(id)
      var email = getEmail(id, nextDataElement)
      console.log(email)
      console.log(location)

      const jsonData = {
        message: JSON.stringify({
          email: email,
          location: location,
          jobtitle: getJobTitle(id, nextDataElement)
        })
      }


        await sendData(jsonData)
      clickInitialButton()
    } else {
      console.log('Element with id "__NEXT_DATA__" not found')
    }

  } else {
  }
}, 3000)
function clickNextButton() {
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
      clickFinalApply()
      setTimeout(() => {}, 2000)
    }, 1000)
  } else {
    console.error("Next button not found on the new page!")
  }
}

// Function to click the initial button
function clickInitialButton() {
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
function clickFinalApply() {
  const finalApply =document.querySelector("#app > div > span > seds-container > seds-row > seds-column > seds-column > div > main > div.navigation-buttons > button.seds-button-primary.btn-next")
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
function closeTab() {
  // Close the current tab
  window.close()
}

function get_job_id(url) {
  return url.substring(32, 32 + 36)
}

const url = "http://localhost:5000/add_msg"

function getEmail(id, nextDataElement) {
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

function getJobTitle(id, nextDataElement) {
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

function get_Name(email) {
  /** Function takes the email id and gets the name by traversing each letter until a non-letter is found. */
  // Find the first index of a non-alphanumeric character (., @, or anything else)
  const delimiterIndex = email
    .split("")
    .findIndex(char => !/[A-Za-z0-9]/.test(char))

  // Extract the name using slicing
  const name = delimiterIndex !== -1 ? email.slice(0, delimiterIndex) : email

  return name
}


async function sendData(data) {
    try {
   
        fetch('http://127.0.0.1:5000/add_msg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Handle successful response
            console.log('Response:', data);
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
        // Handle successful response here
    } catch (error) {
        console.error('Error:', error);
        // Handle error here
    }
}
}