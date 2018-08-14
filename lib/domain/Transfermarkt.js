import Table from '../scraper/Table'
import TransfermarktSpieler from './TransfermarktSpieler'

const Transfermarkt = html => {
    return Table(html, 'spieler', 12, TransfermarktSpieler).get().reduce(idMap, new Map())
}

const idMap = (map, currentPlayer) => {
    map.set(currentPlayer.id, currentPlayer)

    return map
}

export default Transfermarkt