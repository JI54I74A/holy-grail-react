/*var redis = require("redis")
// Create a new Redis client
var client = redis.createClient()

client.set('my_key', "hello World!")
client.get('my_key', function(err, reply) {
    console.log(reply);
})

client.mSet('header', 0,'left', 0,'article', 0,'right', 0,'footer', 0)
client.mGet(['header', 'left', 'article', 'right', 'footer'], function(err, value){
    console.log(value);
})

client.quit()*/

const redis = require('redis');

// Create a new Redis client
const client = redis.createClient();

async function main() {
  try {
    // Connect to Redis
    await client.connect();

    // Set a single key-value pair
    await client.set('my_key', 'hello World!');
    
    // Get the value of a single key
    const reply = await client.get('my_key');
    console.log(reply); // Should print: hello World!

    // Set multiple key-value pairs
    await client.mSet({
      'header': 0,
      'left': 0,
      'article': 0,
      'right': 0,
      'footer': 0
    });

    // Get multiple key-value pairs
    const values = await client.mGet(['header', 'left', 'article', 'right', 'footer']);
    console.log(values); // Should print: [ '0', '0', '0', '0', '0' ]

  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Disconnect from Redis
    await client.quit();
  }
}

// Run the main function
main().catch(console.error);
