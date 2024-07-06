interface jobDivaData {
    firstName: string,
    LastName: string,
    emailid: string
    msgBody: string
    queueName: string
}
export class JobDiva {
    data: jobDivaData
    constructor(parameters: jobDivaData) {
        this.data = {
            emailid: parameters.emailid,
            msgBody: parameters.msgBody,
            firstName: parameters.firstName,
            LastName: parameters.LastName,
            queueName: parameters.queueName
        };
    }
    updateInputValue(input:HTMLElement, newValue:string) {
        if (!input) return; // Exit if element is not found

        // Get the native property descriptor for the value property
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
        ).set;
        nativeInputValueSetter.call(input, newValue);

        // Dispatch the input event
        const event = new Event("input", { bubbles: true });
        input.dispatchEvent(event);
    }
    updateTextField(selector, newValue) {
        const element = document.querySelector(selector);
        if (!element) return;  // Exit if element is not found

        // Check if the element is an input or textarea and get the appropriate property descriptor
        const propName = element.tagName === 'TEXTAREA' ? 'HTMLTextAreaElement' : 'HTMLInputElement';
        const nativeValueSetter = Object.getOwnPropertyDescriptor(window[propName].prototype, 'value').set;
        nativeValueSetter.call(element, newValue);

        // Dispatch the input event
        const event = new Event('input', { bubbles: true });
        element.dispatchEvent(event);
    }
    runThis(){
        setTimeout(() => {
            console.log("working");
            (document
                .querySelector(
                    "#root > div > div > div:nth-child(4) > div:nth-child(1) > button"
                ) as HTMLElement)
                .click();
            setTimeout(() => {
                (document
                    .querySelector(
                        "#applyOptionsModal > div > div > div.modal-body > div > button:nth-child(3)"
                    ) as HTMLElement)
                    .click();
    
                setTimeout(() => {
                    let firstNameField =
                    document.querySelector(
                   "#quickApplyModal > div > div > div:nth-child(1) > div.modal-body-main > div > div > div:nth-child(4) > div > div.job-app-main > div > div:nth-child(1) > div > input") as HTMLElement
                    let msgField =
                        "#quickApplyModal > div > div > div.modal-body > div > div:nth-child(3) > textarea";
                    let lastNameField = document.querySelector("#quickApplyModal > div > div > div:nth-child(1) > div.modal-body-main > div > div > div:nth-child(4) > div > div.job-app-main > div > div:nth-child(2) > div > input") as HTMLElement
                    let emailField = document.querySelector("#quickApplyModal > div > div > div:nth-child(1) > div.modal-body-main > div > div > div:nth-child(4) > div > div.job-app-main > div > div:nth-child(3) > div > input") as HTMLElement
                    this.updateInputValue(firstNameField, this.data.firstName);
                    this.updateInputValue(lastNameField, this.data.LastName);
                    this.updateInputValue(emailField, this.data.emailid);
                    this.updateTextField(
                        msgField,
                        this.data.msgBody
                    );
                }, 1000);
            }, 1000);
        }, 1000);
    }
    // Usage for multiple inputs
   
      
}
