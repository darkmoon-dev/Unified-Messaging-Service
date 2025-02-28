import { HttpContext } from '@adonisjs/core/http';
import { MailAgent } from "#common/mail_agent";

const mailer = MailAgent.init();

HttpContext.macro('mail', function (this: HttpContext) {
    return mailer
})


declare module '@adonisjs/core/http' {
    interface HttpContext {
        mail(): MailAgent | null
    }
}


