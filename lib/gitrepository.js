import github from 'octonode'

import config from './config'

const ghGist = github.client(config.github.token).gist()

//ghGist.get(config.github.token, (e, gists) => console.log(gists))

ghGist.edit(config.github.gist, {
    files: {
        'transfermarkt.json': {
            'content': '{"foo":"bar", "bar": "baz"}'
        }
    }
  }, (err, data) => console.log(err, data)); 