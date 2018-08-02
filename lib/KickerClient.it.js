import KickerClient from './KickerClient'
import config from './config'

test('crawl protected page', async () => {
    // Given
    const page = {
        method: 'GET',
        url: 'http://manager.kicker.de/pro/MeinTeam/mtkader',
    }

    const objectUnderTest = KickerClient(config.kicker)

    // When
    const response = await objectUnderTest.crawl(page)

    // Then
    expect(response.status).toBe(200)
})

test('unknown credentials', async () => {
    // Given
    const page = {
        method: 'GET',
        url: 'http://manager.kicker.de/pro/MeinTeam/mtkader',
    }

    const objectUnderTest = KickerClient({
        user: '',
        paswd: ''
    })

    // When
    const response = await objectUnderTest.crawl(page)

    // Then
    expect(response.status).toBe(401)
})