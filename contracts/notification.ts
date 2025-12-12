export interface NotificationDto {
    title: string;
    body: string;
    data: any;
}

export interface UserNotifySubscriptionRequest {
    type: 'web-push' | 'ios' | 'android';
    token?: string;
    p256dh?: string;
    auth?: string;
}