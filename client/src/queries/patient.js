import { gql } from "@apollo/client";

export const GET_ALL_PATIENTS = gql`
    query getAllPatients {
        getAllPatients {
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