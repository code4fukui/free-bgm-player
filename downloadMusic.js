import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { fetchBin } from "https://js.sabae.cc/fetchBin.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

export const downloadData = async (url, path) => {
  const fn = url.substring(url.lastIndexOf("/") + 1);
  try {
    await Deno.readFile("data/" + path + "/" + fn);
  } catch (e) {
    const bin = await fetchBin(url);
    await Deno.writeFile("data/" + path + "/" + fn, bin);
    console.log(fn);
  }
};

const list = await CSV.fetchJSON("music_list.csv");
for (const item of list) {
  await downloadData(item.music_SHORT, "short");
  await sleep(500 + 100 * Math.random());
  await downloadData(item.music_LONG, "long");
  await sleep(500 + 100 * Math.random());
}
