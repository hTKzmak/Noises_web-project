import { useState } from 'react'
import style from './MainBlock.module.scss'
import { ReactComponent as PlayBtn } from './images/play.svg'
import { ReactComponent as PauseBtn } from './images/pause.svg'

function Block() {

    const [played, setPlayed] = useState(false)
    console.log(played)
    
    return (
        <div className={style.mainBlockItem}>
            <div className="mainBlockItem_title">
                <h1>Welcome to Noises</h1>
                <p>Music for new user</p>
            </div>
            <div className={style.playButton} onClick={() => setPlayed(!played)}>
                    {played ? <PauseBtn/> : <PlayBtn/>}
            </div>
        </div>
    )
}

export default Block