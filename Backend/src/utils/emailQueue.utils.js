const Queue = require("bull");
const { sendPasswordToEmail } = require("./send-mail.utils");

const emailQueue = new Queue("emailQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
    tls: true,
    enableTLSForSentinelMode: false,
    maxRetriesPerRequest: null, // or a higher value like 100
    retryStrategy: (times) => {
      // Exponential backoff strategy
      return Math.min(times * 50, 2000);
    },
    connectTimeout: 10000, // Increase connection timeout
  },
});

emailQueue.process(async (job) => {
  const { email, subject, text } = job.data;
  await sendPasswordToEmail(email, subject, text);
});

module.exports = emailQueue;
