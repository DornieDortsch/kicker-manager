import fs from 'fs'
import $ from 'cheerio'

import Columns from './Columns'

const loadHTML = path => {
    return fs.readFileSync(path, { encoding: 'UTF-8' })
}

const loadColumns = path => {
    const html = fs.readFileSync('./lib/domain/Team.test.html', { encoding: 'UTF-8' })
    return Columns($(html).children())
}

export default {
    loadHTML,
    loadColumns
}