import LigaService from './LigaService'
import TestFile from '../../scraper/TestFile'

describe('LigaService', () => {

    // Given
    const clientMock = {
        crawl: url => {
            let file = './lib/domain/liga/Liga.test.html'

            switch(url) {
                case 'http://manager.kicker.de/pro/wertungen/wertunggesamt/manben/3704795/manliga/2946':
                    file = './lib/domain/liga/Liga.test.html'
                    break
                case 'http://manager.kicker.de/pro/transfermarkt/transferhistorie/manliga/2946/manben/3704795/spieltag/1/transfer/0':
                    file = './lib/domain/liga/TransferHistory-Spieltag1.test.html'
                    break
                case 'http://manager.kicker.de/pro/transfermarkt/transferhistorie/manliga/2946/manben/3704795/spieltag/2/transfer/0':
                    file = './lib/domain/liga/TransferHistory-Spieltag2.test.html'
                    break
            }
            
            return {
                status: 200,
                body: TestFile.loadHTML(file)
            }
        }
    }

    test('init', async () => {
        
        // Given
        const objectUnderTest = LigaService(clientMock)
        
        // When
        const liga = await objectUnderTest.init()
        
        // Then
        expect(liga.spieltag).toEqual(1)

        expect(liga.mitglieder.length).toEqual(18)
        expect(liga.mitglieder[0]).toEqual('582180')
        expect(liga.mitgliederDetail['582180'].name).toEqual('Breitner*Eleven')
        expect(liga.mitgliederDetail['582180'].transfers.length).toBe(33)
        expect(liga.mitgliederDetail['582180'].budget).toBe(0.62)

    })

})