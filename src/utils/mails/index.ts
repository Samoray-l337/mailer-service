import * as nodemailer from 'nodemailer';
import config from '../../config';
import redisClient from '../redis';

const { mailConfig } = config.mailer;
const { edgeIndexName, useRedis } = config.redis;
const { useAuth, hosts, port, connectionTimeout, greetingTimeout, socketTimeout } = mailConfig;

class MailSender {
    transporters: {};

    auth: { user: string; pass: string } | undefined;

    constructor() {
        this.transporters = {};
        this.auth = useAuth ? mailConfig.auth : undefined;
    }

    // eslint-disable-next-line class-methods-use-this
    async getCurrentTransporterId() {
        if (useRedis) {
            const currrentIndex = await redisClient.incr(edgeIndexName);
            return currrentIndex % hosts.length;
        }

        return Math.floor(Math.random() * hosts.length);
    }

    async getTransporter() {
        const transporterId = await this.getCurrentTransporterId();

        if (!this.transporters[transporterId]) {
            const host = hosts[transporterId];
            this.transporters[transporterId] = nodemailer.createTransport({
                auth: this.auth,
                port,
                host,
                connectionTimeout,
                greetingTimeout,
                socketTimeout,
            });
        }

        return this.transporters[transporterId];
    }

    async sendMail(
        to: string[],
        from: string,
        subject: string,
        text: string,
        html: string,
        headers: Record<string, any> = {},
        attachments: { filename: string; path: string }[] = [],
    ) {
        const currTransporter = await this.getTransporter();

        await currTransporter.sendMail({
            to,
            from,
            subject,
            html,
            text,
            headers,
            attachments,
        });
    }
}

const mailSender = new MailSender();
export default mailSender;
