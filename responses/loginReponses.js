// const Cache = require('../cache'); // Adjust the path based on your project structure

// class ResponseHandler {
//     static handleLoginProxyResponse(proxyRes, req, res) {
//         let proxyResData = []; // Initialize to collect response chunks

//         proxyRes.on('data', (chunk) => {
//             proxyResData.push(chunk); // Collect response data chunks
//         });

//         proxyRes.on('end', () => {
//             const responseBody = Buffer.concat(proxyResData).toString(); // Concatenate the collected chunks

//             // Cache login responses
//             if (req.url === '/v1/linktosync/auth/login' && proxyRes.statusCode === 200) {
//                 console.log(`Caching login response for: ${req.url}`);
//                 Cache.set(req.url, {
//                     body: responseBody,
//                     contentType: proxyRes.headers['content-type'] || 'application/json',
//                 });
//             }

//             // Send the response to the client
//             if (!res.headersSent) {
//                 const contentType = proxyRes.headers['content-type'] || 'application/json';
//                 res.writeHead(proxyRes.statusCode, { 'Content-Type': contentType });
//                 res.end(responseBody);
//             }
//         });
//     }
// }

// module.exports = ResponseHandler;
