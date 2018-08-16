import Manager from './Manager'

const manager = Manager()

const shedule = async () => {
    const delta = await manager.transfermarktService.update()

    console.log('update - found ' + (delta.length ? delta.length : 'no') + ' changes')

    setTimeout(shedule, 10000)
}

shedule()