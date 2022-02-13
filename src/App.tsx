import { SideBar } from './components/SideBar'
import { Content } from './components/Content';
import { useState, useEffect } from 'react';
import { api } from './services/api';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenreId={selectedGenreId} handleClickButton={handleClickButton} />
      <Content Id={selectedGenre.id} title={selectedGenre.title}/>
    </div>
  )
}