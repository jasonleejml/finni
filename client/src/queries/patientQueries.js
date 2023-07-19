import { gql } from "@apollo/client";

export const GET_ALL_PATIENTS = gql`
    query getAllPatients(
        $providerID: String!
    ) {
        getAllPatients(
            providerID: $providerID,
        ) {
            id,
            firstName,
            middleName,
            lastName,
            dob,
            address {
                id,
                street1,
                street2,
                city,
                state,
                zip,
            },
            additionalFields {
                id,
                title,
                value,
            }
        }
    }
`;

export const GET_PATIENT = gql`
    query getPatient(
        $id: ID!
    ) {
        getPatient(
            id: $id,
        ) {
            id,
            firstName,
            middleName,
            lastName,
            dob,
            address {
                id,
                street1,
                street2,
                city,
                state,
                zip,
            },
            additionalFields {
                id,
                title,
                value,
            }
        }
    }
`;