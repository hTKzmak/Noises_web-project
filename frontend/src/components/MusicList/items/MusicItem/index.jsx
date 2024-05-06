import style from './MusicItem.module.scss'
import { ReactComponent as Play } from '../../../../assets/icons/play.svg'
import { ReactComponent as Pause } from '../../../../assets/icons/pause.svg'

import { ReactComponent as AddMusic } from '../../assets/heart.svg'

function MusicItem({ key, title, performer }) {
    return (
        <div className={style.musicItem} id={key}>
            <div className={style.musicMainInfo}>
                <div className={style.musicImg} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1700464109443-306802c3febe?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
                    <div className={style.btn}>
                        <Play />
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