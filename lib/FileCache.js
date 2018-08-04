import fs from 'fs-extra'
import path from 'path'

export default directory => {

    const absolutePath = path.resolve(path.join('./', directory))
    
    const init = () => {
        console.log('Init FileCache at ' + absolutePath)
        fs.ensureDirSync(absolutePath)
    }
    
    const clear = () => {
        fs.removeSync(absolutePath)
    }

    init()
    
    return {
        clear
    }
}