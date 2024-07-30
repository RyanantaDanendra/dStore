import DashboardLayout from "../components/DashboardLayout"
import { useForm } from "@inertiajs/inertia-react"

const AddSneaker = () => {
    const {data, setData, post, processing,errors} =useForm({
        name: '',
        brand: '',
        condition: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('addSneaker'));
    }

    return (
        <>
            <DashboardLayout>
                <div className="container p-8">
                    <h1>Add Sneaker</h1>
                        <form onSubmit={handleSubmit}>
                            <ul className="w-80 mt-8">
                                <li className="flex justify-between items-center">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="ms-auto"/>
                                    {errors.name && <div>{errors.name}</div>}
                                </li>
                                <li className="flex justify-between items-center mt-3">
                                    <label htmlFor="brand">Brand</label>
                                    <input type="text" name="brand" id="brand" value={data.brand} onChange={(e) => setData('brand', e.target.value)} />
                                    {errors.brand && <div>{errors.brand}</div>}
                                </li>
                                <li className="flex justify-between items-center mt-3">
                                    <label htmlFor="condition">Condition</label>
                                    <input type="text" name="condition" id="condition" value={data.condition} onChange={(e) => setData('condition', e.target.value)} />
                                    {errors.condition && <div>{errors.condition}</div>}
                                </li>
                                <li className="flex justify-end">
                                    <button type="submit" className="mt-3" disabled={processing}>{ processing ? 'Adding. . . ' : 'Add' }</button>
                                </li>
                            </ul>
                        </form>
                </div>
            </DashboardLayout>
        </>
    )
}
export default AddSneaker