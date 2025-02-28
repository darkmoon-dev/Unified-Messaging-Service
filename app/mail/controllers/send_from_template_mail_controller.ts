import { MailService } from "#mail/services/mail_service";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

@inject()
export default class SendFromTemplateMailController {

    constructor(
        private service: MailService
    ) {}

    private validator = vine.compile(
        vine.object({
            to: vine.string().trim().email(),
            template: vine.string().trim(),
            parameters: vine.record(
                vine.string()
            ).optional()
            
        }),
    )

    /**
     * @handle
     * @summary 
     * @operationId 
     * @description 
     */
    async handle({ request, mail }: HttpContext) {
        const mailer = mail()
        if (mailer == null) throw new Error()
        const data = await request.validateUsing(this.validator)

        const { subject, content } =  this.service.fromTemplate(data)

        mailer.sendHtml({ to: data.to, subject, html: content })
    }
}