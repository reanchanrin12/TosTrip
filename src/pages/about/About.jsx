import React from 'react'
import AboutBanner from '../../components/layouts/banner/AboutBanner'
import AboutContent from '../../components/layouts/banner/AboutContent'
import AboutMentor from '../../components/layouts/banner/AboutMentor'
import AboutTeamMember from '../../components/layouts/banner/AboutTeamMember'
import ContactForm from '../../components/layouts/banner/ContactForm'


const About = () => {
  return (
    <main>
      <AboutBanner />
      <AboutContent/>
      <AboutMentor/>
      <AboutTeamMember/>
      <ContactForm/>
    </main>
  )
}

export default About
