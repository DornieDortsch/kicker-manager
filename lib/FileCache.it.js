import fs from 'fs'

import FileCache from './FileCache'

test('init and clear', () => {
    // Given
    const cachePath = './cache';

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