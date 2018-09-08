import TestFile from '../../scraper/TestFile'

import Spieler from './Spieler'

describe('Spieler', () => {

    test('create Spieler', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/transfermarkt/Spieler.test.html')

        // When
        const objectUnderTest = Spieler(columns)

        // Then
        expect(objectUnderTest.name).toEqual('Baumann, Oliver')
        expect(objectUnderTest.id).toEqual('39245')
        expect(objectUnderTest.seller).toEqual('-')
        expect(objectUnderTest.offers).toEqual(0)
        expect(objectUnderTest.price).toEqual(3.4)
    })

    test('Spieler with seller', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/transfermarkt/SpielerWithSeller.test.html')

        // When
        const objectUnderTest = Spieler(columns)

        // Then
        expect(objectUnderTest.seller).toEqual('582180')
    })

})