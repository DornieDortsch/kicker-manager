import Manager from '../KickerManager'
import Sheduler from '../Sheduler'

const Controller = io => {
    const manager = Manager()
    let sheduler
    
    const init = async () => {

        await manager.transfermarktService.update()
        
        io.on('connection', socket => {
            console.log('a user connected')

            socket.emit('tfm.start', initialChanges())
        
            socket.on('disconnect', () => {
                console.log('user disconnected')
            
            })
            
        })

        sheduler = sheduleChanges(delta => io.emit('tfm.delta', delta))
        sheduler.start()
    }
    
    const initialChanges = () => {
        return createSocketData(manager.transfermarktService.changes().slice(0,500))
    }
    
    const sheduleChanges = onChanges => {
        return Sheduler(async () => {
            const delta = await manager.transfermarktService.update()

            console.log('update - found ' + (delta.length ? delta.length : 'no') + ' changes')
            
            onChanges(createSocketData(delta))
        })
    }
    
    const createSocketData = object => {
        return encodeURIComponent(JSON.stringify(object))
    }

    return {
        init
    }
}

export default Controller