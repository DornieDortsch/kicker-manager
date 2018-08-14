import TestFile from '../scraper/TestFile'

import Transfermarkt from './Transfermarkt'

describe('Table', () => {

    test('create Transfermarkt', () => {
        // Given
        const html = TestFile.loadHTML('./lib/scraper/TableTransfermarkt.test.html')
        
        // When
        const playerMap = Transfermarkt(html)
        const firstPlayerId = playerMap.keys().next().value
        const firstPlayer = playerMap.get(firstPlayerId)

        // Then
        expect(playerMap.size).toBe(436)
        expect(firstPlayer.name).toBe('Baumann, Oliver')
    })

    test('create Transfermarkt with empty html', () => {
        // Given
        const html = ''
        
        // When
        const playerMap = Transfermarkt(html)

        // Then
        expect(playerMap.size).toBe(0)
    })
})