import { Injectable } from '@angular/core';
import { app } from '@app/app';
import { UserRepository } from '@identity/repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {

    constructor(private userRepository: UserRepository) { }

    async subscribeToNotifications() {
        const applicationServerKey = this.urlBase64ToUint8Array(app.settings.webpush.publicKey);
        navigator.serviceWorker.register('push-sw.js')
            .then(registration => {
                console.log('Service Worker Registered!', registration);
                registration.pushManager.getSubscription().then(async sub => {
                    if (sub === null) {
                        const registration = await navigator.serviceWorker.ready;
                        const subscription = await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: applicationServerKey,
                        });

                        console.log('web-push', subscription);

                        const subObject = subscription.toJSON();
                        const req = {
                            endPoint: subObject.endpoint,
                            p256dh: subObject.keys?.['p256dh'] ?? null,
                            auth: subObject.keys?.['auth'] ?? null,
                        }
                        this.userRepository.setOwnWebPushSubscription(req).subscribe();
                    }
                });
            })
            .catch(error => console.error('Service Worker Error:', error));
    }

    private urlBase64ToUint8Array(base64String: string): Uint8Array {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = atob(base64);
        return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
    }
}
