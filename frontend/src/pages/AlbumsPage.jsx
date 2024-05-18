import BlocksList from "../components/BlocksList"
import PreviousButton from "../components/UI/PreviousButton"
import bg from '../assets/images/undefined.png'

function AlbumsPage() {

    let blockChooseArr = [
        { id: 1, title: 'Album 1', background: bg, href: '/music'},
        { id: 2, title: 'Album 2', background: bg, href: '/music'},
        { id: 3, title: 'Album 3', background: bg, href: '/music'},
        { id: 4, title: 'Album 4', background: bg, href: '/music'},
        { id: 5, title: 'Album 5', background: bg, href: '/music'},
        { id: 6, title: 'Album 6', background: bg, href: '/music'},
        { id: 7, title: 'Album 7', background: bg, href: '/music'},
        { id: 8, title: 'Album 8', background: bg, href: '/music'},
        { id: 9, title: 'Album 9', background: bg, href: '/music'},
        { id: 10, title: 'Album 10', background: bg, href: '/music'},
    ]

    return (
        <main>
            <div className="title">
                <PreviousButton />
                <h1>List of  Albums</h1>
            </div>
            <BlocksList data={blockChooseArr} withoutAnimation={true}/>
        </main>
    )
}

export default AlbumsPage