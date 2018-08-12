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
        
        const $columns = teamSpy.mock.calls[0][0]
        expect($columns.eq(0).text().trim()).toEqual('FC Augsburg')
    })
})