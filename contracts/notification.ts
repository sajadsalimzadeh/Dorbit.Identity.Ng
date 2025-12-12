export interface NotificationDto {
    title: string;
    body: string;
    data: any;
}

export interface UserNotifySubscriptionRequest {
    endPoint?: string;
    p256dh?: string;
    auth?: string;
    fcmToken?: string;
    apnToken?: string;
}