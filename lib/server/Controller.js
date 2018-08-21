import Manager from '../KickerManager'

const Controller = (io, config) => {
    const manager = Manager(config)
    
    
    const init = async () => {
        await manager.transfermarktService.update()

        const sheduler = manager.transfermarktService.shedule(emitDelta)
        sheduler.seconds(config.shedule)
        sheduler.start()
        
        io.on('connection', socket => {
            console.log('a user connected')
            
            socket.emit('tfm.start', initialChanges())
            
            socket.on('disconnect', () => {
                console.log('user disconnected')
                
            })
            
        })
    }

    const emitDelta = delta => io.emit('tfm.delta', createSocketData(delta))
    
    const initialChanges = () => {
        return createSocketData(manager.transfermarktService.changes().slice(0,500))
    }
    
    const createSocketData = object => {
        return encodeURIComponent(JSON.stringify(object))
    }

    return {
        init
    }
}

export default Controller