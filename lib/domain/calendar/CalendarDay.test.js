import $ from 'cheerio'

import CalendarDay from './CalendarDay'

describe('CalendarDay', () => {
    
    test('create CalendarDay', () => {
        // Given
        const $day = $('<div class="spielphase-box-day">1</div>')

        // When
        const day = CalendarDay($day)
        
        // Then
        expect(day.dayOfMonth).toBe(1)
        expect(day.previousMonth).toBe(false)
        expect(day.nextMonth).toBe(false)
    })
    
    test('create CalendarDay of previous month', () => {
        // Given
        const $day = $('<div class="spielphase-box-day spielphase-boxDayOtherMonth">29</div>')

        // When
        const day = CalendarDay($day)
        
        // Then
        expect(day.dayOfMonth).toBe(29)
        expect(day.previousMonth).toBe(true)
        expect(day.nextMonth).toBe(false)
    })

    test('create CalendarDay of next month', () => {
        // Given
        const $day = $('<div class="spielphase-box-day spielphase-boxDayOtherMonth">6</div>')

        // When
        const day = CalendarDay($day)
        
        // Then
        expect(day.dayOfMonth).toBe(6)
        expect(day.previousMonth).toBe(false)
        expect(day.nextMonth).toBe(true)
    })

})