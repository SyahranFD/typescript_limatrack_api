import {Pedagang} from "@prisma/client";

export type PedagangResponse = {
    id: string;
    email: string;
    password: string;
    token?: string | null;
    verified_email?: boolean | null;
    nama_warung: string;
    nama_pedagang: string;
    image?: string | null;
    status?: string | null;
    jam_buka?: string | null;
    jam_tutup?: string | null;
    daerah_dagang?: string | null;
    rating?: number | null;
    sertifikasi_halal?: boolean | null;
    latitude?: string | null;
    longitude?: string | null;
}

export type CreatePedagangRequest = {
    email: string;
    password: string;
    nama_warung: string;
    nama_pedagang: string;
    image?: string | null;
    status?: string | null;
    jam_buka?: string | null;
    jam_tutup?: string | null;
    daerah_dagang?: string | null;
    rating?: number | null;
    sertifikasi_halal?: boolean | null;
    latitude?: string | null;
    longitude?: string | null;
    otp: string;
}

export type LoginPedagangRequest = {
    email: string;
    password: string;
}

export type UpdatePedagangRequest = {
    id: string;
    email: string;
    password: string;
    nama_warung: string;
    nama_pedagang: string;
    image?: string | null;
    status?: string | null;
    jam_buka?: string | null;
    jam_tutup?: string | null;
    daerah_dagang?: string | null;
    rating?: number | null;
    sertifikasi_halal?: boolean | null;
    latitude?: string | null;
    longitude?: string | null;
}

export function toPedagangResponse(pedagang: Pedagang): PedagangResponse {
    return {
        id: pedagang.id,
        email: pedagang.email,
        password: pedagang.password,
        nama_warung: pedagang.nama_warung,
        nama_pedagang: pedagang.nama_pedagang,
        image: pedagang.image,
        status: pedagang.status,
        jam_buka: pedagang.jam_buka,
        jam_tutup: pedagang.jam_tutup,
        daerah_dagang: pedagang.daerah_dagang,
        rating: pedagang.rating,
        sertifikasi_halal: pedagang.sertifikasi_halal,
        latitude: pedagang.latitude,
        longitude: pedagang.longitude
    }
}
