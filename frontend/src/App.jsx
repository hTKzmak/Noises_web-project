import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu/Menu';


import HomePage from './pages/HomePage'
import AlbumsPage from './pages/AlbumsPage'
import PerformersPage from './pages/PerformersPage'
import GenresPage from './pages/GenresPage'


function App() {
  return (
    <div className="App">
      <Menu />
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/albums' element={<AlbumsPage/>} />
          <Route path='/performers' element={<PerformersPage/>} />
          <Route path='/genres' element={<GenresPage/>} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
