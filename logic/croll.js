const cheerio = require("cheerio");
const request = require("request");
const food = require("./food.js");
const enCode = encodeURI(food.foods[0]);
const options = {
  encoding: "utf-8",
  method: "GET",
  uri: `http://www.10000recipe.com/recipe/list.html?q=${enCode}`
};

// 만개의 레시피에서 크롤링을 한다.
// 예를 들어, 삼겹살을 만개의 레시피 사이트에서 검색을하면 여러개의 삼겹살 레시피 소개글들이 나오는데
// 거기서 맨 처음에 소개글의 링크에 다시 접속하여, 해당 소개글의 레시피를 얻는다.
request(options, function(err, res, html) {
  const $ = cheerio.load(html);

  let arr = $(".col-xs-4 a");
  const url = `http://www.10000recipe.com${arr[0].attribs.href}`;

  request(`${url}`, function(err, res, html) {
    const $ = cheerio.load(html);

    let arr = $(".case1");

    let find = arr[0].children[0].parent;

    let result = "";
    // for (let i = 0; i < find.length; ++i) {
    //   result += `${find.children[i].chidren[0].data}\n`;
    // }

    console.log(arr[0].children[0].parent.children[3].children[0].data);
    //console.log(result);
  });
});
