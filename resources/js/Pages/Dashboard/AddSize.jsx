import DashboardLayout from "../components/DashboardLayout"
import { useForm } from "@inertiajs/inertia-react"

const AddSize = ({id}) => {
    const {data, setData, post, processing,errors} = useForm({
        size: '',
        stock: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('addSize', {id}));
    }

    return (
        <>
            <DashboardLayout>
                <div className="container w-full p-8">
                    <h1>Add Size</h1>
                    <form onSubmit={handleSubmit}>
                        <ul className="w-80 mt-8">
                            <li className="flex justify-between items-center">
                                <label htmlFor="size">Size</label>
                                <input type="text" name="size" id="size" value={data.size} onChange={(e) => setData('size', e.target.value)} />
                                {errors.size && <div>{errors.size}</div>}
                            </li>
                            <li className="flex justify-between items-center mt-3">
                                <label htmlFor="stock">Stock</label>
                                <input type="text" name="stock" id="stock" value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
                                {errors.stock && <div>{errors.stock}</div>}
                            </li>
                            <li className="flex justify-end mt-3">
                                <button type="submit" disabled={processing}>{processing ? 'Adding. . . ' : 'Add'}</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </DashboardLayout>
        </>
    )
}
export default AddSize