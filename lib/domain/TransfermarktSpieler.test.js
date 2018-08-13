import TestFile from './TestFile'

import TransfermarktSpieler from './TransfermarktSpieler'

describe('Transfer', () => {

    test('create Transfer', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/TransfermarktSpieler.test.html')

        // When
        const objectUnderTest = TransfermarktSpieler(columns)

        // Then
        expect(objectUnderTest.name).toEqual('Baumann, Oliver')
        expect(objectUnderTest.id).toEqual('39245')
        expect(objectUnderTest.seller).toEqual('-')
        expect(objectUnderTest.offers).toEqual(0)
        expect(objectUnderTest.price).toEqual(3.4)
    })

    test('Transfer with seller', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/TransfermarktSpielerWithSeller.test.html')

        // When
        const objectUnderTest = TransfermarktSpieler(columns)

        // Then
        expect(objectUnderTest.seller).toEqual('582180')
    })

})