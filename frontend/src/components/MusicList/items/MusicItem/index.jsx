import style from './MusicItem.module.scss'

import { ReactComponent as AddMusic } from '../../../../assets/icons/heart.svg'
import { ReactComponent as AddedMusic } from '../../../../assets/icons/heart_full.svg'
import { ReactComponent as Playlist } from '../../../../assets/icons/playlist.svg'

import { useContext, useState } from 'react'
import { Context } from '../../../../context/Context'

function MusicItem({ id, title, performer, img }) {

    // нужно будет добавить latestMusic и seLatestMusic
    const { setShowPlayer, setIsPlaying, setChoosenSong } = useContext(Context)

    // нужен для добавления любимой музыки
    let [addedFavor, setAddedFavor] = useState(false)


    // ПОЧИСТИТЬ ТУТ НАДО, ДОБАВИТЬ LATEST MUSIC И ДОБАВИТЬ ИНФУ О МУЗЫКЕ: НАЗВАНИЕ, ИСПОЛНИТЕЛЬ, И URL В ВИДЕ http://localhost:8080/stream/7 (02.02.2024)
    // Для Favorite и latest можно сделать массив с id и фильтровать список всей музыки по массиву с id конкретного пользователя

    // функция на воспроизведение музыки
    // function startPlay(musicId) {
    //     let data = musicId
    //     let BASE_URL = 'http://localhost:8080/stream/'
    //     // let data = songsdata.find(elem => elem.id === musicId)
    //     // // let data = `http://localhost:8080/stream/${id}`

    //     // if (data.id === musicId) {
    //         setIsPlaying(false)
    //         setShowPlayer(true)
    //     // }

    //     // if (!latestMusic.find(elem => elem.id === musicId)) {
    //     //     setLatestMusic(prevState => [...prevState, data]);
    //     // }
    //     // console.log(latestMusic)

    //     // setChoosenSong(`http://localhost:8080/stream/${data}`)

    //     let res = BASE_URL + data
    //     setChoosenSong(res)
    // }

    function startPlay(musicId) {
        fetch(`http://localhost:8080/stream/${musicId}`)
            .then(res => res)
            .then(data => {
                setIsPlaying(false)
                setShowPlayer(true)

                setChoosenSong(data.url)
                console.log(data)
            })
    }

    function addFavorMusic() {
        setAddedFavor(!addedFavor)
    }

    const storedObject = JSON.parse(localStorage.getItem('userData')) || [];
    let userData = storedObject

    return (
        <div className={style.musicItem} key={id} id={id}>
            <div className={style.musicMainInfo} onClick={() => startPlay(id)}>
                <div className={style.musicImg} style={{ backgroundImage: `url(${img})` }}></div>
                <div className={style.musicName}>
                    <h3>{title}</h3>
                    <p>{performer}</p>
                </div>
            </div>

            {userData.length !== 0 &&
                <div className={style.musicOtherInfo}>
                    <Playlist onClick={() => alert('( ͡° ͜ʖ ͡°)')} />
                    {!addedFavor ? <AddMusic onClick={() => addFavorMusic()} /> : <AddedMusic onClick={() => addFavorMusic()} />}
                </div>
            }
        </div>
    )
}

export default MusicItem