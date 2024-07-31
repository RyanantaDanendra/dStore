import DashboardLayout from "../components/DashboardLayout"
import { Link } from "@inertiajs/react";

const Sneakers = ({ sneakers, sizes }) => {

    const data = sneakers.map((sneaker) => {
        const sneakerSizes = sizes.filter(size => size.id_sneaker == sneaker.id); 

        return (
                <tr key={sneaker.id}>                
                    <td>{sneaker.id}</td>
                    <td>{sneaker.name}</td>
                    <td>{sneaker.brand}</td>
                    <td>{sneaker.condition}</td>
                    <td>
                        <ul>
                            { 
                                sneakerSizes.map(size => (
                                        <li key={size.id}>{ size.size }</li>
                                ))
                            }
                        </ul>
                    </td>
                    <td>
                    <ul>
                            { 
                                sneakerSizes.map(size => (
                                        <li key={size.id}>{ size.stock }</li>
                                ))
                            }
                    </ul>
                    </td>
                    <td className="flex justify-center gap-3">
                        <Link title="Add Size" href={`/dashboard/addsize/${sneaker.id}`}><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg></Link>
                        <Link title="Add Image"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg></Link>
                        <Link title="Delete"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 my-auto" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></Link>
                    </td>
                </tr>  
        )
    }); 

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
                                <th className="pe-4">No. </th>
                                <th className="pe-16">Name </th>
                                <th className="pe-16">Brand </th>
                                <th className="pe-16">Condition </th>
                                <th className="pe-16">Size </th>
                                <th className="pe-16">Stock </th>
                                <th className="pe-16">Action </th>
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
}
export default Sneakers