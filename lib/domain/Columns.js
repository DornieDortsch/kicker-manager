const columns = $columns => {

    const text = index => {
        return $columns.eq(index).text().trim()
    }

    const href = index => {
        return $columns.eq(index).children('a').attr('href')
    }

    return {
        text,
        href
    }
}

export default columns