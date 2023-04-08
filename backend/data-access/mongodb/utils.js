

const idMap = obj => {
    if (!obj)
        return obj

    const { _id: id, ...rest } = obj
    delete rest.__v

    return {
        id,
        ...rest
    }
}

const idsMap = array => {
    if (!array || array.length === 0) {
        return array
    }
    return array.map(obj => {
        return idMap(obj)
    })
}





module.exports = {
    idMap,
    idsMap
}