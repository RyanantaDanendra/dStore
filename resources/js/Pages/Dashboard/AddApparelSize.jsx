import DashboardLayout from "../components/DashboardLayout";
import { useForm } from "@inertiajs/inertia-react";

const AddApparelSize = ({id}) => {
    const {data, setData, post, processing, errors} = useForm({
        size: '',
        stock: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('addApparelSize', {id}));
    }

    return (
        <DashboardLayout>
            <div className="container w-full p-8 ms-56">
                <h1>Add Apparel Size and Stock</h1>

                <form onSubmit={handleSubmit}>
                    <ul className="w-80 mt-8">
                        <li className="flex justify-between items-center">
                            <label htmlFor="size">Size </label>
                            <input type="text" name="size" id="size" value={data.size} onChange={(e) => setData('size', e.target.value)} />
                            {errors.size && <p>{errors.size}</p>}
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="stock">Stock </label>
                            <input type="text" name="stock" id="stock" value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
                            {errors.stock && <p>{errors.stock}</p>}
                        </li>
                        <li className="flex justify-end mt-3">
                                <button type="submit" disabled={processing}>{processing ? 'Adding. . . ' : 'Add'}</button>
                        </li>
                    </ul>
                </form>
            </div>
        </DashboardLayout>
    );
}
export default AddApparelSize
