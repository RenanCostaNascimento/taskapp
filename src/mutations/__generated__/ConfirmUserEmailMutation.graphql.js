/**
 * @flow
 * @relayHash 53167c4cbe5ec755fc2fa8162dad3133
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ConfirmUserEmailMutationVariables = {|
  input: {
    emailConfirmationToken?: ?string;
    fullName?: ?string;
    id: string;
    isEmailConfirmed?: ?boolean;
    userName?: ?string;
    clientMutationId: string;
  };
|};

export type ConfirmUserEmailMutationResponse = {|
  +updateUser: ?{|
    +user: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
mutation ConfirmUserEmailMutation(
  $input: UpdateUserInput!
) {
  updateUser(input: $input) {
    user {
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConfirmUserEmailMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateUserInput!"
          }
        ],
        "concreteType": "UpdateUserPayload",
        "name": "updateUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "ConfirmUserEmailMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ConfirmUserEmailMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateUserInput!"
          }
        ],
        "concreteType": "UpdateUserPayload",
        "name": "updateUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation ConfirmUserEmailMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    user {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
