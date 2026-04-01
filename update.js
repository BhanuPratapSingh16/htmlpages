const http = require('http');
const querystring = require('querystring');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./studentdb.db');

const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url === '/update') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            const parsed = querystring.parse(body);

            const id = parseInt(parsed.id);
            const name = parsed.name;
            const course = parsed.course;

            const sql = "UPDATE student SET name=?, course=? WHERE id=?";

            db.run(sql, [name, course, id], function(err) {

                res.writeHead(200, { 'Content-Type': 'text/plain' });

                if (err) {
                    console.error(err);
                    res.end("Error updating record");
                } else {
                    res.end("Record Updated");
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