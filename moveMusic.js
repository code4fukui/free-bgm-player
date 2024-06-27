import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const errlist = [];
export const moveData = async (url, path) => {
  const fn = url.substring(url.lastIndexOf("/") + 1);
  try {
    const bin = await Deno.readFile("data/" + fn);
    await Deno.writeFile("data/" + path + "/" + fn, bin);
    await Deno.remove("data/" + fn);
    console.log(fn);
  } catch (e) {
    console.log("err!", fn);
    errlist.push(url);
  }
};

const list = await CSV.fetchJSON("music_list.csv");
for (const item of list) {
  await moveData(item.music_SHORT, "short");
  await moveData(item.music_LONG, "long");
}

console.log("errlist", errlist);
