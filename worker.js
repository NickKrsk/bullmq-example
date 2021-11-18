const { Worker  }  = require('bullmq');

queueName = 'myQueue';

const worker = new Worker(queueName, async job => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    console.log(job.data);
});

console.log('worker');