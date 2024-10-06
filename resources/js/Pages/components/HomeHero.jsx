import '../../../css/app.css';
import  homeHeroImage  from '../../../../public/assets/homehero2.jpg';

const HomeHero = () => {
    return (
        <>
            <div className="container w-full h-screen flex pt-20">
                <div id="homeHero-text" className="w-1/2 mt-32 ms-16">
                    <h1 className="text-5xl ms-18">Find Your Perfect Look at Unbeatable Prices!</h1>
                    <h2 className='text-lg font-light mt-2 pe-44'>Elevate Your Style with the Hottest Sneakers and Apparel.</h2>
                    <div id="homeHero-buttons" className=' mt-8 flex gap-6 text-white'>
                        <button className='py-5 px-6 secondary-color text-sm'>Sneakers</button>
                        <button className='py-5 px-6 secondary-color text-sm'>Apparels</button>
                        <button className='py-5 px-6 secondary-color text-sm'>Brands</button>
                    </div>
                </div>
                <div id="homeHero-image" className='w-1/2 h-screen'>
                    <img src={ homeHeroImage } alt="homeHeroImage" id='personImage'/>
                </div>
            </div>
        </>
    )
}
export default HomeHero