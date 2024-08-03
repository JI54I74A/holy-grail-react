const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();

async function main() {
  try {
    await client.connect();

    // Serve static files from public directory
    app.use(express.static('build'));

    // Initialize values
    await client.mSet({
      'header': 0,
      'left': 0,
      'article': 0,
      'right': 0,
      'footer': 0
    });

    const initialValues = await client.mGet(['header', 'left', 'article', 'right', 'footer']);
    console.log(initialValues);

    async function data() {
      const values = await client.mGet(['header', 'left', 'article', 'right', 'footer']);
      return {
        'header': Number(values[0]),
        'left': Number(values[1]),
        'article': Number(values[2]),
        'right': Number(values[3]),
        'footer': Number(values[4])
      };
    }

    // Get key data
    app.get('/data', async (req, res) => {
      try {
        const result = await data();
        console.log(result);
        res.send(result);
      } catch (err) {
        res.status(500).send('Error fetching data');
      }
    });

    // Plus
    app.get('/update/:key/:value', async (req, res) => {
      const key = req.params.key;
      let value = Number(req.params.value);

      try {
        const reply = await client.get(key);
        // New value
        value = Number(reply) + value;
        await client.set(key, value);

        // Return data to client
        const result = await data();
        console.log(result);
        res.send(result);
      } catch (err) {
        res.status(500).send('Error updating data');
      }
    });

    app.listen(3000, () => {
      console.log('Running on 3000');
    });

    process.on('exit', async () => {
      await client.quit();
    });
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
