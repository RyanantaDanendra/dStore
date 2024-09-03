import DashboardLayout from "../components/DashboardLayout";
import { useForm } from "@inertiajs/inertia-react";

const EditApparelSizeStock = ({ size, id }) => {
    const {data, setData, post, put, processing, errors} = useForm({
        size: size.size || '',
        stock: size.stock || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('editApparelSizeStock', {id}))
    }

    return (
        <DashboardLayout>
            <div className="container p-8 ms-56">
                <h1>Edit Apparel Size and Stock</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="w-80 mt-8">
                        <li className="flex justify-between items-center">
                            <label htmlFor="size">Size </label>
                            <input type="text" name="size" id="size" value={data.size} onChange={e => setData('size', e.target.value)}/>
                            {errors.size && <p>{buildErrorMessage.size}</p>}
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="stock">Stock </label>
                            <input type="text" name="stock" id="stock" value={data.stock} onChange={e => setData('stock', e.target.value)}/>
                            {errors.stock && <p>{buildErrorMessage.stock}</p>}
                        </li>
                        <li className="mt-3">
                            <button type="submit">{processing ? 'Editing. . .' : 'Edit'}</button>
                        </li>
                    </ul>
                </form>
            </div>
        </DashboardLayout>
    )
}
export default EditApparelSizeStock;