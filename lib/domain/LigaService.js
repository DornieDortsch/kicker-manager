import Liga from './Liga'
import Spieltag from './Spieltag'
import TransferHistory from './TransferHistory';

const LigaService = client => {
    const urlWertung = 'http://manager.kicker.de/pro/wertungen/wertunggesamt/manben/3704795/manliga/2946'
    const urlTransfers = spieltag => 'http://manager.kicker.de/pro/transfermarkt/transferhistorie/manliga/2946/manben/3704795/spieltag/' + spieltag + '/transfer/0'

    const init = async () => {
        const state = {
            spieltag: 0,
            mitgliederDetail: {},
            mitglieder: []
        }
        
        let page = await client.crawl(urlWertung)
        if(page.status !== 200) {
            return state
        }

        state.spieltag = Spieltag(page.body)

        Liga(page.body).forEach(addMitglieder(state))

        for(let i = 0; i <= state.spieltag; i++) {
            const spieltag = i+1
            page = await client.crawl(urlTransfers(i+1))

            if(page.status !== 200) {
                break
            }

            TransferHistory(page.body).reverse().forEach(addTransfers(state, spieltag))
        }

        return state
    }

    const addMitglieder = state => mitglied => {
        state.mitglieder.push(mitglied.id)

        console.log(mitglied.name + ' ' + mitglied.budget)
        
        mitglied.transfers = []
        mitglied.team = []
        state.mitgliederDetail[mitglied.id] = Object.assign({transfers: []}, mitglied)
    }

    const addTransfers = (state, spieltag) => transfer => {

        transfer.spieltag = spieltag

        if(state.mitgliederDetail[transfer.buyer]) {
            state.mitgliederDetail[transfer.buyer].transfers.push(transfer)
            buy(state.mitgliederDetail[transfer.buyer], transfer)
        }

        if(state.mitgliederDetail[transfer.seller]) {
            state.mitgliederDetail[transfer.seller].transfers.push(transfer)
            sell(state.mitgliederDetail[transfer.seller], transfer)
        }
    }

    const buy = (mitglied, transfer) => {
        const initialBudget = mitglied.budget
        mitglied.team.push(transfer.player)
        mitglied.budget += 1000
        mitglied.budget -= transfer.sellingPrice
        mitglied.budget -= 1000

        if(mitglied.budget < 0) {
            console.log('' + mitglied.name + ' ' + transfer.player.name + ' ' + initialBudget + ' ' + mitglied.budget + ' ' + transfer.sellingPrice)
        }
    }

    const sell = (mitglied, transfer) => {
        const index = mitglied.team.findIndex(player => player.id === transfer.player.id)

        if(index >= 0) {
            mitglied.team.splice(index, 1)
            mitglied.budget += transfer.sellingPrice
        }
    }

    return {
        init
    }
}

export default LigaService