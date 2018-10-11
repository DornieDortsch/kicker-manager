const day = $day => {
    const dayOfMonth = Number.parseInt($day.text().trim())
    const isDayOfOtherMonth = $day.hasClass('spielphase-boxDayOtherMonth')

    return {
        dayOfMonth,
        previousMonth: isDayOfOtherMonth && dayOfMonth > 7,
        nextMonth: isDayOfOtherMonth && dayOfMonth < 7
    }
}

export default day