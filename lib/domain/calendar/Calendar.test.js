import TestFile from '../../scraper/TestFile'

import Calendar from './Calendar'

describe('Calendar', () => {

    const html = TestFile.loadHTML('./lib/domain/calendar/Calendar.test.html')
    
    test('parse HTML Page', () => {
        // Given
        const monthFactory = jest.fn()
        const dayFactory = jest.fn()
        const eventFactory = jest.fn()

        // When
        const calendar = Calendar(html, monthFactory, dayFactory, eventFactory)
        
        // Then
        expect(monthFactory.mock.calls.length).toBe(1)
        expect(dayFactory.mock.calls.length).toBe(35)
        expect(eventFactory.mock.calls.length).toBe(14)

        expect(calendar.length).toBe(0)
    })
    
    test('calendar event', () => {
        // Given

        // When
        const events = Calendar(html)
        
        // Then
        expect(events.length).toBe(14)

        expect(events[0].title).toBe('Transferphase')

        expect(events[0].begin.date()).toBe(30)
        expect(events[0].begin.month()).toBe(9)
        expect(events[0].begin.year()).toBe(2018)
        expect(events[0].begin.hour()).toBe(0)
        expect(events[0].begin.minute()).toBe(0)

        expect(events[0].end.date()).toBe(31)
        expect(events[0].end.month()).toBe(9)
        expect(events[0].end.year()).toBe(2018)
        expect(events[0].end.hour()).toBe(12)
        expect(events[0].end.minute()).toBe(0)


        expect(events[13].title).toBe('Aufstellung')

        expect(events[13].begin.date()).toBe(29)
        expect(events[13].begin.month()).toBe(10)
        expect(events[13].begin.year()).toBe(2018)
        expect(events[13].begin.hour()).toBe(15)
        expect(events[13].begin.minute()).toBe(0)

        expect(events[13].end.date()).toBe(30)
        expect(events[13].end.month()).toBe(10)
        expect(events[13].end.year()).toBe(2018)
        expect(events[13].end.hour()).toBe(20)
        expect(events[13].end.minute()).toBe(30)
    })

})