import BlocksList from "../components/BlocksList"

function PerformersPage(){

    let bg = 'https://images.unsplash.com/photo-1634017759716-1784f7c57795?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    let blockChooseArr = [
        { id: 1, title: 'Performer 1', background: bg},
        { id: 2, title: 'Performer 2', background: bg},
        { id: 3, title: 'Performer 3', background: bg},
        { id: 4, title: 'Performer 2', background: bg},
        { id: 5, title: 'Performer 3', background: bg},
        { id: 6, title: 'Performer 4', background: bg}
    ]


    return(
        <main>
            <h1>Performers Page</h1>
            <BlocksList data={blockChooseArr} withoutAnimation={true}/>
        </main>
    )
}

export default PerformersPage