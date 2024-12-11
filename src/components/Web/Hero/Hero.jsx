import React from 'react'
import carImg from '../../../assets/web/images/hero/main-car.png'
import carBg from '../../../assets/web/images/hero/hero-bg.png'
const Hero = () => {
    return (
        <div id='home'>
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <img src={carBg} className='hidden lg:flex absolute top-0 right-0 -z-50' />
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <span className='text-3xl font-medium'>Plan your safety now</span>
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl">
                            Save
                            <span className="dark:text-violet-600 text-blue-500"> money </span>
                            with our park
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 text-gray-500"></p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start text-white">
                            <button className='px-8 py-3 text-lg font-semibold rounded bg-blue-400'>Book Ride</button>
                            <button className='px-8 py-3 text-lg font-semibold rounded bg-black'>Park</button>
                        </div>
                    </div>
                    <div className=" hidden lg:flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img src={carImg} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
