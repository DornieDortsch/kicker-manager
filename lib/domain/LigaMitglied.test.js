import TestFile from '../scraper/TestFile'

import Mitglied from './LigaMitglied'

describe('Mitglied', () => {

    test('create Mitglied', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/LigaMitglied.test.html')

        // When
        const objectUnderTest = Mitglied(columns)

        // Then
        expect(objectUnderTest.name).toEqual('Breitner*Eleven')
        expect(objectUnderTest.points).toEqual(40)
        expect(objectUnderTest.budget).toEqual(50.8)
    })
})