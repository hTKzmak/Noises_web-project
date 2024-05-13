// import PreviousButton from '../UI/PreviousButton'
import style from './MusicList.module.scss'
import MusicItem from './items/MusicItem'
import { songsdata } from '../PlayerApp/audios.js';
import PreviousButton from '../UI/PreviousButton/index.jsx';
// import { useContext } from 'react';
// import { Context } from '../../context/Context.js';

function MusicList() {

    // const { showPlayer, setShowPlayer, isPlaying, setIsPlaying } = useContext(Context)

    return (
        <div>
            <div className={style.musicBigBlock}>
                <div className={style.btn}>
                    <PreviousButton />
                </div>
                Album name
            </div>
            <div className={style.blocksList}>
                {songsdata.map(elem =>
                    <MusicItem key={elem.id} id={elem.id} title={elem.title} performer={elem.performer} img={elem.cover}/>
                )}
            </div>
        </div>
    )
}

export default MusicList