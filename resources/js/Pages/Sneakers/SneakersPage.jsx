import '../../../css/app.css';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const SneakersPage = ({ sneakers, images, sneakerSearch, search, bests }) => {
    console.log(bests);

    const [query, setQuery] = useState(search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('sneakers'), {search: query});
    }

    const handleSearchChange = (e) => {
        const newValue = e.target.value;
        console.log("Current Input:", newValue); // Log current input value
        setQuery(newValue);
    }

    const bestSelling = bests.map(best => {
        const sneaker = best.sneaker;
        const sneakerImages = sneaker.image;
        const displayImage = sneakerImages.length > 0 ? sneakerImages[0] : null;

        return(
            <div key={best.id} className="card w-56 h-44 mt-8">
                <Link href={`/sneaker/details/${best.id}`}>
                    {displayImage ? (
                        <img src={`/storage/${displayImage.image}`} alt={best.name} />
                    ) : (
                        <p>No image available</p>
                    )}
                </Link>
            </div>
        );
    })

    const sneaker = sneakers.map(sneaker => {
        const sneakerImages = images.filter(image => image.id_sneaker == sneaker.id);

        const imageData = () => {
            const displayImage = sneakerImages.length > 0 ? sneakerImages[0] : null;

            if(displayImage) {
                return (
                    <div key={sneaker.id} className="card w-56 h-44 mt-8">
                        <Link href={`/sneaker/details/${sneaker.id}`}>
                            <img src={`/storage/${displayImage.image}`} alt={sneaker.name}/>
                        </Link>
                    </div>
                )
            } else {
                return <p>No Image For this Sneaker</p>
            }
        }

        return (
            <div key={sneaker.id}>
                {imageData()}
            </div>
        )
    })

    return (
        <>
            <div className="container w-full h-screen pt-32 px-8">
                <div className="best-sellers w-full h-40">
                    {bestSelling}
                </div>
                <div className='w-full flex justify-between'>
                    <form onSubmit={handleSearch}>
                        <div className='flex items-center gap-3'>
                            <input type="text" name='search' value={query} onChange={handleSearchChange} placeholder='Search for Names, Brands, Sizes' className='border-black border-2 w-80'/>
                            <button type='submit' >
                               <svg xmlns="http://www.w3.org/2000/svg" className='w-7' viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className='w-full flex flex-wrap justify-center gap-10 mt-12'>
                    {sneaker}
                </div>
            </div>
        </>
    );
}
export default SneakersPage