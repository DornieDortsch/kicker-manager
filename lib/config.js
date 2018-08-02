import dotenv from 'dotenv'

dotenv.config()

export default {
    kicker: {
        user: process.env.KICKER_USERNAME,
        pwd: process.env.KICKER_PWD
    }
}