const fs = require('fs');

module.exports = (path, content) => {
    const json = JSON.stringify(content);

    fs.writeFile(path, json, ((err) => {
        if (err) console.error(err);
    }));
}



