const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require("graphql");
const StateEnumType = require("./State");

const AddressType = new GraphQLObjectType({
    name: "Address",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        street1: { type: new GraphQLNonNull(GraphQLString) },
        street2: { type: GraphQLString },
        city: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: StateEnumType },
        zip: { type: new GraphQLNonNull(GraphQLString) },
    })
});

module.exports = AddressType;