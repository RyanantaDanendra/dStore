import '../../../css/app.css'

function Navbar() {
    return (
        <>
            <nav className="h-24 bg-blue-300 flex justify-between px-3 items-center">
                <h1 className="text-3xl">D'Store</h1>
                <div className="links flex gap-5">
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Products</a>
                </div>
            </nav>
        </>
    );
}
export default Navbar;