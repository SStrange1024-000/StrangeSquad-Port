import React from 'react'
import './ProfilePic.scss'
import Profilepic from '../../assets/P1.png'

function ProfilePic({src}) {
  return (
    <div className="ProfilePic center">
        <img src={src ? src : Profilepic} alt="Img" className='profile'/>
    </div>
  )
}

export default ProfilePic