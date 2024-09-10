import DashboardLayout from "../components/DashboardLayout"
import { useForm } from "@inertiajs/react";

const AddApparelImages = ({ id }) => {
    const {data, setData, post, processing, errors} = useForm({
       image: null, 
       _method: 'POST',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', data.image);

        post(route('addApparelImages', {id}), formData, {
            forceFormData: true,
        });
    }

    return  (
        <DashboardLayout>
            <div className="container w-full p-8 ms-56">
                <h1>Add Apparel Images</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="mt-8">
                        <li>
                            <label htmlFor="image">Image</label>
                            <input type="file" id="image" name="image" onChange={e => setData('image', e.target.files[0])} />
                            {errors.image && <p className="text-red-500">{errors.image}</p>}
                        </li>
                        <li className="mt-3">
                            <button type="submit" disabled={processing}>
                                {processing ? 'Adding. . .' : 'Add'}
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </DashboardLayout>
    );
}
export default AddApparelImages