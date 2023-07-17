const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { GET_ALL_PATIENTS, GET_PATIENT } = require("./Queries/Patient");
const { ADD_PATIENT, DELETE_PATIENT, UPDATE_PATIENT } = require("./Mutations/Patient");


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getPatient: GET_PATIENT,
        getAllPatients: GET_ALL_PATIENTS
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPatient: ADD_PATIENT,
        deletePatient: DELETE_PATIENT,
        updatePatient: UPDATE_PATIENT
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});