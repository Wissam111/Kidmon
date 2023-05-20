
export default function increase({ previousQuantity, max }) {
    if (max)
        return {
            message: previousQuantity < max ? null : "Max!",
            quantity: previousQuantity < max ? previousQuantity + 1 : max
        }

    return {
        quantity: previousQuantity + 1
    }
}