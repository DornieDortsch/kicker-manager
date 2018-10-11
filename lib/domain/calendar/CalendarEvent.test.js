import TestFile from '../../scraper/TestFile'

import CalendarEvent from './CalendarEvent'

describe('CalendarEvent', () => {
    
    test('create CalendarEvent', () => {
        // Given
        const $event = TestFile.loadElement('./lib/domain/calendar/CalendarEvent.test.html')

        const dateFactory = jest.fn()

        // When
        const event = CalendarEvent($event, dateFactory)
        
        // Then
        expect(event.title).toBe('Transferphase')


        expect(dateFactory.mock.calls.length).toBe(2)

        
        const beginCall = dateFactory.mock.calls[0]

        const indexArgOfBeginCall = beginCall[0]
        expect(indexArgOfBeginCall).toBe(1)

        const timeArgOfBeginCall = beginCall[1]
        expect(timeArgOfBeginCall.hour()).toBe(0)
        expect(timeArgOfBeginCall.minute()).toBe(0)


        const endCall = dateFactory.mock.calls[1]

        const indexArgOfEndCall = endCall[0]
        expect(indexArgOfEndCall).toBe(2)

        const timeArgOfEndCall = endCall[1]
        expect(timeArgOfEndCall.hour()).toBe(13)
        expect(timeArgOfEndCall.minute()).toBe(0)
    })

})