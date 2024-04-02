import BlocksList from "../components/BlocksList"

function AlbumsPage() {

    let bg = 'https://images.unsplash.com/photo-1629946832022-c327f74956e0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    let blockChooseArr = [
        { id: 1, title: 'Album 1', background: bg},
        { id: 2, title: 'Album 2', background: bg},
        { id: 3, title: 'Album 3', background: bg},
        { id: 4, title: 'Album 4', background: bg}
    ]

    return (
        <main>
            <h1>Albums page</h1>
            <BlocksList data={blockChooseArr} withoutAnimation={true}/>
        </main>
    )
}

export default AlbumsPage