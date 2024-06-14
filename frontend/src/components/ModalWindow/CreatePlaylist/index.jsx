import style from './CreatePlaylist.module.scss'
import ButtonElem from '../../UI/ButtonElem'
import InputElem from '../../UI/InputElem'

function CreatePlaylist({ setShowWindow }) {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData)
    }

    return (
        <div className={style.modalWindow_bg}>
            <form className={style.modalWindow} onSubmit={handleSubmit} encType="multipart/form-data">
                <span>Create your playlist</span>

                <div className={style.fileInfo}>
                    <label htmlFor="playlistName">
                        <InputElem type={'text'} name={'playlistName'} placeholder={'Playlist name'} maxLength={40} />
                    </label>
                    <label htmlFor="file2">
                        Image:
                        <InputElem type={'file'} name={'files'} accept={".png, .jpg, .gif"} />
                    </label>
                </div>

                <div className={style.modalWindow_btn}>
                    <ButtonElem title={'Upload'} type={'submit'} />
                    <input type="button" onClick={() => setShowWindow(false)} value={'Cancel'} />
                </div>
            </form>
        </div>
    )
}

export default CreatePlaylist