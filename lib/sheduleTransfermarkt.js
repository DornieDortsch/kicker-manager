import Manager from './KickerManager'
import Sheduler from './Sheduler'

const manager = Manager()

const update = async () => {
    const delta = await manager.transfermarktService.update()

    console.log('update - found ' + (delta.length ? delta.length : 'no') + ' changes')
}

const sheduler = Sheduler(update).start()