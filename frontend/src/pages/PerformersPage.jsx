import BlocksList from "../components/BlocksList"
import PreviousButton from "../components/UI/PreviousButton"
import bg from '../assets/images/undefined.png'

function PerformersPage(){

    let blockChooseArr = [
        { id: 1, title: 'Performer 1', background: bg, href: '/music'},
        { id: 2, title: 'Performer 2', background: bg, href: '/music'},
        { id: 3, title: 'Performer 3', background: bg, href: '/music'},
        { id: 4, title: 'Performer 2', background: bg, href: '/music'},
        { id: 5, title: 'Performer 3', background: bg, href: '/music'},
        { id: 6, title: 'Performer 4', background: bg, href: '/music'}
    ]


    return(
        <main>
            <div className="title">
                <PreviousButton />
                <h1>List of Performers</h1>
            </div>
            <BlocksList data={blockChooseArr} withoutAnimation={true}/>
        </main>
    )
}

export default PerformersPage