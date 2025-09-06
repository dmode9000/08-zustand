import { Metadata } from "next";
//styles
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Note Hub",
  description: "Note Hub - Page not found",
  openGraph: {
    title: `Note Hub`,
    description: "Note Hub - Page not found",
    url: `https://notehub.com/`,
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

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}
