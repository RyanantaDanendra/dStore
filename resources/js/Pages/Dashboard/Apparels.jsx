import { Inertia } from '@inertiajs/inertia';
import DashboardLayout from "../components/DashboardLayout";
import { Link } from '@inertiajs/react';

const Apparels = ({ auth, apparels, sizes, images }) => {
    const data = apparels.map((apparel) => {
        const apparelSizes = sizes.filter(size => size.id == apparel.id);
        const apparelImages = images.filter(image => image.id == apparel.id);

        return (
            <>
                <tr className="border-b-2 border-b-gray-400" key={apparel.id}>
                    <td className="w-12 text-center">{apparel.id}</td>
                    <td className="w-32 text-center">{apparel.name}</td>
                    <td className="w-32 text-center">{apparel.brand}</td>
                    <td className="w-32 text-center">{apparel.condition}</td>
                </tr>
            </>
        );
    });

    if(auth.user.as == 'admin') {
        return (
            <DashboardLayout>
                <div className="container p-8">
                    <div className="flex justify-between">
                        <h1>Apparels table</h1>
                        <Link href='' title="Add Apparel"><svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg></Link>
                    </div>
                    <table>
                        <thead>
                            <tr className="border-b-black border-b-2 border-opacity-30">
                                <th className="w-12 text-center">No. </th>
                                <th className="w-32 text-center">Name </th>
                                <th className="w-32 text-center">Brand </th>
                                <th className="w-32 text-center">Condition </th>
                                <th className="w-32 text-center">SIze </th>
                                <th className="w-32 text-center">Stock </th>
                                <th className="w-32 text-center">Images </th>
                                <th className="w-32 text-center">Action </th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </DashboardLayout>
        );
    } else {
        return <p>Sorry, you are not an admin</p>
    }
}
export default Apparels