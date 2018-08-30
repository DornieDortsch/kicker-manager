import TestFile from '../scraper/TestFile'

import TransfermarktHistory from './TransfermarktHistory'

describe('TransfermarktHistory', () => {

    test('create TransfermarktHistory', () => {
        // Given
        const html = TestFile.loadHTML('./lib/domain/TransfermarktHistory.test.html')

        const factoryMock = jest.fn().mockReturnValue(Object.create(null));
        
        // When
        const transfers = TransfermarktHistory(html, factoryMock)
        
        // Then
        expect(Array.isArray(transfers)).toBe(true)
        expect(transfers.length).toBe(4)
        expect(factoryMock.mock.calls.length).toBe(4)
    })

    test('create TransfermarktHistory when html undefined', () => {
        // Given
        const factoryMock = jest.fn().mockReturnValue(Object.create(null));
        
        // When
        const transfers = TransfermarktHistory(undefined, factoryMock)
        
        // Then
        expect(Array.isArray(transfers)).toBe(true)
        expect(transfers.length).toBe(0)
        expect(factoryMock.mock.calls.length).toBe(0)
    })
})