const { Queue, Worker }  = require('bullmq'); // import { Queue } from 'bullmq';
const express = require('express')

const connection = {
    host: '192.168.241.84',
    port: 6379,
};

const queueName = 'myQueue';

const app = express();
const myQueue = new Queue(queueName, {connection});
const worker1 = new Worker(queueName, async job => {
    console.log('worker1');
    console.log(job.data);
}, {connection});

const worker2 = new Worker(queueName, async job => {
    console.log('worker2');
    console.log(job.data);
}, {connection});

worker1.on('completed', (job) => {
    console.log(`worker1, ${job.id} has completed!`);
});
worker1.on('failed', (job, err) => {
    console.log(`worker1, ${job.id} has failed with ${err.message}`);
});

const addJobs = async () => {
    console.log('add jobs');
    await myQueue.add('myJobName', { foo: 'bar', date: new Date() });
    // await myQueue.add('myJobName', { qux: 'baz' });    
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/addQueue', (req, res) => {
    res.send('addQueue');
    addJobs();
  })

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
});

console.log('Hello!');