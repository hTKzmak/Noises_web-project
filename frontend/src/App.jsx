import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu/Menu';


import HomePage from './pages/HomePage'
import AlbumsPage from './pages/AlbumsPage'
import PerformersPage from './pages/PerformersPage'
import GenresPage from './pages/GenresPage'
import NotFoundPage from './pages/NotFoundPage';
import MusicPage from './pages/MusicPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import PlayerApp from './components/PlayerApp';


import { Context } from './context/Context';
import { useState } from 'react';
import SearchPage from './pages/SearchPage';

import FavoriteBGImage from './assets/images/Favorite.png'
import LatestBGImage from './assets/images/Latest.png'

function App() {
  // для воспроизведения плеера (если true, то музыка играет. Если false, то не играет)
  const [isPlaying, setIsPlaying] = useState(false);

  // для отображения мобильной версии плеера
  const [showPlayer, setShowPlayer] = useState(false)

  // для воспроизведения выбранной нами музыки
  const [choosenSong, setChoosenSong] = useState({})

  // для воспроизведения выбранной нами музыки
  const [latestMusic, setLatestMusic] = useState([])

  sessionStorage.setItem('latestMusic', JSON.stringify(latestMusic));

  let sessionStorageData = sessionStorage.getItem('latestMusic')
  let JSONLatestMusicData = JSON.parse(sessionStorageData)

  return (
    <Context.Provider value={{ showPlayer, setShowPlayer, isPlaying, setIsPlaying, choosenSong, setChoosenSong, latestMusic, setLatestMusic }}>
      <div className="App">
        <Menu />
        <div className="container">
          <Header />
          <PlayerApp />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/albums' element={<AlbumsPage />} />
            <Route path='/performers' element={<PerformersPage />} />
            <Route path='/genres' element={<GenresPage />} />
            <Route path='/music' element={<MusicPage title="Some music" image={'https://images.unsplash.com/photo-1567360425618-1594206637d2?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}/>} />
            <Route path='/favorite_music' element={<MusicPage title="Some music" image={FavoriteBGImage}/>} />
            <Route path='/latest_music' element={<MusicPage title="Latest music" data={JSONLatestMusicData} image={LatestBGImage}/>} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
