import moment from 'moment'

moment.locale('de')

const month = $month => {
    const month = moment('1 ' + $month.text(), 'D MMMM YYYY')

    return {
        current: () => moment(month),
        previous: () => moment(month).subtract(1, 'month'),
        next: () => moment(month).add(1, 'month')
    }
}

export default month