import Table from '../../scraper/Table'
import Spieler from './Spieler'

const Spielerliste = html => {
    const spielerliste = {ids: [], data:{}}
    return Table(html, 'spieler', 12, Spieler).reduce(addSpieler, spielerliste)
}

const addSpieler = (spielerliste, spieler) => {
    spielerliste.ids.push(spieler.id)
    spielerliste.data[spieler.id] = spieler

    return spielerliste
}

export default Spielerliste