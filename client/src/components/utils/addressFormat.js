export const addressFormat = (address) => {
    const { street1, street2, city, state, zip } = address;

    return `${street1}${ street2 ?? ""}, ${city}, ${state} ${zip}`
}