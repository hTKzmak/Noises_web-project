import style from './MusicItem.module.scss'

function MusicItem() {
    return (
        <div className={style.musicItem}>
            <div className={style.musicMainInfo}>
                <div className={style.musicImg} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1700464109443-306802c3febe?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}></div>
                <div className={style.musicName}>
                    <h3>Music name</h3>
                    <p>Musician name</p>
                </div>
            </div>
            <div className={style.musicOtherInfo}>
                <div className={style.musicLength}>2:52</div>
            </div>
        </div>
    )
}

export default MusicItem