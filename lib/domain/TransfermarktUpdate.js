import Transfermarkt from './Transfermarkt'
import TransfermarktDelta from './TransfermarktDelta'

export default (client, repository, cache) => {
    const url = 'http://manager.kicker.de/pro/transfermarkt/transferliste/allespieler/1'
    const transfermarktPath = 'transfermarkt/transfermarkt.json'
    const changesPath = 'transfermarkt/transfermarkt.json'

    let transfermarkt = JSON.parse(repository.read(transfermarktPath).content || '{}')
    let changes = JSON.parse(repository.read(changesPath).content || '[]')

    const update = async () => {
        const page = await client.crawl(url)

        const currentTransfermarkt = Transfermarkt(page.body  || '')
        const delta = TransfermarktDelta(currentTransfermarkt, transfermarkt)

        Array.prototype.push.apply(changes, delta)

        console.log(currentTransfermarkt)

        transfermarkt = currentTransfermarkt

        repository.write({
            path: transfermarktPath,
            content: JSON.stringify(transfermarkt)
        })

        return page.body
    }
    
    return {
        transfermarkt,
        changes,
        update
    }
}