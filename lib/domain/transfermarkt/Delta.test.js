import TestFile from '../../scraper/TestFile'

import Spielerliste from './Spielerliste'
import Delta from './Delta'

describe('Delta', () => {
    
    const html = TestFile.loadHTML('./lib/domain/transfermarkt/Spielerliste.test.html')
    const htmlWithOffer = TestFile.loadHTML('./lib/domain/transfermarkt/TransfermarktWithOffer.test.html')
    const htmlOnePlayerMissing = TestFile.loadHTML('./lib/domain/transfermarkt/TransfermarktOnePlayerMissing.test.html')
    
    test('create Delta', () => {

        // Given
        const currentSpielerliste = Spielerliste('')
        const previousSpieler = Spielerliste('')

        // When
        const changes = Delta(currentSpielerliste, previousSpieler)

        // Then
        expect(changes).toEqual([])
    })    

    test('create Delta when player removed', () => {

        // Given
        const currentSpielerliste = Spielerliste(htmlOnePlayerMissing)
        const previousSpieler = Spielerliste(html)

        // When
        const changes = Delta(currentSpielerliste, previousSpieler)

        // Then
        expect(changes.length).toBe(1)
        
        const change = changes[0]
        expect(change.type).toBe('r')
        expect(change.player.name).toEqual('Baumann, Oliver')
    })
    
    test('create Delta when player added', () => {
        
        // Given
        const currentTransfermarkt = Spielerliste(html)
        const lastTransfermarkt = Spielerliste(htmlOnePlayerMissing)
        
        // When
        const changes = Delta(currentTransfermarkt, lastTransfermarkt)
        
        // Then
        expect(changes.length).toBe(1)
        
        const change = changes[0]
        expect(change.type).toBe('a')
        expect(change.player.name).toEqual('Baumann, Oliver')
    })
    
    test('create Delta when offer increase', () => {
        
        // Given
        const currentSpielerliste = Spielerliste(htmlWithOffer)
        const previousSpieler = Spielerliste(html)
        
        // When
        const changes = Delta(currentSpielerliste, previousSpieler)
        
        // Then
        expect(changes.length).toBe(1)
        
        const change = changes[0]
        expect(change.type).toBe('+')
        expect(change.player.name).toEqual('Baumann, Oliver')
    })
    
    test('create Delta when offer decrease', () => {
        
        // Given
        const currentSpielerliste = Spielerliste(html)
        const previousSpieler = Spielerliste(htmlWithOffer)
        
        // When
        const changes = Delta(currentSpielerliste, previousSpieler)
        
        // Then
        expect(changes.length).toBe(1)
        
        const change = changes[0]
        expect(change.type).toBe('-')
        expect(change.player.name).toEqual('Baumann, Oliver')
    })
    
    test('create Delta when current Transfermarkt is empty', () => {
        
        // Given
        const currentSpielerliste = Spielerliste('')
        const previousSpieler = Spielerliste(html)
        
        // When
        const changes = Delta(currentSpielerliste, previousSpieler)
        
        // Then
        expect(changes.length).toBe(0)
    })
  
    test('create Delta when last Transfermarkt is empty', () => {
        
        // Given
        const currentSpielerliste = Spielerliste(html)
        const previousSpieler = Spielerliste('')
        
        // When
        const change = Delta(currentSpielerliste, previousSpieler)
        
        // Then
        expect(change.length).toBe(436)
    })
})