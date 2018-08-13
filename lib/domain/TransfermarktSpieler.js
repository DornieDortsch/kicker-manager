const TransfermarktSpieler = columns => {
    const name = () => {
        return columns.text(0)
    }

    const id = () => {
        return columns.idFromJS(0)
    }

    const offers = () => {
        return columns.int(10)
    }

    const seller = () => {
        return columns.idFromHref(9)
    }

    const price = () => {
        return columns.price(7)
    }

    return {
        name: name(),
        id: id(),
        seller: seller(),
        offers: offers(),
        price: price()
    }
}

export default TransfermarktSpieler