export default class VoteChoiceHTML
{
    optionParent!: HTMLElement;
    optionTotalCount!: HTMLElement;    
    optionCount!: HTMLElement;
    optionSubtract!: HTMLInputElement;
    optionAdd!: HTMLInputElement;

    constructor(parentHTML, totalHTML,countHTML,subtractHTML, addHTML){
        this.optionParent = parentHTML;
        this.optionTotalCount = totalHTML;
        this.optionCount = countHTML;
        this.optionSubtract = subtractHTML;
        this.optionAdd = addHTML;
    }
}