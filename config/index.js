/**
 * @fileoverview Configuration
 *
 * @version 1.1
 * @author Emanuel Osorio <emanuelosva@gmail.com>
 * 
*/

require('dotenv').config();

module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
};
