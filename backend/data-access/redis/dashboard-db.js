const moment = require('moment')

const REDIES_KEYS = {
    productsSoldCounters: "PRODUCTS_SOLD_COUNTERS",
    topSoldProducts: "TOP_SOLD_PRODUCTS",
    recentSoldProducts: "RECENT_SOLD_PRODUCTS",
    soldProductsCount: "SOLD_PRODUCTS_COUNT",
    categoriesCounters: "CATEGORIES_COUNTERS",
    purchasesCount: "PURCHASES_COUNT",
    usersCount: "USERS_COUNT",
    productsCount: "PRODUCTS_COUNT",
    purchasesByHour: 'PURCHASES_BY_HOUR'
};

const makePairsFromArray = (array) => {
    arr = [];
    for (let i = 0; i < array.length - 1; i += 2) {
        arr.push({ key: array[i], value: array[i + 1] });
    }
    return arr;
};

exports.makeDashboardDb = ({ makeDb }) => {
    return Object.freeze({
        find,
    });

    async function find() {
        const redisClient = await makeDb();

        const recentSoldProducts = await redisClient.lRange(
            REDIES_KEYS.recentSoldProducts,
            0,
            -1
        );
        const productsSoldCounters = await redisClient.hGetAll(
            REDIES_KEYS.productsSoldCounters
        );
        const categoriesCounters = await redisClient.hGetAll(
            REDIES_KEYS.categoriesCounters
        );

        const soldProductsCount =
            +(await redisClient.get(REDIES_KEYS.soldProductsCount)) || 0;
        const purchasesCount =
            +(await redisClient.get(REDIES_KEYS.purchasesCount)) || 0;
        const usersCount = +(await redisClient.get(REDIES_KEYS.usersCount)) || 0;
        const productsCount =
            +(await redisClient.get(REDIES_KEYS.productsCount)) || 0;

        const topSoldProducts = makePairsFromArray(
            await redisClient.sendCommand([
                "ZREVRANGE",
                REDIES_KEYS.topSoldProducts,
                "0",
                "5",
                "withscores",
            ])
        );


        const date = new Date()
        date.setMinutes(0)
        date.setMilliseconds(0)
        date.setHours(0)
        const dateOnly = moment(date).format('DD/MM/YYYY')
        console.log(`${REDIES_KEYS.purchasesByHour}:${dateOnly}`)
        const purchasesByHour = makePairsFromArray(
            await redisClient.sendCommand([
                "ZREVRANGE",
                `${REDIES_KEYS.purchasesByHour}:${dateOnly}`,
                "0",
                "5",
                "withscores",
            ])
        );
       
        return {
            recentSoldProducts,
            productsSoldCounters,
            topSoldProducts,
            categoriesCounters,
            soldProductsCount,
            purchasesCount,
            usersCount,
            productsCount,
            purchasesByHour
        };
    }
};
