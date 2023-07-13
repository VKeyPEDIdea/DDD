const config = {
    sandbox: {
        timeout: 5000,
        displayErrors: false
    },
    static: {
        port: 8000,
    },
    dbPool: {
        host: '127.0.0.1',
        port: 5432,
        database: 'example',
        user: 'marcus',
        password: 'marcus',
    },
    hashSettings: {
        encodingScheme: 'base64',
    },
    api: {
        transport: 'http',
        host: '127.0.0.1',
        port: '8001'
    }
};

module.exports = config;
