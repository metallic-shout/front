import {
  QueryResolvers,
  MetalsResolvers,
  Metal,
  Metals,
} from "./resolver-type";

const metalMap = [
  ["Li", "Lithium"],
  ["Be", "Beryllium"],
  ["Na", "Sodium"],
  ["Mg", "Magnesium"],
  ["Al", "Aluminium"],
  ["K", "Potassium"],
  ["Ca", "Calcium"],
  ["Sc", "Scandium"],
  ["Ti", "Titanium"],
  ["V", "Vanadium"],
  ["Cr", "Chromium"],
  ["Mn", "Manganese"],
  ["Fe", "Iron"],
  ["Co", "Cobalt"],
  ["Ni", "Nickel"],
  ["Cu", "Copper"],
  ["Zn", "Zinc"],
  ["Ga", "Gallium"],
  ["Rb", "Rubidium"],
  ["Sr", "Strontium"],
  ["Y", "Yttrium"],
  ["Zr", "Zirconium"],
  ["Nb", "Niobium"],
  ["Mo", "Molybdenum"],
  ["Tc", "Technetium"],
  ["Ru", "Ruthenium"],
  ["Rh", "Rhodium"],
  ["Pd", "Palladium"],
  ["Ag", "Silver"],
  ["Cd", "Cadmium"],
  ["In", "Indium"],
  ["Sn", "Tin"],
  ["Cs", "Caesium"],
  ["Ba", "Barium"],
  ["La", "Lanthanum"],
  ["Ce", "Cerium"],
  ["Pr", "Praseodymium"],
  ["Nd", "Neodymium"],
  ["Pm", "Promethium"],
  ["Sm", "Samarium"],
  ["Eu", "Europium"],
  ["Gd", "Gadolinium"],
  ["Tb", "Terbium"],
  ["Dy", "Dysprosium"],
  ["Ho", "Holmium"],
  ["Er", "Erbium"],
  ["Tm", "Thulium"],
  ["Yb", "Ytterbium"],
  ["Lu", "Lutetium"],
  ["Hf", "Hafnium"],
  ["Ta", "Tantalum"],
  ["W", "Tungsten"],
  ["Re", "Rhenium"],
  ["Os", "Osmium"],
  ["Ir", "Iridium"],
  ["Pt", "Platinum"],
  ["Au", "Gold"],
  ["Hg", "Mercury"],
  ["Tl", "Thallium"],
  ["Pb", "Lead"],
  ["Bi", "Bismuth"],
  ["Po", "Polonium"],
  ["Fr", "Francium"],
  ["Ra", "Radium"],
  ["Ac", "Actinium"],
  ["Th", "Thorium"],
  ["Pa", "Protactinium"],
  ["U", "Uranium"],
  ["Np", "Neptunium"],
  ["Pu", "Plutonium"],
  ["Am", "Americium"],
  ["Cm", "Curium"],
  ["Bk", "Berkelium"],
  ["Cf", "Californium"],
  ["Es", "Einsteinium"],
  ["Fm", "Fermium"],
  ["Md", "Mendelevium"],
  ["No", "Nobelium"],
  ["Lr", "Lawrencium"],
  ["Rf", "Rutherfordium"],
  ["Db", "Dubnium"],
  ["Sg", "Seaborgium"],
  ["Bh", "Bohrium"],
  ["Hs", "Hassium"],
];

const queryResolvers: QueryResolvers = {
  metals: () => {
    const all = metalMap.map(([code, name]) => {
      const metal: Metal = { elementCode: code, name };
      return metal;
    });
    return { all } as Metals;
  },
};

const metalResolvers: MetalsResolvers = {
  select: (parent, { index }) => {
    return parent.all[index];
  },
  random: (parent) => {
    const length = parent.all.length;
    const index = Math.round(Math.random() * length);
    return parent.all[index];
  },
};

export const resolvers = {
  Query: queryResolvers,
  Metals: metalResolvers,
};
