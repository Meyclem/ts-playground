import * as fs from "fs";

import { parseString } from "xml2js";

const openFile = (): Promise<string> => {
  return new Promise((resolve) => {
    fs.readFile("./db.xml", "utf-8", (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });
};

const getJson = (xml: string): Promise<Parsed> => {
  return new Promise((resolve) => {
    parseString(xml, function (err, result) {
      resolve(result);
    });
  });
};

type Table = {
  $: {
    name: string;
  };
  row: object[];
};
type Parsed = {
  sql: {
    table: Table[];
  };
};

openFile()
  .then((data) => data)
  .then((stringifiedXml) => getJson(stringifiedXml))
  .then((parsedXml: Parsed) => {
    const {
      sql: { table: tables },
    } = parsedXml;

    const firstTable = tables[0];
    console.log("TABLES", tables); // Here you have the database tables
    console.log("FIRST TABLE NAME", firstTable.$.name); // Here you have the first table's name
    console.log("FIRST TABLE ROWS", firstTable.row); // Here you have the first table's rows
  });
