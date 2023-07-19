export const addressFormat = (address) => {
    const { street1, street2, city, state, zip } = address;

    let fullAddress = street1;
    if (street2) {
        fullAddress += ' ' + street2;
    }

    fullAddress += ', ' + city + ', ' + state + ' ' + zip;
    return fullAddress;
}