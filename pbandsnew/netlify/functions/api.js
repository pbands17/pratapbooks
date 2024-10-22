const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
  try {
    await client.connect();
    const database = client.db('pratap_bookstore');
    const notices = database.collection('notices');
    const products = database.collection('products');

    const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '');
    const segments = path.split('/').filter(Boolean);

    switch (event.httpMethod) {
      case 'GET':
        if (segments[0] === 'notices') {
          const allNotices = await notices.find({}).toArray();
          return { statusCode: 200, body: JSON.stringify(allNotices) };
        } else if (segments[0] === 'products') {
          const allProducts = await products.find({}).toArray();
          return { statusCode: 200, body: JSON.stringify(allProducts) };
        }
        break;

      case 'POST':
        if (segments[0] === 'notices') {
          const newNotice = JSON.parse(event.body);
          const result = await notices.insertOne(newNotice);
          return { statusCode: 201, body: JSON.stringify(result) };
        } else if (segments[0] === 'products') {
          const newProduct = JSON.parse(event.body);
          const result = await products.insertOne(newProduct);
          return { statusCode: 201, body: JSON.stringify(result) };
        }
        break;

      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    return { statusCode: 404, body: 'Not Found' };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  } finally {
    await client.close();
  }
};