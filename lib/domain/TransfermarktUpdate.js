import moment from 'moment'

import Transfermarkt from './Transfermarkt'
import TransfermarktDelta from './TransfermarktDelta'

export default (client, repository, cache) => {
    const url = 'http://manager.kicker.de/pro/transfermarkt/transferliste/manben/3704795/manliga/2946/allespieler/1'
    const transfermarktPath = 'transfermarkt/transfermarkt.json'
    const changesPath = 'transfermarkt/changeHistory.json'
    
        const deltaPath = () => {
            const date = moment().format('YYYY-MM-DD')
            const time = moment().format('HH-mm-ss')

            return 'transfermarkt/delta/delta-from-' + date + '/' + time + '.json'
        }

    let transfermarkt = new Map(Object.entries(JSON.parse(repository.read(transfermarktPath).content || '{}')))
    let changes = JSON.parse(repository.read(changesPath).content || '[]')

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
            return
        }


        const currentTransfermarkt = Transfermarkt(page.body)
        const delta = TransfermarktDelta(currentTransfermarkt, new Map(transfermarkt))
        
        if(delta.length === 0) {
            return
        }
        

        console.log('found ' + delta.length + ' changes')

        saveState(currentTransfermarkt, delta)

        return delta
    }

    const saveState = (currentTransfermarkt, delta) => {

        transfermarkt = currentTransfermarkt
        repository.write({
            path: transfermarktPath,
            content: JSON.stringify(strMapToObj(transfermarkt), null, 2)
        })
        
        changes = delta.concat(changes)
        repository.write({
            path: changesPath,
            content: JSON.stringify(changes, null, 2)
        })

        cache.write({
            path: deltaPath(),
            content: JSON.stringify(delta, null, 2)
        })
    }
    
    return {
        transfermarkt: () => transfermarkt,
        changes: () => changes,
        update
    }
}