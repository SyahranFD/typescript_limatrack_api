import {User} from "@prisma/client";

export type UserResponse = {
    id: string;
    nama_lengkap: string;
    email: string;
    token?: string | null;
    verified_email?: boolean | null;
    latitude?: string | null;
    longitude?: string | null;
}

export type CreateUserRequest = {
    id: string;
    nama_lengkap: string;
    email: string;
    password: string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export type UpdateUserRequest = {
    id: string;
    nama_lengkap: string;
    email: string;
    password: string;
    latitude?: string | null;
    longitude?: string | null;
}

export function toUserResponse(user: User): UserResponse {
    return {
        id: user.id,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        verified_email: user.verified_email,
        latitude: user.latitude,
        longitude: user.longitude
    }
}
