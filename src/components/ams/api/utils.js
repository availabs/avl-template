export const postJson = (url, body) =>
	fetch(url, {
		method: "POST",
    headers: {
      	Accept: 'application/json, text/plain',
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
	})
	.then(r => r.json());
