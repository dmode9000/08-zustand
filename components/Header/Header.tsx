"use client";

//next
import Link from "next/link";
// Components
import TagsMenu from "@/components/TagsMenu/TagsMenu";
//styles
import css from "@/components/Header/Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav className={css.headerLink} aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.headerLink} href="/">
              Home
            </Link>
          </li>
          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
