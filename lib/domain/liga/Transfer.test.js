import TestFile from '../../scraper/TestFile'

import Transfer from './Transfer'

describe('Transfer', () => {

    test('create Transfer', () => {
        // Given
        const columns = TestFile.loadColumns('./lib/domain/liga/Transfer.test.html')

        // When
        const objectUnderTest = Transfer(columns)

        // Then
        expect(objectUnderTest.player.name).toEqual('Müller, Florian')
        expect(objectUnderTest.player.id).toEqual('80766')
        expect(objectUnderTest.price).toEqual(1.8)
        expect(objectUnderTest.seller).toEqual('-')
        expect(objectUnderTest.buyer).toEqual('700717')
        expect(objectUnderTest.sellingPrice).toEqual(1.9)
        // expect(objectUnderTest.offers).toEqual(0)
    })
})