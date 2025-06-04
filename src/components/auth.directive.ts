import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs";
import {AuthRepository} from '@identity/repositories/auth.repository';

@Directive({
    selector: '[auth]',
    standalone: true
})
export class AuthDirective implements OnInit, OnDestroy {
    private hasView = false;
    private subscription = new Subscription();
    private needleAccesses?: string[];

    constructor(
        private authRepository: AuthRepository,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
    ) {
    }

    @Input() set auth(value: string | string[] | undefined) {
        if(typeof value === 'undefined') this.needleAccesses = [];
        else if(typeof value === 'string') this.needleAccesses = [value];
        else this.needleAccesses = value;
        this.render();
    }

    ngOnInit(): void {
        this.subscription.add(this.authRepository.$identity.subscribe(e => {
            this.render();
        }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    render() {
        let granted: boolean;
        const identity = this.authRepository.$identity.value;
        if(identity?.isAdmin) {
            granted = true;
        }
        else if (this.needleAccesses && this.needleAccesses.length > 0) {
            granted = !!this.needleAccesses.find(x => identity?.accessibility.includes(x))
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
