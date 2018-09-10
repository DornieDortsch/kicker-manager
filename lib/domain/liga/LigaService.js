import Liga from './Liga'
import LigaCalculator from './LigaCalculator'
import Spieltag from './Spieltag'
import TransferHistory from './TransferHistory'

const LigaService = client => {
    const urlWertung = 'http://manager.kicker.de/pro/wertungen/wertunggesamt/manben/3704795/manliga/2946'
    const urlTransfers = spieltag => 'http://manager.kicker.de/pro/transfermarkt/transferhistorie/manliga/2946/manben/3704795/spieltag/' + spieltag + '/transfer/0'

    const liga = {
        spieltag: 0,
        mitgliederDetail: {},
        mitglieder: []
    }

    const init = async () => {
        let page = await client.crawl(urlWertung)
        if(page.status !== 200) {
            return liga
        }

        liga.spieltag = Spieltag(page.body)

        Liga(page.body).forEach(addMitglieder(liga))

        for(let i = 0; i <= liga.spieltag; i++) {
            const spieltag = i+1
            page = await client.crawl(urlTransfers(i+1))

            if(page.status !== 200) {
                break
            }

            TransferHistory(page.body).reverse().forEach(LigaCalculator(liga, spieltag))
        }

        return liga
    }


    const addMitglieder = state => mitglied => {
        state.mitglieder.push(mitglied.id)

        mitglied.transfers = []
        mitglied.team = []
        state.mitgliederDetail[mitglied.id] = Object.assign({transfers: []}, mitglied)
    }

    return {
        init,
        liga
    }
}

export default LigaService