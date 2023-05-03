import {Link} from "react-router-dom";
import './Header.css'
export default function Header(){
    return(
        <div className="header">
            <h1>iitsFriiday</h1>
            <h2>where creativity is born</h2>
            <div className="navbar">
                <Link to="/albums">Click here for upcoming Releases</Link><br/>
        </div>
        </div>
    )
}