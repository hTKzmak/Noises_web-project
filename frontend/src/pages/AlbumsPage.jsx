import BlocksList from "../components/BlocksList"
import PreviousButton from "../components/UI/PreviousButton"

function AlbumsPage() {

    let bg = 'https://images.unsplash.com/photo-1629946832022-c327f74956e0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    let blockChooseArr = [
        { id: 1, title: 'Album 1', background: bg},
        { id: 2, title: 'Album 2', background: bg},
        { id: 3, title: 'Album 3', background: bg},
        { id: 4, title: 'Album 4', background: bg},
        { id: 5, title: 'Album 5', background: bg},
        { id: 6, title: 'Album 6', background: bg},
        { id: 7, title: 'Album 7', background: bg},
        { id: 8, title: 'Album 8', background: bg},
        { id: 9, title: 'Album 9', background: bg},
        { id: 10, title: 'Album 10', background: bg},
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