import moment from 'moment'

moment.locale('de')

const event = ($event, dateFactory) => {
    const size = 133

    const top = Number.parseInt($event.css('top').replace('px',''))
    const left = Number.parseInt($event.css('left').replace('px',''))
    const width = Number.parseInt($event.css('width').replace('px',''))
    
    const row = Math.floor(top / size)

    const title = $event.find('div.termin-bez').text()
    const startTime = moment($event.find('div.uhrzeit-start').text(), 'HH:mm')
    const endTime = moment($event.find('div.uhrzeit-ende').text(), 'HH:mm')

    const startDayIndex = Math.floor(left / size) + row * 7
    const endDayIndex = Math.floor((left + width) / size) + row * 7
    
    return {
        title,
        begin: dateFactory(startDayIndex, startTime),
        end: dateFactory(endDayIndex, endTime)
    }
}

export default event