const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url === '/string') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            const parsed = querystring.parse(body);

            const input = parsed.input;
            const operation = parsed.operation;

            let result = "";

            if (operation === "length") {
                result = input.length.toString();
            }
            else if (operation === "reverse") {
                result = input.split("").reverse().join("");
            }
            else if (operation === "palindrome") {
                const rev = input.split("").reverse().join("");
                if (input === rev)
                    result = "Palindrome";
                else
                    result = "Not Palindrome";
            }
            else if (operation === "initials") {
                const words = input.split(" ");
                words.forEach(w => {
                    result += w.charAt(0);
                });
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });

            res.end(`
                <html>
                <head>
                    <title>String Result</title>
                    <style>
                        body { font-family: Arial; padding:20px; }
                        .box {
                            background:white;
                            padding:20px;
                            width:300px;
                            box-shadow:0 0 10px #ccc;
                            border-radius:8px;
                        }
                    </style>
                </head>
                <body>
                    <div class="box">
                        <h2>Result: ${result}</h2>
                        <a href="index.html">Go Back</a>
                    </div>
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