import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        There is nothing to look at here
      </h2>
    </div>
  )
}

export default IndexPopup
