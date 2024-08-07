const { validateToken } = require('./JWT');

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        // Assuming the token is passed in the headers or in the event body
        const token = event.headers.cookie;
        console.log('the token: ', token);
        const accessToken = cookies
            .split(';')
            .find(cookie => cookie.trim().startsWith('acess-token='))
            .split('=')[1];


        if (!token) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "No token provided" }),
            };
        }

        const isValid = await validateToken(accessToken); // Assuming validateToken is a promise

        if (isValid) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Authentication complete" }),
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Invalid token" }),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};
