import style from './Search.module.scss'
import MusicItem from '../MusicList/items/MusicItem'
import PreviousButton from '../UI/PreviousButton'
import { songsdata } from '../PlayerApp/audios.js';
import { useState } from 'react';

function Search() {

    const [searchData, setSearchData] = useState([])

    const [inputValue, setInputValue] = useState('')


    // получение данных музыки для поиска
    function searchFunc(value) {

        setInputValue(value)

        // надо тут реализовать сохранение значения сердец

        fetch(`http://localhost:8080/search?q=${value}`)
            .then(res => res.json())
            .then(data => {
                if (data && value) {
                    setSearchData(data.music)
                }
                else if (data && !value) {
                    setSearchData([])
                    console.log(searchData)
                }
                else {
                    setSearchData([])
                    console.log(searchData)
                }
            })

    }

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
                        songsdata.map(elem =>
                            <MusicItem key={elem.id} id={elem.id} title={elem.title} performer={elem.performer} img={elem.cover} />
                        )
                    }

                    {searchData ?

                        searchData.map(elem =>
                            // <MusicItem key={elem.id} id={elem.id} title={elem.name} performer={elem.performer} img={`http://localhost:8080/image/music/${elem.id}`} />
                            <MusicItem key={elem.id} id={elem.id} title={elem.name} performer={elem.performer} img={`http://localhost:8080/image/music/${elem.id}`} />
                        )
                        :
                        songsdata.map(elem =>
                            <MusicItem key={elem.id} id={elem.id} title={elem.title} performer={elem.performer} img={elem.cover} />
                        )

                    }

                </div>
            </div>



        </div>
    )
}

export default Search