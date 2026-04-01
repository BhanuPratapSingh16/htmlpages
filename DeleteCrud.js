const http = require('http');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();
const querystring = require('querystring');

const db = new sqlite3.Database('./studentdb.db');

const server = http.createServer((req, res) => {

    if (req.method === 'POST' && req.url === '/delete') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            const parsed = querystring.parse(body);
            const id = parseInt(parsed.id);

            const sql = "DELETE FROM student WHERE id=?";

            db.run(sql, [id], function(err) {

                res.writeHead(200, { 'Content-Type': 'text/plain' });

                if (err) {
                    console.error(err);
                    res.end("Error deleting record");
                } else {
                    res.end("Record Deleted");
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