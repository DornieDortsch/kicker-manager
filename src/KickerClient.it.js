import KickerClient from './KickerClient'
import credentials from '../credentials'

test('crawl protected page', async () => {
    // Given
    const page = {
        method: 'GET',
        url: 'http://manager.kicker.de/pro/MeinTeam/mtkader',
    }

    const objectUnderTest = KickerClient(credentials)

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