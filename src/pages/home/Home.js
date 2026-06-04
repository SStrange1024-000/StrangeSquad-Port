import React from 'react'
import './Home.scss'
// import ProfilePic from '../../components/ProfilePic/ProfilePic'
import HomeFace from '../../components/HomeFace/HomeFace'
import SkillSection from '../Sections/SkillSection';
import RecentProject from '../Sections/RecentProject'
import PnGSection from '../Sections/PnGSection'
import CallToAction from '../Sections/CallToAction'
// import { axiosClient } from '../../Utilities/axiosClient'
// import PostCard from '../../components/card/PostCard'

function Home() {
  
 
  return (
    <div className='Home'>
        <HomeFace/>
        <SkillSection/>
        <RecentProject/>
        <PnGSection/>
        <CallToAction/>
    </div>
  )
}

export default Home