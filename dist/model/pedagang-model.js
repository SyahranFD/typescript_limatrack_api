"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPedagangResponse = void 0;
function toPedagangResponse(pedagang) {
    return {
        id: pedagang.id,
        email: pedagang.email,
        password: pedagang.password,
        nama_warung: pedagang.nama_warung,
        nama_pedagang: pedagang.nama_pedagang,
        image: pedagang.image,
        buka: pedagang.buka,
        jam_buka: pedagang.jam_buka,
        jam_tutup: pedagang.jam_tutup,
        daerah_dagang: pedagang.daerah_dagang,
        rating: pedagang.rating,
        sertifikasi_halal: pedagang.sertifikasi_halal,
        latitude: pedagang.latitude,
        longitude: pedagang.longitude
    };
}
exports.toPedagangResponse = toPedagangResponse;
