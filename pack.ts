/*
This a pack created for providing additional information to the chemical elements 
*/

import * as coda from "@codahq/packs-sdk";
const Formula = require('compound-parser');
const NPT = require('node-periodic-table');
const MolarMass = require('molarmass.js');
const mm = new MolarMass();
export const pack = coda.newPack();

const SymbolParameter = coda.makeParameter({
    type: coda.ParameterType.String,
    name: "symbol",
    description: "Symbol of the chemical element",
  });

const IdParameter = coda.makeParameter({
    type: coda.ParameterType.Number,
    name: "id",
    description: "Id of the chemical element"
})

const NameParameter = coda.makeParameter({
    type: coda.ParameterType.String,
    name: "Name",
    description: "Name of the chemical element",
  });

const FormulaParameter = coda.makeParameter({
    type: coda.ParameterType.String,
    name: "Formula",
    description: "Formula of the chemical element",
  });

// Formula for the pack

pack.addFormula({
  name: "periodictable",
  description: "Gets the periodic table",
  parameters: [],
  resultType: coda.ValueType.String,
  codaType: coda.ValueHintType.ImageReference,
  execute: async function ([], context) {
    return "https://visionlearning.com/images/figure-images/52-a.jpg"
  },
});

// Allow the pack to make requests to  API.
pack.addNetworkDomain("visionlearning.com");

pack.addFormula(
  {
  // Usage symbol <symbol> - Retruns the element details associated with the Symbol
  name: "symbol",
  description: "Returns the element details associated with the symbol",
  parameters: [SymbolParameter],
  resultType: coda.ValueType.String,
  execute: async function ([SymbolParameter]) {
    const result = NPT.getBySymbol(SymbolParameter)
    return result
  },
});

pack.addFormula(
    {
    // Usage id <id> - Retruns the element details associated with the id
    name: "id",
    description: "Returns the element details associated with the id",
    parameters: [IdParameter],
    resultType: coda.ValueType.String,
    execute: async function ([IdParameter]) {
      const result = NPT.getByNumber(IdParameter)
      return result
    },
  });

  pack.addFormula(
    {
    // Usage name <elementname> - Retruns the element details associated with the name
    name: "name",
    description: "Returns the element details associated with the name",
    parameters: [NameParameter],
    resultType: coda.ValueType.String,
    execute: async function ([NameParameter]) {
        const result = NPT.getByName(NameParameter)
        return result
    },
  });

  pack.addFormula(
    {
    // Usage formula <compound> - Returns the count of the atoms associated with the compound
    name: "formula",
    description: "Returns the count of the atoms associated with the compound",
    parameters: [FormulaParameter],
    resultType: coda.ValueType.String, 
    execute: async function ([FormulaParameter]) {
        const result = Formula(FormulaParameter)
        let formula ={}
        result.forEach((value: number, key: string) => {
          formula[key] = value;
      });
        return JSON.stringify(formula)
    },
  });

  pack.addFormula(
    {
    // Usage formula molarmass <compound> - Returns the Molar mass of the compound
    name: "molarmass",
    description: "Returns the molar mass of the compound",
    parameters: [FormulaParameter],
    resultType: coda.ValueType.String,
    execute: async function ([FormulaParameter]) {
        const result = mm.getMolarMass(FormulaParameter)
        return result
    },
  });
