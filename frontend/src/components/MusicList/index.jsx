import style from './MusicList.module.scss'
import MusicItem from './items/MusicItem'
import PreviousButton from '../UI/PreviousButton/index.jsx';

import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { favoriteMusicAction, latestMusicAction, popularMusicAction, userMusicAction } from '../../store/MusicDataReducer.jsx';
import { Context } from '../../context/Context.js';

function MusicList({ data, image, type }) {

    const { setSongs, allSongs } = useContext(Context)

    // получаем значение page_name (название страницы) из стора
    const { page_name } = useSelector(store => store.musicData)

    // получаем значение music_list (список музыки) из стора
    const { music_list } = useSelector(store => store.musicData)

    // для useEffect
    const dispatch = useDispatch()
    const location = useLocation()
    const { id } = useParams()

    // для получения данных о последних прослушанных треков
    let sessionStorageData = sessionStorage.getItem('latestMusic')
    let JSONLatestMusicData = JSON.parse(sessionStorageData)

    // получаем данные о пользователе
    let localStorageData = localStorage.getItem('userData')
    let JSONData = JSON.parse(localStorageData) || []



    // с его помощью будут отображаться только определённые данные на определённых страницах 
    useEffect(() => {
        if (type === 'favorite') {
            // тут нужно заменить на fetchFavoriteMusic, так как там проиходит получение данных о любимых треках
            dispatch(favoriteMusicAction(data))
            setSongs(data)
            if (data === undefined || !location.pathname) {
                setSongs(allSongs)
            }
            console.log(data)
        }
        else if (type === 'latest') {
            dispatch(latestMusicAction(JSONLatestMusicData))
            if (location.pathname === '/latest_music') {
                if (!JSONLatestMusicData || JSONLatestMusicData.length === 0) {
                    setSongs(allSongs)
                }
                else {
                    setSongs(JSONLatestMusicData)
                }
            }
            else {
                setSongs(allSongs)
            }
            console.log(JSONLatestMusicData)
        }
        else if (type === 'user') {

            fetch(`http://localhost:8080/tracks/${JSONData.id}`)
                .then(res => res.json())
                .then(data => {

                    if (data.tracks) {
                        dispatch(userMusicAction(data.tracks))
                        setSongs(data.tracks)
                        console.log(data.tracks)
                    }
                    else {
                        dispatch(userMusicAction([]))
                    }

                })

        }
        else if (type === 'popular') {
            fetch('http://localhost:8080/all-tracks')
                .then(res => res.json())
                .then(data => {
                    let new_data = data.sort((a, b) => b.popularity - a.popularity)
                    dispatch(popularMusicAction(new_data))
                    setSongs(new_data)
                })
        }
    }, [location.pathname, dispatch, id, type])


    return (
        <div>
            <div className={style.musicBigBlock} style={{ backgroundImage: `url(${image})` }}>
                <div className={style.btn}>
                    <PreviousButton />
                </div>
                {page_name}
            </div>
            <div className={style.blocksList}>
                {!music_list ?
                    ''

                    :

                    music_list.map(elem =>
                        <MusicItem key={elem.id} id={elem.id} name={elem.name} performer={elem.performer} img={`http://localhost:8080/image/music/${elem.id}`} />
                    )
                }
            </div>
        </div>
    )
}

export default MusicList