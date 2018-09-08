import TestFile from '../../scraper/TestFile'

import Mitglied from './LigaMitglied'

describe('Mitglied', () => {

    test('create Mitglied', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/liga/LigaMitglied.test.html')

        // When
        const objectUnderTest = Mitglied(columns)

        // Then
        expect(objectUnderTest.id).toEqual('582180')
        expect(objectUnderTest.name).toEqual('Breitner*Eleven')
        expect(objectUnderTest.points).toEqual(40)
        expect(objectUnderTest.budget).toEqual(50.8)
    })
})