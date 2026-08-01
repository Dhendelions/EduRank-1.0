const fs = require('fs');
const path = require('path');
const os = require('os');

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

    // 6. Validate image format and size (multer file check)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!allowedMimeTypes.includes(studentPhoto.mimetype)) {
        return { valid: false, error: "Foto pelajar harus berupa gambar (PNG, JPEG, WebP, GIF)." };
    }
    if (!allowedMimeTypes.includes(studentCardPhoto.mimetype)) {
        return { valid: false, error: "Foto kartu pelajar harus berupa gambar (PNG, JPEG, WebP, GIF)." };
    }

    // Check size limit: max 5MB
    const maxSize = 5 * 1024 * 1024;
    if (studentPhoto.size > maxSize) {
        return { valid: false, error: "Ukuran foto pelajar tidak boleh melebihi 5MB." };
    }
    if (studentCardPhoto.size > maxSize) {
        return { valid: false, error: "Ukuran foto kartu pelajar tidak boleh melebihi 5MB." };
    }

    return { valid: true };
}

function saveRegistration({ name, email, birthDate, studentPhoto, studentCardPhoto }) {
    // Try the project uploads folder first, then fall back to a temp directory.
    const rootDir = path.resolve(__dirname, '..');
    const candidateDirs = [
        path.join(rootDir, 'uploads'),
        path.join(os.tmpdir(), 'edurank-uploads')
    ];

    let uploadsDir = null;
    for (const dir of candidateDirs) {
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.accessSync(dir, fs.constants.W_OK);
            uploadsDir = dir;
            break;
        } catch (error) {
            // Try the next fallback directory.
        }
    }

    if (!uploadsDir) {
        throw new Error('No writable uploads directory available for registration images.');
    }

    // Move uploaded files from temp dest to final dir
    const photoInfo = moveMulterFile(studentPhoto, 'photo', email, uploadsDir);
    const cardInfo = moveMulterFile(studentCardPhoto, 'card', email, uploadsDir);

    return {
        studentPhotoUrl: `/uploads/${photoInfo.filename}`,
        studentCardPhotoUrl: `/uploads/${cardInfo.filename}`
    };
}

function moveMulterFile(fileObj, prefix, email, destDir) {
    if (!fileObj || !fileObj.path) {
        throw new Error("Invalid file object");
    }

    const safeEmail = String(email).replace(/[^a-zA-Z0-9]/g, '');
    
    let ext = 'jpg';
    if (fileObj.mimetype === 'image/png') ext = 'png';
    else if (fileObj.mimetype === 'image/webp') ext = 'webp';
    else if (fileObj.mimetype === 'image/gif') ext = 'gif';

    const filename = `${prefix}_${Date.now()}_${safeEmail}.${ext}`;
    const destPath = path.join(destDir, filename);

    // Copy file to final destination and remove temp
    fs.copyFileSync(fileObj.path, destPath);
    try {
        fs.unlinkSync(fileObj.path);
    } catch (e) {
        console.error("Failed to delete temp file:", e);
    }

    return { filename, path: destPath };
}

module.exports = {
    validateRegistration,
    saveRegistration
};
