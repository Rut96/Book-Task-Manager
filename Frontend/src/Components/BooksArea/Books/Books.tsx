import { useEffect, useState } from "react";
import { BookModel } from "../../../Models/BookModel";
import { bookService } from "../../../Services/BookService";
import { BookCard } from "../BookCard/BookCard";
import { SearchBar } from "../SearchBar/SearchBar";
import "./Books.css";

export function Books(): JSX.Element {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [searchValue, setSearchValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedBooks = await bookService.getAllBooks();
                setBooks(fetchedBooks);
            } catch (err) {
                setError("Failed to load books and tags. Please try again later.");
                console.error("Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="books-loading">
            <div className="loading-spinner"></div>
        </div>;
    }

    if (error) {
        return <div className="books-error">{error}</div>;
    }



    const filteredBooks = books.filter(book => {
        if (searchValue === "") return true;
        
        switch(selectedOption) {
            case "title": 
                return book.title.toLowerCase().includes(searchValue.toLowerCase());
            case "author":
                return book.author.toLowerCase().includes(searchValue.toLowerCase());
            case "genre":
                return book.genre.toLowerCase().includes(searchValue.toLowerCase());
            case "tag":
                return book.tagName?.toLowerCase().includes(searchValue.toLowerCase());
            case "status":
                return book.statusName?.toLowerCase().includes(searchValue.toLowerCase());
            default:
                return Object.values(book).some(value => 
                    String(value).toLowerCase().includes(searchValue.toLowerCase())
                );
        }
    });

    function handleOptionSelect(option: string) {
        setSelectedOption(option);
    }

    return (
        <div className="Books">
            <div className="books-header">
                <h1>My Library</h1>
                {/* <SearchBar selectedOption={handleOptionSelect} /> */}
                <SearchBar 
                    selectedOption={handleOptionSelect} 
                    onSearch={setSearchValue}
                />
            </div>
            <div className="books-container">
                {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}