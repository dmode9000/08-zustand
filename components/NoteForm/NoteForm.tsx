"use client";

// Next & React
import { useRouter } from "next/navigation";
import { useId } from "react";
// Libraries
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Services
import { createNote } from "@/lib/api";
// Types
import { type Tag } from "@/types/note";
// Styles
import css from "./NoteForm.module.css";
// Store
import useNoteStore from "@/lib/store/noteStore";

export interface NoteFormValues {
  title: string;
  content: string;
  tag: Tag;
}

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();

  const router = useRouter();
  const fieldId = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      toast.success("Note created.");
      clearDraft();
      router.push("/notes/filter/All");
    },
    onError(Error) {
      console.error("Erorr creating note:", Error);
    },
  });

  const handleSubmit = () => {
    mutate(draft);
  };

  const handleCancel = () => router.push("/notes/filter/All");

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          className={css.input}
          type="text"
          name="title"
          id={`${fieldId}-title`}
          value={draft.title}
          onChange={(e) => {
            setDraft({ ...draft, title: e.target.value });
          }}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Сontent</label>
        <textarea
          name="content"
          id={`${fieldId}-content`}
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e) => {
            setDraft({ ...draft, content: e.target.value });
          }}
        ></textarea>
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          name="tag"
          className={css.select}
          id={`${fieldId}-tag`}
          value={draft.tag}
          onChange={(e) => {
            setDraft({ ...draft, tag: e.target.value as Tag });
          }}
        >
          <option value="Work">Work</option>
          <option value="Todo">Todo</option>
          <option value="Shopping">Shopping</option>
          <option value="Meeting">Meeting</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div className={css.actions}>
        <button type="button" onClick={handleCancel} className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
