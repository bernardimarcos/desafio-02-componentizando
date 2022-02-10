import { useState, useEffect } from 'react';

import '../styles/content.scss';

import { MovieCard } from '../components/MovieCard';
import { api } from '../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface SelectedGenre {
  Id: number;
  title: string;
}

export function Content(props: SelectedGenre) {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.Id}`).then(response => {
      setMovies(response.data);
    });
  }, [props]);

return (
    <div className="container" style={{ paddingLeft: '50px' }}>
      <header>
        <span className="category">Categoria:<span> {props.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}