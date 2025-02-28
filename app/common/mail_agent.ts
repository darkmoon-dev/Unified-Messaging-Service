import env from '#start/env'
import { createTransport } from 'nodemailer'

import type { Transporter } from 'nodemailer'

export class MailAgent {

    private transporter: Transporter

    static init(): MailAgent | null {
        if (!env.get('SMTP_ENABLED')) return null

        return new MailAgent(
            {
                host: env.get('SMTP_HOST'),
                port: env.get('SMTP_PORT'),
                secure: env.get('SMTP_SECURE'),
                auth: { user: env.get('SMTP_USERNAME'), pass: env.get('SMTP_PASSWORD') },
                tls: { rejectUnauthorized: env.get('SMTP_REJECT_UNAUTHORIZED') }
            },
            { name: env.get('SMTP_FROM_NAME'), email: env.get('SMTP_FROM') },
        )
    }

    constructor(config: trasporterConfig, public sender?: SenderInfo) {
        this.transporter = createTransport(config)
    }

    async sendText(options: SendTextOptions) {
        const data = await this.transporter.sendMail({
            from: {
                name: this.sender?.name || 'no-reply',
                address: this.sender?.email || 'no-reply'
            },
            to: options.to,
            subject: options.subject,
            text: options.message,
        })

        console.log(data);
        
    }

}

export type trasporterConfig = {
    host: string,
    port: number,
    secure: boolean
    auth : {
        user: string,
        pass: string
    },
    tls?: {
        rejectUnauthorized: boolean
    }
}

export type SenderInfo = {
    name: string,
    email: string
}

export type SendTextOptions = {
    to: string,
    subject: string,
    message: string
}