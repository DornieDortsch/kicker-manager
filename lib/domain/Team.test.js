import TestFile from './TestFile'

import Team from './Team'

describe('TeamList', () => {
    
    test('create Team', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/Team.test.html')

        // When
        const team = Team(columns)

        // Then
        expect(team.name()).toEqual('FC Augsburg')
        expect(team.kaderLink()).toEqual('http://www.kicker.de/news/fussball/bundesliga/vereine/1-bundesliga/2018-19/fc-augsburg-91/kader.html')
    })
})