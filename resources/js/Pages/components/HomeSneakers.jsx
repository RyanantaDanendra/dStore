import '../../../css/app.css';
import { Link } from '@inertiajs/react';

const HomeSneakers = ({ images, sneakers }) => {
    const sneaker = sneakers.map(sneaker => {
        const sneakerImages = images.filter(image => image.id_sneaker == sneaker.id);

        const imageData = () => {
            const displayImage = sneakerImages.length > 0 ? sneakerImages[0].image : null;

            if(displayImage) {

                return (
                    <div key={sneaker.id} className="card w-56 h-44 mt-5">
                        <Link href={`/sneaker/details/${sneaker.id}`}>
                            <img src={`/storage/${displayImage}`} alt={displayImage} />
                        </Link>
                    </div>
                )
            } else {
                return <p>No Image yet</p>
            }
            
        }

        return (
            <>
                {imageData()}
            </>
        );
    })

    return (
            <div className="container w-full h-full mt-32 pb-12" id='homeSneakers'>
                <h1 className='homeSneakers-stroke text-5xl text-transparent text-center'>Sneakers</h1>
                <p className='text-center'>*Latest</p>
                <div className='cards mt-12 flex flex-wrap justify-center gap-10'>
                    {sneaker}
                </div>
                <Link href='/sneakers'>
                    <p className='text-end mt-16 pe-10'>More Sneakers</p>
                </Link>
            </div>
    )
}
export default HomeSneakers