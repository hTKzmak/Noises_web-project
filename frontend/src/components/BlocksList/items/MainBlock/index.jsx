import { useState } from 'react'
import style from './MainBlock.module.scss'
import { ReactComponent as PlayBtn } from './images/play.svg'
import { ReactComponent as PauseBtn } from './images/pause.svg'

function Block() {
    // плеер
    const [played, setPlayed] = useState(false)

    // изначальное значение заднего фона (если в SS будет значение, то используем его значение чтобы после перехода неа другие страницы задний фон оставался таким же)
    const [background, setBackground] = useState(sessionStorage.getItem('background') == null ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2s2MThqOHR1dDVzYWIwc2J4bDdhYWRrMWs5d3V0bzd0eXBvc3d1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sdlh2SCTiASAgtwyyU/giphy.gif' : sessionStorage.getItem('background'))


    // функция по изменению заднего фона
    function randomBackground() {
        const array = ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnY5cm43aWRya3B2eWRibjQzZWNjOXluYWd0cW41b3FtamZoZ2R6MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TqkuOoKtmYI80/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWR1ZWljc3Z4Y2sza3Y3cDl1bXU5NG5lZHRjaGR1dDJhZTRicWYxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SKVrls59hoqL861ezx/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGdndHM0dnl6YnY4b2dzdG4zNHl0ZnR5Znp6anhlMjZ4bzBxajdnciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tObuxzmlzUM0kC1K05/giphy-downsized-large.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2s2MThqOHR1dDVzYWIwc2J4bDdhYWRrMWs5d3V0bzd0eXBvc3d1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sdlh2SCTiASAgtwyyU/giphy.gif"];

        const randomIndex = Math.floor(Math.random() * array.length);
        const randomItem = array[randomIndex]
        sessionStorage.setItem('background', randomItem)

        setBackground(randomItem)
    }

    // вызов функции при обновлении/изменении страницы
    window.addEventListener('load', () => {
        randomBackground()
    })

    return (
        <div className={style.mainBlockItem} style={{ backgroundImage: `url(${background})` }}>
            <div className="mainBlockItem_title">
                <h1>Welcome to Noises</h1>
                <p>Music for new user</p>
            </div>
            <div className={style.playButton} onClick={() => setPlayed(!played)}>
                {played ? <PauseBtn /> : <PlayBtn />}
            </div>
        </div>
    )
}

export default Block