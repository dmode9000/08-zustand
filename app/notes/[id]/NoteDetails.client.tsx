"use client";
// libraries
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// Services
import { fetchNoteById } from "@/lib/api";
// components
import NoteDetailMarkup from "@/components/NoteDetailMarkup/NoteDetailMarkup";

// Client component
export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;

  if (error || !note) return <p>Some error..</p>;

  return <NoteDetailMarkup note={note} />;
}
