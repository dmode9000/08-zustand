"use client";
// next & react
import { useRouter } from "next/navigation";
import { useState } from "react";
// libraries
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
// components
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
// types
import { Tag } from "@/types/note";
// styles
import css from "./NotesPage.module.css";

interface NotesClientProps {
  filter?: Tag | undefined;
}

export default function NotesClient({ filter }: NotesClientProps) {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tag = filter; //&& noteTags.includes(filter[0] as Tag) ? (filter[0] as Tag) : undefined;
  console.log("NotesClient: tag", tag);

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

  const router = useRouter();

  const handleClick = () => {
    router.push("/notes/action/create");
  };

  return (
    <>
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
      {data?.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} isOldData={isPlaceholderData} />
      ) : (
        <p className={css.message}>No notes found...</p>
      )}
    </>
  );
}
