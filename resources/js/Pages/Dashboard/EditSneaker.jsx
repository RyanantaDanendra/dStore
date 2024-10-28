import DashboardLayout from "../components/DashboardLayout"
import { useForm } from "@inertiajs/inertia-react"

const EditSneaker = ({id, sneaker}) => {
    const {data, setData, post, put, processing, errors} = useForm({
        name: sneaker.name || '',
        brand: sneaker.brand || '',
        condition: sneaker.condition || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('editSneaker', {id}));
    }

    return (
        <DashboardLayout>
            <div className="container p-8 ms-56">
                <h1>Edit Sneaker</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="w-80 mt-8">
                        <li className="flex justify-between items-center">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" id="brand" value={data.brand} onChange={e => setData('brand', e.target.value)} />
                            {errors.brand && <p className="text-red-500">{errors.brand}</p>}
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="condition">Condtiion</label>
                            <input type="text" name="condition" id="condition" value={data.condition} onChange={e => setData('condition', e.target.value)} />
                            {errors.condition && <p className="text-red-500">{errors.condition}</p>}
                        </li>
                        <li>
                            <button type="submit">
                                {processing ? 'Editing. . .' : 'Edit'}
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </DashboardLayout>
    )
}
export default EditSneaker