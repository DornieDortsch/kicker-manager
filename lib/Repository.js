import github from 'octonode'

const Repository = (token, id) => {
    const ghGist = github
                    .client(token)
                    .gist()
    
    let collection = null

    const resetCollection = () => {
        collection = { 'files': {} }
    }

    const readCollection = () => {
        return ghGist.getAsync(id).then(flatFiles)
    }

    const flatFiles = collection => {
        const flatFiles = Object.create(null)
        const files = collection[0].files

        for (let name of Object.keys(files)) {
            flatFiles[name] = (name.endsWith('.json') ? JSON.parse(files[name].content) : files[name].content)
        }

        return flatFiles
    }

    const writeCollection = () => {
        return ghGist.editAsync(id,collection).then(resetCollection)
    }

    const addContent = (name, content) => {
        collection.files[name] = { 'content': (name.endsWith('.json') ? JSON.stringify(content) : content) }
    }

    resetCollection()

    return {
        readCollection,
        writeCollection,
        addContent,
    }
}

export default Repository