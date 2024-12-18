import Layout from "./Layout";
import "../../../css/app.css";
import AddApparelImages from "../Dashboard/AddApparelImages";
import { Link } from "@inertiajs/react";

const HomeApparels = ({ apparels, images }) => {
    const apparel = apparels.map((apparel) => {
        // FILTER THE IMAGE DATA BASED ON THE APPAREL ID
        const apparelImages = images.filter(
            (image) => image.id_apparel == apparel.id
        );

        const imageData = () => {
            // FETCH THE FIRST APPAREL IMAGE DATA
            const displayImage =
                apparelImages.length > 0 ? apparelImages[0] : null;

            if (displayImage !== null) {
                return (
                    <div className="card w-56 h-44">
                        <Link>
                            <img
                                src={`/storage/${displayImage.image}`}
                                alt={apparel.name}
                            />
                        </Link>
                    </div>
                );
            } else {
                return <p className="text-4xl text-center">No Image Yet</p>;
            }
        };

        return <>{imageData()}</>;
    });

    return (
        <div id="HomeApparels" className="container w-full pb-12">
            <h1 className="homeSneakers-stroke text-5xl text-transparent text-center">
                Apparels
            </h1>
            <div className="cards mt-12 flex justify-center gap-10">
                {apparels.length > 0 ? apparel : <p> No Apparel Yet </p>}
            </div>
            <Link href="/apparels">
                <p className="text-end mt-32 pe-10 text-blue-400 hover:underline">
                    More Apparels
                </p>
            </Link>
        </div>
    );
};
export default HomeApparels;
