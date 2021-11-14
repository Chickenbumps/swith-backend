import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeRanking(
      rank: Boolean
      todayTime: Boolean
      weekTime: Boolean
      monthTime: Boolean
      totalTime: Boolean
    ): [User]!
  }
`;
