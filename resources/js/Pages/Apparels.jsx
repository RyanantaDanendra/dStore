import Layout from "./components/Layout";
import ApparelsPage from "./components/ApparelsPage";

const Apparels = ({ apparels, images, sizes }) => {
    return (
        <Layout>
            <ApparelsPage apparels={apparels} images={images} sizes={sizes} />
        </Layout>
    )
}
export default Apparels