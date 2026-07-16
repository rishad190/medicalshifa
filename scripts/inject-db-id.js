const fs = require('fs');
const path = require('path');

const wranglerPath = path.join(__dirname, '../wrangler.toml');
const databaseId = process.env.D1_DATABASE_ID;

if (databaseId) {
  let content = fs.readFileSync(wranglerPath, 'utf8');
  if (!content.includes('[[d1_databases]]')) {
    content += `\n[[d1_databases]]\nbinding = "DB"\ndatabase_name = "db"\ndatabase_id = "${databaseId}"\n`;
    fs.writeFileSync(wranglerPath, content, 'utf8');
    console.log('Successfully injected D1 database binding into wrangler.toml');
  } else {
    console.log('D1 database binding already present in wrangler.toml');
  }
} else {
  console.log('D1_DATABASE_ID env variable not found, skipping injection');
}
