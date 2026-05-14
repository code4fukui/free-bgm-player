# free-bgm-player

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple, single-file HTML player for music from the free BGM repository, [BGMer](https://bgmer.net/).

## Demo

**https://code4fukui.github.io/free-bgm-player/**

## Features

- Filter music by genre, keywords, and categories
- Search by keyword across titles, descriptions, and tags
- Switch between SHORT and LONG versions of tracks
- Enable looping for continuous playback
- Link to the original music page on BGMer for each track

## Usage

No installation is required. Simply open the [demo page](https://code4fukui.github.io/free-bgm-player/) in your web browser.

1.  Use the dropdown menus and search box to find suitable BGM.
2.  Check the `ショート` (Short) box to play short versions of the tracks.
3.  Check the `ループ` (Loop) box to enable looping.
4.  Click on any row in the table to start playback.

## Data Source

This player uses music data scraped from the free BGM repository [BGMer](https://bgmer.net/). The track information is compiled into `music_list.csv`. For the demo, the audio files are hosted on a separate server.

Please refer to the [BGMer terms of use](https://bgmer.net/terms) for information on music licensing.

## Updating the Data

The music list and audio files can be updated using the provided Deno scripts.

**Prerequisites:**
- [Deno](https://deno.land/) must be installed.

**Steps:**
1.  **Update the track list:** This script scrapes BGMer for the latest music metadata and creates `music_list.csv`.
    ```sh
    deno run -A download.js
    ```
2.  **Download audio files:** This script reads `music_list.csv` and downloads the corresponding audio files into the `data/short/` and `data/long/` directories (ignored by git).
    ```sh
    deno run -A downloadMusic.js
    ```

## License

MIT License — see [LICENSE](LICENSE).