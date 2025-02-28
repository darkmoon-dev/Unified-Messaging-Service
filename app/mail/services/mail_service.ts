import { FromTemplateRequestDto } from "#mail/data/from_template_request_dto";
import { VariablesNeededException } from "#mail/exceptions/variables_needed_exception";
import { existsSync, readFileSync } from "node:fs";

export class MailService {

    private readonly  templatesPath = './templates/mail/'
    private readonly varRegex = /\{\{([a-zA-Z_]+)\}\}/gm
    private readonly titleRegex = /<title>(.*?)<\/title>/

    fromTemplate(data: FromTemplateRequestDto) {
        const filePath = this.templatesPath + data.template + '.html'
        if(!existsSync(filePath)) throw new Error()
        
        let content = readFileSync(filePath, 'utf8')

        const matches = Array.from(content.matchAll(this.varRegex))
        const variables = [...new Set(matches.map(match => match[1]))];

        if (variables.length && !data.parameters) throw new VariablesNeededException(variables)

        if (variables.length && data.parameters) {
            const keys = Object.keys(data.parameters)

            const VariableNotProvided = variables.filter(variable => !keys.includes(variable)) 
            if (VariableNotProvided.length) throw new VariablesNeededException(VariableNotProvided)

            content = content.replace(this.varRegex, (_, variable) => {
                return data.parameters![variable] 
            })
        }

        let title = content.match(this.titleRegex)
        const subject = title ? title[1] : 'No subject'

        content = content.replace('_YEAR_', new Date().getFullYear().toString())

        return { 
            subject,
            content
        }
    }
     
}