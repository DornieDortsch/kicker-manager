import Manager from '../KickerManager'
import Sheduler from '../Sheduler'

const Controller = (app, io, config) => {
    const manager = Manager(config)
    const sheduler = Sheduler(async () => {
        const date = await manager.transfermarktService.update()
        
        io.emit('tfm.update', date)
    })
    
    const init = async () => {
        
        await manager.init()

        sheduler.seconds(config.shedule)
        sheduler.start()
        
        io.on('connection', socket => {
            console.log(new Date().toLocaleTimeString('de-DE') + ' socket - a user connected')
            
            socket.emit('tfm.start')
            
            socket.on('disconnect', () => {
                console.log(new Date().toLocaleTimeString('de-DE') + ' socket - a user disconnected')
            })
        })

        app.get('/data', (req, res) => {
            const data = {
                liga: manager.ligaservice.liga,
                transfermarkt: {
                    player: manager.transfermarktService.player(),
                    offers: manager.transfermarktService.offers()
                }
            }

            res.json(data);
        })
    }

    return {
        init
    }
}

export default Controller