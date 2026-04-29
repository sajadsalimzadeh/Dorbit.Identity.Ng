import { Inject, Injectable, InjectionToken } from '@angular/core';
import { UserRepository } from '@identity/repositories/user.repository';
import { SwPush } from '@angular/service-worker';
import { nativeService } from '@app/services/native.service';
import { UserNotifySubscriptionRequest, UserNotifySubscriptionType } from '@identity/contracts/notification';

export const WEB_PUSH_PUBLIC_KEY = new InjectionToken<string>('web-push-public-key');

@Injectable({ providedIn: 'root' })
export class PushNotificationService {

    constructor(private userRepository: UserRepository, private swPush: SwPush, @Inject(WEB_PUSH_PUBLIC_KEY) private webPushPublicKey: string) {
        this.swPush.messages.subscribe((message: any) => {
            console.log('Push message received:', message);
            // Notification.requestPermission().then(permission => {
            //     if (permission === 'granted') {
            //         message.title ??= 'Trainout';
            //         message.body ??= 'New message';
            //         message.icon ??= '/assets/images/logo.png';
            //         message.data ??= {
            //             url: '/',
            //         };

            //         new Notification(message.title, { body: message.body, icon: message.icon, data: message.data });
            //     }
            // });
        });
    }

    async subscribeToNotifications() {

        if (nativeService.isNative) {
            const message = JSON.parse(localStorage.getItem('notification-token') ?? '{}');
            let req = {
                type: UserNotifySubscriptionType.Expo,
                token: message.token,
            } as UserNotifySubscriptionRequest;
            this.userRepository.setOwnNotifySubscription(req).subscribe((res) => {
                localStorage.removeItem('notification-token');
            });
        } else {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') return;
            this.swPush.requestSubscription({
                serverPublicKey: this.webPushPublicKey
            }).then((subscription: PushSubscription) => {
                console.log('web-push', subscription);
                const subObject = subscription.toJSON();
                const req = {
                    type: UserNotifySubscriptionType.WebPush,
                    token: subObject.endpoint,
                    p256dh: subObject.keys?.['p256dh'],
                    auth: subObject.keys?.['auth'],
                } as UserNotifySubscriptionRequest
                this.userRepository.setOwnNotifySubscription(req).subscribe();
            });
        }
    }
}
