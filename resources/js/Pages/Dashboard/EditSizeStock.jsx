import DashboardLayout from "../components/DashboardLayout"
import { useForm } from "@inertiajs/inertia-react"

const EditSizeStock = ({ id, size }) => {
    const {data, setData, post, put, processing, errors} = useForm({
        size: size.size || '',
        stock: size.stock || '',
    }); 

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('editSizeStock'));
    }

    return (
        <DashboardLayout>
            <div className="container p-8">
                <h1>Edit Size and Stock</h1>
            </div>
        </DashboardLayout>
    )
}
export default EditSizeStock