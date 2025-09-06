// Next & React
import { Metadata } from "next";
// Components
import NoteForm from "@/components/NoteForm/NoteForm";
// Styles
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create Note - NoteHub",
  description: "Create a new note on NoteHub",
  openGraph: {
    title: "Create Note - NoteHub",
    description: "Create a new note on NoteHub",
    url: `https://notehub.com/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 644,
        height: 429,
        alt: "Note Hub - Create Note",
      },
    ],
    type: "article",
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
