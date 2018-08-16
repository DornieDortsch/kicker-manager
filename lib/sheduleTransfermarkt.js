import TransfermarktUpdate from './domain/TransfermarktUpdate'
import KickerClient from './/KickerClient'
import FileCache from './FileCache'

import config from './config'

const client = KickerClient(config.kicker)
const repository = FileCache('./data/repository')
const cache = FileCache('./data/cache')

const transfermarkt = TransfermarktUpdate(client, repository, cache)

const shedule = async () => {
    await transfermarkt.update()

    console.log('update')

    setTimeout(shedule, 10000)
}

shedule()