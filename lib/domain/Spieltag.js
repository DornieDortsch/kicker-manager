import Table from '../scraper/Table'

const Spieltag = (html) => {
    return Table(html, 'User-History', 6, () => true).get().length
}

export default Spieltag