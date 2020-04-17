export const GET_TEST_SET_EVENTS = "GET_TEST_SET_EVENTS";
export const GET_TEST_SET_EVENTS_SUCCESS = "GET_TEST_SET_EVENTS_SUCCESS";
export const GET_TEST_SET_EVENTS_FAIL = "GET_TEST_SET_EVENTS_FAILS";

export function getTestSetEntries(
  account = "1a7e9a24-fc8d-4004-95d8-e7e9b8631bed",
  project = "bde32948-f9b3-4d3e-bb5f-630437a0338e",
  testSet = "60652b19-98f3-40b4-88f7-88c71dbc788a"
) {
  return {
    types: [
      GET_TEST_SET_EVENTS,
      GET_TEST_SET_EVENTS_SUCCESS,
      GET_TEST_SET_EVENTS_FAIL
    ],
    promise: client =>
      client(
        `/accounts/${account}/projects/${project}/testSets/${testSet}/testSetEntries`
      )
  };
}
