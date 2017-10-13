/*
 * svguri - A simple encoded URI scheme generator from datauri
 *
 * Copyright (c) 2014 Helder Santana
 * Copyright (c) 2017 Matteo Fogli
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

"use strict";

var fs         = require('fs'),
    existsSync = fs.existsSync;

module.exports = (function (){

  var escapeContent = function (str) {
        return str.replace(/<|>|&|#/g, function(match, offset, string) {
          return escape(match);
        }).replace(/"/g, '\'');
      },
      format = function (fileName, fileContent) {
        fileContent   = (fileContent instanceof Buffer) ? fileContent : new Buffer(fileContent);
        var encoded   = escapeContent(fileContent.toString());

        return 'data:image/svg+xml;charset=UTF-8,' + encoded;
      },
      svguri = function(fileName) {

        // avoid error when registering from grunt
        if (fileName === this)
          return;

        if (!fileName || !fileName.trim || fileName.trim() === '') {
            throw new Error('Insert a File path as string argument');
        }

        if (existsSync(fileName)) {
            var fileContent = fs.readFileSync(fileName);

            return format(fileName, fileContent);
        } else {
            throw new Error('The file ' + fileName + ' was not found!');
        }
      };

      return svguri;

})();
