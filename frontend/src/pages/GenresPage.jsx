import BlocksList from "../components/BlocksList"
import PreviousButton from "../components/UI/PreviousButton"
import bg from '../assets/images/undefined.png'

function GenresPage({genresStyle}) {

    let blockChooseArr = [
        { id: 1, title: 'Genre 1', background: bg, href: '/music' },
        { id: 2, title: 'Genre 2', background: bg, href: '/music' },
        { id: 3, title: 'Genre 3', background: bg, href: '/music' },
    ]

    return (
        <main>
            <div className="title">
                <PreviousButton />
                <h1>List of Genres</h1>
            </div>
            <BlocksList data={blockChooseArr} withoutAnimation={true} genresStyle={genresStyle}/>
        </main>
    )
}

export default GenresPage