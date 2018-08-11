import fs from 'fs'
import Table from './Table'

import Team from './Team'

describe('Table', () => {
    
    test('Table with Team HTML Page', () => {
        // Given
        const html = fs.readFileSync('./lib/domain/TableTeam.test.html', { encoding: 'UTF-8' })
        
        // When
        const teamTable = Table(html, 'Vereinsliste', 7, Team)

        // Then
        expect(teamTable.length).toEqual(18)

        const team = teamTable[0]
        expect(team.name()).toEqual('FC Augsburg')
        expect(team.kaderLink()).toEqual('http://www.kicker.de/news/fussball/bundesliga/vereine/1-bundesliga/2018-19/fc-augsburg-91/kader.html')
    })
})