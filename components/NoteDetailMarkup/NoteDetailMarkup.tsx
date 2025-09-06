import { Note } from "@/types/note";
import css from "./NoteDetailMarkup.module.css";

interface Props {
  note: Note;
}
const NoteDetailMarkup = ({ note }: Props) => {
  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
        <p className={css.tag}>{note.tag}</p>
      </div>
    </div>
  );
};
export default NoteDetailMarkup;
