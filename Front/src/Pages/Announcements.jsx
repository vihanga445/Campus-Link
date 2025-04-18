import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'


function Announcements() {
  return (
    <div>


        <Link to = {'/create-announcement'}>

            <Button type='button' gradientDuoTone='purpleToPink' className='w-full h-2xl transition duration-300 transform hover:scale-105'>
                create Annonouncement
            </Button>


        </Link>



    </div>
  )
}

export default Announcements