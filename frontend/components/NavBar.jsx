import React from "react";
import { useState } from "react";
import { Link, NavLink} from "react-router-dom";
import "../styles/index.css"
import "./NavBar.css"
import { useAdmin } from '../features/auth/AdminContext';
import logo from "../assets/CCSsvg.svg";

export default function NavBar(){
    const { isAdmin } = useAdmin()
    const [menuOpen, setMenuOpen] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    return (
        <nav className="flex justify-between items-center bg-[#96211b]">
            <div className="flex items-center gap-2 font-bold text-md">
                <img src={logo} alt="Logo" className="h-10 aspect-square object-cover rounded-full" />
                <Link className="text-[#e6982c] title" to="/"> CCS ND</Link>
            </div>
            <button
                type="button"
                className={menuOpen ? "menu open" : "menu"}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/"> Home</NavLink>
                </li>
                <li>
                    <NavLink to="/gallery">Gallery</NavLink>
                </li>
                <li>
                    <NavLink to="/calendar">Events</NavLink>
                </li>
                <li>
                    <NavLink to="/wecap">WeCaps</NavLink>
                </li>
                <li>
                    <NavLink to="/join">Join Now</NavLink>
                </li>
                <li>
                    <NavLink to="/board">Board</NavLink>
                </li>
                <li>
                    <NavLink to="/developers">Devs</NavLink>
                </li>
                {isAdmin ? <li><NavLink to="/admin">Admin</NavLink></li> : <li><a href={`${apiUrl}/auth/google`}>Login</a></li> }
            </ul>
        </nav>  
    )
}

//have login link direct to the google OAuth login
