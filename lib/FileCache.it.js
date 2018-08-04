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

    test('read undefined file', () => {

        // Given
        const filePath = 'subdir/test.file'
        
        const objectUnderTest = FileCache(cachePath)

        // When
        const file = objectUnderTest.read(filePath)

        //Then
        expect(file.content).toBe(undefined)
    })

    test('read file', () => {

        // Given
        const fileMock = {
            path: 'subdir/test.file',
            content: 'content'
        }
        
        const objectUnderTest = FileCache(cachePath)
        objectUnderTest.write(fileMock)

        // When
        const file = objectUnderTest.read(fileMock.path)

        //Then
        expect(fileMock.content).toBe(file.content)
    })
})