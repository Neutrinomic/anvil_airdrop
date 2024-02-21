import icblast, {fileIdentity, toState} from "@infu/icblast";
import {readFileSync} from "fs";

let identity = fileIdentity(5);
console.log(toState(identity.getPrincipal()));
let ic = icblast({identity});

let can = await ic("dzbb3-wiaaa-aaaal-qdhiq-cai");


function parseCSVLine(line) {
    // Regular expression to match either quoted fields or unquoted fields
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
    
    // Get all matches
    let matches = line.match(regex);
    
    // Check if there are matches; if not, return an empty array
    if (!matches) return [];
    
    // Process matches to handle quoted strings and return the resulting array
    return matches.map(field => {
      // If the field is quoted, remove the quotes
      if (field.startsWith('"') && field.endsWith('"')) {
        return field.substring(1, field.length - 1);
      }
      // Return the field without modification if not quoted
      return field;
    });
  }

function ps(t) {
    if (t == "") return null;
     return t.split(",").map(x => parseInt(x.trim(),10));
}

let dropsCSV = readFileSync("airdrop_targets.csv", "utf-8");

let drops = dropsCSV.split("\n").map(x => parseCSVLine(x)).map( ([a,b]) => ([parseInt(b,10), a]));

await can.import_drop_targets(drops);

// await can.export_drop_targets().then(console.log);

await can.start();