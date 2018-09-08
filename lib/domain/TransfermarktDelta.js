const TransfermarktDelta = (currentTransfermarkt, previousTransfermarkt) => {
    const ADD = 'a'
    const REMOVE = 'r'
    const INCREASE = '+'
    const DECREASE = '-'

    const action = (player, type) => {
        return {
            time: new Date(),
            type: type,
            player
        }
    }

    const compute = () => {
        const delta = []

        if(currentTransfermarkt.ids.length === 0) {
            return delta
        }

        const deletedSpieler = new Set(previousTransfermarkt.ids)
        
        currentTransfermarkt.ids.forEach(spielerId => {
            const currentSpieler = currentTransfermarkt.data[spielerId]
            const previousSpieler = previousTransfermarkt.data[spielerId]
    
            if(previousSpieler) {
                deletedSpieler.delete(spielerId)

                if(currentSpieler.offers > previousSpieler.offers) {
                    delta.push(action(currentSpieler, INCREASE))
                } else if(currentSpieler.offers < previousSpieler.offers) {
                    delta.push(action(currentSpieler, DECREASE))
                }

            } else {
                delta.push(action(currentSpieler, ADD))
            }
        })

        deletedSpieler.forEach(spielerId => delta.push(action(previousTransfermarkt.data[spielerId], REMOVE)))

        return delta
    }

    return compute()
}

export default TransfermarktDelta