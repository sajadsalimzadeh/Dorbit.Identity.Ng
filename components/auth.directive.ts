import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {AuthRepository} from '@identity/repositories/auth.repository';

@Directive({
    selector: '[auth]',
    standalone: true
})
export class AuthDirective {
    private hasView = false;
    private needleAccesses?: string[];

    constructor(
        private authRepository: AuthRepository,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
    ) {
    }

    @Input() set auth(value: string | string[] | undefined) {
        if(typeof value === 'undefined') this.needleAccesses = [];
        else if(typeof value === 'string') this.needleAccesses = [value.toLowerCase()];
        else this.needleAccesses = value.map(x => x.toLowerCase());
        this.render();
    }

    render() {
        let granted: boolean;
        if (this.needleAccesses && this.needleAccesses.length > 0) {
            granted = this.needleAccesses.some(x => this.authRepository.hasAccess(x));
        } else {
            granted = true;
        }

        if (granted && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!granted && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
