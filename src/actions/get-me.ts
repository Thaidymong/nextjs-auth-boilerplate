"use server";

import client from "@/lib/apollo/apollo-server";
import { gql } from "@apollo/client";

const GET_ME = gql`
  query Me {
    me {
      id
      first_name
      last_name
      email
      password
    }
  }
`;

export const getMe = async (): Promise<{
  me: any;
  error: string | null;
}> => {
  try {
    const { data, error } = await client.query({
      query: GET_ME,
    });

    if (error?.message) {
      return {
        me: null,
        error: error.message,
      };
    }

    return {
      me: data?.me,
      error: null,
    };
  } catch (error: any) {
    return {
      me: null,
      error: error?.message,
    };
  }
};
