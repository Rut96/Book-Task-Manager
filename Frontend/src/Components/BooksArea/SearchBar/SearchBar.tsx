import { Search } from "lucide-react";
import "./SearchBar.css";

interface SearchBarProps {
    selectedOption: (option: string) => void;
    onSearch: (value: string) => void;
}

export function SearchBar(props: SearchBarProps): JSX.Element {
    return (
        <div className="SearchBar">
            <div className="search-group">
                <select
                    defaultValue="All"
                    className="search-select"
                    onChange={(e) => props.selectedOption(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                    <option value="tag">Tag</option>
                    <option value="status">Reading Status</option>
                </select>
                <input
                    placeholder="Search"
                    type="search"
                    className="search-input"
                    onChange={(e) => props.onSearch(e.target.value)}
                />
                <Search className="search-icon" />
            </div>
        </div>
    );
}