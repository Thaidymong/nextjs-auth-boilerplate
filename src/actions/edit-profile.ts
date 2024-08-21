"use server";

import client from "@/lib/apollo/apollo-server";
import { ErrorResponse } from "@/types/error-response";
import { gql } from "@apollo/client";

const EDIT_PROFILE_MUTATION = gql`
  mutation UpdateUserProfile($updateUserProfileId: String!, $input: UpdateUserDto!) {
  updateUserProfile(id: $updateUserProfileId, input: $input) {
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

export const editprofile = async (
    id: string,
    input: {
        first_name: string;
        last_name: string;
    }) => {
    try {
        const { data, errors } = await client.mutate({
            mutation: EDIT_PROFILE_MUTATION,
            variables: {
                updateUserProfileId: id,
                input: {
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
            data: data?.updateUserProfile,
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.message,
        };
    }
};
