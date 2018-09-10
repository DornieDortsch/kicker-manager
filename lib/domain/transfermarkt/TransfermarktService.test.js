import TransfermarktService from './TransfermarktService'
import TestFile from '../../scraper/TestFile'

describe('TransfermarktService', () => {

    // Given
    const transfermarktData = {
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
    }

    const clientMock = {
        crawl: () => {
            return {
                status: 200,
                body: TestFile.loadHTML('./lib/scraper/TableTransfermarkt.test.html')
            }
        }
    }
    const repositoryMock = transfermarktData => {
        return {
            readCollection: () => {
                return { 'trasnfermark.json': transfermarktData }
            },
            writeCollection: (name, content) => Promise.resolve()
        }
    }
    const cacheMock = transfermarktData => {
        return {
            read: () => {
                return {
                    path: 'transfermarkt/transfermarkt.json',
                    content: transfermarktData ? JSON.stringify(transfermarktData) : undefined
                }
            },
            write: () => {}
        }
    }
    
    test('default value', async () => {
        
        // When
        const objectUnderTest = TransfermarktService(clientMock, repositoryMock(), cacheMock())
        await objectUnderTest.init()
        
        // Then
        expect(objectUnderTest.player().ids.length).toBe(0)
        
        const offers = objectUnderTest.offers()
        expect(offers.dates.length).toBe(0)
        expect(offers.actions).toEqual({})
    })
    
    test('init from repository', async () => {

        // When
        const objectUnderTest = TransfermarktService(clientMock, repositoryMock(transfermarktData), cacheMock())
        await objectUnderTest.init()
        
        // Then
        expect(objectUnderTest.player().ids.length).toBe(1)
        
        const offers = objectUnderTest.offers()
        expect(offers.dates.length).toBe(0)
        expect(offers.actions).toEqual({})
    })
    
    test('init from cache', async () => {
        
        // When
        const objectUnderTest = TransfermarktService(clientMock, repositoryMock(), cacheMock(transfermarktData))
        await objectUnderTest.init()

        // Then
        expect(objectUnderTest.player().ids.length).toBe(1)
        
        const offers = objectUnderTest.offers()
        expect(offers.dates.length).toBe(0)
    })

    test('update', async () => {
        
        // When
        const objectUnderTest = TransfermarktService(clientMock, repositoryMock(transfermarktData), cacheMock())
        await objectUnderTest.init()
        await objectUnderTest.update()
        
        // Then
        expect(objectUnderTest.player().ids.length).toBe(436)
        
        const offers = objectUnderTest.offers()
        expect(offers.dates.length).toBe(1)
        expect(offers.actions[offers.dates[0]].length).toBe(437)
    })
})