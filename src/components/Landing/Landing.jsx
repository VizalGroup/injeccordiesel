import React from 'react'
import Slider from '../Slider/Slider'
import MainLanding from '../MainLanding/MainLanding'
import Banner from '../Banner/Banner'

export default function Landing() {
  return (
    <div>
        <div style={{marginTop: "80px"}}></div>
        <Slider />
        <MainLanding/>
        <Banner/>
        <div style={{marginBottom: "10vh"}}></div>
    </div>
  )
}
