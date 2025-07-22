import { Injectable } from '@angular/core';
import { app } from '@app/app';
import { UserRepository } from '@identity/repositories/user.repository';
import { SwPush } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {

    constructor(private userRepository: UserRepository, private swPush: SwPush) {
        this.swPush.messages.subscribe((message: any) => {
            console.log('Push message received:', message);
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    message.title ??= 'Trainout';
                    message.body ??= 'New message';
                    message.icon ??= '/assets/images/logo.png';
                    message.data ??= {
                        url: '/',
                    };

                    new Notification(message.title, { body: message.body, icon: message.icon, data: message.data });
                }
            });
        });
    }

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
