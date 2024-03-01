const fib = require(".");
const express = require("express");

const app = express();
const port = 3000;

const content = (body) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>fibonocci Finder</title>
    <link rel="stylesheet" href="style.css">
  </head>
<body style="background: darkslategrey; display: flex; align-items: center; justify-content: center; margin: auto">
    ${body}
</body>
    </html>
    `;

const form = `
	<form action="/" method="get" style="max-width: 800px; margin: auto">
     <div class="form-example">
        <label for="n" style="color: white; font: bold">nth fibonocci number: </label><br/>
        <input type="number" name="n" id="n" required />
    </div>
    <div>
    <button type="submit">Find</button>
    <div>
    </form>`;

const emptyBody = `
    ${form}`;

const body = (n) => `
    ${form}
    <div style="font: caption; color: lightpink; max-width: 100vw; word-wrap: break-word;">
        <h1>
        ${n}
    </h1>
    </div>`;

app.get("/", (req, res) => {
  const n = req.query.n;

  if (!n) {
    res.send(content(emptyBody));
  }

  const answer = fib.fib(Number(n));
  res.send(content(body(answer)));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
