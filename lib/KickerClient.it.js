import KickerClient from './KickerClient'
import config from './config'

test('crawl protected page', async () => {
    // Given
    const url = 'http://manager.kicker.de/pro/MeinTeam/mtkader'
    const options = config.kicker

    const objectUnderTest = KickerClient(options)

    // When
    const response = await objectUnderTest.crawl(url)

    // Then
    expect(response.status).toBe(200)
}, 30000)

test('unknown credentials', async () => {
    // Given
    const url = 'http://manager.kicker.de/pro/MeinTeam/mtkader'
    const options = {
        user: '',
        paswd: ''
    }

    const objectUnderTest = KickerClient(options)

    // When
    const response = await objectUnderTest.crawl(url)

    // Then
    expect(response.status).toBe(401)
})