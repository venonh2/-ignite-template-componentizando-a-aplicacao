import { useEffect, useState } from "react";
// components
import { Button } from "./Button";

import { api } from "../services/api";

import { GenreResponseProps } from "../interfaces/GenreResponseProps";

import "../styles/sidebar.scss";

interface SidebarProps {
  handleClickButton(genreId: number): void;
  selectedGenreId: number;
}

export function SideBar({ handleClickButton, selectedGenreId }: SidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
