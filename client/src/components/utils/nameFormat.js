export const nameFormat = ({ firstName, middleName, lastName }) => {
    let fullName = firstName;
    if (middleName) {
        fullName += ' ' + middleName;
    }

    fullName += ' ' + lastName;
    return fullName;
};