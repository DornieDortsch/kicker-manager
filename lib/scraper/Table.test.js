import fs from 'fs'
import TestFile from './TestFile'

import Table from './Table'

describe('Table', () => {
    
    test('Table with Team HTML Page', () => {
        // Given
        const html = TestFile.loadHTML('./lib/scraper/TableTeam.test.html')

        const teamSpy = jest.fn()
        
        // When
        Table(html, 'Vereinsliste', 7, teamSpy)
        
        // Then
        expect(teamSpy.mock.calls.length).toBe(18)
        
        const columns = teamSpy.mock.calls[0][0]
        expect(columns.text(0)).toEqual('FC Augsburg')
        expect(columns.href(2)).toEqual('http://www.kicker.de/news/fussball/bundesliga/vereine/1-bundesliga/2018-19/fc-augsburg-91/kader.html')
    })

    test('Table with Transfermarkt HTML Page', () => {
        // Given
        const html = TestFile.loadHTML('./lib/scraper/TableTransfermarkt.test.html')

        const spielerSpy = jest.fn()
        
        // When
        Table(html, 'spieler', 12, spielerSpy)

        // Then
        expect(spielerSpy.mock.calls.length).toBe(436)

        const columns = spielerSpy.mock.calls[0][0]
        expect(columns.text(0)).toEqual('Baumann, Oliver')
    })

    test('Table with Spielerliste HTML Page', () => {
        // Given
        const html = TestFile.loadHTML('./lib/scraper/TableSpielerliste.test.html')

        const spielerSpy = jest.fn()
        
        // When
        Table(html, 'spieler', 10, spielerSpy)

        // Then
        expect(spielerSpy.mock.calls.length).toBe(514)

        const columns = spielerSpy.mock.calls[0][0]
        expect(columns.text(0)).toEqual('Adler')
    })
})