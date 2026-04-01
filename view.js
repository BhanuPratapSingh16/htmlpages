const http = require('http');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./studentdb.db');

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/view') {

        res.writeHead(200, { 'Content-Type': 'text/html' });

        let html = `
            <html>
            <head>
                <title>Student Records</title>
                <style>
                    body { font-family: Arial; padding:20px; }
                    table { border-collapse: collapse; width: 50%; }
                    th, td { border:1px solid #ccc; padding:8px; text-align:center; }
                    th { background:#007BFF; color:white; }
                </style>
            </head>
            <body>
            <h2>Student Records</h2>
            <table>
            <tr><th>ID</th><th>Name</th><th>Course</th></tr>
        `;

        const sql = "SELECT * FROM student";

        db.all(sql, [], (err, rows) => {

            if (err) {
                res.end("Error fetching data");
                return;
            }

            rows.forEach(row => {
                html += `
                    <tr>
                        <td>${row.id}</td>
                        <td>${row.name}</td>
                        <td>${row.course}</td>
                    </tr>
                `;
            });

            html += `
                </table>
                <br>
                <a href="index.html">Go Back</a>
                </body>
                </html>
            `;

            res.end(html);
        });

    } else {
        res.writeHead(404);
        res.end("Not Found");
    }

});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});