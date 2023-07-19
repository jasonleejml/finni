const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } = require("graphql");
const AddressType = require("./Address");

const AdditionalFieldType = new GraphQLObjectType({
    name: "AdditionalField",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const PatientType = new GraphQLObjectType({
    name: "Patient",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        providerID: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        middleName: { type: GraphQLString },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        dob: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLList(AddressType) },
        additionalFields: { type: new GraphQLList(AdditionalFieldType) }
    })
});

module.exports = { PatientType, AdditionalFieldType };