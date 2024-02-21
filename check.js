import icblast, {fileIdentity, toState} from "@infu/icblast";
import {readFileSync} from "fs";

let identity = fileIdentity(5);
console.log(toState(identity.getPrincipal()));
let ic = icblast({identity});

let can = await ic("dzbb3-wiaaa-aaaal-qdhiq-cai");

await can.getDropped().then(x => console.log(toState(x)));

await can.getInfo().then(x => console.log(toState(x)));