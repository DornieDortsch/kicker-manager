import Table from '../scraper/Table'

const Liga = (html, factory) => {
    return Table(html, 'Ligenbewerber', 4, factory).get()
}

export default Liga