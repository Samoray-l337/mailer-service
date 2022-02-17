import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        serverPort: env.get('HTTP_SERVER_PORT').default(8000).asPortNumber(),
        requestBodyLimit: env.get('REQUEST_BODY_LIMIT').default('1.5mb').asString(),
    },
    redis: {
        useRedis: env.get('USE_REDIS').default('true').asBool(),
        redisConnectionUri: env.get('REDIS_CONNECTION_URI').default('redis://localhost:6379').asString(),
        edgeIndexName: env.get('REDIS_EDGE_INDEX_NAME').default('edgeIndex').asString(),
    },
    mailer: {
        mailConfig: {
            useAuth: env.get('USE_AUTH').default('false').asBool(),
            hosts: env.get('MAIL_HOSTS').default(['smtp.ethereal.email']).asJsonArray(),
            port: env.get('MAILER_PORT').default(587).asPortNumber(),
            auth: {
                user: env.get('MAIL_USER').default('trey.von@ethereal.email').asString(),
                pass: env.get('MAIL_PASS').default('WQmhKRTXtyjcyRb3uM').asString(),
            },
            connectionTimeout: env
                .get('MAILER_CONNECTION_TIMEOUT')
                .default(2 * 60 * 1000)
                .asIntPositive(),
            greetingTimeout: env
                .get('MAILER_GREETING_TIMEOUT')
                .default(30 * 1000)
                .asIntPositive(),
            socketTimeout: env
                .get('MAILER_SOCKET_TIMEOUT')
                .default(10 * 60 * 1000)
                .asIntPositive(),
        },
    },
};

export default config;
