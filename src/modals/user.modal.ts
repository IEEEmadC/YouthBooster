

export interface User {

    key?: string;
    userId: string;
    fullname: string;
    username: string;
    email: string;
    birthday: string;
    phone: number;
    pictureUrl: string;
    isPublic: boolean;
    isOnline: boolean;
    about: string;
    job: string;
    education: string;
    location: string;
    fieldsOfInterset: string;
    level: string;
    paymentVerified: boolean;
    available: boolean;
    academics: string;
    contacts: {
        github: string,
        gmail: string,
        facebook: string,
        youtube: string,
        linkedin: string
     };
     chats: string[];
     projects: string[];
     joinNotifications: string[];
     donationNotifications: string[];

}