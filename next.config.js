/** @type {import('next').NextConfig} */

const atomObj = require("./script/atom-map");
const string2doubleStruck = require("./script/string2double-struck");

const nextConfig = {
  env: {
    ATOM_OBJ: atomObj,
    PREFIX: string2doubleStruck("Punch  out  the  "),
  },
};

module.exports = nextConfig;
