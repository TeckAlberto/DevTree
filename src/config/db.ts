import mongoose from 'mongoose'
import colors from 'colors';

export const connectDB = async () => {
    try {
        
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.bold(`MongoDB connected in ${url}`));
        
    } catch (error) {
        console.log(colors.bgRed.bold(error.nessage));
        process.exit(1);
    }
}