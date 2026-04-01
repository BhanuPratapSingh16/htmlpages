const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url === '/math') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            const parsed = querystring.parse(body);

            const num1 = parseFloat(parsed.num1);
            const op = parsed.operation;

            let result = 0;

            if (op === 'add') {
                const num2 = parseFloat(parsed.num2);
                result = num1 + num2;
            }
            else if (op === 'sub') {
                const num2 = parseFloat(parsed.num2);
                result = num1 - num2;
            }
            else if (op === 'mul') {
                const num2 = parseFloat(parsed.num2);
                result = num1 * num2;
            }
            else if (op === 'sin') {
                result = Math.sin(num1);
            }
            else if (op === 'cos') {
                result = Math.cos(num1);
            }
            else if (op === 'tan') {
                result = Math.tan(num1);
            }

            // Instead of JSP forward → send HTML response
            res.writeHead(200, { 'Content-Type': 'text/html' });

            res.end(`
                <html>
                <head><title>Result</title></head>
                <body>
                    <h2>Result: ${result}</h2>
                    <a href="index.html">Go Back</a>
                </body>
                </html>
            `);

        });

    } else {
        res.writeHead(404);
        res.end("Not Found");
    }

});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});