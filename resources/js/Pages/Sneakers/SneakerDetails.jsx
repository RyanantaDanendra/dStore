import Layout from "../components/Layout";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../css/app.css';

const SneakerDetails = ({ sneaker, id, sizes, images }) => {
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
                    images.map((image, index) => (
                        <div key={index} className="mt-20">
                            <img src={`/storage/${image.image}`} alt="" className="w-28 h-28 object-cover"/>
                        </div>
                    ))
                }
            </Carousel>
        );
    }

    return (
        <Layout>
            <div className="container w-full h-screen flex justify-center items-center gap-12">
                <div className="images">
                    <div className="box w-64 h-64 bg-white">
                        {imageCarousel()}
                    </div>
                </div>
                <div className="details">
                    <h1>{sneaker.name}</h1>
                    <h3>{sneaker.brand}</h3>
                    <h3>{sneaker.condition}</h3>
                    <h3>Sizes available : { sizes.length > 0 ? size : 'No size available' }</h3>
                </div>
            </div>
        </Layout>
    );
}

export default SneakerDetails;