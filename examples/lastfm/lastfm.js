(function() {
	var 

	$ = window.$,

	lastfm = {
		getUserTopAlbums: function(username, callback) {
			if (!username) {
				return;
			}

			$.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=' + username + '&api_key=09a22381ce7a9913af88204c5c12bf04&format=json&callback=?', callback);
		}
	},

	ui = {
		album: function(data) {}
	};
}());

