import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.SERVER_PORT,
    shedule: process.env.SHEDULE,
    mode: process.env.MODE,
    kicker: {
        user: process.env.KICKER_USERNAME,
        pwd: process.env.KICKER_PWD
    },
    github: {
        token: process.env.GITHUB_TOKEN,
        gist: process.env.GITHUB_GIST
    }
}