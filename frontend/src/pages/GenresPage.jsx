import BlocksList from "../components/BlocksList"

function GenresPage(){

    let bg = 'https://images.unsplash.com/photo-1634118931958-f1cf1f9c6156?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    let blockChooseArr = [
        { id: 1, title: 'Genre 1', background: bg},
        { id: 2, title: 'Genre 2', background: bg},
        { id: 3, title: 'Genre 3', background: bg},
    ]

    return(
        <main>
            <h1>Genres Page</h1>
            <BlocksList data={blockChooseArr} withoutAnimation={true}/>
        </main>
    )
}

export default GenresPage