import {InjectionToken, NgModule} from "@angular/core";


@NgModule({
    imports: [
    ],
    exports: [

    ],
    declarations: [

    ],
})
export class IdentityModule {
}

export const BASE_URL_IDENTITY = new InjectionToken<string>('BASE_IDENTITY_URL');
