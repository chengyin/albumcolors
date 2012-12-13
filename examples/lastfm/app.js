(function() {
	var

	$ = window.$,

		lastfm = {
			getUserTopAlbums: function(username, callback) {
				if (!username) {
					return;
				}

				$.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=' + username + '&api_key=' + window.LASTFM_APP_KEY + '&format=json&callback=?', function(data) {
					if (data.topalbums.album) {
						callback(data.topalbums.album);
					} else {
						alert('Cannot read user album data from last.fm');
					}
				});
			}
		},

		$template;

	function proxyImage(url) {
		return ('./imageproxy.php?img=' + url);
	}

	function getHorizontalGradientCSS(color1, color2) {
		return '-webkit-linear-gradient(top, ' + color1 + ' 0%, ' + color2 + ' 15%)';
	}

	function getVerticalGradientCSS(color1, color2) {
		return '-webkit-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 15%)';
	}

	function getRGBColor(color) {
		return 'rgb(' + color + ')';
	}

	function getTransparentRGBColor(color) {
		return 'rgba(' + color + ',0)';
	}

	function renderAlbum(album) {
		var imageUrl = album.image[2]['#text'],
			$album = $template.clone(),
			albumColors = new window.AlbumColors(proxyImage(imageUrl));

		$album.find('.cover').attr('src', imageUrl);
		$album.find('.artist').text(album.artist.name);
		$album.find('.album-name').text(album.name);

		(function($album) {
			albumColors.getColors(function(colors) {
				console.log(colors);

				$album.css({
					'background-color': getRGBColor(colors[0])
				});

				$album.find('.artist').css({
					color: getRGBColor(colors[1])
				});

				$album.find('.album-name').css({
					color: getRGBColor(colors[2])
				});

				$album.find('.gradient').css({
					'background': getHorizontalGradientCSS(getRGBColor(colors[0]), getTransparentRGBColor(colors[0])) +
							',' + getVerticalGradientCSS(getRGBColor(colors[0]), getTransparentRGBColor(colors[0]))
				});
			});
		}($album));

		return $album;
	}

	function renderAlbums(albums) {
		var a, $album;

		for (a = 0; a < albums.length; a++) {
			$album = renderAlbum(albums[a]);
			$('#albums').append($album);
		}
	}

	function initTemplate() {
		$template = $('#template');
		$template.attr('id', '');
		$template.detach();
	}

	function initGet() {
		var param = window.location.search.substr(1);
		param = param.split('&')[0];
		param = param.replace('lastfm=', '');
		if (param.length) {
			$('#lastfm-username').val(param);
			lastfm.getUserTopAlbums(param, renderAlbums);
		}
	}

	function init() {
		initTemplate();
		initGet();
	}

	init();
}());

