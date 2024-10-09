import Layout from "./components/Layout";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/app.css';
import { Link } from "react-router-dom";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";

const ApparelDetails = ({ apparel,images, sizes, id, auth }) => {
    // FILTER THE IMAGES DATA FROM THE BACKEND
    const apparelImages = images.filter(image => image.id_apparel == apparel.id);
    // FILTER THE SIZES DATA FROM THE BACKEND
    const apparelSizes = sizes.filter(size => size.id_apparel == apparel.id);

    // HANDLE MODAL TOGGLE VARIABLE
    const [modalOpen, setModalOpen] = useState(false);
    const [maxStock, setMaxStock] = useState(0);

    // FORM VARIABLE
    const {data, setData, post, processing, errors} = useForm({
        id_size: '',
        quantity: '',
    })

    const imageData = () => {
        if(apparelImages.length > 0) {
            return (
                <Carousel 
                autoPlay
                infiniteLoop
                stopOnHover
                >
                    {
                        apparelImages.map((image, index) => (
                            <div key={index} className="mt-28">
                                <img src={`/storage/${image.image}`} alt="" className="w-28 h-48 object-cover"/>
                            </div>
                        ))
                    }
                </Carousel>
            )
        }
    }

    const size = apparelSizes.map(size => {
        return (
            <ul key={size.id}>
                 <li key={size.id}>Size : {size.size} Stock: {size.stock} pairs</li>
            </ul>
        )
    });

    // MODAL FUNCTIONS
    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    // FORM SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orderApparel', {id}))
    }

    // HANDLE SIZE INPUT
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
        <option disabled className="ms-auto">No Size Available</option>
    );

    // HANDLE QUANTITY INPUT
    const quantityInput = sizes.length > 0 ? (
        <input type="number" max={maxStock} min={1}  name="quantity" id="quantity" value={data.quantity} onChange={e => setData('quantity', e.target.value)} className="ms-auto" />    
    ) : (
        <p className="ms-auto">-</p>
    );

    const modal = () => {
            return (
                    <Modal show={modalOpen} onClose={handleModalClose}>
                        <h1 className="text-center mt-3">Order Details</h1>
                        <form onSubmit={handleSubmit}>
                            <ul className="h-32 ps-4 mt-2" key={apparel.id}>
                                <li className="flex items-center w-2/4">
                                    <label htmlFor="name">Name: </label>
                                    <p className="ms-auto">{apparel.name}</p>
                                </li>
                                <li className="flex items-center mt-3 w-2/4">
                                    <label htmlFor="condition">Condition: </label>
                                    <p className="ms-auto">{apparel.condition}</p>
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
                                <li className=" mt-12 w-32">
                                    <button type="submit" className="secondary-color text-white px-4 py-2">Order Now!</button>
                                </li>
                            </ul>
                        </form>
                    </Modal>
            );
    }

    return (
        <Layout>
            <div className="container w-full h-screen flex justify-center items-center">
                <div className="images">
                    <div className="box w-64 h-full bg-white">
                        {imageData()}
                    </div>
                </div>
                <div className="details ms-8">
                    <h1><span className="font-semibold">Name: </span>{apparel.name}</h1>
                    <h1><span className="font-semibold">Brand: </span>{apparel.brand}</h1>
                    <h1><span className="font-semibold">Condition: </span>{apparel.condition}</h1>
                    <h3><span className="font-semibold">Sizes available :</span><br /> { apparelSizes.length > 0 ? size : <p className="text-red-400">No size available</p> }</h3>
                    {
                        auth.user ? (
                            <button onClick={handleModalOpen} className="mt-3 px-5 py-2 secondary-color text-white">Order Now</button>
                        )
                        : (
                            <button onClick={() => window.location.href = '/login'} className="mt-3 px-5 py-2 secondary-color text-white">Order Now</button>
                        )
                    }
                    {modal()}
                </div>
            </div>
        </Layout>

    )
}
export default ApparelDetails