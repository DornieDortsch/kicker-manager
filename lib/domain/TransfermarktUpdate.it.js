import TransfermarktUpdate from './TransfermarktUpdate'
import KickerClient from '../KickerClient'
import FileCache from '../FileCache'

import config from '../config'

describe('TransfermarktUpdate', () => {

    // Given
    const client = KickerClient(config.kicker)
    const repository = FileCache('./repository')
    const cache = FileCache('./cache')
    
    afterEach(() => {
        //fs.removeSync(cachePath)
    })
    
    test('init', () => {
        
        // Given
        const objectUnderTest = TransfermarktUpdate(client, repository, cache)
        
        // When
        const body = objectUnderTest.update()

        console.log(body)
        console.log(body)
        console.log(body)
        console.log(body)
        console.log(body)
        
        // Then
        expect(objectUnderTest.transfermarkt).toEqual({})
    })
})