import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
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
     * @description Sned text mail
     */
    async handle({ request, mail }: HttpContext) {
        const { to, subject, message } = await this.validator.validate(request.all())
        const mailer = mail()

        if (mailer == null) throw new Error()

        return mailer.sendText({ to, subject, message })
    }
}