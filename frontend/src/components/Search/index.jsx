import style from './Search.module.scss'
import MusicItem from '../MusicList/items/MusicItem'
import PreviousButton from '../UI/PreviousButton'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';

function Search() {

    const { setSongs, allSongs } = useContext(Context)

    const [searchData, setSearchData] = useState([])

    const [inputValue, setInputValue] = useState('')

    // // получение данных музыки для поиска
    function searchFunc(value) {

        setInputValue(value)

        fetch(`http://localhost:8080/search?q=${value}`)
            .then(res => res.json())
            .then(data => {
                if (value) {
                    if (data && data.music && data.music.length > 0) {
                        setSearchData(data.music)
                        setSongs(data.music)
                    }
                    else {
                        setSearchData([])
                        setSongs(allSongs)
                        console.log(searchData)
                    }
                }
                else {
                    setSearchData([])
                    setSongs(allSongs)
                    console.log(searchData)
                }
            })

    }

    // получаем все треки
    useEffect(() => {
        fetch('http://localhost:8080/all-tracks')
            .then(res => res.json())
            .then(data => setSongs(data))
    }, [])

    return (
        <div>
            <div className={style.searchHeader}>
                <PreviousButton />
                <input className={style.searchInput} type="text" placeholder="Search music" onChange={(event) => searchFunc(event.target.value)} />
            </div>
            <div className="searchResult">
                <div className={style.musicList}>
                    <p className={style.searchTitle}>{inputValue === '' ? 'All music' : 'Search result'}</p>

                    {inputValue === '' &&
                        allSongs.map(elem =>
                            <MusicItem key={elem.id} id={elem.id} name={elem.name} performer={elem.performer} img={`http://localhost:8080/image/music/${elem.id}`} />
                        )
                    }

                    {searchData ?

                        searchData.map(elem =>
                            <MusicItem key={elem.id} id={elem.id} name={elem.name} performer={elem.performer} img={`http://localhost:8080/image/music/${elem.id}`} />
                        )
                        :
                        allSongs.map(elem =>
                            <MusicItem key={elem.id} id={elem.id} name={elem.name} performer={elem.performer} img={`http://localhost:8080/image/music/${elem.id}`} />
                        )

                    }

                </div>
            </div>



        </div>
    )
}

export default Search