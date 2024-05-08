import style from './MusicItem.module.scss'
import { ReactComponent as Play } from '../../../../assets/icons/play.svg'
import { ReactComponent as Pause } from '../../../../assets/icons/pause.svg'

import { ReactComponent as AddMusic } from '../../assets/heart.svg'
import { useContext, useState } from 'react'
import { Context } from '../../../../context/Context'

import { songsdata } from '../../../PlayerApp/audios.js';

function MusicItem({ key, id, title, performer }) {

    const { setShowPlayer, isPlaying, setIsPlaying } = useContext(Context)

    // нужны для изменения кнопки у определённой музыки
    let [buttonChanger, setButtonChanger] = useState(false)

    // функция на воспроизведение музыки и изменение кнопки у определённой музыки (это достигается с помощью buttonChanger и setButtonChanger)

    // нужно сделать следующее: передать url определённой музыки, чтобы она его воспроизводила. Передать список музыки, которые находятся на странице/плейлисте. Изменение кнопки на false, если был выбрана другая музыка
    function startPlay(musicId) {
        let data = songsdata.find(elem => elem.id === musicId)
        if (data.id === musicId) {
            setIsPlaying(!isPlaying)
            setShowPlayer(true)
            setButtonChanger(!buttonChanger)
            
            if (buttonChanger === false) {
                setButtonChanger(true)
                setIsPlaying(true)
            }
            else if (buttonChanger === true) {
                setButtonChanger(false)
                setIsPlaying(false)
            }
        }

    }


    return (
        <div className={style.musicItem} id={key}>
            <div className={style.musicMainInfo}>
                <div className={style.musicImg} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1700464109443-306802c3febe?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
                    <div className={style.btn} onClick={() => startPlay(id)}>
                        {buttonChanger ? <Pause /> : <Play />}
                    </div>
                </div>
                <div className={style.musicName}>
                    <h3>{title}</h3>
                    <p>{performer}</p>
                </div>
            </div>
            <div className={style.musicOtherInfo}>
                <AddMusic />
            </div>
        </div>
    )
}

export default MusicItem