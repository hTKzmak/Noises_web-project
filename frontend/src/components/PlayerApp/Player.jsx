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

function Player({ audioElem, isPlaying, setIsPlaying, choosenSong, setChoosenSong, songs, volume, setVolume, showPlayer, setShowPlayer, progress, length }) {

    const clickRef = useRef();

    // ф-ия по проигрыванию и остановки музыки
    const PlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    // ф-ия по перемотке музыки, нажимая на ползунок плеера
    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;

        // меняем текущее значение времени audioElem на выбранный нами период (чтобы не вылезала ошибка после перезагрузки, если решил перемотать музыку, не воиспроизводив её, то пишем "или 0"
        audioElem.current.currentTime = divprogress / 100 * length
    }

    // ф-ия по воспроизведению предыдущей музыки (надо переделать под бек)
    const skipBack = () => {

        // мы создаём переменную index для того, чтобы найти index песни по названию из songs (audios.js)
        const index = songs.findIndex(x => x.title === choosenSong.title);

        if (index === 0) {
            // setChoosenSong(songs[songs.length - 1])
            setChoosenSong(songs[0])
        }
        else {
            setChoosenSong(songs[index - 1])
            setIsPlaying(false)
        }

    }

    // ф-ия по воспроизведению следующей музыки (надо переделать под бек)
    const skipAhead = () => {

        // мы создаём переменную index для того, чтобы найти index песни по названию из songs (audios.js)
        const index = songs.findIndex(x => x.title === choosenSong.title);

        if (index === songs.length - 1) {
            setChoosenSong(songs[songs.length - 1])
        }
        else {
            setChoosenSong(songs[index + 1])
            setIsPlaying(false)
        }

    }

    // если размер окна браузера меньше 1100, то громкость музыки будет на максимум (сделано это для мобильных устройств)
    // (его думаю убрать, так как кнопка отключения громкости есть в самом плеере)
    // if (window.innerWidth <= 1100) {
    //     setVolume(1)
    // }

    const closePlayer = () => {
        setIsPlaying(false)
        setShowPlayer(false)
    }

    // фуникция для скачивания музыки
    function downloadMusic(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${choosenSong.title}.mp3`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }


    return (
        <div className="player" style={{ display: showPlayer === true ? 'flex' : 'none' }}>
            <h1></h1>
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
                        <h3>{choosenSong.title}</h3>
                        <p>{choosenSong.performer}</p>
                        <div className="title-info">
                            <h3>{choosenSong.title}</h3>
                            <p>{choosenSong.performer}</p>
                        </div>
                        <button className='closeBtn' onClick={() => closePlayer()}><Close /></button>
                    </div>
                    <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                        <div className="seek_bar" style={{ width: `${progress + "%"}` }}></div>
                    </div>
                </div>
                <div className="settings">

                    <button className='closeBtn' onClick={() => closePlayer()}><Close /></button>

                    <button onClick={() => downloadMusic(choosenSong.url)}><Download /></button>

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
                    <button onClick={() => downloadMusic(choosenSong)}><Download /></button>

                    <div id='volume'>
                        <div id='volume'>
                            {/* {volume === 1 ? (<Volume className='btn_control' onClick={() => setVolume(0)} />) : (<VolumeMute className='btn_control' onClick={() => setVolume(1)} />)} */}
                            {volume === '0' ? (
                                <VolumeMute className='btn_control' onClick={() => setVolume('1')} />
                            ) : (
                                <Volume className='btn_control' onClick={() => setVolume('0')} />
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Player