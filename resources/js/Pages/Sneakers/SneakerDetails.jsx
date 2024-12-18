import Layout from "../components/Layout";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../css/app.css';
import { Link } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import Swal from 'sweetalert2';

const SneakerDetails = ({ sneaker, id, sizes, images, auth, success, liked }) => {
    const sneakerImages = images.filter(image => image.id_sneaker == id);
    const sneakerId = sizes.filter(size => size.id_sneaker == id );

    const [modalOpen, setModalOpen] = useState(false);
    const [maxStock, setMaxStock] = useState(0);

    useEffect(() => {
        if(success) {
            Swal.fire({
                title: 'Success!',
                text: success,
                icon: 'success',  
                confirmButtonText: 'Cool'
            });
        }
    }, [success]);

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

    const size = sneakerId.map(size => {
        if(size.stock > 0) {
            return (
                <ul key={size.id}>
                   <li key={size.id}>Size : {size.size} Stock: {size.stock} pairs</li>
                </ul>
            );
        }
    })


    const imageCarousel = () => {
        return (
            <>       
            {
                liked  == true ? (
                            <Link href={route('like_sneaker', {id})} method="post" as="button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-8 top-52 left-1/4" viewBox="0 0 512 512"><path fill="#ff0000" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                            </Link>
                        )
                        :
                        (
                            <Link href={route('like_sneaker', {id})} method="post" as="button" className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-8 top-52 left-1/4" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                            </Link>      
                        )
            }     
                <Carousel 
                    autoPlay
                    infiniteLoop
                    stopOnHover
                >
                    {
                        sneakerImages.map((image, index) => (
                            <div key={index}>
                                <img src={`/storage/${image.image}`} alt="" className="w-full h-full object-contain"/>
                            </div>
                        ))
                    }
                </Carousel>
            </>
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
                sneakerId.map(size => (
                    size.stock > 0 ? <option value={size.id} key={size.id}>{size.size}</option> : ''
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

    const handleSubmit = (e) => {
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
                    <div className="box w-64 h-full mt-32 bg-white">
                        {imageCarousel()}
                    </div>
                </div>
                <div className="details">
                    <h1><span className="font-semibold">Name: </span>{sneaker.name}</h1>
                    <h3><span className="font-semibold">Brand: </span>{sneaker.brand}</h3>
                    <h3><span className="font-semibold">Condition: </span>{sneaker.condition}</h3>
                    <h3><span className="font-semibold">Sizes available :</span><br /> { sneakerId.length > 0 ? size : 'No size available' }</h3>
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
                        <form onSubmit={handleSubmit}>
                            <ul className="h-32 ps-4 mt-2" key={sneaker.id}>
                                <li className="flex items-center w-2/4">
                                    <label htmlFor="name">Name: </label>
                                    <p className="ms-auto">{sneaker.name}</p>
                                </li>
                                <li className="flex items-center mt-3 w-2/4">
                                    <label htmlFor="condition">Condition: </label>
                                    <p className="ms-auto">{sneaker.condition}</p>
                                </li>
                                <li className="flex items-center justify-between mt-3 w-2/4">
                                    <label htmlFor="id_size">Pick a size</label>
                                    {sizeInput}
                                    {errors.id_size && <p className="text-red-500">{errors.id_size}</p>}
                                </li>
                                <li className="flex items-center justify-between mt-3 w-2/4">
                                    <label htmlFor="quantity">Quantity</label>
                                    {quantityInput}
                                    {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                                </li>
                                {
                                    sizes.length > 0 ? (
                                        <li className=" mt-12 w-32">
                                            <button type="submit" className="secondary-color text-white px-4 py-2">Order Now!</button>
                                        </li>
                                    ) : (
                                        <li className="mt-20 w-32">
                                            <button type="submit" disabled className="bg-gray-400 text-white px-4 py-2">Order Now!</button>
                                        </li>
                                    )
                                }
                            </ul>
                        </form>
                    </Modal>
                )
            }
        </Layout>
    );
}

export default SneakerDetails;