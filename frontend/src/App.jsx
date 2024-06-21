import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu/Menu';


import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AGPList from './pages/AGPList';
import MusicPage from './pages/MusicPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import PlayerApp from './components/PlayerApp';


import { Context } from './context/Context';
import { useEffect, useState } from 'react';
import SearchPage from './pages/SearchPage';

import FavoriteBGImage from './assets/images/Favorite.png'
import LatestBGImage from './assets/images/Latest.png'
import SettingsPage from './pages/SettingsPage';


import bg from './assets/images/undefined.png'
import PrivateRoute from './components/PrivateRoute';

function App() {
  // для воспроизведения плеера (если true, то музыка играет. Если false, то не играет)
  const [isPlaying, setIsPlaying] = useState(false);

  // для отображения мобильной версии плеера
  const [showPlayer, setShowPlayer] = useState(false)

  // для воспроизведения выбранной нами музыки
  const [choosenSong, setChoosenSong] = useState({})

  // для отображения списка предыдущей музыки
  const [latestMusic, setLatestMusic] = useState([])

  // все треки, которые есть у нас, но список будет изменяться в зависимости от полученных данных
  const [songs, setSongs] = useState([])
  
  // все треки, которые есть у нас, но список не будет изменяться
  const [allSongs, setAllSongs] = useState([])

  // Создаём SS для хранений музыки, которые выбирал пользователь
  sessionStorage.setItem('latestMusic', JSON.stringify(latestMusic));

  // получаем данные о пользователе
  let localStorageData = localStorage.getItem('userData')
  let JSONData = JSON.parse(localStorageData) || []

  // получаем все треки
  useEffect(() => {
    fetch('http://localhost:8080/all-tracks')
      .then(res => res.json())
      .then(data => {
        setAllSongs(data || [])
        setSongs(data)
      })
  }, [])


  // Вместо этих данных будем получать данные с бекенда и размещать их на определённых страницах 
  let albumsData = [
    { id: 1, title: 'Album 1', background: bg, href: '/music' },
    { id: 2, title: 'Album 2', background: bg, href: '/music' },
    { id: 3, title: 'Album 3', background: bg, href: '/music' },
    { id: 4, title: 'Album 4', background: bg, href: '/music' },
    { id: 5, title: 'Album 5', background: bg, href: '/music' },
    { id: 6, title: 'Album 6', background: bg, href: '/music' },
    { id: 7, title: 'Album 7', background: bg, href: '/music' },
    { id: 8, title: 'Album 8', background: bg, href: '/music' },
    { id: 9, title: 'Album 9', background: bg, href: '/music' },
    { id: 10, title: 'Album 10', background: bg, href: '/music' },
  ]

  let genresData = [
    { id: 1, title: 'Genre 1', background: bg, href: '/music' },
    { id: 2, title: 'Genre 2', background: bg, href: '/music' },
    { id: 3, title: 'Genre 3', background: bg, href: '/music' },
  ]

  let performersData = [
    { id: 1, title: 'Performer 1', background: bg, href: '/music' },
    { id: 2, title: 'Performer 2', background: bg, href: '/music' },
    { id: 3, title: 'Performer 3', background: bg, href: '/music' },
    { id: 4, title: 'Performer 2', background: bg, href: '/music' },
    { id: 5, title: 'Performer 3', background: bg, href: '/music' },
    { id: 6, title: 'Performer 4', background: bg, href: '/music' }
  ]

  let playlistsData = [
    { id: 1, title: 'Playlist 1', background: bg, href: '/music' },
    { id: 2, title: 'Playlist 2', background: bg, href: '/music' },
    { id: 3, title: 'Playlist 3', background: bg, href: '/music' },
    { id: 4, title: 'Playlist 2', background: bg, href: '/music' },
    { id: 5, title: 'Playlist 3', background: bg, href: '/music' },
    { id: 6, title: 'Playlist 4', background: bg, href: '/music' }
  ]


  // всю эту кашу надо сократить. Надо использовать один компонент для показа исполнителей, альбомов, жанров и плейлистов. 
  return (
    <Context.Provider value={{ showPlayer, setShowPlayer, isPlaying, setIsPlaying, choosenSong, setChoosenSong, latestMusic, setLatestMusic, songs, setSongs, allSongs }}>
      <div className="App">
        <Menu />
        <div className="container">
          <Header />
          <Routes>

            {/* публичные страницы */}
            <Route path='/' element={<HomePage />} />
            <Route path='/albums' element={<AGPList title="List of albums" showHeart={true} data={albumsData} genresStyle={false} showCreateBtn={false} />} />
            <Route path='/performers' element={<AGPList title="List of performers" showHeart={true} data={performersData} genresStyle={false} showCreateBtn={false} />} />
            <Route path='/genres' element={<AGPList title="List of genres" showHeart={false} showDelete={false} data={genresData} genresStyle={true} showCreateBtn={false} />} />

            <Route path='/music' element={<MusicPage type={'user'} image={'https://images.unsplash.com/photo-1634705146926-b8fbca28f431?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />} />


            <Route path='/latest_music' element={<MusicPage type={'latest'} image={LatestBGImage} />} />


            {/* приватные страницы */}
            <Route element={<PrivateRoute />}>
              <Route path='/playlists' element={<AGPList title="List of your playlists" showHeart={false} showDelete={true} data={playlistsData} genresStyle={false} showCreateBtn={true} />} />
            </Route>

            <Route element={<PrivateRoute />}>
              {/* <Route path='/favorite_music' element={<MusicPage title="Favorite music" image={FavoriteBGImage} />} /> */}
              <Route path='/favorite_music' element={<MusicPage type={'favorite'} image={FavoriteBGImage} />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/favorite_albums' element={<AGPList title="Favorite albums" showHeart={false} data={albumsData} genresStyle={false} />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/favorite_performers' element={<AGPList title="Favorite performers" showHeart={false} data={performersData} genresStyle={false} />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/settings' element={<SettingsPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path='/your_music' element={<MusicPage type={'user'} image={JSONData.img} />} />
            </Route>



            {/* публичные страницы */}
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/search' element={<SearchPage />} />

            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <PlayerApp />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
