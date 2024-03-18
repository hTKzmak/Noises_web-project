import style from './MainBlock.module.scss'

function Block() {
    return (
        <div className={style.mainBlockItem}>
            <div className="mainBlockItem_title">
                <h1>Hello Design</h1>
                <p>Music for new user</p>
            </div>
            <div className="playButton">
                <a target='_black' href='https://youtu.be/GWKpgh1nqrI?si=VTctoVaLhQhRhs2j'>типа плей бтн</a>
            </div>
        </div>
    )
}

export default Block