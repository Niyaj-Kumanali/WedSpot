export interface Review {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    date: string;
    comment: string;
}

export interface Vendor {
    id: string;
    name: string;
    description: string;
    services: string[];
    image: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    location: string;
    sectorId: string;
    reviews?: Review[];
}

export interface VendorSector {
    id: string;
    name: string;
    icon: string;
    description: string;
}
