const { dashboardDb } = require("../../data-access/redis");
const { buildFetchStatsUseCase } = require("./fetch-stats");

const fetchStats = buildFetchStatsUseCase({ dashboardDb: dashboardDb })


module.exports = Object.freeze({
    fetchStats
})