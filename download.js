import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const url = "https://bgmer.net/song-list?sort_by=normal";

//const forcefetchlist = false;
const forcefetchlist = true;

const html = await fetchOrLoad(url, forcefetchlist);
const dom = HTMLParser.parse(html);
console.log(html);

const links = dom.querySelectorAll(".detail > a");
//console.log(links);
const links2 = links.map(i => i.getAttribute("href"));
console.log(links2);

const pages = dom.querySelectorAll(".pagination > a");
const lastpage = parseInt(pages[pages.length - 2].text);
console.log("lastpage", lastpage);

const list = links2;
for (let i = 2; i <= lastpage; i++) {
  const url = `https://bgmer.net/song-list/page/${i}?sort_by=normal`;

  //console.log(url);
  const html = await fetchOrLoad(url, forcefetchlist);
  const dom = HTMLParser.parse(html);
  //console.log(html);

  const links = dom.querySelectorAll(".detail > a");
  //console.log(links);
  const links2 = links.map(i => i.getAttribute("href"));
  //console.log(links2);
  links2.forEach(i => list.push(i));
  await sleep(100 * Math.random());
}
//console.log(list);

// details
const items = [];
for (const url of list) {
  const html = await fetchOrLoad(url);
  const dom = HTMLParser.parse(html);
  console.log(dom);

  const json = JSON.parse(dom.querySelector(".saswp-schema-markup-output").text);
  console.log(json);
  const downloads = dom.querySelectorAll(".download-btn-grp a.download");
  const musics = downloads.map(i => ({
    name: i.text.substring(0, i.text.indexOf(" ")),
    url: i.getAttribute("data-file"),
    time: i.querySelector(".time").text,
  }));
  const keys = dom.querySelectorAll(".detail-content").map(j => j.querySelectorAll("a").map(i => i.text).join(","));
  const j2 = json[1];
  const item = {
    url: j2.url,
    title: j2.name,
    author: j2.author.name,
    publisher: j2.publisher.name,
    datePublished: j2.datePublished,
    dateModified: j2.dateModified,
    contentUrl: j2.contentUrl,
    description: dom.querySelector(".video-overview p").text,
    genre: keys[0],
    keywords: keys[1],
    categories: keys[2],
    license: "https://bgmer.net/terms",
  };
  musics.forEach(i => {
    item["music_" + i.name] = i.url;
    item["music_" + i.name + "_time"] = i.time;
  });
  console.log(item);
  items.push(item);
  await sleep(100 * Math.random());
}

await Deno.writeTextFile("music_list.csv", CSV.stringify(items));
