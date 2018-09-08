import KickerClient from './KickerClient'
import FileCache from './FileCache'

import TransfermarktService from './domain/transfermarkt/TransfermarktService'
import LigaService from './domain/liga/LigaService'

const KickerManager = config => {
    const client = KickerClient(config.kicker)
    const repository = FileCache('./data/repository')
    const cache = FileCache('./data/cache')

    const transfermarktService = TransfermarktService(client, repository, cache)
    const ligaservice = LigaService(client)

    return {
        transfermarktService,
        ligaservice
    }
}

export default KickerManager