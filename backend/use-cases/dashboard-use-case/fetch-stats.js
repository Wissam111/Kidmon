

const buildFetchStatsUseCase = ({ dashboardDb }) => {
    return async () => {
        return await dashboardDb.find()
    }
}


module.exports = {
    buildFetchStatsUseCase
}