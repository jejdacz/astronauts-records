const graphqlRequest = (query, variables) =>
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  }).then(r => r.json());

export default graphqlRequest;
