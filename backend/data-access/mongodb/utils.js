

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



const mapTo_id = obj => {
    if (!obj)
        return obj

    const { id, ...rest } = obj

    return {
        _id: id,
        ...rest
    }
}

const mapTo_ids = array => {
    if (!array || array.length === 0) {
        return array
    }
    return array.map(obj => {
        return mapTo_id(obj)
    })
}



module.exports = {
    idMap,
    idsMap,
    mapTo_id,
    mapTo_ids
}