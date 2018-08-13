import fs from 'fs'
import $ from 'cheerio'

import Columns from './Columns'

const loadHTML = path => {
    return fs.readFileSync(path, { encoding: 'UTF-8' })
}

const loadColumns = path => {
    const row = fs.readFileSync(path, { encoding: 'UTF-8' })
    return Columns($(row).children())
}

export default {
    loadHTML,
    loadColumns
}