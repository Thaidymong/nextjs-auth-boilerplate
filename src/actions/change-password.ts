"use server";

import client from "@/lib/apollo/apollo-server";
import { ErrorResponse } from "@/types/error-response";
import { gql } from "@apollo/client";

const CHANGE_PASSWORD_MUTATION = gql`
 mutation Mutation( $input: ChangePasswordDto!) {
  changePassword( input: $input) {
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

export const changePassword = async (
    input: {
        currentPassword: string;
        password: string;
    }) => {
    try {
        const { data, errors } = await client.mutate({
            mutation: CHANGE_PASSWORD_MUTATION,
            variables: {
                input: {
                    currentPassword: input.currentPassword,
                    password: input.password,
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
            data: data?.changePassword,
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.message,
        };
    }
};
