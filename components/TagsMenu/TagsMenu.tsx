"use client";

// Next & React
import Link from "next/link";
import { useState } from "react";
// Types
import { noteTags } from "@/types/note";
// Styles
import css from "@/components/TagsMenu/TagsMenu.module.css";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => {
          setIsOpen((state) => !state);
        }}
      >
        Notes ▾
      </button>

      <ul className={css.menuList} style={{ display: isOpen ? "block" : "none" }}>
        {["All notes", ...noteTags].map((tag) => {
          const path = tag === "All notes" ? "All" : encodeURIComponent(tag);
          return (
            <li className={css.menuItem} key={tag}>
              <Link
                href={`/notes/filter/${path}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >{`${tag}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
