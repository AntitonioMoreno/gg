const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
    const accessToken = sign(
        {
            user
        },
        '720b4c972b5262a9ad16fe47b7445668de1cf114d714615f65eb31b89f30801093ef27740f1b6b17ca6ddcd7987f06eb498b69d1abc74ecabe9a68bd8b587b75'
    );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token'];
    if (!accessToken) {
        console.log('No access token found'); // Debugging line
        return res.status(400).json({ error: "User not Authenticated" });
    }
    verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { createToken, validateToken };