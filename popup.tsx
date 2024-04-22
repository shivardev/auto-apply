import { useEffect, useState } from "react"
import axios from 'axios';

function IndexPopup() {
  const [data, setData] = useState("")
  const [jsonData, setJsonData] = useState<any>(null);
  async function sendData() {
    setData("Code is getting executed")
    try {
      const response = await axios.post('http://127.0.0.1:5000/add_msg', {
        message: "This is from extension"
      });
      setData("THis is inside the AXIOS")
      console.log('Response:', response.data);
      // Handle successful response here
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  }
 
 
  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        There is nothing to look at here
      </h2>
      <h3>
        {data}
      </h3>
      <button onClick={()=>sendData()}>
Click
      </button>
    </div>
  )
}

export default IndexPopup
