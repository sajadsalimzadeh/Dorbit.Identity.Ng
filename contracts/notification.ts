export interface NotificationDto {
    title: string;
    body: string;
    data: any;
}

export enum UserNotifySubscriptionType {
    None = 0,
    WebPush = 1,
    Expo = 2,
    Fcm = 3,
    Apn = 4,
}

export interface UserNotifySubscriptionRequest {
    type: UserNotifySubscriptionType;
    token?: string;
    p256dh?: string;
    auth?: string;
}