import config from './config'

import KickerClient from './KickerClient'
import FileCache from './FileCache'

import TransfermarktService from './domain/TransfermarktService'

const Manager = () => {
    const client = KickerClient(config.kicker)
    const repository = FileCache('./data/repository')
    const cache = FileCache('./data/cache')

    const transfermarktService = TransfermarktService(client, repository, cache)

    return {
        transfermarktService
    }
}

export default Manager