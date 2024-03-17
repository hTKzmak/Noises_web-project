import style from './Header.module.scss'
import { ReactComponent as Search } from './media/search.svg'
import { ReactComponent as Logo } from './media/logo.svg'

function Header() {
    return (
        <header>
            <div className="search">
                <button className={style.searchBtn}><Search /></button>
            </div>
            <div className={style.logo}>
                <Logo />
            </div>
            <div className={style.user}>
                <div className={style.userIcon} style={{ backgroundImage: `url('https://ace.edu/wp-content/uploads/2022/02/user-thumbnail-icon.png')` }}></div>
                <p>User Name</p>
            </div>
        </header>
    )
}

export default Header