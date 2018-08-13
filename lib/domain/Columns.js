const columns = $columns => {

    const text = index => {
        return $columns.eq(index).text().trim()
    }
    
    const int = index => {
        const int = Number.parseInt(text(index), 10)

        if(Number.isNaN(float)) throw new Error('' + text(index) + ' is not a int number!'  )
        
        return int
    }

    const price = index => {
        return float(text(index).replace(' Mio.', '').replace(',', '.'))
    }

    const float = text => {
        const float = Number.parseFloat(text)

        if(Number.isNaN(float)) throw new Error('' + text + ' is not a float number!'  )

        return float
    }

    const href = index => {
        return $columns.eq(index).children('a').attr('href')
    }

    var idFromHref = function(index) {
        const url = $columns.eq(index).children('a').attr('href')

        return url ? url.substring(url.lastIndexOf('/') + 1) : '-'
    }

    var idFromJS = function(index) {
        return $columns.eq(index).children('a').attr('onmousedown').split(',')[1].split('\'')[1];
    }

    return {
        text,
        int,
        price,
        href,
        idFromHref,
        idFromJS
    }
}

export default columns