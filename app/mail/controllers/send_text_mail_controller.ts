import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
import vine from "@vinejs/vine";

@inject()
export default class SendTextMailController {

    constructor(
    ) {}

    private validator = vine.compile(
        vine.object({
            to: vine.string().trim().email(),
            subject: vine.string().trim().maxLength(255),
            message: vine.string()
        })
    )

    /**
     * @handle
     * @summary Send text mail
     * @operationId sendTextMail
     * @description Send text mail
     * @requestBody {"to": "email", "subject": "Subject", "message": "message text"} 
     */
    async handle({ request, response }: HttpContext) {
        const data= await this.validator.validate(request.all())

        await mail.sendLater((message) => {
            message
                .to(data.to)
                .subject(data.subject)
                .text(data.message)
        })

        return response.ok
    }
}