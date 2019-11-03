const cheerio = require('cheerio');
const URL = require('../../Models/url');
const request = require('request');
const logSymbols = require('log-symbols');

class Crawler{

    constructor(concurrency,baseUrl){
        this.concurrencyLimit = concurrency;
        this.urls = [];
        this.concurrencyCount = 0;
        this.urlStatus = {};
        this.baseUrl = baseUrl;
    }

    init(){
        this.enqueue(this.baseUrl);
    }

    enqueue(url){
        this.urls.push(url);
        while (this.concurrencyCount < this.concurrencyLimit) {
            if(this.urls.length>0){
                this.concurrencyCount++;
                this.processUrl();
            }
            break;
        }
    }
    
    processUrl(){
        const url = this.urls.shift();
        let next = this.processUrl.bind(this);
        this.parseUrl(url,next);
    }
    
    parseUrl(url,next){
        const self = this;
        console.log(logSymbols.info,'Started parsing: ', url);
        request(url, function (error, response, body) {
            if (error) {
                next(error, null);
                console.log(logSymbols.error, 'Error parsing: ', url);
            } else {
                self.bodyParser(body);
                self.urlStatus[url] = 'finished';
                console.log(logSymbols.success,'Finished parsing: ', url);
                next(null, url);
            }
        });
    }

    bodyParser(body){
        const self = this;
        const $ = cheerio.load(body);
        const urls = $(`a[href^="${this.baseUrl}"]`);
        urls.each((index, url) => {
            const baseUrl = url.attribs.href.split('?')[0];
            URL.updateOne({address:baseUrl},{$inc:{referenceCount:1}},{upsert:true}).then((resp)=>{
                const params = (url.attribs.href.split('?')[1]);
                if(params!=undefined){
                    const paramKeys = params.split("&").map(param=>{
                        return param.split('=')[0];
                    });
                    URL.updateOne({address:baseUrl},{$addToSet:{parameters:{$each:paramKeys}}}).then().catch(err=>{
                        console.log(err);
                    });
                }
            }).catch(err=>{
                console.log(err);
            });
            
            if (!self.urlStatus[baseUrl]) {
                self.urlStatus[baseUrl] = 'parsing';
                self.enqueue(baseUrl);
            }
        });
    }

}

module.exports = Crawler;