import { MailService } from "#mail/services/mail_service";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
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
     * @summary Send mail from Template
     * @operationId SendTemplateMail
     * @description Send mail from Template
     * @requestBody {"to": "email", "template": "string", "parameters": {"param1": "value1", "param2": "value2"}} 
     */
    async handle({ request }: HttpContext) {
        const data = await request.validateUsing(this.validator)

        const { subject, content } =  this.service.fromTemplate(data)

        await mail.sendLater((message) => {
            message
                .to(data.to)
                .subject(subject)
                .html(content)
        })
    }
}