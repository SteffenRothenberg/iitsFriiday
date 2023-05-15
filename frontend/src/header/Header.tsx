import {Link, NavLink, useNavigate} from "react-router-dom";
import './Header.css'
import {Button} from "@mui/material";
import {useState} from "react";

type Props = {
    onLogout: () => Promise<void>;
};

export default function Header(props: Props){
    const [,setIsLoading] = useState(false)
    const navigate = useNavigate();

    function handleLogout() {
        setIsLoading(true);
        props
            .onLogout()
            .then(() => {
                navigate("/login");
            })
    }

    return(
        <div className="header">
            <h1>iitsFriiday</h1>
            <h2>where creativity is born</h2>
            <div className="navbar">
                <section className="navElement"><Link to="/albums">Click here for upcoming Releases &larr;</Link></section>
                <section className="navElement"><NavLink to="/albums/add">&rarr;create album </NavLink></section>
                <Button onClick={handleLogout}>LogOut</Button>
        </div>
        </div>
    )
}