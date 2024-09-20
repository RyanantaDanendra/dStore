import '../../../css/app.css';
import axios from 'axios';
import { Link } from '@inertiajs/react';

const HomeSneakers = ({ images, sneakers }) => {
    const sneaker = sneakers.map(sneaker => {
        const sneakerImages = images.filter(image => image.id_sneaker == sneaker.id);

        const imageData = () => {
            const displayImage = sneakerImages.length > 0 ? sneakerImages[0].image : null;

            if(displayImage) {

                return (
                    <div className="card w-56 h-44">
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
            <div className="cards h-screen">
                {imageData()}
            </div>
        );
    })

    return (
        <>
            <div className="container w-full h-full mt-32" id='homeSneakers'>
                <h1 className='homeSneakers-stroke text-5xl text-transparent text-center'>Sneakers</h1>
                <div className="cards w-full h-full flex flex-wrap gap-16 px-5 justify-center mt-12">
                    {sneaker}
                </div>
            </div>
        </>
    )
}
export default HomeSneakers