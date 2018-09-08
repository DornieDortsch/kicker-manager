import TestFile from '../../scraper/TestFile'

import Spieltag from './Spieltag'

describe('Spieltag', () => {

    test('get Spieltag', () => {
        // Given
        const html = TestFile.loadHTML('./lib/domain/liga/Liga.test.html')

        // When
        const spieltag = Spieltag(html)
        
        // Then
        expect(spieltag).toBe(1)
    })
})