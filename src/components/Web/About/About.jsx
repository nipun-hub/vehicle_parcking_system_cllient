import React from 'react'

const About = () => {
    return (
        <div className='flex justify-center text-center py-10' id='about'>
            <div className='w-fit flex flex-col gap-5 items-center align-middle'>
                <h3 className='text-2xl font-bold'>Reviewed by People</h3>
                <h1 className='text-5xl font-bold'>Client's Testimonials</h1>
                <p className='text-gray-400 text-center w-4/5'>
                    Discover the positive impact we've made on the our clients by reading through their testimonials.
                    Our clients have experienced our service and results, and they're eager to share their positive experiences with you.
                </p>
            </div>
        </div>
    )
}

export default About
