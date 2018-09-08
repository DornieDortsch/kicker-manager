import TransfermarktService from './TransfermarktService'
import FileCache from '../../FileCache'
import TestFile from '../../scraper/TestFile'

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

    const initialTransfermarktFile = {
        path: 'transfermarkt/transfermarkt.json',
        content: JSON.stringify({
            "player": {
                "ids": ["000000"],
                "data": {
                    "000000":{
                        "name": "Un, Known",
                        "id": "000000",
                        "seller": "-",
                        "offers": 0,
                        "price": 0.0
                    }
                }
            },
            "actions": [],
            "offers": { 
                "dates": [],
                "actions": {}
            }
        }) 
    }
    
    afterEach(() => {
        repository.clear()
        cache.clear()
    })
    
    test('default', async () => {
        
        // Given
        repository.clear()

        // When
        const objectUnderTest = TransfermarktService(clientMock, repository, cache)
        
        // Then
        expect(objectUnderTest.player().ids.length).toBe(0)
        
        const offers = objectUnderTest.offers()
        expect(offers.dates.length).toBe(0)
        expect(offers.actions).toEqual({})
    })
    
    test('init', async () => {
        
        // Given
        repository.write(initialTransfermarktFile)
        
        // When
        const objectUnderTest = TransfermarktService(clientMock, repository, cache)

        // Then
        expect(objectUnderTest.player().ids.length).toBe(1)
        
        const offers = objectUnderTest.offers()
        expect(offers.dates.length).toBe(0)
    })

    test('update', async () => {
        
        // Given
        repository.write(initialTransfermarktFile)
        
        // When
        const objectUnderTest = TransfermarktService(clientMock, repository, cache)
        await objectUnderTest.update()
        
        // Then
        expect(objectUnderTest.player().ids.length).toBe(436)
        
        const offers = objectUnderTest.offers()
        expect(offers.dates.length).toBe(1)
        expect(offers.actions[offers.dates[0]].length).toBe(437)
    })
})