import { useEffect, useRef, useState } from 'react';
import Player from './Player.jsx';

// импорт всей музыки
import { songsdata } from './audios.js';

function PlayerApp() {

  // обозначаем данные songsdata в songs (то есть, берём все песни из songsdata и добавляем его в songs)
  const [songs, setSongs] = useState(songsdata);

  // для воспроизведения плеера (если true, то музыка играет. Если false, то не играет)
  const [isPlaying, setIsPlaying] = useState(false);

  // текущая музыка, которая должна играться (отсюда мы получаем инфу о музыке: файл, название, исполнитель, и т.д.)
  const [currentSong, setCurrentSong] = useState(songsdata[1]);

  // так как реакт не знает что именно проигрывать, то используем useref 
  const audioElem = useRef();

  // для изменения громкости
  const [volume, setVolume] = useState(1);

  // для отображения мобильной версии плеера
  const [mobilePlayer, setMobilePlayer] = useState(true)


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
    localStorage.setItem('currentSong', JSON.stringify({ currentSong }))

    // изменяем громкость музыки
    audioElem.current.volume = volume
  }

  let getMusicData = localStorage.getItem('currentSong')

  return (
    // <div className="PlayerApp" style={{display: !getMusicData ? 'none' : 'flex'}}>
    <div className="PlayerApp">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} volume={volume} />
      <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} volume={volume} setVolume={setVolume} mobilePlayer={mobilePlayer} setMobilePlayer={setMobilePlayer}/>
    </div>
  );
}

export default PlayerApp;
