const LigaMitglied = columns => {
    const id = () => {
        return columns.idFromHref(2)
    }

    const name = () => {
        return columns.text(2)
    }

    const points = () => {
        return columns.int(3)
    }

    return {
        id: id(),
        name: name(),
        points: points(),
        budget: (50.0 + points() * 0.02)
    }
}

export default LigaMitglied