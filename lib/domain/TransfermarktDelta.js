const TransfermarktDelta = (current, previous) => {
    const ADD = 'a'
    const REMOVE = 'r'
    const INCREASE = '+'
    const DECREASE = '-'

    const compute = () => {
        const delta = []

        console.log(current.length)

        if(current.size === 0) {
            return delta
        }
        
        current.forEach(currentPlayer => {
            const previousPlayer = previous.get(currentPlayer.id)
    
            if(previousPlayer) {
                previous.delete(currentPlayer.id)

                if(currentPlayer.offers > previousPlayer.offers) {
                    delta.push(change(currentPlayer, INCREASE))
                } else if(currentPlayer.offers < previousPlayer.offers) {
                    delta.push(change(currentPlayer, DECREASE))
                }
            } else {
                delta.push(change(currentPlayer, ADD))
            }
        })

        previous.forEach(player => delta.push(change(player, REMOVE)))

        return delta
    }

    const change = (player, type) => {
        return {
            time: new Date(),
            type: type,
            player
        }
    }

    return compute()
}

export default TransfermarktDelta