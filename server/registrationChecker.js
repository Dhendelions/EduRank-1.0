const fs = require('fs');
const path = require('path');

function validateRegistration({ name, email, password, birthDate, studentPhoto, studentCardPhoto }) {
    // 1. Validate full name
    const trimmedName = String(name || '').trim();
    if (!trimmedName) {
        return { valid: false, error: "Nama lengkap tidak boleh kosong." };
    }
    const words = trimmedName.split(/\s+/);
    if (words.length < 2) {
        return { valid: false, error: "Nama lengkap harus minimal terdiri dari dua kata." };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
        return { valid: false, error: "Nama lengkap hanya boleh mengandung huruf, spasi, apostrof, atau tanda hubung." };
    }

    // 2. Validate email
    const trimmedEmail = String(email || '').trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return { valid: false, error: "Format email tidak valid. Gunakan format seperti nama@email.com." };
    }

    // 3. Validate password
    const trimmedPassword = String(password || '');
    if (trimmedPassword.length < 8) {
        return { valid: false, error: "Password minimal harus 8 karakter." };
    }
    if (!(/[a-zA-Z]/.test(trimmedPassword) && /[0-9]/.test(trimmedPassword))) {
        return { valid: false, error: "Password harus mengandung campuran huruf dan angka." };
    }

    // 4. Validate birth date
    if (!birthDate) {
        return { valid: false, error: "Tanggal lahir wajib diisi." };
    }
    const bDate = new Date(birthDate);
    if (isNaN(bDate.getTime())) {
        return { valid: false, error: "Format tanggal lahir tidak valid." };
    }
    const ageDiffMs = Date.now() - bDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 6) {
        return { valid: false, error: "Usia minimal pendaftar adalah 6 tahun." };
    }

    // 5. Validate images presence
    if (!studentPhoto) {
        return { valid: false, error: "Foto pelajar wajib diambil atau diunggah." };
    }
    if (!studentCardPhoto) {
        return { valid: false, error: "Foto wajah bersama kartu pelajar wajib diambil atau diunggah." };
    }

    // 6. Validate image format and size (base64 string check)
    // Accept standard image data URL: data:image/(png|jpeg|jpg|webp|gif);base64,
    const imagePattern = /^data:image\/(png|jpe?g|webp|gif);base64,/i;
    if (!imagePattern.test(studentPhoto)) {
        return { valid: false, error: "Foto pelajar harus berupa gambar (PNG, JPEG, WebP, GIF)." };
    }
    if (!imagePattern.test(studentCardPhoto)) {
        return { valid: false, error: "Foto kartu pelajar harus berupa gambar (PNG, JPEG, WebP, GIF)." };
    }

    // Check size limit: max 5MB (roughly 6.7M characters)
    const maxChars = 5 * 1024 * 1024 * (4 / 3);
    if (studentPhoto.length > maxChars) {
        return { valid: false, error: "Ukuran foto pelajar tidak boleh melebihi 5MB." };
    }
    if (studentCardPhoto.length > maxChars) {
        return { valid: false, error: "Ukuran foto kartu pelajar tidak boleh melebihi 5MB." };
    }

    return { valid: true };
}

function saveRegistration({ name, email, birthDate, studentPhoto, studentCardPhoto }) {
    // Ensure uploads directory exists in root
    const rootDir = path.resolve(__dirname, '..');
    const uploadsDir = path.join(rootDir, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save student photo image
    const photoInfo = saveBase64Image(studentPhoto, 'photo', email, uploadsDir);
    // Save student card image
    const cardInfo = saveBase64Image(studentCardPhoto, 'card', email, uploadsDir);

    return {
        studentPhotoUrl: `/uploads/${photoInfo.filename}`,
        studentCardPhotoUrl: `/uploads/${cardInfo.filename}`
    };
}

function saveBase64Image(base64Str, prefix, email, destDir) {
    const matches = base64Str.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error("Invalid base64 image data");
    }

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const dataBuffer = Buffer.from(matches[2], 'base64');
    const safeEmail = String(email).replace(/[^a-zA-Z0-9]/g, '');
    const filename = `${prefix}_${Date.now()}_${safeEmail}.${ext}`;
    const destPath = path.join(destDir, filename);

    fs.writeFileSync(destPath, dataBuffer);
    return { filename, path: destPath };
}

module.exports = {
    validateRegistration,
    saveRegistration
};
