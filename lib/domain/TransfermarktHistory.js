import Table from '../scraper/Table'

const TransfermarktHistory = (html, factory) => {
    return Table(html, 'spieler', 8, factory).get()
}

export default TransfermarktHistory