import mongoose from 'mongoose';

let cachedConnection: mongoose.Connection = null;

const connectToDatabase = async (uri: string) => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const client = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  cachedConnection = client;

  return client;
};

export default connectToDatabase;
