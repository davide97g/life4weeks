const { src, symlink } = require('gulp');

// requires admin previliges
function link() {
	return src('../models/*').pipe(symlink('src/models/'));
}

exports.default = link;
