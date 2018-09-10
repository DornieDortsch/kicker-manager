import KickerClient from './KickerClient'
import Repository from './Repository'
import FileCache from './FileCache'

import TransfermarktService from './domain/transfermarkt/TransfermarktService'
import LigaService from './domain/liga/LigaService'

const KickerManager = config => {
    const client = KickerClient(config.kicker)
    const repository = Repository(config.github.token, config.github.gist)
    const cache = FileCache('./data/cache')

    const transfermarktService = TransfermarktService(client, repository, cache, config.mode === 'master')
    const ligaservice = LigaService(client)

    const init = async () => {
        await ligaservice.init()
        await transfermarktService.init()
    }

    return {
        init,
        transfermarktService,
        ligaservice
    }
}

export default KickerManager