const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET
const ClaimTypes = require('../config/claimtypes');

const GenerateToken = (email, name, rol) => {
    const token = jwt.sign({ 
        [ClaimTypes.Name]: email,
        [ClaimTypes.GivenName]: name,
        [ClaimTypes.Role]: rol,
        "iss": "MusicsharkServerJWT",
        "aud": "MusicsharkClientJWT"
    }, 
        jwtSecret, { 
        expiresIn: '20m',
    });
    return token;
};

const RemainingTime = (req) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtSecret);

        const time = (decodedToken.exp - (Date.now() / 1000));
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        return "00:" + minutes.toString().padStart(2, "0") + ':' + seconds.toString().padStart(2, "0");
    } catch (error) {
        console.log("sale"+error);
        return null;
    }
};

module.exports = { GenerateToken, RemainingTime };