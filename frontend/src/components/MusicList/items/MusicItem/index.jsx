import style from './MusicItem.module.scss'

import { ReactComponent as AddMusic } from '../../assets/heart.svg'
import { ReactComponent as AddedMusic } from '../../assets/heart_full.svg'
import { useContext, useState } from 'react'
import { Context } from '../../../../context/Context'

import { songsdata } from '../../../PlayerApp/audios.js';

function MusicItem({ key, id, title, performer, img }) {

    const { setShowPlayer, setIsPlaying, setChoosenSong } = useContext(Context)

    // нужен для добавления любимой музыки
    let [addedFavor, setAddedFavor] = useState(false)

    // функция на воспроизведение музыки
    function startPlay(musicId) {
        let data = songsdata.find(elem => elem.id === musicId)

        if (data.id === musicId) {
            setIsPlaying(false)
            setShowPlayer(true)
        }

        setChoosenSong(data)
    }

    function addFavorMusic(){
        setAddedFavor(!addedFavor)
    }


    return (
        <div className={style.musicItem} id={key}>
            <div className={style.musicMainInfo} onClick={() => startPlay(id)}>
                <div className={style.musicImg} style={{backgroundImage:  `url(${img})`}}></div>
                <div className={style.musicName}>
                    <h3>{title}</h3>
                    <p>{performer}</p>
                </div>
            </div>
            <div className={style.musicOtherInfo} onClick={() => addFavorMusic()}>
                {!addedFavor ? <AddMusic /> : <AddedMusic />}
            </div>
        </div>
    )
}

export default MusicItem