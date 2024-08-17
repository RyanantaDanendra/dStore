import { Inertia } from '@inertiajs/inertia';
import DashboardLayout from "../components/DashboardLayout"
import { Link } from "@inertiajs/react";

const Sneakers = ({ sneakers, sizes, images, auth}) => {
    const data = sneakers.map((sneaker) => {
        const sneakerSizes = sizes.filter(size => size.id_sneaker == sneaker.id); 
        const sneakerImages = images.filter(image => image.id_sneaker == sneaker.id);

        const handleDelete = (id) => {
            if(window.confirm("Are you sure you want to delete this data?")) {                
                Inertia.delete(route('deleteSneaker', {id}), {
                    onSuccess: () => {
                        alert('Sneaker deleted successfully');
                    },
                    onError: () => {
                        alert('Failed to delete sneaker');
                    }
                })
            }
        }

        const handleSizeStockDelete = (id) => {
            if(window.confirm("Are you sure you want to delete this sneaker size and stock?")) {
                Inertia.delete(route('deleteSizeStock', {id}), {
                    onSuccess: () => {
                        alert('Sneaker deleted successfully');
                    },
                    onError: () => {
                        alert('Failed to delete sneaker');
                    }
                });
            }
        }

        const handleImageDelete = (id) => {
            if(window.confirm('Are you sure you wan to delete this sneaker image?')) {
                Inertia.delete(route('deleteImage', {id}), {
                    onSuccess: () => {
                        alert('Sneaker image deleted successfully');
                    },
                    onError: () => {
                        alert('Failed to delete sneaker image');
                    }
                });
            }
        }

        const imageData = () => {
            if(sneakerImages !== null) {
                return sneakerImages.map(image => (
                    <li key={image.id} className="flex flex-col items-center justify-center pb-2">
                        <img src={`/storage/${image.image}`} alt={image.image} className='object-cover' />
                        <button title="Delete Image" type='submit' onClick={() => handleImageDelete(image.id)}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                    </li>
                )) 
            } else {
                return <p>No image yet</p>
            }
        }

        return ( 
                <tr className='border-b-2 border-b-gray-400' key={sneaker.id}>                
                    <td className="w-12 text-center">{sneaker.id}</td>
                    <td className="w-32  text-center">{sneaker.name}</td>
                    <td className="w-32 text-center">{sneaker.brand}</td>
                    <td className="w-32 text-center">{sneaker.condition}</td>
                    <td className="w-32 text-center">
                        <ul>
                            { 
                                sneakerSizes.map(size => (
                                        <li key={size.id} className="flex justify-center items-center gap-5">
                                            { size.size }
                                            <Link title="Edit" href={`/dashboard/sneakers/sizestock/${size.id}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg></Link>
                                            <button title="Delete Size and Stock" type='submit' onClick={() => handleSizeStockDelete(sneaker.id)}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                                        </li>
                                ))
                            }
                        </ul>
                    </td>
                    <td className="w-32 text-center">
                    <ul>
                            { 
                                sneakerSizes.map(size => (
                                        <li key={size.id} className="flex justify-center gap-5 items-center">
                                            { size.stock }
                                            <Link title="Edit" href={`/dashboard/sneakers/sizestock/${size.id}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg></Link>
                                            <button title="Delete Size and Stock" type='submit' onClick={() => handleSizeStockDelete(sneaker.id)}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                                        </li>
                                ))
                            }
                    </ul>
                    </td>
                    <td className="max-w-32 text-center">
                        <ul>
                            {imageData()}
                        </ul>
                    </td>
                    <td className="flex justify-center items-center gap-3 py-12 w-32 h-full">
                        <Link title="Add Size" href={`/dashboard/addsize/${sneaker.id}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg></Link>
                        <Link title="Add Image" href={`/dashboard/addimages/${sneaker.id}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg></Link>
                        <Link title="Edit" href={`/dashboard/sneakers/editsneaker/${sneaker.id}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg></Link>
                        <button title="Delete Sneaker" type="dubmit" onClick={() => handleDelete(sneaker.id)}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                    </td>
                </tr>  
        )
    }); 

    if(auth.user.as == 'admin') {
        return (
            <>
                <DashboardLayout>
                    <div className="container w-full p-8">
                        <div className="flex justify-between">
                            <h1>Sneakers Table</h1>
                            <Link href='/dashboard/addsneaker' title="Add Sneaker"><svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg></Link>
                        </div>
                        <table>
                            <thead>
                                <tr className="border-b-black border-b-2 border-opacity-30">
                                    <th className="w-12 text-center">No. </th>
                                    <th className="w-32 text-center">Name </th>
                                    <th className="w-32 text-center">Brand </th>
                                    <th className="w-32 text-center">Condition </th>
                                    <th className="w-32 text-center">Size </th>
                                    <th className="w-32 text-center">Stock </th>
                                    <th className="w-32 text-center">Images </th>
                                    <th className="w-32 text-center">Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                { data }
                            </tbody>
                        </table>
                    </div>
                </DashboardLayout>
            </>
        )
    } else {
        return <p>Sorry, you are not an admin!</p>
    }
}
export default Sneakers