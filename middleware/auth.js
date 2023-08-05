import jwt from 'jsonwebtoken'

const auth = async(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[0];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
            req.userId = decodedData?.id;
        }else{
            // Google session
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
export default auth