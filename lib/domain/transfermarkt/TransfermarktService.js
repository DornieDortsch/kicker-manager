import moment from 'moment'

import Spielerliste from './Spielerliste'
import Delta from './Delta'

export default (client, repository, cache, master = false) => {
    const url = 'http://manager.kicker.de/pro/transfermarkt/transferliste/manben/3704795/manliga/2946/allespieler/1'
    const cacheFile = 'transfermarkt/transfermarkt.json'
    const repositoryFile = 'transfermarkt.json'
    
    const deltaPath = () => {
        const date = moment().format('YYYY-MM-DD')
        const time = moment().format('HH-mm-ss')

        return 'transfermarkt/delta/delta-from-' + date + '/' + time + '.json'
    }

    let transfermarkt = {
        player: {
            ids: [],
            data: {}
        },
        offers: { 
            dates: [],
            actions: {}
        }
    }

    const init = async () => {
        let repositoryTransfermarkt = null
        
        try {
            repositoryTransfermarkt = await repository.readCollection()
            repositoryTransfermarkt = repositoryTransfermarkt[repositoryFile]

        } catch(e) {
            console.error('Error read repository collection', e)
        }
        
        if(repositoryTransfermarkt) {
            console.log('Load transfermarkt from repository.')
            transfermarkt = repositoryTransfermarkt
        } else {
            console.log('LOad transfermarkt from file.')
            const cachedTransfermarkt = cache.read(cacheFile).content

            if(cachedTransfermarkt) {
                transfermarkt = JSON.parse(cachedTransfermarkt)
            }
        }
    }

    const update = async () => {
        const date = new Date()

        const page = await client.crawl(url)
        if(page.status !== 200) {
            console.log(date.toLocaleTimeString('de-DE')+ ' update - returns with status ' + page.status)
            return
        }

        const previousSpielerliste = transfermarkt.player
        const currentSpielerliste = Spielerliste(page.body)

        const delta = Delta(currentSpielerliste, previousSpielerliste)

        console.log(date.toLocaleTimeString('de-DE') + ' update - found ' + (delta.length ? delta.length : 'no') + ' changes')

        if(delta.length === 0) {
            return
        }

        saveState(currentSpielerliste, delta, date.toJSON())

        return date
    }

    const saveState = (currentPlayer, delta, date) => {

        transfermarkt.player = currentPlayer,
        //transfermarkt.actions = delta.concat(transfermarkt.actions)
        transfermarkt.offers.dates = [date].concat(transfermarkt.offers.dates)
        transfermarkt.offers.actions[date] = delta

        if(master) {
            repository.writeCollection(repositoryFile, transfermarkt)
                .then(() => console.log('succesfully write repository file ' + repositoryFile))
                .catch(error => console.error('error write repository file ' + repositoryFile, error))
        }

        cache.write({
            path: cacheFile,
            content: JSON.stringify(transfermarkt, null, 2)
        })

        cache.write({
            path: deltaPath(),
            content: JSON.stringify(delta, null, 2)
        })
    }
    
    return {
        actions: () => transfermarkt.actions,
        player: () => transfermarkt.player,
        offers: key => key ? transfermarkt.offers[key] : transfermarkt.offers,
        init,
        update
    }
}
