import { User } from './user.modal';


export interface Project {

    key?: string;
    projectId?: string;
    title: string;
    author: string;
    likes: number;
    views: number;
    commentsCount: number;
    dueDate: string;
    websiteUrl: string;
    category: string;
    rating: number;
    votes: number;
    closed: boolean;
    timestamp: number;
    summary: string;
    description: string;
    requirements: string;
    budget: number;
    donationSum: number;
    relatedLocation: {
        lat: number;
        lng: number;
    };
    donations: string[];
    joins: string[];
    memberRequirements: string[];
    tags: string[];
    attachments: string[];
    videos: string[];
    images: string[];
    comments: string[];

}