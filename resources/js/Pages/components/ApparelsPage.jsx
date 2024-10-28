import React from "react";
import "../../../css/app.css";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Link } from "@inertiajs/react";

const ApparelsPage = ({
    apparels,
    images,
    sizes,
    search,
    bests,
    bestImages,
}) => {
    const [query, setQuery] = useState(search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get("apparels", { search: query });
    };

    const handleSearchChange = (e) => {
        const newValue = e.target.value;
        setQuery(newValue);
    };

    const bestSelling = bests.map((best) => {
        console.log(best.id_apparel);
        const displayImage = bestImages.length > 0 ? bestImages[0] : null;

        if (displayImage) {
            return (
                <div key={best.id_apparel} className="card w-56 h-full">
                    <Link href={`/apparel/details/${best.id_apparel}`}>
                        <img
                            src={`/storage/${displayImage.image}`}
                            alt={best.name}
                        />
                    </Link>
                </div>
            );
        } else {
            return (
                <div key={best.id_apparel} className="card w-56 h-44 mt-8">
                    <p>No image available for {best.id_apparel}</p>
                </div>
            );
        }
    });

    const apparel = apparels.map((apparel) => {
        const imageData = () => {
            const apparelImages = images.filter(
                (image) => image.id_apparel == apparel.id
            );
            const displayImage =
                apparelImages.length > 0 ? apparelImages[0] : null;

            if (apparelImages.length > 0) {
                return (
                    <div key={apparel.id} className="card w-56 h-44 mt-8">
                        <Link href={`/apparel/details/${apparel.id}`}>
                            <img
                                src={`/storage/${displayImage.image}`}
                                alt={apparel.name}
                            />
                        </Link>
                    </div>
                );
            } else {
                return <p>No Image Yet</p>;
            }
        };

        return <div key={apparel.id}>{imageData()}</div>;
    });

    return (
        <>
            <div className="container w-full h-screen pt-28 px-8">
                <h1 className="text-center text-4xl">Best Sellers</h1>
                <div className="best-sellers w-full h-56 flex justify-center gap-10">
                    {bestSelling}
                </div>
                <form onSubmit={handleSearch}>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            name="search"
                            onChange={handleSearchChange}
                            placeholder="Search for Names, Brands, Sizes"
                            className="border-black border-2 w-80"
                        />
                        <button type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7"
                                viewBox="0 0 512 512"
                            >
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                        </button>
                    </div>
                </form>
                {apparels.length > 0 ? (
                    <div className="w-full flex flex-wrap justify-center gap-10 mt-12">
                        {apparel}
                    </div>
                ) : (
                    <p className="text-2xl text-gray-400 text-center mt-12">
                        No Apparel Yet!
                    </p>
                )}
            </div>
        </>
    );
};
export default ApparelsPage;
