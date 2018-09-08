import TestFile from '../scraper/TestFile'

import Transfermarkt from './Transfermarkt'

describe('Table', () => {

    test('create Transfermarkt', () => {
        // Given
        const html = TestFile.loadHTML('./lib/scraper/TableTransfermarkt.test.html')
        
        // When
        const transfermarkt = Transfermarkt(html)
        const spielerId = transfermarkt.ids[0]
        const spieler = transfermarkt.data[spielerId]

        // Then
        expect(transfermarkt.ids.length).toBe(436)
        expect(spieler.name).toBe('Baumann, Oliver')
    })

    test('create Transfermarkt with empty html', () => {
        // Given
        const html = ''
        
        // When
        const transfermarkt = Transfermarkt(html)

        // Then
        expect(transfermarkt.ids.length).toBe(0)
    })
})