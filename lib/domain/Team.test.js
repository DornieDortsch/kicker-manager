import fs from 'fs'
import $ from 'cheerio'
import Team from './Team'

describe('TeamList', () => {
    // Given
    const html = fs.readFileSync('./lib/domain/Team.test.html', { encoding: 'UTF-8' })
    const $columns = $(html).children()

    test('create Team', () => {
        // When
        const team = Team($columns)

        // Then
        expect(team.name()).toEqual('FC Augsburg')
        expect(team.kaderLink()).toEqual('http://www.kicker.de/news/fussball/bundesliga/vereine/1-bundesliga/2018-19/fc-augsburg-91/kader.html')
    })
})