const Transfer = columns => {
    const name = () => {
        return columns.text(1)
    }

    const id = () => {
        return columns.idFromHref(1)
    }
    
    const price = () => {
        return columns.price(4)
    }
    
    const seller = () => {
        return columns.idFromHref(5)
    }
    
    const buyer = () => {
        return columns.idFromHref(6)
    }

    const sellingPrice = () => {
        return columns.price(7)
    }

    return {
        player: {
            name: name(),
            id: id()
        },
        price: price(),
        seller: seller(),
        buyer: buyer(),
        sellingPrice: sellingPrice()
    }
}

export default Transfer