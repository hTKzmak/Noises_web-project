import style from './Header.module.scss'
import { ReactComponent as Search } from './assets/search.svg'
import { ReactComponent as Logo } from './assets/logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Header() {

    let localStorageData = localStorage.getItem('userData')
    let JSONData = JSON.parse(localStorageData)

    let [showWindow, setShowWindow] = useState(false)


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
                        <div className={style.userIcon} style={{ backgroundImage: `url('https://ace.edu/wp-content/uploads/2022/02/user-thumbnail-icon.png')` }}></div>
                        <p>User Name</p>
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
                            <ul>
                                <Link to={'/playlists'}>
                                    <li onClick={() => setShowWindow(false)}>Playlists</li>
                                </Link>
                                <Link to={'/settings'}>
                                    <li onClick={() => setShowWindow(false)}>Settings</li>
                                </Link>
                                <li onClick={() => setShowWindow(false)} id={style.warning}>
                                    Log out
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            )}
        </header>
    )
}

export default Header