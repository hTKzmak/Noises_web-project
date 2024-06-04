import { useContext, useEffect, useRef, useState } from 'react';
import Player from './Player.jsx';
import { Context } from '../../context/Context.js';

// импорт всей музыки
import { songsdata } from './audios.js';

function PlayerApp() {

  // UseContext нужен для работы с плеером :P
  const { showPlayer, setShowPlayer, isPlaying, setIsPlaying, choosenSong, setChoosenSong } = useContext(Context)

  // обозначаем данные songsdata в songs (то есть, берём все песни из songsdata и добавляем его в songs)
  const [songs, setSongs] = useState(songsdata);

  // текущая музыка, которая должна играться (отсюда мы получаем инфу о музыке: файл, название, исполнитель, и т.д.)
  // const [currentSong, setCurrentSong] = useState(choosenSong);

  // так как реакт не знает что именно проигрывать, то используем useref 
  const audioElem = useRef();

  // для изменения громкости
  const [volume, setVolume] = useState(1);

  // для прогресса всей музыки
  const [progress, setProgress] = useState(0)

  // для длины всей музыки
  const [length, setLength] = useState(0)



  // useEffect используется для отслеживания булевого значения isplaying (для воспроизведения музыки)
  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play()
    }
    else {
      audioElem.current.pause()
    }
  }, [isPlaying])

  
  // ф-ия для ползунка плеера (эта функция ещё нужна для того, чтобы отслеживать изменения) + для изменения громкости
  const onPlaying = () => {
    // вся продолжительность музыки
    const duration = audioElem.current.duration;
    // текущая продолжительность музыки
    const ct = audioElem.current.currentTime;

    let progressFromCt = ct / duration * 100
    let lengthFromDuration = duration

    // замена значений
    setProgress(progressFromCt)
    setLength(lengthFromDuration)

    // изменяем громкость музыки
    audioElem.current.volume = volume
  }

  return (
    <div className="PlayerApp">
      <audio src={choosenSong} ref={audioElem} onTimeUpdate={onPlaying} volume={volume} />

      <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} choosenSong={choosenSong} setChoosenSong={setChoosenSong} volume={volume} setVolume={setVolume} showPlayer={showPlayer} setShowPlayer={setShowPlayer}

        progress={progress}
        setProgress={setProgress}
        length={length}
        setLength={setLength}

      />
    </div>
  );
}

export default PlayerApp;
