const mongoose = require('mongoose');
const News = require('./models/News');
const EPaper = require('./models/EPaper');

// Retrieve command line arguments
const args = process.argv.slice(2);
const oldUri = args[0];
const newUri = args[1];

if (!oldUri || !newUri) {
  console.error('\x1b[31mError: Please provide both the old and new MongoDB URIs.\x1b[0m');
  console.log('\nUsage:');
  console.log('  node migrate.js <OLD_MONGODB_URI> <NEW_MONGODB_URI>');
  console.log('\nExample:');
  console.log('  node migrate.js "mongodb+srv://HR_db:HRNews-pass@cluster0.i7xsycg.mongodb.net/hr-news" "mongodb://127.0.0.1:27017/hr-news"');
  process.exit(1);
}

async function runMigration() {
  let oldConnection;
  let newConnection;

  try {
    console.log('\n\x1b[36m--- Starting Database Migration ---\x1b[0m');
    
    // 1. Connect to Old Database and retrieve data
    console.log('1. Connecting to source (old) database...');
    oldConnection = await mongoose.createConnection(oldUri).asPromise();
    console.log('   Connected successfully.');

    // Define models on the source connection
    const OldNews = oldConnection.model('News', News.schema);
    const OldEPaper = oldConnection.model('EPaper', EPaper.schema);

    console.log('2. Fetching data from source...');
    const newsData = await OldNews.find({});
    const epaperData = await OldEPaper.find({});
    console.log(`   Found ${newsData.length} news articles.`);
    console.log(`   Found ${epaperData.length} epaper editions.`);

    // 2. Connect to New Database
    console.log('\n3. Connecting to target (new) database...');
    newConnection = await mongoose.createConnection(newUri).asPromise();
    console.log('   Connected successfully.');

    // Define models on the target connection
    const NewNews = newConnection.model('News', News.schema);
    const NewEPaper = newConnection.model('EPaper', EPaper.schema);

    // 3. Insert data into target database
    console.log('4. Migrating news articles...');
    if (newsData.length > 0) {
      // Clear target news collection first to avoid duplicates
      await NewNews.deleteMany({});
      await NewNews.insertMany(newsData);
      console.log('   News articles migrated.');
    } else {
      console.log('   No news articles to migrate.');
    }

    console.log('5. Migrating epaper editions...');
    if (epaperData.length > 0) {
      // Clear target epaper collection first to avoid duplicates
      await NewEPaper.deleteMany({});
      await NewEPaper.insertMany(epaperData);
      console.log('   Epaper editions migrated.');
    } else {
      console.log('   No epaper editions to migrate.');
    }

    console.log('\n\x1b[32m✔ Migration completed successfully!\x1b[0m');

  } catch (error) {
    console.error('\n\x1b[31m✖ Migration failed:\x1b[0m', error);
  } finally {
    // Clean up connections
    if (oldConnection) {
      await oldConnection.close();
    }
    if (newConnection) {
      await newConnection.close();
    }
    process.exit(0);
  }
}

runMigration();
