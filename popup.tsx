import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"
 
const storage = new Storage()

import axios from 'axios';

function IndexPopup() {
  const [data, setData] = useState("")
  const [email, setEmail] = useState("")
  const [body, setBody] = useState("")
  return (
    <div
      style={{
        padding: 16
      }}>
     <input type="email" placeholder="Enter your email" onChange={(e) => setData(e.target.value)} />
     <textarea name="" onChange={(e) => setBody(e.target.value)} placeholder="Enter your message"></textarea>
     <button onClick={() => {
       
       // Handle successful response here
     }}>Submit</button>
     <div>
      <h3>active scritps</h3>
      <ul>
        <li>
          dice Apply
        </li>
      </ul>
     </div>
    </div>
  )
}

export default IndexPopup
