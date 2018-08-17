import Manager from '../KickerManager'
import Sheduler from '../Sheduler'

const manager = Manager()

const Controller = async () => {
    let _io
    let sheduler
    
    const update = async () => {
        const delta = await manager.transfermarktService.update()
        
        console.log('update - found ' + (delta.length ? delta.length : 'no') + ' changes')
        
        _io.emit('tfm.delta', encodeURIComponent(JSON.stringify(delta)))
    }
    
    /*
    const connection = socket => {
        socket.on('chat message', msg => {
    
            console.log('chat message: ', msg)

            _io.emit('chat message', msg)
        })
    }
    */
    
    const init = io => {
        _io = io
        
        _io.on('connection', socket => {
            console.log('a user connected')
            
            const changes = manager.transfermarktService.changes()
            const data = encodeURIComponent(JSON.stringify(changes.slice(0,500)))

            socket.emit('tfm.start', data)
            //console.log(changes[0])
        
            socket.on('disconnect', () => {
                console.log('user disconnected')
            })

        })
    
        sheduler = Sheduler(update).start()
    }

    await manager.transfermarktService.update()

    return {
        init
    }
}

export default Controller