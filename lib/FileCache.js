import fs from 'fs-extra'
import path from 'path'

export default directory => {

    const absoluteCacheDir = path.resolve(path.join('./', directory))
    
    const init = () => {
        console.log('Init FileCache at ' + absoluteCacheDir)
        fs.ensureDirSync(absoluteCacheDir)
    }

    const read = filePath => {
        const absoluteFilePath = path.join(absoluteCacheDir, filePath)
        const file = {
            path: filePath
        }
        
        if(fs.existsSync(absoluteFilePath)) {
            file.content = fs.readFileSync(absoluteFilePath, { encoding: 'UTF-8' })
        }

        return file
    }

    const write = file => {
        const absoluteFilePath = path.join(absoluteCacheDir, file.path)
        const absoluteFileDir = path.dirname(absoluteFilePath)

        fs.ensureDirSync(absoluteFileDir)

        fs.writeFileSync(absoluteFilePath, file.content, { encoding: 'UTF-8' })
    }
    
    const clear = () => {
        fs.removeSync(absoluteCacheDir)
    }

    init()
    
    return {
        read,
        write,
        clear
    }
}