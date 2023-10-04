// double-struck A
const base = 0x1d538;

// keyは0スタートのアルファベットの通し番号（大文字小文字合わせて）
// valueはUTF-16のCodePoint
const jumps = {
  2: 0x2102,
  7: 0x210d,
  13: 0x2115,
  15: 0x2119,
  16: 0x211a,
  17: 0x211d,
  25: 0x2124,
};

const doubleStrucks = Array.from(Array(52).keys())
  .map((e) => (jumps[e] == null ? e + base : jumps[e]))
  .map((e) => String.fromCodePoint(e));

const codeUpperA = 0x41;
const codeLowera = 0x61;
const makeCharTransMap = () => {
  const base = Array.from(Array(26).keys());
  const codesUpper = base.map((e) => e + codeUpperA);
  const codesLower = base.map((e) => e + codeLowera);
  const codes = [...codesUpper, ...codesLower];
  const pairs = codes.map((e, i) => [e, doubleStrucks[i]]);
  return new Map(pairs);
};

const charTransMap = makeCharTransMap();

const string2chars = (target) => {
  return target.split("");
};

module.exports = (target) => {
  const codes = string2chars(target).map((e) => e.codePointAt(0));
  return codes
    .map((e) => charTransMap.get(e) ?? String.fromCodePoint(e))
    .join("");
};
