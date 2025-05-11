import { Button } from '../ui/button'
import React from 'react'


function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5' >
        <img className='logo rounded-full' src='./travel-logo.avif' alt="traveli logo" />
        <div>
            <Button>Sign In </Button>
        </div>
    </div>

  )
}

export default Header