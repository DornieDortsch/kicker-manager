const LigaMitglied = columns => {
    const name = () => {
        return columns.text(2)
    }

    const points = () => {
        return columns.int(3)
    }

    return {
        name: name(),
        points: points(),
        budget: (50.0 + points() * 0.02)
    }
}

export default LigaMitglied