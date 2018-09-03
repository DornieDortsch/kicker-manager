import $ from 'cheerio'

import Column from './Columns'

const table = (html, summary, columnCheckCount, factory) => {
    return $('table[summary=' + summary + '] tr', html)
        .filter((i, elem) => {
            return !$(elem).hasClass('tr_sep') && $(elem).children('td').length == columnCheckCount
        })
        .map((i, row) => factory(Column($(row).children(),  $(row).hasClass('sep_b'))))
}

export default table