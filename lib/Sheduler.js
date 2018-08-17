const Sheduler = (action) => {
    let _sec = 10
    let timeoutId = null

    const start = () => {
        action()
        timeoutId = setInterval(action, _sec * 1000)
    }

    const stop = () => {
        if(timeoutId) {
            clearInterval(timeoutId)
            timeoutId = null
        }
    }

    const seconds = sec => {
        if(sec !== undefined && sec > 10) {
            _sec = sec
        }

        return _sec
    }

    return {
        start,
        stop,
        seconds
    }
}

export default Sheduler