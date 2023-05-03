import {Link, NavLink} from "react-router-dom";
import './Header.css'
export default function Header(){
    return(
        <div className="header">
            <h1>iitsFriiday</h1>
            <h2>where creativity is born</h2>
            <div className="navbar">
                <section className="navElement"><Link to="/albums">Click here for upcoming Releases &larr;</Link></section>
                <section className="navElement"><NavLink to="/albums/add">&rarr;create album </NavLink></section>
        </div>
        </div>
    )
}