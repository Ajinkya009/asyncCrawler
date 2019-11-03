'use strict';

let mongoose = require("mongoose");
let urlSchema = new mongoose.Schema({
    address: {type: String, index:true},
    referenceCount: {type:Number, default:1},
    parameters:[String]
});

let URL = mongoose.model('Url', urlSchema);

module.exports = URL;