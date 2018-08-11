import $ from 'cheerio'

const teamList = (html, factory, columnCheckCount) => {
    return $('table[summary=Vereinsliste] tr', html)
        .filter((i, elem) => {
            return !$(elem).hasClass('tr_sep') && $(elem).children('td').length == columnCheckCount
        })
        .map((i, row) => factory($(row).children()))
}

export default teamList