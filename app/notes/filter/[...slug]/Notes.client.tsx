"use client";
// next & react
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// libraries
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
// components
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
// types
import { noteTags, Tag } from "@/types/note";
// styles
import css from "./NotesPage.module.css";

interface NotesClientProps {
  filter?: string[] | undefined;
}

export default function NotesClient({ filter }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tag = filter && noteTags.includes(filter[0] as Tag) ? (filter[0] as Tag) : undefined;

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setSelectedPage(1);
  }, 500);

  const fetchParams = tag
    ? { page: selectedPage, search: searchQuery, tag: tag }
    : { page: selectedPage, search: searchQuery };

  const { data, isLoading, isSuccess, isPlaceholderData } = useQuery({
    queryKey: ["notes", fetchParams],
    queryFn: () => fetchNotes(fetchParams),
    placeholderData: keepPreviousData,
  });

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const router = useRouter();

  const handleClick = () => {
    router.push("/notes/action/create");
  };

  useEffect(() => {
    if (isSuccess && searchQuery && data && !isPlaceholderData) {
      const foundCount = data.notes.length;
      if (foundCount === 0) {
        toast.error(`No notes found for "${searchQuery}"`);
      } else {
        toast.success(
          `Found ${foundCount} note${foundCount === 1 ? "" : "s"} for "${searchQuery}"`
        );
      }
    }
  }, [isSuccess, searchQuery, data, isPlaceholderData]);

  return (
    <>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={selectedPage}
            onPageSelect={(page) => setSelectedPage(page)}
          />
        )}
        {
          <button className={css.button} onClick={handleClick}>
            Create note +
          </button>
        }
      </header>
      {isLoading && <p className={css.message}>Loading notes...</p>}
      {data && <NoteList notes={data.notes} isOldData={isPlaceholderData} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm />
        </Modal>
      )}
    </>
  );
}
