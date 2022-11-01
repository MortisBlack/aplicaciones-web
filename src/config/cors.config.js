let allowlist = ['http://localhost:5500', 'http://127.0.0.1:5500']
let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } 
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions) 
}

export default corsOptionsDelegate;