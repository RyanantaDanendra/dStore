import Layout from "../components/Layout";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../css/app.css';
import { Link } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { useForm } from "@inertiajs/inertia-react"

const SneakerDetails = ({ sneaker, id, sizes, images, auth, success }) => {
    const sneakerImages = images.filter(image => image.id_sneaker == id);
    const sneakerId = sizes.filter(size => size.id_sneaker == id );
    const [modalOpen, setModalOpen] = useState(false);
    const [maxStock, setMaxStock] = useState(0);

    const {data, setData, post, processing, errors} = useForm({
        id_size: '',
        quantity: '',
    });

    const handleModalOpen = () => {
        setModalOpen(true);
    }
    const handleModalClose = () => {
        setModalOpen(false);
    }

    const size = sizes.map(size => {
        return (
            <ul key={size.id}>
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

    const handleSizeChange = (e) => {
        const selectedSizeId = e.target.value;
        setData('id_size', selectedSizeId);

        // FIND THE SELECTED SIZE IN THE SIZES
        const selectedSize = sizes.find(size => size.id == selectedSizeId);

        // SET MAX QUANTITY FOR ORDER
        if(selectedSize) {
            setMaxStock(selectedSize.stock);
        }
    }

    const sizeInput = sizes.length > 0 ? (
        <select name="id_size" id="size" value={data.id_size} onChange={handleSizeChange} className="ms-auto w-52">    
        <option value="" disabled>Select a Size</option>        
            {
                sizes.map(size => (
                    <option value={size.id} key={size.id}>{size.size}</option>
                ))
            }
        </select>
    ) : (
        <option disabled>No Size Available</option>
    );

    const quantityInput = sizes.length > 0 ? (
            <input type="number" max={maxStock} min={1}  name="quantity" id="quantity" value={data.quantity} onChange={e => setData('quantity', e.target.value)} className="ms-auto" />    
        ) : (
            <p>-</p>
        );

    const handlesubmit = (e) => {
        e.preventDefault();
        post(route('orderSneaker', {id}));
    }

    const successMessage = () => {
        if(success) {
            window.alert(success);
        }
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
                            <button onClick={handleModalOpen} className="mt-3 px-5 py-2 secondary-color text-white">Buy Now</button>
                        ) : (
                            <button onClick={() => window.location.href = '/login'} className="mt-3 px-5 py-2 secondary-color text-white">Buy Now</button>
                        )
                    }
                </div>
            </div>

            {
                modalOpen && (
                    <Modal show={modalOpen} onClose={handleModalClose}>
                        <h1 className="text-center mt-3">Order Details</h1>
                        <form onSubmit={handlesubmit}>
                            <ul className="h-32 ps-4 mt-2" key={sneaker.id}>
                                <li className="flex items-center w-2/4">
                                    <label htmlFor="name">Name: </label>
                                    <p className="ms-auto">{sneaker.name}</p>
                                </li>
                                <li className="flex items-center mt-3 w-2/4">
                                    <label htmlFor="condition">Condition: </label>
                                    <p className="ms-auto">{sneaker.condition}</p>
                                </li>
                                <li className="flex items-center mt-3 w-2/4">
                                    <label htmlFor="id_size">Pick a size</label>
                                    {sizeInput}
                                    {errors.id_size && <p className="text-red-500">{errors.id_size}</p>}
                                </li>
                                <li className="flex items-center mt-3 w-2/4">
                                    <label htmlFor="quantity">Quantity</label>
                                    {quantityInput}
                                    {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                                </li>
                                <li className=" mt-3 w-32">
                                    <button type="submit" className="secondary-color text-white px-4 py-2">Order Now!</button>
                                </li>
                            </ul>
                        </form>
                    </Modal>
                )
            }
        </Layout>
    );
}

export default SneakerDetails;