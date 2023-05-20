export default function decrease({ previousQuantity, min }) {
    if (min)
        return {
            message: previousQuantity > min ? null : "Min!",
            quantity: previousQuantity > min ? previousQuantity - 1 : min
        }

    return {
        quantity: previousQuantity - 1
    }
}