"use client";

//next
import Link from "next/link";
// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Services
import { deleteNote } from "../../lib/api";
// Types
import type { Note } from "../../types/note";
// Styles
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  isOldData?: boolean;
}

export default function NoteList({ notes, isOldData }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: deleteNote,
    onSuccess(note) {
      toast.success("Note deleted");
      console.log(`Note deleted:`, note);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError(error) {
      toast.error("Failed to delete note");
      console.log("Error deleting: ", error);
    },
  });

  return (
    <>
      <ul className={isOldData ? `${css.list} ${css.oldData}` : css.list}>
        {notes.map((note) => {
          const isDeleting = isPending && variables === note.id;
          return (
            <li className={`${css.listItem} ${isDeleting ? css.oldData : ""}`} key={note.id}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <Link href={`/notes/${note.id}`}>View details</Link>
                <button
                  className={css.button}
                  onClick={() => mutate(note.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
