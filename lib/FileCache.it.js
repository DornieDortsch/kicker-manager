import fs from 'fs-extra'
import path from 'path'

import FileCache from './FileCache'

describe('FileCache', () => {

    // Given
    const cachePath = './cache'

    afterEach(() => {
        fs.removeSync(cachePath)
    })

    test('init and clear', () => {

        // When
        const objectUnderTest = FileCache(cachePath)
        
        // Then
        let cacheDirExists = fs.existsSync(cachePath)
        expect(cacheDirExists).toBe(true)
        

        // When
        objectUnderTest.clear()

        //Then
        cacheDirExists = fs.existsSync(cachePath)
        expect(cacheDirExists).toBe(false)

    })

    test('store file', () => {

        // Given
        const file = {
            path: 'test.file',
            content: 'data'
        }
        const objectUnderTest = FileCache(cachePath)

        // When
        objectUnderTest.write(file)

        //Then
        const fileExists = fs.existsSync(path.join(cachePath, file.path))
        expect(fileExists).toBe(true)
    })

    test('store file in subdirectory', () => {

        // Given
        const file = {
            path: 'subdir/test.file',
            content: 'data'
        }
        const objectUnderTest = FileCache(cachePath)

        // When
        objectUnderTest.write(file)

        //Then
        const fileExists = fs.existsSync(path.join(cachePath, file.path))
        expect(fileExists).toBe(true)
    })
})