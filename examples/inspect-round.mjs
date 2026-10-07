import {QUICKNET,roundForDate} from "../dist/index.js";
const date=new Date("2030-01-01T00:00:00Z");
console.log(JSON.stringify({opensAt:date.toISOString(),round:roundForDate(QUICKNET,date)},null,2));
