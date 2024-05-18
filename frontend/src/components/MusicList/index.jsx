import style from './MusicList.module.scss'
import MusicItem from './items/MusicItem'
import { songsdata } from '../PlayerApp/audios.js';
import PreviousButton from '../UI/PreviousButton/index.jsx';

function MusicList({ title, data, image }) {

    // background-image: radial-gradient(circle, rgba(0, 0, 0, 0.4) 100%, rgba(232, 232, 232, 0) 100%),
    // url("https://images.unsplash.com/photo-1701066506707-d81b13ad3a93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

    return (
        <div>
            <div className={style.musicBigBlock} style={{backgroundImage: `url(${image})`}}>
                <div className={style.btn}>
                    <PreviousButton />
                </div>
                {title}
            </div>
            <div className={style.blocksList}>
                {!data ?
                    songsdata.map(elem =>
                        <MusicItem key={elem.id} id={elem.id} title={elem.title} performer={elem.performer} img={elem.cover} />
                    )
                    
                    :

                    data.map(elem =>
                        <MusicItem key={elem.id} id={elem.id} title={elem.title} performer={elem.performer} img={elem.cover} />
                    )
                }
            </div>
        </div>
    )
}

export default MusicList