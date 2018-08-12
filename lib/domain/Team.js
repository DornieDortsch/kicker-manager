const team = columns => {

    const name = () => {
        return columns.text(0)
    }

    const kaderLink = () => {
        return columns.href(2)
    }

    return {
        name,
        kaderLink
    }
}

export default team