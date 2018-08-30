import $ from 'cheerio'

const select = (html, id, factory) => {
    return $('select#' + id + ' option', html)
        .map((i, option) => {
            console.log('option ', $(option).val())
            return factory($(option))
        })
}

export default select