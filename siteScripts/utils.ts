export interface RabbitMsg {
    email: string,
    location: string,
    jobtitle: string
    queueName: string
}

export async function sendData(data) {
    try {
      
        console.log("Sending data to server",data)
        fetch('https://rabbit.blazingbane.com/add_msg', {
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