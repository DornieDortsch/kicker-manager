import $ from 'cheerio'

import Column from './Columns'

const table = (html, summary, columnCheckCount, factory, splitOnSeperator) => {
    return $('table[summary=' + summary + '] tr', html)
    .filter((i, elem) => {
        return !$(elem).hasClass('tr_sep') && $(elem).children('td').length == columnCheckCount
    })
    .get()
    .reduce( ( splitOnSeperator ? splitReducer(factory) : defaultReducer(factory) ) , [])
}

const defaultReducer = factory => (array, row) => {
    array.push(factory(Column($(row).children())))

    return array
}

const splitReducer = factory => (array, row) => {
    if(array.length == 0) {
        array.push([])
    }

    array[array.length-1].push(factory(Column($(row).children())))

    if($(row).hasClass('sep_b')) {
        array.push([])
    }

    return array
}

export default table