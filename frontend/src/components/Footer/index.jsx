import style from './Footer.module.scss'

function Footer(){
    return(
        <footer>
            <p>© 2024 “Noises”</p>
            <a className={style.githubLink} href="https://github.com/hTKzmak/Noises_web-project">GitHub repository</a>
        </footer>
    )
}

export default Footer