import NoteItem from './NoteItem';

function NoteList({ notes, emptyMessage }) {
    if (notes.length === 0) {
        return <p>{emptyMessage}</p>;
    }

    return (
        <div className="notes-list">
            {notes.map((note) => (
                <NoteItem key={note.id} {...note} />
            ))}
        </div>
    );
}

export default NoteList;