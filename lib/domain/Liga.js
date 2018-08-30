import Table from '../scraper/Table'

const Liga = (html, factory) => {
    return Table(html, 'Spieltagswertung', 4, factory).get()
}

export default Liga