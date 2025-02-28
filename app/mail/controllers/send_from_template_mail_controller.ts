import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

@inject()
export default class SendFromTemplateMailController {

    constructor(
    ) {}

    private validator = vine.compile(
        vine.object({
            
        })
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
    }
}