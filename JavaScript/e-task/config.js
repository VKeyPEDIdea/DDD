const config = {
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
    transport: 'http',
    apiSettings: {
        host: '127.0.0.1',
        port: '8001'
    }
};

module.exports = config;
