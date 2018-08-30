import fs from 'fs'
import TestFile from './TestFile'

import Select from './Select'

describe('Select', () => {
    
    test('Select with Transfermarkt History HTML Page', () => {
        // Given
        const html = TestFile.loadHTML('./lib/scraper/Select.test.html')
        const factory = $option => $option.val()

        // When
        const spieltage = Select(html, 'ctl00_PlaceHolderContent_ctl00_ctl00_spieltag', factory)
        
        // Then
        expect(spieltage.length).toBe(2)
        expect(spieltage[0]).toBe("2")
        expect(spieltage[1]).toBe("1")
    })

})