import Layout from "./components/Layout";
import ApparelsPage from "./components/ApparelsPage";

const Apparels = ({ apparels, images, sizes, auth }) => {
    return (
        <Layout auth={auth}>
            <ApparelsPage apparels={apparels} images={images} sizes={sizes} />
        </Layout>
    )
}
export default Apparels