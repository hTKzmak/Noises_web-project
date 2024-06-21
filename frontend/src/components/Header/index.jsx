import style from './Header.module.scss'
import { ReactComponent as Search } from './assets/search.svg'
import { ReactComponent as Logo } from './assets/logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import UploadWindow from '../ModalWindow/UploadWindow'

function Header() {

    let localStorageData = localStorage.getItem('userData')
    let JSONData = JSON.parse(localStorageData)

    let [showWindow, setShowWindow] = useState(false)

    // для отображения окна для загрузки своей музыки 
    let [showUpload, setShowUpload] = useState(false)

    function showUploadFunc(){
        setShowUpload(true)
        setShowWindow(false)
    }


    return (
        <header>
            <Link to={'/search'}>
                <div className="search">
                    <button className={style.searchBtn}><Search /></button>
                </div>
            </Link>
            <Link to={'/'}>
                <div className={style.logo}>
                    <Logo />
                </div>
            </Link>
            {!localStorageData ? (
                <Link to={'/login'}>
                    <div className={style.user}>
                        <div className={style.userInfo}>
                            <div className={style.userIcon} style={{ backgroundImage: `url('https://ace.edu/wp-content/uploads/2022/02/user-thumbnail-icon.png')` }}></div>
                            <p>User Name</p>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className={style.user}>
                    <div className={style.userInfo} onClick={() => setShowWindow(!showWindow)}>
                        <div className={style.userIcon} style={{ backgroundImage: `url(${JSONData.img})` }}></div>
                        <p>{JSONData.name}</p>
                    </div>

                    {showWindow &&
                        <div className={style.window} onMouseLeave={() => setShowWindow(false)}>
                            <span>{JSONData.name}</span>
                            <ul>
                                <li onClick={() => showUploadFunc()}>Upload music</li>
                                <Link to={'/your_music'}>
                                    <li onClick={() => setShowWindow(false)}>Your music</li>
                                </Link>
                                <Link to={'/playlists'}>
                                    <li onClick={() => setShowWindow(false)}>Playlists</li>
                                </Link>
                                <Link to={'/settings'}>
                                    <li onClick={() => setShowWindow(false)}>Settings</li>
                                </Link>
                                <li onClick={() => setShowWindow(false)}>
                                    <a href="/" id="warning" onClick={() => localStorage.clear()}>Log out</a>
                                </li>
                            </ul>
                        </div>
                    }
                </div>

            )}
            <UploadWindow showUpload={showUpload} setShowUpload={setShowUpload}/>
        </header>
    )
}

export default Header