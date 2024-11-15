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
  const [isvaid, setIsVaid] = useState(false);
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
    setIsVaid(validateSubmit());
  };
  const storeUserData = () => {
    storage.set("userData", formData)
  }
  const validateSubmit = () => {
    console.log(formData);
    if (formData.email == "" || formData.body == "" || formData.firstName == "" || formData.lastName == "" || formData.queueName == "") {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  }
  return (
    <div>
      <label>Email: </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <label>Body:</label>
      <input
        type="text"
        name="body"
        value={formData.body}
        onChange={handleChange}
        placeholder="Message Body"
      />
      <label>firstName:</label>

      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <label>LastName:</label>

      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <label>RabbitQ Name:</label>
      <input
        type="text"
        name="queueName"
        value={formData.queueName}
        onChange={handleChange}
        placeholder="queueName"
      />
      <p style={{ color: "red" }}>{isvaid}</p>
      <button onClick={() => storeUserData()} disabled={!isvaid}>Submit</button>
    </div>
  )
}

export default IndexPopup
