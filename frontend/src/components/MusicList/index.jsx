// import PreviousButton from '../UI/PreviousButton'
import style from './MusicList.module.scss'
import MusicItem from './items/MusicItem'
import { songsdata } from '../PlayerApp/audios.js';
import PreviousButton from '../UI/PreviousButton/index.jsx';

function MusicList() {
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
                    <MusicItem key={elem.id} title={elem.title} performer={elem.performer} />
                )}
            </div>
        </div>
    )
}

export default MusicList