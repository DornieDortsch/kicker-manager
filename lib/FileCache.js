import fs from 'fs-extra'
import path from 'path'

export default directory => {

    const absoluteCacheDir = path.resolve(path.join('./', directory))
    
    const init = () => {
        console.log('Init FileCache at ' + absoluteCacheDir)
        fs.ensureDirSync(absoluteCacheDir)
    }

    const write = file => {
        const absoluteFilePath = path.join(absoluteCacheDir, file.path)
        const absoluteFileDir = path.dirname(absoluteFilePath)

        fs.ensureDirSync(absoluteFileDir)

        fs.writeFileSync(absoluteFilePath, file.data, { encoding: 'UTF-8' })
    }
    
    const clear = () => {
        fs.removeSync(absoluteCacheDir)
    }

    init()
    
    return {
        write,
        clear
    }
}