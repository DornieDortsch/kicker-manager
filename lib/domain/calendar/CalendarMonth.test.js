import $ from 'cheerio'

import CalendarMonth from './CalendarMonth'

describe('CalendarMonth', () => {
    
    test('create current CalendarMonth', () => {
        // Given
        const $month = $('<div class="spielphase-head">November 2018</div>')

        // When
        const month = CalendarMonth($month)
        
        // Then
        expect(month.current().month()).toBe(10)
        expect(month.current().year()).toBe(2018)
    })

    test('create previous CalendarMonth', () => {
        // Given
        const $month = $('<div class="spielphase-head">November 2018</div>')

        // When
        const month = CalendarMonth($month)
        
        // Then
        expect(month.previous().month()).toBe(9)
        expect(month.previous().year()).toBe(2018)
    })

    test('create next CalendarMonth', () => {
        // Given
        const $month = $('<div class="spielphase-head">November 2018</div>')

        // When
        const month = CalendarMonth($month)
        
        // Then
        expect(month.next().month()).toBe(11)
        expect(month.next().year()).toBe(2018)
    })

    test('german month name', () => {
        // Given
        const $month = $('<div class="spielphase-head">Mai 2018</div>')

        // When
        const month = CalendarMonth($month)
        
        // Then
        expect(month.current().month()).toBe(4)
        expect(month.current().year()).toBe(2018)
    })

    test('previous year', () => {
        // Given
        const $month = $('<div class="spielphase-head">Januar 2018</div>')

        // When
        const month = CalendarMonth($month)
        
        // Then
        expect(month.previous().month()).toBe(11)
        expect(month.previous().year()).toBe(2017)
    })

    test('next year', () => {
        // Given
        const $month = $('<div class="spielphase-head">Dezember 2018</div>')

        // When
        const month = CalendarMonth($month)
        
        // Then
        expect(month.next().month()).toBe(0)
        expect(month.next().year()).toBe(2019)
    })
})