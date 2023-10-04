const atomNameMap = require("./atom-name-map");
const string2doubleStruck = require("./string2double-struck");

const atoms = Array.from(atomNameMap.entries()).map(([key, name]) => [
  key,
  { originLength: name.length, label: string2doubleStruck(name) },
]);
const atomMap = new Map(atoms);

module.exports = Object.fromEntries(atomMap.entries());
