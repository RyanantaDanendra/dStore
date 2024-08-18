import DashboardLayout from "../components/DashboardLayout"
import { useForm } from "@inertiajs/react";

const AddApparel = () => {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        brand: '',
        condition: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('addApparel'));
    }

    return (
        <DashboardLayout>
            <div className="conteiner w-full p-8">
                <h1>Add Apparel</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="w-80 mt-8">
                        <li className="flex justify-between items-center">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p>{errors.name}</p>}
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" id="brand" value={data.brand} onChange={(e) => setData('brand', e.target.value)} />
                            {errors.brand && <p>{errors.brand}</p>}
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="condition">Condition</label>
                            <input type="text" name="condition" id="condition" value={data.condition} onChange={(e) => setData('condition', e.target.value)} />
                            {errors.condition && <p>{errors.condition}</p>}
                        </li>
                        <li className="flex justify-end">
                            <button type="submit" className="mt-3" disabled={processing} >{processing ? 'Ading. . . ' : 'Add'}</button>
                        </li>
                    </ul>
                </form>
            </div>
        </DashboardLayout>
    );
}
export default AddApparel