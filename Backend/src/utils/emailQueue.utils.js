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
  console.log(`Processing job for ${email}`);
  try {
    await sendPasswordToEmail(email, subject, text);
    console.log(`Email sent to ${email}`);
    job.moveToCompleted("done", true); // Explicitly mark job as completed
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    job.moveToFailed({ message: error.message }); // Mark job as failed
  }
});

module.exports = emailQueue;
