import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../PagesArea/Home/Home";
import { Page404 } from "../Page404/Page404";
import "./Routing.css";
import { Books } from "../../BooksArea/Books/Books";

export function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="/home" element={<Home />} />

                <Route path="/books" element={<Books />} />
                
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
