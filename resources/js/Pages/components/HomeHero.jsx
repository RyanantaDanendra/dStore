import '../../../css/app.css';
import  homeHeroImage  from '../../../../public/assets/homeHero-image.png';
import curveLine from '../../../../public/assets/curveLine.png'

const HomeHero = () => {
    return (
        <>
            <div className="container w-full h-full flex pt-24">
                <div id="homeHero-text" className="w-1/2 mt-32 ms-16">
                    <h1 className="text-5xl ms-18"><span className='homeHero-stroke text-transparent'>Find your perfect</span> <br />look at unbeatable price!</h1>
                    <div id="homeHero-buttons" className=' mt-8 flex gap-6 text-white'>
                        <button className='py-5 px-6 secondary-color text-sm'>Sneakers</button>
                        <button className='py-5 px-6 secondary-color text-sm'>Apparels</button>
                        <button className='py-5 px-6 secondary-color text-sm'>Brands</button>
                    </div>
                </div>
                <div id="homeHero-image" className='w-1/2 mt-9'>
                    <img src={ curveLine } alt="" className='curveLine absolute right-0' />
                    <img src={ homeHeroImage } alt="homeHeroImage" id='personImage'/>
                </div>
            </div>
        </>
    )
}
export default HomeHero