import style from './MusicItem.module.scss'

import { ReactComponent as AddMusic } from '../../../../assets/icons/heart.svg'
import { ReactComponent as AddedMusic } from '../../../../assets/icons/heart_full.svg'
import { ReactComponent as Playlist } from '../../../../assets/icons/playlist.svg'

import { useContext, useState } from 'react'
import { Context } from '../../../../context/Context'

function MusicItem({ id, title, performer, img }) {

    const { setShowPlayer, setIsPlaying, setChoosenSong, latestMusic, setLatestMusic } = useContext(Context)

    // нужен для добавления любимой музыки
    let [addedFavor, setAddedFavor] = useState(false);

    const storedObject = JSON.parse(localStorage.getItem('userData')) || [];
    let userData = storedObject

    function startPlay(musicId) {
        // передаём данные о музыке в setChoosenSong
        fetch(`http://localhost:8080/stream/${musicId}`)
            .then(res => res)
            .then(data => {
                setIsPlaying(false)
                setShowPlayer(true)

                let musicInfo = {
                    id: id,
                    title: title,
                    performer: performer,
                    // в первом беке cover это изображение, в новом название может измениться 
                    cover: img,
                    url: data.url,
                }

                // setChoosenSong(data.url)
                // console.log(data)
                setChoosenSong(musicInfo)
                console.log(musicInfo)

                // добавление id музыки в ss для latest music (будет фильтроваться по списку всей музыки и по id)
                if (!latestMusic.find(elem => elem.id === musicId)) {
                    setLatestMusic(prevState => [...prevState, musicInfo]);
                    console.log(latestMusic)
                }
            })

    }

    // добавление музыки в любимые
    function addFavorMusic(musicId) {
        setAddedFavor(!addedFavor)

        fetch(`http://localhost:8080/favorites/${musicId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userData.token}`
            },
        })
            .then(res => res.json())
            .then(json => console.log(json))
    }

    // удаление музыки из любимых
    function deleteFavorMusic(musicId) {
        setAddedFavor(!addedFavor)

        fetch(`http://localhost:8080/favorites/${musicId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userData.token}`
            },
        })
            .then(res => res.json())
            .then(json => console.log(json))
    }

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
                    <Playlist onClick={() => alert('(つ°ヮ°)つ')} />
                    {!addedFavor ? <AddMusic onClick={() => addFavorMusic(id)} /> : <AddedMusic onClick={() => deleteFavorMusic(id)} />}
                </div>
            }
        </div>
    )
}

export default MusicItem