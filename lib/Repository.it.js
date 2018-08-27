import config from './config'

import Repository from './Repository'

describe('Repository', () => {
    const fileName = 'test.json'
    const gistId = "e13e5711ec1b83dcec61c6abc97b6b3d"

    const objectUnderTest = Repository(config.github.token, gistId)

    beforeEach(async () => {
        await objectUnderTest.writeCollection(fileName, {})
    })

    test('init state is empty', async () => {
        // When
        const files = await objectUnderTest.readCollection()

        // Then
        const dataJSON = files[fileName]
        expect(Object.keys(dataJSON).length).toEqual(0)
    })

    test('write read', async () => {
        // Given
        await objectUnderTest.writeCollection(fileName, { foo: 'bar' })

        // When
        const files = await objectUnderTest.readCollection()

        // Then
        const dataJSON = files[fileName]
        expect(Object.keys(dataJSON).length).toEqual(1)
        expect(dataJSON.foo).toEqual('bar')
    })
})
