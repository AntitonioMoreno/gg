const mongoose = require('mongoose');
const accounts = require('../../models/account');

const uri = 'mongodb+srv://GGadmin:ZarzMAK2znmsnTyA@casino.owknlio.mongodb.net/casinoWeb';

exports.handler = async (event, context) => {
    context.callBackWaitsForEmptyEventLoop = false;
    
    try {
        await mongoose.connect(uri,  { useNewUrlParser: true, useUnifiedTopology: true })
        const { user } = JSON.parse(event.user.user.user);
        const account = await accounts.findOne({ user: user });
        if (!account) {
            return {
                statusCode: 401,
                body: JSON.stringify({error: 'usuario no encontrado'})
            }
        }
        res.json({
            user: account.user,
            email: account.email,
            name: account.name,
            // Agrega más campos según sea necesario
        });
    } catch (error) {

    }
};