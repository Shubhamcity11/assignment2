let express = require("express");
const fs = require('fs')
let router = express.Router();
const { createError } = require("../utils/helpers");

router.get("/marcopolo", (req, res, next) => {
    let writePath = __dirname + "/output.txt";
    let cnt = 0;
    let ans = "";
    for(let i = 1; i <= 1_000_000; i++){
        cnt++;
        if(i % 4 == 0 && i % 7 == 0){
            ans += "marcopolo,";
        }
        else if(i % 4 == 0){
            ans += "marco,";
        }
        else if(i % 7 == 0){
            ans += "polo,"
        }
        else{
            ans += i === 30 ? i : i + ","
        }

        if(cnt % 1000 == 0 && i != 30){
            ans += "\n";
        }
    }
    fs.writeFileSync(writePath, ans);
    res.status(200).json({
        success: true,
        data: ans 
    })
})

router.get("/userStory", (req, res, next) => {
    let readPath = __dirname + "/input.txt";
    let writePath = __dirname + "/output.txt";
    let data = fs.readFileSync(readPath, "utf-8")
    data = data.split(/\r\n|\n/);
    let nos = {
        " _ | ||_|": 0,
        "     |  |": 1,
        " _  _||_ ": 2,
        " _  _| _|": 3,
        "   |_|  |": 4,
        " _ |_  _|": 5,
        " _ |_ |_|": 6,
        " _   |  |": 7,
        " _ |_||_|": 8,
        " _ |_| _|": 9
    }
    let ans = "";
    for(let i = 0; i < data.length; i += 4){
        let line1 = data[i];
        let line2 = data[i + 1];
        let line3 = data[i + 2];
        let notGood = false;
        
        for(let j = 0; j < data[i].length; j += 3){
            let one = line1[j] + line1[j + 1] + line1[j + 2];
            let two = line2[j] + line2[j + 1] + line2[j + 2];
            let three = line3[j] + line3[j + 1] + line3[j + 2];
            let str = one + two + three
            ans += nos[str] === undefined ? "?" : nos[str]
            if(nos[str] === undefined) notGood = true            
        }
        if(notGood){
            ans += " ILLEGAL"
        }
        ans += "\n";
    }
    fs.writeFileSync(writePath, ans);

    res.status(200).json({
        success: true,
        data: ans
    })
})

module.exports = router;