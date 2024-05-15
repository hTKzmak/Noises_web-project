import style from './Header.module.scss'
import { ReactComponent as Search } from './media/search.svg'
import { ReactComponent as Logo } from './media/logo.svg'
import { Link } from 'react-router-dom'

function Header() {

    let localStorageData = localStorage.getItem('userData')
    let JSONData = JSON.parse(localStorageData)


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
                // <Link to={'/login'}>
                <div className={style.user}>
                    <div className={style.userIcon} style={{ backgroundImage: `url(${JSONData.img})` }}></div>
                    <p>{JSONData.name}</p>
                </div>
                // </Link>
            )}
        </header>
    )
}

export default Header