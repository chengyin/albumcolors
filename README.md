# AlbumColors.js

![Screenshot](http://chengyin.github.com/albumcolors/screenshot.png)

A JavaScript script to pick 3 colors from an image to create a palette for background and text colors. Inspired by iTunes 11.

## Examples

[Hosted example](http://albumcolors.chengyinliu.com/examples/lastfm?lastfm=willowm) showing album info generated from users' last.fm. Try it with your own username for different results.

## How to Use

	var url = 'http://www.google.com/images/srpr/logo3w.png',
		// You will need a image hosted under the same domain as the script
		albumColors = new AlbumColors(url);

	albumColors.getColors(function(colors) {
		console.log(colors);
		// Result: [[254, 254, 254], [2, 138, 14], [4, 171, 21]]
	});

## Algorithm

The algorithm is simple.

1. Load image from URL into canvas and get the color array by pixels (`AlbumImage`)
 
2. Find n (default 10) major colors from the pixel array (`AlbumColors`)

	2.1. Divide color spectrum into 64 buckets

	2.2. Add each color into one of the bucket with a simple approximation

	2.3. Take the 10 buckets with the largest number of colors in them

	2.4. Averaging the colors in the dominating buckets to get the presenting color for the buckets

3. Among the 10 major colors, pick out 3 (`colorChooser`)

	3.1. Color distance is simply defined as the Euclidean distance

	3.2. The most dominating color (ColorA) will be the background

	3.3. The color that is most distanced from ColorA, ColorB, will be text color 1

	3.4. The color that is second distanced form ColorA, ColorC, will be text color 2

## Limitations

Images are loaded through `canvas`, therefore we are limited to the same origin rule. In the last.fm example, a simple image proxy is included to bypass the issue.

## Using images with CORS headers

If you want to use images from other domains (eg. asset domains), you can still use AlbumColors.js, but with one minor addition to the code. 
You will need to add the following line to the `AlbumImage.prototype.fetch` function, right after the `new Image()`:

	this.image.crossOrigin = "anonymous";

Also make sure you have set the right headers on the image you are trying to fetch. 
[More info](http://enable-cors.org/server.html) on setting the right headers for using CORS.

## License

[University of Illinois / NCSA](http://opensource.org/licenses/NCSA)
