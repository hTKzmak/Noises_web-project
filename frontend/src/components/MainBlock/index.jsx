import { useContext, useState } from 'react'
import style from './MainBlock.module.scss'
import { ReactComponent as Randomizer } from './images/randomizer.svg'
import { Context } from '../../context/Context'
import { songsdata } from '../PlayerApp/audios.js';

function MainBlock() {
    // изначальное значение заднего фона (если в SS будет значение, то используем его значение чтобы после перехода неа другие страницы задний фон оставался таким же)
    const [background, setBackground] = useState(sessionStorage.getItem('background') == null ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2s2MThqOHR1dDVzYWIwc2J4bDdhYWRrMWs5d3V0bzd0eXBvc3d1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sdlh2SCTiASAgtwyyU/giphy.gif' : sessionStorage.getItem('background'))

    // данные о пользователе с LocalStorage
    let localStorageData = localStorage.getItem('userData')
    let JSONData = JSON.parse(localStorageData)


    const { setShowPlayer, setIsPlaying, setChoosenSong, latestMusic, setLatestMusic } = useContext(Context)


    // функция по изменению заднего фона
    function randomBackground() {
        const array = ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGgwenp2cm9udGhzMGFrbzEwaXJlOWxlZTNodnl4eHV6dnU0cXdnYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2A4E5BJitSAsL8fYGi/giphy.gif",
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

    // функция для воспроизведения музыки из основного блока. Функция будет воспроизводить рандомную музыку.
    function startPlay() {
        setIsPlaying(false)
        setShowPlayer(true)
    
        // рандомайзер воспроизведения музыки
        const randomSong = songsdata[Math.floor(Math.random() * songsdata.length)];
        setChoosenSong(randomSong);
    
        // добавление выбранной музыки в массив latest music
        if (!latestMusic.find(elem => elem.id === randomSong.id)) {
            setLatestMusic(prevState => [...prevState, randomSong]);
            console.log(latestMusic)
        }
    
        // но почему-то когда появляется первая песня, то она пока не добавляется, а появляется пустой массив

    }

    return (
        <div className={style.mainBlockItem} style={{ backgroundImage: `url(${background})` }}>
            <div className="mainBlockItem_title">
                <h1>Welcome to Noises</h1>
                <p>{!localStorageData ? 'Music for new user' : `Music for you, ${JSONData.name}`}</p>
            </div>
            <div className={style.playButton} onClick={() => startPlay()}>
                <Randomizer />
            </div>
        </div>
    )
}

export default MainBlock