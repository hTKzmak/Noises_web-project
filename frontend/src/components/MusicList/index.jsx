import PreviousButton from '../UI/PreviousButton'
import style from './MusicList.module.scss'
import MusicItem from './items/MusicItem'

function MusicList() {
    return (
        <div>
            <div className={style.musicBigBlock}>
                Album name
            </div>
            <div className={style.blocksList}>
                <MusicItem/>
            </div>
        </div>
    )
}

export default MusicList