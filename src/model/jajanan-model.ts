import {Jajanan} from "@prisma/client";

export type JajananResponse = {
    id: string;
    pedagang_id: string;
    nama: string;
    harga: number;
    image: string;
    tersedia: boolean;
    kategori: string;
}

export type CreateJajananRequest = {
    nama: string;
    harga: number;
    image: string;
    tersedia: boolean;
    kategori: string;
}

export type UpdateJajananRequest = {
    id: string;
    pedagang_id: string;
    nama: string;
    harga: number;
    image: string;
    tersedia: boolean;
    kategori: string;
}

export function toJajananResponse(jajanan: Jajanan): JajananResponse {
    return {
        id: jajanan.id,
        pedagang_id: jajanan.pedagang_id,
        nama: jajanan.nama,
        harga: jajanan.harga,
        image: jajanan.image,
        tersedia: jajanan.tersedia,
        kategori: jajanan.kategori
    };
}
