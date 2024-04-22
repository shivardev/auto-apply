import axios from "axios";
export { }

console.log(
    "Live now; make now always the most precious time. Now will never come again.from backgrpound"
)
async function sendData(data) {
    try {
        // const response = await axios.post('http://127.0.0.1:5000/add_msg', {
        //     message: "This is from extension from background"
        // });
        // console.log('Response:', response.data);
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
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(" In background");

    if (message.type === 'json_data') {
        // Forward message to popup script
        console.log("This is from background");
        console.log(message.data);
        sendData(message.data)
    }
});