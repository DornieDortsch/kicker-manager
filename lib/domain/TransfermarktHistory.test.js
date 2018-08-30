import TestFile from '../scraper/TestFile'

import TransfermarktHistory from './TransfermarktHistory'

describe('Transfermarkt History Scraper', () => {

    test('create Transfermarkt History', () => {
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
})