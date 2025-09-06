export const noteTags = ["Work", "Todo", "Shopping", "Meeting", "Personal"] as const;
export type Tag = (typeof noteTags)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

export type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;
