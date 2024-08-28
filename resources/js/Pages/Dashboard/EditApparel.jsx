import DashboardLayout from "../components/DashboardLayout"
import { useForm } from "@inertiajs/inertia-react"

const EditApparel = ({ id, apparel }) => {
    const {data, setData, post, put, processing, errors} = useForm({
        name: apparel.name || '',
        brand: apparel.brand || '',
        condition: apparel.condition || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('editApparel', {id}))
    }

    return (
        <DashboardLayout>
            <div className="containern w-full p-8">
                <h1>Edit Apparel</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="w-80 mt-8">
                        <li className="flex justify-between items-center">
                            <label htmlFor="name">Name </label>
                            <input type="text" name="name" id="name" value={data.name} onChange={e => setData('name', e.target.value)}/>
                            {errors.name && <p>{errors.name}</p>}
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="brand">Brand </label>
                            <input type="text" brand="brand" id="brand" value={data.brand} onChange={e => setData('brand', e.target.value)}/>
                            {errors.brand && <p>{errors.brand}</p>}
                        </li>
                        <li className="flex justify-between items-center mt-3">
                            <label htmlFor="condition">Condition </label>
                            <input type="text" condition="condition" id="condition" value={data.condition} onChange={e => setData('condition', e.target.value)}/>
                            {errors.condition && <p>{errors.condition}</p>}
                        </li>
                        <li className="mt-5 flex justify-end">
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
export default EditApparel