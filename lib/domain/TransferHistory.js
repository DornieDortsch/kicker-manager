import Table from '../scraper/Table'

import Transfer from './Transfer'

const TransfermarktHistory = (html, factory = Transfer) => {
    return Table(html, 'spieler', 8, factory).get()
}

export default TransfermarktHistory