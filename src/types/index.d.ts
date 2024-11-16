/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: any;
    pluginContent: any;
    template?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Page {
    id: number;
    title: string;
    slug: string;
    route: string;
    content: any;
    pluginContent: any;
    template?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Plugin {
    id: number;
    name: string;
    slug: string;
    enabled: boolean;
    config: any;
    createdAt: Date;
    updatedAt: Date;
}
