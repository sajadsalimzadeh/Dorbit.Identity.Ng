import { Injectable } from '@angular/core';
import { app } from '@app/app';
import { UserRepository } from '@identity/repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {

    constructor(private userRepository: UserRepository) { }

    async subscribeToNotifications() {
        const permission = await Notification.requestPermission();
        
        if (permission !== 'granted') return;

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(app.settings.webpush.publicKey),
        });

        console.log('web-push', subscription);

        this.userRepository.setOwnWebPushSubscription({
            endPoint: subscription.endpoint,
            p256dh: subscription.getKey('p256dh'),
            auth: subscription.getKey('auth'),
        }).subscribe();
    }

    private urlBase64ToUint8Array(base64String: string): Uint8Array {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = atob(base64);
        return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
    }
}
