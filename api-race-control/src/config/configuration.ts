export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    uri: process.env.DATABASE_URI,
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }
});
