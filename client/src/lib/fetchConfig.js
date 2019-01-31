export const get = endPoint => {
  const url = `http://localhost:3000${endPoint}`;
  return fetch(url, { credentials: "include" })
    .then(res => res.json())
    .then(response => {
      return response;
    })
    .catch(e => console.log(e));
};

export const post = (endPoint, data) => {
  const url = `http://localhost:3000${endPoint}`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
