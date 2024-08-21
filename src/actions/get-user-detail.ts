'use server';

import client from "@/lib/apollo/apollo-server";
import { gql } from "@apollo/client";

const GET_USER_DETAIL = gql`
  query UserByID($userById: String!) {
    userByID(id: $userById) {
      data {
        id
        first_name
        last_name
        email
        password
      }
    }
  }
`;

export const getUserDetail = async (userById: string): Promise<{
  data: any;
  error: string | null;
}> => {
  try {
    const { data, errors } = await client.query({
      query: GET_USER_DETAIL,
      variables: { userById },
    });

    if (errors) {
      return {
        data: null,
        error: errors[0]?.message || "Unknown error",
      };
    }

    return {
      data: data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || "Unknown error",
    };
  }
};
