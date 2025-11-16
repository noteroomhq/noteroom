import { Link } from "react-router-dom";
import "../assets/css/navbar.css"
export default function NavBar() {
    return (
        <div className="nav">
            <Link to={"/"}>index</Link>
            <Link to={"/feed"}>feed</Link>
        </div>
    )
}