import { Pipe, PipeTransform } from "@angular/core";
import { AuthRepository } from "@identity/repositories/auth.repository";

@Pipe({
    name: 'auth',
    standalone: true
})
export class AuthPipe implements PipeTransform {

    constructor(private authRepository: AuthRepository) {
    }

    transform(value: string | string[] | undefined): boolean {
        if(typeof value === 'undefined') return false;
        else if(typeof value === 'string') return this.authRepository.hasAccess(value.toLowerCase());
        return value.some(x => this.authRepository.hasAccess(x.toLowerCase()));
    }
}