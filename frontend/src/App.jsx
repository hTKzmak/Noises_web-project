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

function App() {
  // для воспроизведения плеера (если true, то музыка играет. Если false, то не играет)
  const [isPlaying, setIsPlaying] = useState(false);

  // для отображения мобильной версии плеера
  const [showPlayer, setShowPlayer] = useState(false)

  // для отображения кнопки для плеера (воиспроизводится ли музыка)
  const [played, setPlayed] = useState(false)

  return (
    <Context.Provider value={{ showPlayer, setShowPlayer, isPlaying, setIsPlaying, played, setPlayed }}>
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
            <Route path='/music' element={<MusicPage />} />
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
