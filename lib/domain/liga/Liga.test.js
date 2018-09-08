import TestFile from '../../scraper/TestFile'

import Liga from './Liga'

describe('Liga', () => {

    test('create Liga', () => {
        // Given
        const html = TestFile.loadHTML('./lib/domain/liga/Liga.test.html')

        const factoryMock = jest.fn().mockReturnValue(Object.create(null));
        
        // When
        const mitglieder = Liga(html, factoryMock)
        
        // Then
        expect(Array.isArray(mitglieder)).toBe(true)
        expect(mitglieder.length).toBe(18)
        expect(factoryMock.mock.calls.length).toBe(18)
    })

    test('create Liga when html undefined', () => {
        // Given
        const factoryMock = jest.fn().mockReturnValue(Object.create(null));
        
        // When
        const mitglieder = Liga(undefined, factoryMock)
        
        // Then
        expect(Array.isArray(mitglieder)).toBe(true)
        expect(mitglieder.length).toBe(0)
        expect(factoryMock.mock.calls.length).toBe(0)
    })
})