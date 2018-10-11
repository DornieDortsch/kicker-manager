import $ from 'cheerio'
import moment from 'moment'

import CalendarMonth from './CalendarMonth'
import CalendarDay from './CalendarDay'
import CalendarEvent from './CalendarEvent'

moment.locale('de')

const calendar = (html, monthFactory = CalendarMonth, dayFactory = CalendarDay, eventFactory = CalendarEvent) => {
    const month = $('div.spielphase-head', html)
        .map((index, month) => monthFactory($(month)))
        .get(0)

    const days = $('div.spielphase-box-day', html)
        .map((index, day) => dayFactory($(day)))
        .get()

    const createDate = (indexOfDay, time) => {
        const day = days[indexOfDay]
        let date = null

        if(day.previousMonth) {
            date = month.previous()
        } else if(day.nextMonth) {
            date = month.next()
        } else {
            date = month.current()
        }

        return date
            .date(day.dayOfMonth)
            .minutes(time.minutes())
            .hours(time.hours())
    }

    return $('div.termin', html)
        .filter((index, event) => $(event).css('display') != 'none')
        .map((index, event) => eventFactory($(event), createDate))
}

export default calendar