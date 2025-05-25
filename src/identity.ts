import {InjectionToken, NgModule} from "@angular/core";
import {DorbitModule} from '@framework';
import {AuthDirective} from './components/auth.directive';

const COMPONENTS = [
    AuthDirective,
]

@NgModule({
    imports: [
        DorbitModule,
    ],
    exports: [
        ...COMPONENTS
    ],
    declarations: [
        ...COMPONENTS
    ],
})
export class IdentityModule {
}

export const BASE_IDENTITY_URL = new InjectionToken<string>('BASE_IDENTITY_URL');
