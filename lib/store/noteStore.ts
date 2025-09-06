import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewNote } from "@/types/note";

type NoteStore = {
  draft: NewNote;
  setDraft: (newNote: NewNote) => void;
  clearDraft: () => void;
};

export const initialDraft: NewNote = { title: "", content: "", tag: "Todo" };

const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (newNote: NewNote) => set({ draft: newNote }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "app-new-note",
    }
  )
);
export default useNoteStore;
