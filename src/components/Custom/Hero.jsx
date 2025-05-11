import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1 className='font-extrabold text-[50px] text-center mt-16'>
                <span className='text-[rgb(128,62,233)]'>Plan Your Perfect Trip with Ease
                </span>
                </h1><p className='text-xl text-gray-500 text-center'>

                    Discover destinations, build custom itineraries, and get smart AI-powered travel suggestions— all in one place.
                </p>
                <h4>Your next adventure starts here.</h4>
            
            <Link to={'/create-trip'} >

                <Button> Get Started </Button>
            </Link>
        </div>
    )
}

export default Hero