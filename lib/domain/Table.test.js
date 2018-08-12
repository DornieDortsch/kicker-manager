import fs from 'fs'
import Table from './Table'

describe('Table', () => {
    
    test('Table with Team HTML Page', () => {
        // Given
        const html = fs.readFileSync('./lib/domain/TableTeam.test.html', { encoding: 'UTF-8' })

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
        const html = fs.readFileSync('./lib/domain/TableTransfermarkt.test.html', { encoding: 'UTF-8' })

        const spielerSpy = jest.fn()
        
        // When
        Table(html, 'spieler', 12, spielerSpy)

        // Then
        expect(spielerSpy.mock.calls.length).toBe(436)

        const columns = spielerSpy.mock.calls[0][0]
        expect(columns.text(0)).toEqual('Baumann, Oliver')
    })
})