const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    let url = req.url;
    if(url === '/') {
        url = '/index.html';
    }

    let contentType = 'text/html';

    if (url.endsWith('css')){
        contentType = 'text/css';
    } else if (url.endsWith('jpg') || url.endsWith('jpeg')) {
        contentType = 'image/jpeg';
    } else if (url.endsWith('png')) {
        contentType = 'image/png';
    } else if (url.endsWith('gif')){
        contentType = 'image/gif';
    }
    
    fs.readFile(`${__dirname}/public${url}`, (error, buf)=> {
        if (error){
            res.writeHead(404,{
                'Content-Type': 'text/html'
            });
            res.end(`<h1> File is not find !!!<h1>`);
        } else {
            res.writeHead(200, {
                'content-type': contentType
            });

            const contents = buf;
            res.end(contents);
        }
    });

});
server.listen(3000,()=>{
    console.log('server is listining');
});