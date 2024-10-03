import Layout from "./components/Layout";
import '../../css/app.css';
import SneakersPage from "./Sneakers/SneakersPage";

const Sneakers = ({ sneakers, images, searchSneaker, search }) => {
    return (
        <Layout>
            <SneakersPage sneakers={sneakers} images={images} searchSneaker={searchSneaker} search={search} />
        </Layout>
    );
}
export default Sneakers