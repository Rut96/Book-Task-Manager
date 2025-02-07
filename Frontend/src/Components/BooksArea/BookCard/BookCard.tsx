// import { BookModel } from "../../../Models/BookModel";
// import { Book, BookOpen, Bookmark, Pencil, Trash } from "lucide-react";
// import "./BookCard.css";
// import bookDividerImg from "../../../Assets/Images/book-divider.png";


// type BookCardProps = {
//     book: BookModel;
// }

// export function BookCard({ book }: BookCardProps): JSX.Element {
//     const getStatusIcon = () => {
//         switch (book.statusId) {
//             case 1: return <Book className="status-icon" />;
//             case 2: return <BookOpen className="status-icon" />;
//             case 3: return <Bookmark className="status-icon" />;
//             default: return <Book className="status-icon" />;
//         }
//     };

//     return (
//         // <div className="book-card">
//         //     {book.image &&
//         //         <img
//         //             src={book.imageName}
//         //             alt={`Cover of ${book.title}`}
//         //             className="book-image"
//         //         />
//         //     }

//         //     <div className="book-content">
//         //         <div className="book-main">
//         //             <div className="book-header">
//         //                 <div className="book-title-author">
//         //                     <h3 className="book-title">{book.title}</h3>
//         //                     <p className="book-author">by {book.author}</p>
//         //                 </div>

//         //                 <div className="book-status" title={book.statusName}>
//         //                     {getStatusIcon()}
//         //                     <span className="status-tooltip">{book.statusName}</span>
//         //                 </div>
//         //             </div>

//         //             <div className="book-tags">
//         //                 <span className="tag genre">{book.genre}</span>
//         //                 {book.tagName && <span className="tag custom">#{book.tagName}</span>}
//         //             </div>
//         //         </div>

//         //         {book.notes && <p className="book-notes">{book.notes}</p>}
//         //     </div>
//         // </div>


//         <div className="BookCard">
//             {book.image &&
//                 <div className="two-pages">
//                     <img
//                         src={book.imageName}
//                         alt={`Cover of ${book.title}`}
//                         className="book-image"
//                     />
//                 </div>
//             }

//             <div className="one-page">
//                 <div className="book-content">
//                     <div className="book-header">
//                         <div className="book-status" title={book.statusName}>
//         //                     {getStatusIcon()}
//         //                     <span className="status-tooltip">{book.statusName}</span>
//         //                 </div>
//                         <div className="book-title-author">
//                             <h3 className="book-title">{book.title}</h3>
//                             <p className="book-author">by {book.author}</p>
//                         </div>
//                         <div className="book-divider">
//                             <img src={bookDividerImg} alt="------------------" />
//                         </div>
//                         <div className="under-divider-content">
//                             <div className="ubder-divider-left">
//                                 <div className="book-tag">{book.tagName}</div>
//                             </div>
//                             <div className="inder-divider-right">
//                                 <Pencil />
//                                 <Trash />
//                             </div>
//                         </div>
//                         <div className="book-notes">
//                             {book.notes}
//                         </div>
//                         <div className="book-footer book-genre">
//                             {book.genre}
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }




import { Book, BookOpen, Bookmark, Pencil, Trash } from "lucide-react";
import { BookModel } from "../../../Models/BookModel";
import "./BookCard.css";
import bookDividerImg from "../../../Assets/Images/book-divider.png";

interface BookCardProps {
    book: BookModel;
}

export function BookCard({ book }: BookCardProps): JSX.Element {
    const getStatusIcon = () => {
        switch (book.statusId) {
            case 1: return <Book className="status-icon" />;
            case 2: return <BookOpen className="status-icon" />;
            case 3: return <Bookmark className="status-icon" />;
            default: return <Book className="status-icon" />;
        }
    };

    return (
        <div className="BookCard">
            {book.image ? (
                <div className="two-pages">
                    <img
                        src={book.imageName}
                        alt={`Cover of ${book.title}`}
                        className="book-image"
                    />
                </div>
            ) : (
                <div className="one-page">
                    <div className="book-content">
                        <div className="book-header">
                            <div className="book-status" title={book.statusName}>
                                {getStatusIcon()}
                                <span className="status-tooltip">{book.statusName}</span>
                            </div>
                            <div className="book-title-author">
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-author">by {book.author}</p>
                            </div>
                            <div className="book-divider">
                                {/* <img src={bookDividerImg} alt="divider" /> */}
                                <div className="under-divider-content">
                                    <div className="under-divider-left">
                                        <div className="book-tag">{book.tagName}</div>
                                    </div>
                                    <div className="under-divider-right">
                                        <Pencil size={20} />
                                        <Trash size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className="book-notes">
                                {book.notes}
                            </div>
                            <div className="book-footer book-genre">
                                {book.genre}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}