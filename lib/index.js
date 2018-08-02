import KickerClient from './KickerClient'
import config from './config'

const client = KickerClient(config.kicker)

client.crawl({
    method: 'GET',
    url: 'http://manager.kicker.de/pro/MeinTeam/mtkader',
}).then(page => console.log('Status Code ' + page.status))