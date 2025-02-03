import { NavLink } from "react-router-dom";
import "./Menu.css";
import { Home, Book } from "lucide-react";

export function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <header className="menu-header">
                <div className="logo">
                    <p>Root</p>
                    <p>&</p>
                    <p>Read</p>
                </div>
            </header>
            
            <nav className="menu-shelves">
                <NavLink to="/home" className="shelf-link">
                    <div className="shelf-content">
                        <Home size={20} /> Home
                    </div>
                </NavLink>
                
                <NavLink to="/books" className="shelf-link">
                    <div className="shelf-content">
                        <Book size={20} />Books
                    </div>
                </NavLink>
                
            </nav>
        </div>
    );
}