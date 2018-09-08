import TestFile from '../../scraper/TestFile'

import Spielerliste from './Spielerliste'
import TransfermarktDelta from './TransfermarktDelta'

describe('TransfermarktDelta', () => {
    
    const html = TestFile.loadHTML('./lib/domain/transfermarkt/Spielerliste.test.html')
    const htmlWithOffer = TestFile.loadHTML('./lib/domain/transfermarkt/TransfermarktWithOffer.test.html')
    const htmlOnePlayerMissing = TestFile.loadHTML('./lib/domain/transfermarkt/TransfermarktOnePlayerMissing.test.html')
    
    test('create TransfermarktDelta', () => {

        // Given
        const currentTransfermarkt = Spielerliste('')
        const lastTransfermarkt = Spielerliste('')

        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)

        // Then
        expect(delta).toEqual([])
    })    

    test('create TransfermarktDelta when player removed', () => {

        // Given
        const currentTransfermarkt = Spielerliste(htmlOnePlayerMissing)
        const lastTransfermarkt = Spielerliste(html)

        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)

        // Then
        expect(delta.length).toBe(1)
        
        const change = delta[0]
        expect(change.type).toBe('r')
        expect(change.player.name).toEqual('Baumann, Oliver')
    })
    
    test('create TransfermarktDelta when player added', () => {
        
        // Given
        const currentTransfermarkt = Spielerliste(html)
        const lastTransfermarkt = Spielerliste(htmlOnePlayerMissing)
        
        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)
        
        // Then
        expect(delta.length).toBe(1)
        
        const change = delta[0]
        expect(change.type).toBe('a')
        expect(change.player.name).toEqual('Baumann, Oliver')
    })
    
    test('create TransfermarktDelta when offer increase', () => {
        
        // Given
        const currentTransfermarkt = Spielerliste(htmlWithOffer)
        const lastTransfermarkt = Spielerliste(html)
        
        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)
        
        // Then
        expect(delta.length).toBe(1)
        
        const change = delta[0]
        expect(change.type).toBe('+')
        expect(change.player.name).toEqual('Baumann, Oliver')
    })
    
    test('create TransfermarktDelta when offer decrease', () => {
        
        // Given
        const currentTransfermarkt = Spielerliste(html)
        const lastTransfermarkt = Spielerliste(htmlWithOffer)
        
        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)
        
        // Then
        expect(delta.length).toBe(1)
        
        const change = delta[0]
        expect(change.type).toBe('-')
        expect(change.player.name).toEqual('Baumann, Oliver')
    })
    
    test('create TransfermarktDelta when current Transfermarkt is empty', () => {
        
        // Given
        const currentTransfermarkt = Spielerliste('')

        const lastTransfermarkt = Spielerliste(html)
        
        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)
        
        // Then
        expect(delta.length).toBe(0)
    })
  
    test('create TransfermarktDelta when last Transfermarkt is empty', () => {
        
        // Given
        const currentTransfermarkt = Spielerliste(html)
        const lastTransfermarkt = Spielerliste('')
        
        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)
        
        // Then
        expect(delta.length).toBe(436)
    })
})