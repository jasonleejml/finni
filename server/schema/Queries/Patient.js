const { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = require("graphql");
const Patient = require("../../models/Patient");
const { PatientType } = require("../TypeDefs/Patient");

const GET_ALL_PATIENTS = {
    type: new GraphQLList(PatientType),
    args: {
        providerID: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, arg) {
        return Patient.find({
            providerID: arg.providerID,
        });
    }
}

const GET_PATIENT = {
    type: PatientType,
    args: {
        id: { type: GraphQLID },
    },
    resolve(parent, arg) {
        return Patient.findById(arg.id);
    }
}

module.exports = { GET_ALL_PATIENTS, GET_PATIENT };