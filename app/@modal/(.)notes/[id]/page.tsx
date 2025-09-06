// libraries
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// Services
import { fetchNoteById } from "@/lib/api";
// Components
import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { title, content } = await fetchNoteById(id);

  return {
    title: `${title} - Note Hub`,
    description: `${content.slice(0, 50)}...`,
    openGraph: {
      title: `${title} - Note Hub`,
      description: `${content.slice(0, 50)}...`,
      url: `https://notehub.com/notes/${id}`,
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

//server component
const NoteDetailsClient = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient />
      </HydrationBoundary>
    </Modal>
  );
};

export default NoteDetailsClient;
