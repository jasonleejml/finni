import { gql } from "@apollo/client";

export const ADD_PATIENT = gql`
    mutation addPatient(
        $providerID: String!,
        $firstName: String!,
        $middleName: String,
        $lastName: String!,
        $dob: String!,
        $address: [AddressInputType!]
        $additionalFields: [AdditionalFieldInput!]
    ) {
        addPatient(
            providerID: $providerID,
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
`;

export const DELETE_PATIENT = gql`
    mutation deletePatient(
        $id: ID!
    ) {
        deletePatient(
            id: $id,
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
`;

export const UPDATE_PATIENT = gql`
    mutation updatePatient(
        $id: ID!
        $firstName: String!,
        $middleName: String,
        $lastName: String!,
        $dob: String!,
        $address: [AddressInputType!]
        $additionalFields: [AdditionalFieldInput!]
    ) {
        updatePatient(
            id: $id,
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
`;