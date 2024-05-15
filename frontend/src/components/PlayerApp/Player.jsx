import { useRef } from 'react';
import './Player.scss'
import { ReactComponent as Volume } from './assets/Volume.svg'
import { ReactComponent as VolumeMute } from './assets/VolumeMute.svg'
import { ReactComponent as Download } from './assets/Download.svg'
import { ReactComponent as Play } from './assets/Play.svg'
import { ReactComponent as Pause } from './assets/Pause.svg'
import { ReactComponent as Next } from './assets/Next.svg'
import { ReactComponent as Previous } from './assets/Previous.svg'
import { ReactComponent as Playlist } from './assets/Playlist.svg'

import { ReactComponent as Close } from './assets/Close.svg'

function Player({ audioElem, isPlaying, setIsPlaying, currentSong, setCurrentSong, songs, volume, setVolume, showPlayer, setShowPlayer }) {

    const clickRef = useRef();

    // ф-ия по проигрыванию и остановки музыки
    const PlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    // ф-ия по перемотке музыки, нажимая на ползунок плеера
    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divProgress = offset / width * 100;

        // меняем текущее значение времени audioElem на выбранный нами период (чтобы не вылезала ошибка после перезагрузки, если решил перемотать музыку, не воиспроизводив её, то пишем "или 0"
        audioElem.current.currentTime = (divProgress / 100 * currentSong.length) || 0;
    }

    // ф-ия по воспроизведению предыдущей музыки 
    const skipBack = () => {

        // мы создаём переменную index для того, чтобы найти index песни по названию из songs (audios.js)
        const index = songs.findIndex(x => x.title === currentSong.title);

        if (index === 0) {
            // setCurrentSong(songs[songs.length - 1])
            setCurrentSong(songs[0])
        }
        else {
            setCurrentSong(songs[index - 1])
            setIsPlaying(false)
        }

    }

    // ф-ия по воспроизведению следующей музыки 
    const skipAhead = () => {

        // мы создаём переменную index для того, чтобы найти index песни по названию из songs (audios.js)
        const index = songs.findIndex(x => x.title === currentSong.title);

        if (index === songs.length - 1) {
            setCurrentSong(songs[songs.length - 1])
        }
        else {
            setCurrentSong(songs[index + 1])
            setIsPlaying(false)
        }

    }

    // если размер окна браузера меньше 1100, то громкость музыки будет на максимум (сделано это для мобильных устройств)
    if(window.innerWidth <= 1100){
        setVolume(1)
    }

    const closePlayer = () => {
        setIsPlaying(false)
        setShowPlayer(false)
    }

    return (
        <div className="player" style={{display: showPlayer === true ? 'flex' : 'none'}}>
            <div className="player_container">
                <div className="controls">
                    <Previous className='btn_action' onClick={skipBack} />
                    {!isPlaying ? (
                        <Play className='btn_action pp' onClick={PlayPause} />
                    ) : (
                        <Pause className='btn_action pp' onClick={PlayPause} />
                    )}
                    <Next className='btn_action' onClick={skipAhead} />
                </div>
                <div className="navigation">
                    <div className="title">
                        <h3>{currentSong.title}</h3>
                        <p>{currentSong.performer}</p>
                        <div className="title-info">
                            <h3>{currentSong.title}</h3>
                            <p>{currentSong.performer}</p>
                        </div>
                        <button className='closeBtn' onClick={() => closePlayer()}><Close /></button>
                    </div>
                    <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                        <div className="seek_bar" style={{ width: `${currentSong.progress + "%"}` }}></div>
                    </div>
                </div>
                <div className="settings">

                    <a href={currentSong.url} download><Download /></a>

                    <Playlist />

                    <div id="music">
                        {volume === '0' ? (
                            <VolumeMute className='btn_control' onClick={() => setVolume('1')} />
                        ) : (
                            <Volume className='btn_control' onClick={() => setVolume('0')} />
                        )}
                        <input
                            type="range"
                            min="0"
                            max="1"
                            default="1"
                            step="0.01"
                            value={volume}
                            className="volumeChanger"
                            onChange={(e) => {
                                setVolume(e.target.value);
                            }}
                        />
                    </div>

                </div>

                <div className="controls_mobile">
                    <Previous className='btn_action' onClick={skipBack} />
                    {!isPlaying ? (
                        <Play className='btn_action pp' onClick={PlayPause} />
                    ) : (
                        <Pause className='btn_action pp' onClick={PlayPause} />
                    )}
                    <Next className='btn_action' onClick={skipAhead} />
                </div>
                <div className="settings_mobile">
                    <a href={currentSong.url} download><Download /></a>
                    <Playlist />
                </div>

            </div>

        </div>
    )
}

export default Player