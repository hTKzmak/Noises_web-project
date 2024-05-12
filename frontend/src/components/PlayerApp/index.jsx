import { useContext, useEffect, useRef, useState } from 'react';
import Player from './Player.jsx';
import { Context } from '../../context/Context.js';

// импорт всей музыки
import { songsdata } from './audios.js';

function PlayerApp() {
  // для отображения мобильной версии плеера и для воспроизведения плеера (если true, то музыка играет. Если false, то не играет)

  // UseContext нужен для работы с плеером :P
  const { showPlayer, setShowPlayer, isPlaying, setIsPlaying, played, setPlayed, choosenSong } = useContext(Context)

  // обозначаем данные songsdata в songs (то есть, берём все песни из songsdata и добавляем его в songs)
  const [songs, setSongs] = useState(songsdata);

  // // для воспроизведения плеера (если true, то музыка играет. Если false, то не играет)
  // const [isPlaying, setIsPlaying] = useState(false);

  // текущая музыка, которая должна играться (отсюда мы получаем инфу о музыке: файл, название, исполнитель, и т.д.)
  const [currentSong, setCurrentSong] = useState(choosenSong);

  // так как реакт не знает что именно проигрывать, то используем useref 
  const audioElem = useRef();

  // для изменения громкости
  const [volume, setVolume] = useState(1);

  // // для отображения мобильной версии плеера
  // const [showPlayer, setShowPlayer] = useState(true)

  useEffect(() => {
    setCurrentSong(choosenSong);
  }, [choosenSong]);



  // useEffect используется для отслеживания булевого значения isplaying (для воспроизведения музыки)
  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play()
    }
    else {
      audioElem.current.pause()
    }
  }, [isPlaying])


  // ф-ия для ползунка плеера (эта функция ещё нужна для того, чтобы отслеживать изменения)

  const onPlaying = () => {
    // вся продолжительность музыки
    const duration = audioElem.current.duration
    // текущая продолжительность музыки
    const currentTime = audioElem.current.currentTime

    // заменяем значение currentSong на тот-же currentSong, но с инфой о прогрессе и длине текущей музыки 
    setCurrentSong({ ...currentSong, "progress": currentTime / duration * 100, "length": duration })
    // localStorage.setItem('currentSong', JSON.stringify({ currentSong }))

    // изменяем громкость музыки
    audioElem.current.volume = volume

    // console.log(Object.keys(choosenSong).length === 0)
    console.log(currentSong)
    console.log(choosenSong)
  }

  // let getMusicData = localStorage.getItem('currentSong')

  return (
    <div className="PlayerApp">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} volume={volume} />
      <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} volume={volume} setVolume={setVolume} showPlayer={showPlayer} setShowPlayer={setShowPlayer} played={played} setPlayed={setPlayed} />
    </div>
  );
}

export default PlayerApp;
