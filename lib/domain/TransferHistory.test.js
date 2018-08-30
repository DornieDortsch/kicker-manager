import TestFile from '../scraper/TestFile'

import TransferHistory from './TransferHistory'

describe('TransferHistory', () => {

    test('create TransferHistory', () => {
        // Given
        const html = TestFile.loadHTML('./lib/domain/TransferHistory.test.html')

        const factoryMock = jest.fn().mockReturnValue(Object.create(null));
        
        // When
        const transfers = TransferHistory(html, factoryMock)
        
        // Then
        expect(Array.isArray(transfers)).toBe(true)
        expect(transfers.length).toBe(4)
        expect(factoryMock.mock.calls.length).toBe(4)
    })

    test('create TransferHistory when html undefined', () => {
        // Given
        const factoryMock = jest.fn().mockReturnValue(Object.create(null));
        
        // When
        const transfers = TransferHistory(undefined, factoryMock)
        
        // Then
        expect(Array.isArray(transfers)).toBe(true)
        expect(transfers.length).toBe(0)
        expect(factoryMock.mock.calls.length).toBe(0)
    })
})