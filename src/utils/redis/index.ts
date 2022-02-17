import { createClient } from 'redis';

class RedisClient {
    client: any;

    async initialize(connectionUri: string) {
        this.client = await createClient({ url: connectionUri });
    }

    closeConnection() {
        return this.client.closeConnection();
    }

    async incr(valueName: string) {
        return this.client.incr(valueName);
    }
}

const client = new RedisClient();
export default client;
