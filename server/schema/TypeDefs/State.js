const { GraphQLEnumType } = require("graphql");
const { stateEnums } = require("../../utils/states")


const StateEnumType = new GraphQLEnumType({
    name: "State",
    values: stateEnums,
});

module.exports = StateEnumType;