import { gql } from "@apollo/client";

export const ADD_PATIENT = gql`
    mutation addPatient(
        $firstName: String!,
        $middleName: String,
        $lastName: String!,
        $dob: String!,
        $address: [AddressInputType!]
        $additionalFields: [AdditionalFieldInput!]
    ) {
        addPatient(
            firstName: $firstName,
            middleName: $middleName,
            lastName: $lastName,
            dob: $dob,
            address: $address,
            additionalFields: $additionalFields,
        ) {
            id,
            firstName,
            middleName,
            lastName,
            dob,
            address {
                street1,
                street2,
                city,
                state,
                zip,
            },
            additionalFields {
                title,
                value,
            }
        }
    }
`