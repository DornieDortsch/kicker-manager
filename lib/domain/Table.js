import $ from 'cheerio'

const table = (html, summary, columnCheckCount, factory) => {
    return $('table[summary=' + summary + '] tr', html)
        .filter((i, elem) => {
            return !$(elem).hasClass('tr_sep') && $(elem).children('td').length == columnCheckCount
        })
        .map((i, row) => factory($(row).children()))
}

export default table