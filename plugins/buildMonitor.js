import process from 'process'

export default function (api) {
    api.onBuildComplete(({ stats }) => {
        api.logger.log('Buiuld succeed')
        process.exit()
    })
}