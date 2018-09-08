import TestFile from '../../scraper/TestFile'

import TransfermarktSpieler from './TransfermarktSpieler'

describe('TransfermarktSpieler', () => {

    test('create TransfermarktSpieler', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/transfermarkt/TransfermarktSpieler.test.html')

        // When
        const objectUnderTest = TransfermarktSpieler(columns)

        // Then
        expect(objectUnderTest.name).toEqual('Baumann, Oliver')
        expect(objectUnderTest.id).toEqual('39245')
        expect(objectUnderTest.seller).toEqual('-')
        expect(objectUnderTest.offers).toEqual(0)
        expect(objectUnderTest.price).toEqual(3.4)
    })

    test('TransfermarktSpieler with seller', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/transfermarkt/TransfermarktSpielerWithSeller.test.html')

        // When
        const objectUnderTest = TransfermarktSpieler(columns)

        // Then
        expect(objectUnderTest.seller).toEqual('582180')
    })

})