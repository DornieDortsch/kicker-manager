const Delta = (currentSpielerliste, previousSpielerliste) => {
    const ADD = 'a'
    const REMOVE = 'r'
    const INCREASE = '+'
    const DECREASE = '-'

    const Change = (player, type) => {
        return {
            time: new Date(),
            type: type,
            player
        }
    }

    const compute = () => {
        const delta = []

        if(currentSpielerliste.ids.length === 0) {
            return delta
        }

        const removedSpieler = new Set(previousSpielerliste.ids)
        
        currentSpielerliste.ids.forEach(spielerId => {
            const currentSpieler = currentSpielerliste.data[spielerId]
            const previousSpieler = previousSpielerliste.data[spielerId]
    
            if(previousSpieler) {
                removedSpieler.delete(spielerId)

                if(currentSpieler.offers > previousSpieler.offers) {
                    delta.push(Change(currentSpieler, INCREASE))
                } else if(currentSpieler.offers < previousSpieler.offers) {
                    delta.push(Change(currentSpieler, DECREASE))
                }

            } else {
                delta.push(Change(currentSpieler, ADD))
            }
        })

        removedSpieler.forEach(spielerId => delta.push(Change(previousSpielerliste.data[spielerId], REMOVE)))

        return delta
    }

    return compute()
}

export default Delta