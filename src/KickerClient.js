import request from 'request-promise-native'

const URL_LOGIN = 'https://secure.kicker.de/community/login'

const KickerAPI = loginOptions => {
    let executeLogin = true;

    return {
        crawl: async options => {
            let loggedIn = !executeLogin

            if(executeLogin) {
                executeLogin = false;
                loggedIn = await login(loginOptions)
            }

            if(loggedIn) {
                return getPage(options)
            } else {
                return {
                    status: 401
                }
            }
        }
    }
}

const httpClient = request.defaults({
    jar: true, //activate cookie
    resolveWithFullResponse: true, // response instead of body
    followAllRedirects: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36'
    }
});

const login = options => {
    return httpClient({
        method: 'POST',
        url: URL_LOGIN,
        form: {
            userTextBox: options.user,
            passwortTextBox: options.paswd,
            returnUrlTextBox: '',
            authresponse: ''
        }
    })
    .then( response => {
        if(response.request.uri.href != URL_LOGIN) {
            console.log('Login successful!')
            return true
        } else {
            console.error('Login unsuccessful!')
            console.error('href', response.request.uri.href )
            return false
        }
    })
    .catch(function (error) {
        console.error('Error during login.')
        console.error(reason.name + (reason.options ? ' ' + reason.options.url : ''))
        console.error(reason.message)
        //console.debug(reason)
        
        return false
	})
}

const getPage = options => {
    return httpClient(options)
    .then(response => {
        const url = response.request.uri.href
        if(url.startsWith(URL_LOGIN)) {
            console.error('Can\'t get page ' + options.url)
            console.error('Not logged in!')
            
            return {
                status: 401
            }
        } else {
            console.log('Get page ' + options.url)

            return {
                status: 200,
                body: response.body
            }
        }
    })
    .catch(reason => {
        console.error('Error during getPage.')
        console.error(reason.name + ' ' + (reason.options ? reason.options.url : ''))
        console.error(reason.message)
        //console.debug(reason)

        return {
            status: 401
        }
    });
}

export default KickerAPI