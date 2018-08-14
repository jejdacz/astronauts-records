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
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("response error");
    }
  });

export default graphqlRequest;
