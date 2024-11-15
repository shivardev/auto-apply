export interface RabbitMsg {
    email: string,
    location: string,
    jobtitle: string
    queueName: string
}
const rabbitHandlerURL = "https://rabbit.blazingbane.com/add_msg"
// const testURL = "https://f51a-184-174-157-69.ngrok-free.app/add_msg"
export async function sendData(data: { message: string }) {
    try {
        console.log("Sending data to server", data);

        const response = await fetch(rabbitHandlerURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
          
            // If response status is not OK (i.e., not in the range 200-299), throw an error
            const errorData = await response.json(); // Optional: Parse the response body if needed
            chrome.runtime.sendMessage({ name: "ping", body: { error:errorData.error } }, (response) => {
                console.log(response);
              });
            throw new Error(JSON.stringify(errorData));
        }

        const responseData = await response.json();
        // Handle successful response
        console.log('Response:', responseData);

    } catch (error) {
        // Handle both network errors and HTTP errors here
        console.error('Error:', error);
        throw error; // Re-throw the error to be caught by the outer try-catch
    }
}
