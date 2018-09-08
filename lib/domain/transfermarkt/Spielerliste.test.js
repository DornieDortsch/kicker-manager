import TestFile from '../../scraper/TestFile'

import Spielerliste from './Spielerliste'

describe('Spielerliste', () => {

    test('create Spielerliste', () => {
        // Given
        const html = TestFile.loadHTML('./lib/scraper/TableTransfermarkt.test.html')
        
        // When
        const spielerliste = Spielerliste(html)
        const spielerId = spielerliste.ids[0]
        const spieler = spielerliste.data[spielerId]

        // Then
        expect(spielerliste.ids.length).toBe(436)
        expect(spieler.name).toBe('Baumann, Oliver')
    })

    test('create Spielerliste with empty html', () => {
        // Given
        const html = ''
        
        // When
        const spielerliste = Spielerliste(html)

        // Then
        expect(spielerliste.ids.length).toBe(0)
    })
})