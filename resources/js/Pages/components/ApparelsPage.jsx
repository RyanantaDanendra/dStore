import React from "react";
import { Link } from "@inertiajs/react";
import '../../../css/app.css';

const ApparelsPage = ({ apparels, images, sizes }) => {
    const apparel = apparels.map(apparel => {
        
        const imageData = () => {
            const apparelImages = images.filter(image => image.id_apparel == apparel.id );
            const displayImage = apparelImages.length > 0 ? apparelImages[0] : null;
           
            if(apparelImages.length > 0) {
                return (
                    <div key={apparel.id} className="card w-56 h-44 mt-8">
                        <Link href={`/apparel/details/${apparel.id}`}>
                            <img src={`/storage/${displayImage.image}`} alt={apparel.name}/>
                        </Link>
                    </div>
                );
            } else {
                return <p>No Image Yet</p>
            }
        }

        return (
            <div key={apparel.id}>
                {imageData()}
            </div>
        )
    })
    
    return (
        <>        
            <div className="container w-full h-screen pt-28 px-8">
                {
                    apparels.length > 0 ?
                        (
                                <div className='w-full flex flex-wrap justify-center gap-10 mt-12'>
                                    {apparel}
                                </div>
                        ) : (
                            <p className="text-2xl text-gray-400">No Apparel Yet!</p>
                        )
                }
            </div>
        </>
    )

}
export default ApparelsPage