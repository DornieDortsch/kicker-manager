import Table from '../../scraper/Table'

import LigaMitglied from './LigaMitglied'

const Liga = (html, factory = LigaMitglied) => {
    return Table(html, 'Spieltagswertung', 4, factory)
}

export default Liga