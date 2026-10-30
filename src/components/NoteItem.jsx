import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';

function NoteItem({id, title, body, createdAt}){
    const { language } = useLanguage();

    return (
        <article className="note-item">
            <h3>
                <Link to={`/notes/${id}`}>{title}</Link>
            </h3>
            <p className="note-item__createdAt">
                {new Date(createdAt).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>
            <p className="note-item__body">{body}</p>
        </article>
    );
}
export default NoteItem;