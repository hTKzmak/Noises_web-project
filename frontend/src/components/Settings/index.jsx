import { Link } from "react-router-dom"
import style from './Settings.module.scss'
import ButtonElem from "../UI/ButtonElem"
import { useState } from "react"

function Settings() {

    let [showWindow, setShowWindow] = useState(false)

    function deleteAccountFunc() {
        localStorage.clear()
        window.location.assign('/')
    }

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <a href='https://github.com/hTKzmak/Noises_web-project'>Product info</a>
                    </li>
                    <li>
                        <a href="https://collegemirbis-my.sharepoint.com/personal/melnikovsi21_st_ithub_ru/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fmelnikovsi21%5Fst%5Fithub%5Fru%2FDocuments%2FNoises%20tutorial%2FNoises%20documentation%2Epdf&parent=%2Fpersonal%2Fmelnikovsi21%5Fst%5Fithub%5Fru%2FDocuments%2FNoises%20tutorial&ga=1">Documentation</a>
                    </li>
                    <li>
                        <a id="warning" href='/' onClick={() => localStorage.clear()}>Log out</a>
                    </li>
                    <li id="warning" onClick={() => setShowWindow(!showWindow)}>
                        Delete account
                    </li>
                </ul>
            </nav>

            {!showWindow ? null :
                <div className={style.modalWindow_bg}>
                    <div className={style.modalWindow}>
                        <h1>Are you sure what you want to delete your account?</h1>
                        <p>If you delete, you will never restore your account</p>

                        <div className={style.modalWindow_btn}>
                            <ButtonElem title={'Delete'} warning={true} onclick={() => deleteAccountFunc()} />
                            <ButtonElem title={'Come back'} onclick={() => setShowWindow(!showWindow)} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Settings