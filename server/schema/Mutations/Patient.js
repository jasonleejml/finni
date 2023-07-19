const { GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLEnumType } = require('graphql');
const { PatientType } = require("../TypeDefs/Patient");
const Patient = require("../../models/Patient");
const { stateEnums } = require("../../utils/states");

const AdditionalFieldInputType = new GraphQLInputObjectType({
    name: "AdditionalFieldInput",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const AddressInputType = new GraphQLInputObjectType({
    name: "AddressInputType",
    fields: () => ({
        id: { type: GraphQLID },
        street1: { type: new GraphQLNonNull(GraphQLString) },
        street2: { type: GraphQLString },
        city: { type: new GraphQLNonNull(GraphQLString) },
        state: {
            type: new GraphQLEnumType({
                name: "StateInput",
                values: stateEnums,
            })
        },
        zip: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const ADD_PATIENT = {
    type: PatientType,
    args: {
        providerID: { type: new GraphQLNonNull(GraphQLString)},
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        middleName: { type: GraphQLString },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        dob: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLList(AddressInputType) },
        additionalFields: { type: new GraphQLList(AdditionalFieldInputType) }
    },
    resolve(parent, args) {
        const { providerID, firstName, middleName, lastName, dob, address, additionalFields } = args;

        const patient = new Patient({
            providerID,
            firstName,
            middleName,
            lastName,
            dob,
            address,
            additionalFields
        });

        return patient.save();
    }
};

const DELETE_PATIENT = {
    type: PatientType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        return Patient.findByIdAndDelete(args.id);
    }
};

const UPDATE_PATIENT = {
    type: PatientType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        middleName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString },
        address: { type: new GraphQLList(AddressInputType) },
        additionalFields: { type: new GraphQLList(AdditionalFieldInputType) },
    },
    async resolve(parent, args) {
        const { id, firstName, middleName, lastName, dob, address, additionalFields } = args;

        return Patient.findByIdAndUpdate(
            id,
            {
                $set: {
                    firstName,
                    middleName,
                    lastName,
                    dob,
                    address,
                    additionalFields
                }
            },
            { new: true }
        )
    }
}

module.exports = { ADD_PATIENT, DELETE_PATIENT, UPDATE_PATIENT };