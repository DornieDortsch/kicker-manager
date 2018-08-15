import TestFile from '../scraper/TestFile'

import Transfermarkt from './Transfermarkt'
import TransfermarktDelta from './TransfermarktDelta'

describe('TransfermarktDelta', () => {
    
    const html = TestFile.loadHTML('./lib/domain/Transfermarkt.test.html')
    const htmlWithOffer = TestFile.loadHTML('./lib/domain/TransfermarktWithOffer.test.html')
    const htmlOnePlayerMissing = TestFile.loadHTML('./lib/domain/TransfermarktOnePlayerMissing.test.html')
    
    test('create TransfermarktDelta', () => {

        // Given
        const currentTransfermarkt = Transfermarkt('')
        const lastTransfermarkt = Transfermarkt('')

        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)

        // Then
        expect(delta).toEqual([])
    })    

    test('create TransfermarktDelta when player removed', () => {

        // Given
        const currentTransfermarkt = Transfermarkt(htmlOnePlayerMissing)
        const lastTransfermarkt = Transfermarkt(html)

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
        const currentTransfermarkt = Transfermarkt(html)
        const lastTransfermarkt = Transfermarkt(htmlOnePlayerMissing)
        
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
        const currentTransfermarkt = Transfermarkt(htmlWithOffer)
        const lastTransfermarkt = Transfermarkt(html)
        
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
        const currentTransfermarkt = Transfermarkt(html)
        const lastTransfermarkt = Transfermarkt(htmlWithOffer)
        
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
        const currentTransfermarkt = Transfermarkt('')
        const lastTransfermarkt = Transfermarkt(html)
        
        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)
        
        // Then
        expect(delta.length).toBe(0)
    })
  
    test('create TransfermarktDelta when last Transfermarkt is empty', () => {
        
        // Given
        const currentTransfermarkt = Transfermarkt(html)
        const lastTransfermarkt = Transfermarkt('')
        
        // When
        const delta = TransfermarktDelta(currentTransfermarkt, lastTransfermarkt)
        
        // Then
        expect(delta.length).toBe(436)
    })
})