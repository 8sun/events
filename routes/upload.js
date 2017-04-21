
let multiparty = require('multiparty');
let fs = require('fs');

// Upload image
module.exports.upload = function (req, res) {

	let form = new multiparty.Form();

	form.parse(req, (err, fields, files) => {

		if (files.imageFile) {
			let {path: tempPath, originalFilename} = files.imageFile[0];
			let copyToPath = "./images/" + originalFilename;

			let fl = originalFilename.split('.'); 
			let ext = fl[fl.length-1]; 

			let filename = "img_" + Date.now() + "." + ext;


			let newPath = "./images/" + filename;

			fs.readFile(tempPath, (err, data) => {
      // make copy of image to new location
      fs.writeFile(newPath, data, (err) => {
        // delete temp image
        fs.unlink(tempPath, () => {
        	res.send("/images/" + filename);
        });
    }); 
  }); 

		} else {
			res.send(false);
		}
	})

};

// Remove image
module.exports.remove = function (req, res) {

	if (req.query.src) {
		let path = req.query.src;

		fs.unlink(path, () => {
			res.send(true);
		});
	} else {
		res.send(false);
	}

};