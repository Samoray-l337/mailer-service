import redisClient from './utils/redis';
import config from './config';
import Server from './express/server';

const {
    redis: { redisConnectionUri, useRedis },
    service: { serverPort },
} = config;

const initRedis = async () => {
    await redisClient.initialize(redisConnectionUri);
    console.log('redis connected');
};

const initHttpServer = async () => {
    const server = new Server(serverPort);
    await server.start();

    console.log(`Server started on port: ${serverPort}`);
};

const main = async () => {
    if (useRedis) {
        await initRedis();
    }

    await initHttpServer();
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
