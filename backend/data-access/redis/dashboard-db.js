

const REDIES_KEYS = {
    // productsCount: 'PRDUCTS_COUNT',
    productsSoldCounters: 'PRODUCTS_SOLD_COUNTERS',
    topSoldProducts: 'TOP_SOLD_PRODUCTS',
    recentSoldProducts: 'RECENT_SOLD_PRODUCTS',
    soldProductsCount: 'SOLD_PRODUCTS_COUNT',
    categoriesCounters: 'CATEGORIES_COUNTERS',
    purchasesCount: 'PURCHASES_COUNT',
    usersCount: 'USERS:COUNT',
    productsCount: 'PRODUCTS:COUNT'
}


exports.makeDashboardDb = ({ makeDb }) => {

    return Object.freeze({
        find
    })

    async function find() {
        const redisClient = await makeDb()

        const recentSoldProducts = await redisClient.lRange(REDIES_KEYS.recentSoldProducts, 0, -1)
        const productsSoldCounters = await redisClient.hGetAll(REDIES_KEYS.productsSoldCounters)
        const topSoldProducts = await redisClient.zRange(REDIES_KEYS.topSoldProducts, 0, 5)
        const categoriesCounters = await redisClient.hGetAll(REDIES_KEYS.categoriesCounters)

        const soldProductsCount =+ await redisClient.get(REDIES_KEYS.soldProductsCount) || 0
        const purchasesCount =+ await redisClient.get(REDIES_KEYS.purchasesCount) || 0
        const usersCount =+ await redisClient.get(REDIES_KEYS.usersCount) || 0
        const productsCount =+ await redisClient.get(REDIES_KEYS.productsCount) || 0


        return {
            recentSoldProducts,
            productsSoldCounters,
            topSoldProducts,
            categoriesCounters,
            soldProductsCount,
            purchasesCount,
            usersCount,
            productsCount
        }
    }

}


