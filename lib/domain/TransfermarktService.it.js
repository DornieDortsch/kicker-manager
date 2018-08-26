import TransfermarktService from './TransfermarktService'
import FileCache from '../FileCache'
import TestFile from '../scraper/TestFile'

describe('TransfermarktService', () => {

    // Given
    const clientMock = {
        crawl: () => {
            return {
                status: 200,
                body: TestFile.loadHTML('./lib/scraper/TableTransfermarkt.test.html')
            }
        }
    }
    const repository = FileCache('./data/test/repository')
    const cache = FileCache('./data/test/cache')

    beforeEach(() => {
        repository.write({path: 'transfermarkt/transfermarkt.json', content: '{"player":{"27824":{"name":"Foo, Bar","id":"000000","seller":"-","offers":0,"price":1.8}}, "actions": []}'})
    })

    afterEach(() => {
        repository.clear()
        cache.clear()
    })
    
    test('init', async () => {
        
        // Given
        const objectUnderTest = TransfermarktService(clientMock, repository, cache)
        
        // When
        await objectUnderTest.update()
        
        // Then
        expect(objectUnderTest.changes()).not.toEqual([])
        expect(objectUnderTest.transfermarkt()).not.toEqual({})
    })
})