const URL = require('../Models/url');

class UrlController{
    static async getAllData(req,res){
        try{
            const data = await URL.find();
            res.status(200).json({data:data});
        }
        catch(err){
            res.status(500).json({error:err});
        }
    }
}

module.exports = UrlController;