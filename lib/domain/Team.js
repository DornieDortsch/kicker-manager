const team = $columns => {

    const name = () => {
        return $columns.eq(0).text().trim()
    }

    const kaderLink = () => {
        return $columns.eq(2).children('a').attr('href')
    }

    return {
        name,
        kaderLink
    }
}

export default team