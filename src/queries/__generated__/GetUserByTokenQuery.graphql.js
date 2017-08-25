/**
 * @flow
 * @relayHash 0563fbdbaa0a13b24f7e1071abc4123f
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type GetUserByTokenQueryResponse = {|
  +viewer: {|
    +User: ?{|
      +userName: ?string;
      +id: string;
    |};
  |};
|};
*/


/*
query GetUserByTokenQuery(
  $token: String
) {
  viewer {
    User(emailConfirmationToken: $token) {
      userName
      id
    }
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "token",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetUserByTokenQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "emailConfirmationToken",
                "variableName": "token",
                "type": "String"
              }
            ],
            "concreteType": "User",
            "name": "User",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "userName",
                "storageKey": null
              },
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
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "GetUserByTokenQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "token",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "GetUserByTokenQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "emailConfirmationToken",
                "variableName": "token",
                "type": "String"
              }
            ],
            "concreteType": "User",
            "name": "User",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "userName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    ]
  },
  "text": "query GetUserByTokenQuery(\n  $token: String\n) {\n  viewer {\n    User(emailConfirmationToken: $token) {\n      userName\n      id\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
