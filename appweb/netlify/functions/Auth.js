const { verify } = require('jsonwebtoken');

const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject('No token provided');
        }

        verify(token,
            '720b4c972b5262a9ad16fe47b7445668de1cf114d714615f65eb31b89f30801093ef27740f1b6b17ca6ddcd7987f06eb498b69d1abc74ecabe9a68bd8b587b75',
            (err, decoded) => {
                if (err) {
                    return reject('Invalid token');
                }
                resolve(decoded);
            });
    });
};

module.exports = validateToken;
