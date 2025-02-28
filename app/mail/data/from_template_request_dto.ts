export type FromTemplateRequestDto = {
    template: string,
    parameters?: { [K: string]: string}
}