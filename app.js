const axios = require('axios').default;
const cheerio = require('cheerio');

let target;
let onepiece;
const link = "https://codequiz.azurewebsites.net";

process.argv.forEach((val, index) => {
    if (index == 2) {
        target = val;
    }
});

axios.request({
    url: link,
    method: "get",
    headers: {
        Cookie: 'hasCookie=true'
    }
}).then(body => {
    const bodyData = body;

    if (bodyData.status == 200) {

        const $ = cheerio.load(bodyData.data);

        const trList = [];
        const keyList = [];

        const tableData = $('table tr').length;
        if (tableData > 0) {
            $('table tr').each((idx, ele) => {

                if ($(ele).find('td').length > 0) {
                    const dataList = [];

                    $(ele).find('td').each((i, e) => {
                        if (idx == 0) {
                            keyList.push($(e).text().trim());
                        } else {
                            dataList.push($(e).text().trim());
                        }
                    });

                    if (idx > 0) {
                        trList.push(dataList);
                    }
                }

            });
        }

        if (trList.length > 0) {
            for(var i = 0; i < trList.length; i++) {
                for (var j = 0; j < trList[i].length; j++) {
                    if (trList[i][j] == target) {
                        onepiece = trList[i][j+1];
                    }
                }
            }
        }

        // console.log(trList);
        console.log(onepiece);
    }
});
