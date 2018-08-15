import TransfermarktUpdate from './TransfermarktUpdate'
import KickerClient from '../KickerClient'
import FileCache from '../FileCache'

import config from '../config'

describe('TransfermarktUpdate', () => {

    // Given
    const client = KickerClient(config.kicker)
    const repository = FileCache('./data/repository')
    const cache = FileCache('./data/cache')
    
    afterEach(() => {
        repository.clear()
        cache.clear()
    })
    
    test('init', async () => {
        
        // Given
        const objectUnderTest = TransfermarktUpdate(client, repository, cache)
        
        // When
        await objectUnderTest.update()
        
        // Then
        expect(objectUnderTest.changes()).not.toEqual([])
        expect(objectUnderTest.transfermarkt()).not.toEqual(new Map())
    })
})