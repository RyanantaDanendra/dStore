import Layout from "./components/Layout";
import ApparelsPage from "./components/ApparelsPage";

const Apparels = ({ apparels, images, sizes, auth, search, bests, bestImages }) => {
    return (
        <Layout auth={auth}>
            <ApparelsPage apparels={apparels} images={images} sizes={sizes} search={search} bests={bests}  bestImages={bestImages} />
        </Layout>
    )
}
export default Apparels