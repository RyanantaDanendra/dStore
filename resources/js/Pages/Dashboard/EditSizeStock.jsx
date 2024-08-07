import DashboardLayout from "../components/DashboardLayout"
import { useForm } from "@inertiajs/inertia-react"

const EditSizeStock = ({ id, size }) => {
    const {data, setData, post, put, processing, errors} = useForm({
        size: size.size || '',
        stock: size.stock || '',
    }); 

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('editSizeStock', {id}));
    }

    return (
        <DashboardLayout>
            <div className="container p-8">
                <h1>Edit Size and Stock</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="w-80 mt-8">
                        <li className="flex justify-between items-center">
                            <label htmlFor="size">ize</label>
                            <input type="text" name="size" id="size" value={data.size} onChange={e => setData('size', e.target.value)} />
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="stock">Stock</label>
                            <input type="text" id="stock" name="stock" value={data.stock} onChange={e => setData('stock', e.target.value)} />
                        </li>
                        <li>
                            <button type="submit">
                                {processing ? 'Editing. . .' : 'Edit' }
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </DashboardLayout>
    )
}
export default EditSizeStock