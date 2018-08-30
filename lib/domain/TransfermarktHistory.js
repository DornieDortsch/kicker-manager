import Table from '../scraper/Table'

const TransfermarktHistoryScraper = (html, factory) => {
    return Table(html, 'spieler', 8, factory).get()
}

export default TransfermarktHistoryScraper