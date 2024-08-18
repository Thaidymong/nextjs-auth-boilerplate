"use server";

import client from "@/lib/apollo/apollo-server";
import { ErrorResponse } from "@/types/error-response";
import { gql } from "@apollo/client";

const SIGN_UP_MUTATION = gql`
  mutation Mutation($input: CreateUserDto!) {
    create(input: $input) {
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

export const signup = async (input: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: SIGN_UP_MUTATION,
      variables: {
        input: {
          email: input.email,
          password: input.password,
          first_name: input.first_name,
          last_name: input.last_name,
        },
      },
    });

    if (errors) {
      const error: ErrorResponse = errors[0];
      return {
        error: error.message,
        data: null,
      };
    }

    return {
      data: data?.create,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};
