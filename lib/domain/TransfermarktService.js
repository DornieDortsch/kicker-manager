import moment from 'moment'

import Transfermarkt from './Transfermarkt'
import TransfermarktDelta from './TransfermarktDelta'

export default (client, repository, cache) => {
    const url = 'http://manager.kicker.de/pro/transfermarkt/transferliste/manben/3704795/manliga/2946/allespieler/1'
    const transfermarktPath = 'transfermarkt/transfermarkt.json'
    
        const deltaPath = () => {
            const date = moment().format('YYYY-MM-DD')
            const time = moment().format('HH-mm-ss')

            return 'transfermarkt/delta/delta-from-' + date + '/' + time + '.json'
        }

    const transfermarkt = JSON.parse(repository.read(transfermarktPath).content || '{ "player": {}, "actions": [], "offers": { "dates": [], "actions": {} } }')

    function strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k,v] of strMap) {
            // We don’t escape the key '__proto__'
            // which can cause problems on older engines
            obj[k] = v;
        }
        return obj;
    }
    function objToStrMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }

    const update = async () => {
        const page = await client.crawl(url)
        
        if(page.status !== 200) {
            console.log(new Date().toLocaleTimeString('de-DE')+ ' update - returns with status ' + page.status)
            return
        }

        const currentPlayer = Transfermarkt(page.body)
        const delta = TransfermarktDelta(currentPlayer, new Map(new Map(Object.entries(transfermarkt.player))))
        
        const date = new Date().toJSON()

        console.log(new Date().toLocaleTimeString('de-DE') + ' update - found ' + (delta.length ? delta.length : 'no') + ' changes')

        if(delta.length === 0) {
            return
        }

        saveState(currentPlayer, delta, date)

        return date
    }

    const saveState = (currentPlayer, delta, date) => {

        transfermarkt.player = strMapToObj(currentPlayer),
        transfermarkt.actions = delta.concat(transfermarkt.actions)
        transfermarkt.offers.dates = [date].concat(transfermarkt.offers.dates)
        transfermarkt.offers.actions[date] = delta

        repository.write({
            path: transfermarktPath,
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
        update
    }
}
