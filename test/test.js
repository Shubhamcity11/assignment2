const assert = require('assert'),
      chai   = require('chai'),
      fs     = require('fs'),
      path   = require('path')
      server = require('../server'),
      chaiHttp = require('chai-http');
chai.use(chaiHttp);

//test case for nacropolo game
describe("assignment three tests", () => {
    it("successfully get the result if multiple users access the api parallely", (done) => {
        for(let i = 0; i < 5; i++){
            chai.request(server).get('/marcopolo').end((err, res) => {
                assert.equal(res.body.success, true)
            })
        }
        done();
    })

    it("parse invoice numbers and mark invalid invoices as illegal", done => {
        chai.request(server).get("/userStory").end((err, res) => {
            let rootdir = path.resolve("./");
            let file1  = fs.readFileSync(rootdir + "/routes/output.txt", "utf-8");
            let file2  = fs.readFileSync(rootdir + "/routes/expected.txt", "utf-8");
            if(err) return console.log(err);
            file1 = file1.split(/\r\n|\n/);
            file2 = file2.split(/\r\n|\n/);
            try{
                for(let i = 0; i < file1.length; i++){
                    assert.equal(file1[i], file2[i])
                }
            }
            catch(err){
                console.log(err);
            }
        })
        done();
    })
})