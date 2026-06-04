import React from 'react'
import './SkillCard.scss'

function SkillCard({title,skills}) {
  return (
    <div className="Skillcard">
        <div className="cardCont">
            <h1>{title}</h1>
            <ul className="skills">
                {skills.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })}
            </ul>
        </div>
    </div>
  )
}

export default SkillCard