import React from "react"
import "./css/pic.css"
const Pic = ({ img, uniqueID, check }) => {
  return (
    <div>
      <img
        className="card-img"
        src={img}
        alt="pic"
        onClick={() => check(uniqueID)}
      />
      {uniqueID}
    </div>
  )
}

export default Pic
