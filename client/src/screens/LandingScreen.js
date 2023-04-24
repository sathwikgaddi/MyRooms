import React from 'react'
import { Link } from 'react-router-dom'

function LandingScreen() {
  return (
    <div className='row landing justify-content-center'>
      <div className='col-md-9 my-auto text-center' >
            <h2 data-aos="fade-right" data-aos-duration="1200" style={{color:"white", fontSize: '130px'}}>MyRooms</h2>
            <h1 data-aos="fade-left" data-aos-duration="1200" style={{color:"white"}}>Welcome to the best Luxury</h1>
            <Link to = "/home">
                <button data-aos="flip-right" data-aos-duration="1200" className='btn btn-primary' style={{marginTop : '25px'}}>Get Started</button>
            </Link>
            
      </div>
    </div>
  )
}

export default LandingScreen
