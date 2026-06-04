import React from 'react'
import ProfilePic from '../ProfilePic/ProfilePic'
import './Card.scss'

function Card(props) {
  return (
    <div className="Card">
        <div className="imgContainer">
            <ProfilePic/>
        </div>
        <div className="descContainer">
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
        </div>
    </div>
  )
}

export default Card