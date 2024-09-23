import Layout from "../components/Layout";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../css/app.css';
import { Link } from "@inertiajs/react";

const SneakerDetails = ({ sneaker, id, sizes, images, auth }) => {
    const sneakerImages = images.filter(image => image.id_sneaker == id);

    const size = sizes.map(size => {
        return (
            <ul>
                <li key={size.id}>Size : {size.size} Stock: {size.stock} pairs</li>
            </ul>
        );
    })

    const imageCarousel = () => {
        return (
            <Carousel 
                autoPlay
                infiniteLoop
                stopOnHover
            >
                {
                    sneakerImages.map((image, index) => (
                        <div key={index} className="mt-20">
                            <img src={`/storage/${image.image}`} alt="" className="w-28 h-28 object-cover"/>
                        </div>
                    ))
                }
            </Carousel>
        );
    }

    return (
        <Layout auth={auth}>
            <div className="container w-full h-screen flex justify-center items-center gap-12">
                <div className="images">
                    <div className="box w-64 h-64 bg-white">
                        {imageCarousel()}
                    </div>
                </div>
                <div className="details">
                    <h1><span className="font-semibold">Name: </span>{sneaker.name}</h1>
                    <h3><span className="font-semibold">Brand: </span>{sneaker.brand}</h3>
                    <h3><span className="font-semibold">Condition: </span>{sneaker.condition}</h3>
                    <h3><span className="font-semibold">Sizes available :</span> { sizes.length > 0 ? size : 'No size available' }</h3>
                    {
                        auth.user ? (
                            <button onClick={() => window.location.href = '/'} className="mt-3 px-5 py-2 secondary-color text-white">Buy Now</button>
                        ) : (
                            <button onClick={() => window.location.href = '/login'} className="mt-3 px-5 py-2 secondary-color text-white">Buy Now</button>
                        )
                    }
                </div>
            </div>
        </Layout>
    );
}

export default SneakerDetails;