import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"
const storage = new Storage({
  area: "local",
})
export interface UserData {
  email: string;
  body: string;
  firstName: string;
  lastName: string;
  queueName: string;
}
import axios from 'axios';

function IndexPopup() {
  // Initialize state with an object
  const [formData, setFormData] = useState<UserData>({
    email: "",
    body: "",
    firstName: "",
    lastName: "",
    queueName: ""
  });
  useEffect(() => {
    storage.get("userData").then((userdata) => {
      console.log(userdata);
      // Update state with retrieved userdata, preserving previous values
      setFormData((prevState) => ({
        ...prevState,
        //@ts-ignore
        ...userdata
      }));
    });
  }, []);
  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const storeUserData = () => {
    storage.set("userData", formData)
  }
  return (
    <div>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email"
    />
    <input
      type="text"
      name="body"
      value={formData.body}
      onChange={handleChange}
      placeholder="Message Body"
    />
    <input
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      placeholder="First Name"
    />
    <input
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      placeholder="Last Name"
    />
     <input
      type="text"
      name="queueName"
      value={formData.queueName}
      onChange={handleChange}
      placeholder="queueName"
    />
    <button onClick={() => storeUserData()}>Submit</button>
  </div>
  )
}

export default IndexPopup
