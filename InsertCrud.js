const http = require('http');
const querystring = require('querystring');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./studentdb.db');

const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url === '/insert') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            const parsed = querystring.parse(body);

            const id = parseInt(parsed.id);
            const name = parsed.name;
            const course = parsed.course;

            const sql = "INSERT INTO student VALUES (?,?,?)";

            db.run(sql, [id, name, course], function(err) {

                res.writeHead(200, { 'Content-Type': 'text/plain' });

                if (err) {
                    console.error(err);
                    res.end("Error inserting record");
                } else {
                    res.end("Record Inserted");
                }

            });

        });

    } else {
        res.writeHead(404);
        res.end("Not Found");
    }

});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});