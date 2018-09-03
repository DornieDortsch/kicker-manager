const LigaCalculator = (state, spieltag) => {
    const calculate = (phasen, index) => {
        const phase = {spieltag, phase: (index + 1)}
    
        phasen.filter(transfer => transfer.seller !== undefined)
            .forEach(addSell(state, phase))
    
        phasen.filter(transfer => transfer.buyer !== undefined)
            .forEach(addBuy(state, phase))
    }

    const addSell = (state, phase) => transfer => {
        const mitglied = state.mitgliederDetail[transfer.seller]
        if(mitglied) {
            mitglied.transfers.push(transfer)
            sell(mitglied, transfer)
        }
    }

    const addBuy = (state, phase) => transfer => {
        const mitglied = state.mitgliederDetail[transfer.buyer]
        if(mitglied) {
            mitglied.transfers.push(transfer)
            buy(mitglied, transfer)
        }
    }

    const buy = (mitglied, transfer) => {
        mitglied.team.push(transfer.player)
        mitglied.budget = parseFloat((mitglied.budget - transfer.sellingPrice).toFixed(2))
    }

    const sell = (mitglied, transfer) => {
        const index = mitglied.team.findIndex(player => player.id === transfer.player.id)

        if(index >= 0) {
            mitglied.team.splice(index, 1)
            mitglied.budget =  parseFloat((mitglied.budget + transfer.sellingPrice).toFixed(2))
        }
    }

    return calculate
}

export default LigaCalculator