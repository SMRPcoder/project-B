
const fs=require("fs");
const jwt=require("jsonwebtoken");

exports.createJWT = (data) => {
    const privateKey = fs.readFileSync('private.key');
    const token = jwt.sign({
        "_id": data.get("_id"),
        "email": data.get("email"),
        "firstname": data.get("firstname"),
        "lastname": data.get("lastname")
    }, privateKey, { algorithm: "RS256" });

    return token;
}