"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJajananResponse = void 0;
function toJajananResponse(jajanan) {
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
exports.toJajananResponse = toJajananResponse;
