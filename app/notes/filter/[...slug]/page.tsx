//libraries
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
//components
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
//services
import { fetchNotes } from "@/lib/api";
// styles
import css from "./NotesPage.module.css";
import { noteTags, Tag } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tag = slug.length > 0 ? (slug[0] as Tag) : noteTags[0];
  return {
    title: `${tag} tag notes - Note Hub`,
    description: `A collection of notes tagged with "${tag}" in Note Hub.`,
    openGraph: {
      title: `${tag} tag notes - Note Hub`,
      description: `A collection of notes tagged with "${tag}" in Note Hub.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 644,
          height: 429,
          alt: "Note Hub",
        },
      ],
      type: "article",
    },
  };
}

// This is a Server Component
export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug.length > 0 ? (slug[0] as Tag) : noteTags[0];

  const queryClient = new QueryClient();

  const fetchParams = tag ? { page: 1, search: "", tag: tag } : { page: 1, search: "" };

  await queryClient.prefetchQuery({
    queryKey: ["notes", fetchParams],
    queryFn: () => fetchNotes(fetchParams),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient filter={slug} />
      </HydrationBoundary>
    </div>
  );
}
