

const REDIES_KEYS = {
    // productsCount: 'PRDUCTS_COUNT',
    productsSoldCounters: 'PRODUCTS_SOLD_COUNTERS',
    topSoldProducts: 'TOP_SOLD_PRODUCTS',
    recentSoldProducts: 'RECENT_SOLD_PRODUCTS',
    soldProductsCount: 'SOLD_PRODUCTS_COUNT'
}


exports.makeDashboardDb = ({ makeDb }) => {

    return Object.freeze({
        find
    })

    async function find() {
        const redisClient = await makeDb()

        const soldProductsCount = await redisClient.get(REDIES_KEYS.soldProductsCount)
        const recentSoldProducts = await redisClient.lRange(REDIES_KEYS.recentSoldProducts, 0, -1)
        const productsSoldCounters = await redisClient.hGetAll(REDIES_KEYS.productsSoldCounters)
        const topSoldProducts = await redisClient.zRange(REDIES_KEYS.topSoldProducts, 0, 5)
        // users count 
        // avg purchases per day
        // products count 
        

        console.log(productsSoldCounters);

        return {
            soldProductsCount,
            recentSoldProducts,
            productsSoldCounters,
            topSoldProducts
        }
    }

}


