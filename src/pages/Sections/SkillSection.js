import React from "react";
import "./SkillsSection.scss";
import SkillCard from "../../components/card/SkillCard";

function SkillSection() {
  const skillsData = [
  {
    title: "Frontend Skills",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Backend Skills",
    skills: ["Node JS", "Express JS"]
  },
  {
    title: "Database Skills",
    skills: ["MySQL", "MongoDB"]
  }
];

  return (
    <div className="SkillSection">
      <div className="topPart">
        <h1>Skills & expertise</h1>
      </div>
      <div className="bottomPart center">
        <div className="skillsList ">
          {skillsData.map((item,index)=>{
            return <SkillCard key={index} title={item.title} skills={item.skills} />
          })}
        </div>
      </div>
    </div>
  );
}

export default SkillSection;
