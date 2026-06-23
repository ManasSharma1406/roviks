import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

function updateArray(name) {
  const regex = new RegExp(`export const ${name} = \\\[([\\s\\S]*?)\\\];`);
  let match = code.match(regex);
  if (match) {
    let arrStr = match[1];
    arrStr = arrStr.replace(/title: ".*?"/g, 'title: "SHADOW 7"');
    arrStr = arrStr.replace(/subtitle: ".*?"/g, 'subtitle: "OVERSIZED TEE"');
    arrStr = arrStr.replace(/img: ".*?"/g, 'img: "/assets/shadow_7.png"');
    arrStr = arrStr.replace(/price: ".*?"/g, 'price: "RS. 899.00",\n    originalPrice: "RS. 1,299.00"');
    code = code.replace(regex, `export const ${name} = [${arrStr}];`);
  }
}

updateArray('pufferCards');
updateArray('boutiqueItems');
updateArray('mockupItems');

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx data arrays updated.');
