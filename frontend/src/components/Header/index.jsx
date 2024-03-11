import style from './Header.module.css'
import { ReactComponent as Search } from './media/search.svg'

function Header() {
    return (
        <header>
            <div className="search">
                <button className={style.searchBtn}><Search/></button>
            </div>
            <div className={style.user}>
                <div className={style.userIcon} style={{backgroundImage: `url('https://ace.edu/wp-content/uploads/2022/02/user-thumbnail-icon.png')`}}></div>
                <p>User Name</p>
            </div>
        </header>
    )
}

export default Header