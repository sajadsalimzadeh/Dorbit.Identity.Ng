import { Injectable } from '@angular/core';
import { app } from '@app/app';
import { UserRepository } from '@identity/repositories/user.repository';
import { SwPush } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {

    constructor(private userRepository: UserRepository, private swPush: SwPush) { }

    async subscribeToNotifications() {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
        this.swPush.requestSubscription({
            serverPublicKey: app.settings.webpush.publicKey
        }).then(subscription => {
            console.log('web-push', subscription);

            const subObject = subscription.toJSON();
            const req = {
                endPoint: subObject.endpoint,
                p256dh: subObject.keys?.['p256dh'] ?? null,
                auth: subObject.keys?.['auth'] ?? null,
            }
            this.userRepository.setOwnWebPushSubscription(req).subscribe();
        });
    }
}
