import Table from '../../scraper/Table'
import TransfermarktSpieler from './TransfermarktSpieler'

const Spielerliste = html => {
    return Table(html, 'spieler', 12, TransfermarktSpieler).reduce(addSpieler, {ids: [], data:{}})
}

const addSpieler = (spielerList, spieler) => {
    spielerList.ids.push(spieler.id)
    spielerList.data[spieler.id] = spieler

    return spielerList
}

export default Spielerliste