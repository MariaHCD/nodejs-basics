const fs = require('fs');

const getFileData = (fileName, res) => {
    return fs.readFile(fileName, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write(err);
        } else {
            res.write(data);
        }
        return res.end();
    });
}

const parseRequestData = (req, res) => {
    const body = [];

    req.on('data', (data) => {
        body.push(data);
    });

    req.on('end', () => {
        const parsedData = Buffer.concat(body).toString();
        const message = parsedData.split('=')[1];
        console.log(message);
    });
    res.end();
}

const requestHandler = (req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const url = req.url;

    switch (url) {
        case '/':
            getFileData('./views/index.html', res);
            break;

        case '/users':
            getFileData('./views/users.html', res);
            break;

        case '/create-user':
            parseRequestData(req, res);
            break;

        default:
            getFileData('./views/404.html', res);
    }

}

exports.handler = requestHandler;
