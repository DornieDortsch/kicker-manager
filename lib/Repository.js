import github from 'octonode'

const Repository = (token, id) => {
    const ghGist = github
                    .client(token)
                    .gist()

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

    const writeCollection = (name, content) => {
        const collection = { 'files': {} }
        collection.files[name] = { 'content': (name.endsWith('.json') ? JSON.stringify(content) : content) }
        return ghGist.editAsync(id,collection)
    }

    return {
        readCollection,
        writeCollection
    }
}

export default Repository