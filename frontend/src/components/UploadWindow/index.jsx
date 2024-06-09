import style from './UploadWindow.module.scss'
import ButtonElem from '../UI/ButtonElem'
import InputElem from '../UI/InputElem'
import { useState } from 'react';

function UploadWindow({ showUpload, setShowUpload }) {

    // если localstorage будет null, то будет пустой массив
    const storedObject = JSON.parse(localStorage.getItem('userData')) || [];
    let token = storedObject.token

    let [resMessage, setResMessage] = useState('')

    // ф-ия для отправки музыки
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        };
        const response = await fetch('http://localhost:8080/upload', requestOptions);

        setResMessage(response.status)
        console.log(response)
    }


    // ф-ия для закрытия окна
    function closeUpload(){
        setShowUpload(false)
        setResMessage('')
    }

    // мы получаем данные/значения из input с помощью атрибута name и тега form

    return (
        <div className={style.modalWindow_bg} style={{ display: !showUpload ? 'none' : 'flex' }}>
            <form className={style.modalWindow} onSubmit={handleSubmit} encType="multipart/form-data">
                <span>Upload your music</span>

                <div className={style.fileInfo}>
                    <label htmlFor="musicName">
                        <InputElem type={'text'} name={'musicName'} placeholder={'Music name'} maxLength={40} />
                    </label>
                    <div className={style.other}>
                        <label htmlFor="file1">
                            File:
                            <InputElem type={'file'} name={'files'} accept={".mp3"} />
                        </label>
                        <label htmlFor="file2">
                            Image:
                            <InputElem type={'file'} name={'files'} accept={".png, .jpg, .gif"} />
                        </label>
                    </div>
                </div>

                {resMessage === 400 && (
                    <span id={style.message}>We can't upload your music</span>
                )}
                {resMessage === 200 && (
                    <span id={style.message}>Music is uploaded</span>
                )}

                <div className={style.modalWindow_btn}>
                    <ButtonElem title={'Upload'} type={'submit'} />
                    <input type="button" onClick={() => closeUpload()} value={'Cancel'} />
                </div>
            </form>
        </div>
    )
}

export default UploadWindow