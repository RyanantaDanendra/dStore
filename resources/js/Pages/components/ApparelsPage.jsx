import { Link } from "@inertiajs/react";

const ApparelsPage = ({ apparels, images, sizes }) => {
    const apparel = apparels.map(apparel => {
        const apparelImages = images.filter(image => image.id_apparel == apparel.id );

        const imageData = () => {
            const displayImage = apparelImages.length > 0 ? apparelImages[0] : null;

            if(displayImage) {
                return (
                    <div key={apparel.id} className="card w-56 h-44 mt-8">
                        <Link href={`/apparel/details/${apparel.id}`}>
                            <img src={`/storage/${displayImage.image}`} alt={apparel.name}/>
                        </Link>
                    </div>
                )
            } else {
                return <p>No Image Yet</p>
            }
        }

        return (
            <>
                {imageData()}
            </>
        )
    })

    return (
        <div className="container w-full h-screen pt-28 px-8">
            <div className='w-full flex flex-wrap justify-center gap-10 mt-12'>
                {apparel}
            </div>
        </div>
    )
}
export default ApparelsPage