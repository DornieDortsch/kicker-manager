import LigaService from './LigaService'
import TestFile from '../scraper/TestFile'

describe('TransfermarktService', () => {

    // Given
    const clientMock = {
        crawl: url => {
            let file = './lib/domain/Liga.test.html'

            switch(url) {
                case 'http://manager.kicker.de/pro/wertungen/wertunggesamt/manben/3704795/manliga/2946':
                    file = './lib/domain/Liga.test.html'
                    break
                case 'http://manager.kicker.de/pro/transfermarkt/transferhistorie/manliga/2946/manben/3704795/spieltag/1/transfer/0':
                    file = './lib/domain/TransferHistory-Spieltag1.test.html'
                    break
                case 'http://manager.kicker.de/pro/transfermarkt/transferhistorie/manliga/2946/manben/3704795/spieltag/2/transfer/0':
                    file = './lib/domain/TransferHistory-Spieltag2.test.html'
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
        const Liga = await objectUnderTest.init()
        
        // Then
        expect(Liga.spieltag).toEqual(1)

        expect(Liga.mitglieder.length).toEqual(18)
        expect(Liga.mitglieder[0]).toEqual('582180')
        expect(Liga.mitgliederDetail['582180'].name).toEqual('Breitner*Eleven')
        expect(Liga.mitgliederDetail['582180'].transfers.length).toBe(33)

        Liga.mitglieder.forEach(id => console.log(Liga.mitgliederDetail[id].name + ' ' + id + ' ' + Liga.mitgliederDetail[id].budget))

        console.log('-')
        console.log('-')
        console.log('-')
        console.log('-')
        console.log('-')
        console.log('-')
        console.log('-')

    })

})