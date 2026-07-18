const questionBank = {
    matematika: [
        { id: "m1", q: "Berapakah hasil dari integral tertentu ∫ (2x + 3) dx dengan batas bawah 1 dan batas atas 3?", options: ["12", "14", "16", "18"], answer: 1 },
        { id: "m2", q: "Turunan pertama dari f(x) = 3x^2 + 2x - 5 adalah...", options: ["6x + 2", "3x + 2", "6x - 2", "6x + 5"], answer: 0 },
        { id: "m3", q: "Nilai dari sin 30° + cos 60° adalah...", options: ["0", "0.5", "1", "2"], answer: 2 },
        { id: "m4", q: "Jika matriks A = [[2, 1], [3, 4]], maka determinan A adalah...", options: ["5", "6", "7", "8"], answer: 0 },
        { id: "m5", q: "Penyelesaian persamaan kuadrat x^2 - 5x + 6 = 0 adalah...", options: ["x=1 atau x=6", "x=2 atau x=3", "x=-2 atau x=-3", "x=2 atau x=-3"], answer: 1 },
        { id: "m6", q: "Nilai dari limit x mendekati 2 untuk (x^2 - 4)/(x - 2) adalah...", options: ["0", "2", "4", "Tak Terhingga"], answer: 2 },
        { id: "m7", q: "Dalam sebuah kantong terdapat 5 bola merah dan 3 bola biru. Peluang mengambil 1 bola merah adalah...", options: ["3/8", "5/8", "1/2", "5/3"], answer: 1 },
        { id: "m8", q: "Nilai dari log 100 + log 10 adalah...", options: ["2", "3", "10", "110"], answer: 1 },
        { id: "m9", q: "Sebuah barisan aritmatika memiliki a = 2 dan b = 3. Suku ke-5 adalah...", options: ["11", "14", "17", "20"], answer: 1 },
        { id: "m10", q: "Luas sebuah lingkaran dengan jari-jari 7 cm adalah... (pi = 22/7)", options: ["154 cm^2", "44 cm^2", "144 cm^2", "22 cm^2"], answer: 0 },
    ],
    fisika: [
        { id: "f1", q: "Sebuah benda bermassa 2 kg bergerak dengan percepatan 3 m/s^2. Gaya yang bekerja adalah...", options: ["5 N", "6 N", "1.5 N", "2/3 N"], answer: 1 },
        { id: "f2", q: "Hukum II Newton menyatakan bahwa percepatan berbanding lurus dengan...", options: ["Massa", "Kecepatan", "Gaya Netto", "Waktu"], answer: 2 },
        { id: "f3", q: "Satuan daya dalam SI adalah...", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 1 },
        { id: "f4", q: "Energi kinetik sebuah benda bermassa 4 kg yang bergerak dengan kecepatan 5 m/s adalah...", options: ["20 J", "50 J", "100 J", "200 J"], answer: 1 },
        { id: "f5", q: "Frekuensi sebuah gelombang dengan periode 0.5 sekon adalah...", options: ["0.5 Hz", "1 Hz", "2 Hz", "5 Hz"], answer: 2 },
        { id: "f6", q: "Tekanan hidrostatis dipengaruhi oleh...", options: ["Massa benda", "Volume benda", "Kedalaman", "Suhu air"], answer: 2 },
        { id: "f7", q: "Suhu 27 derajat Celcius setara dengan suhu Kelvin sebesar...", options: ["273 K", "300 K", "200 K", "327 K"], answer: 1 },
        { id: "f8", q: "Indeks bias kaca adalah 1.5. Jika kecepatan cahaya di ruang hampa 3x10^8 m/s, kecepatan cahaya di kaca adalah...", options: ["2x10^8 m/s", "4.5x10^8 m/s", "1.5x10^8 m/s", "3x10^8 m/s"], answer: 0 },
        { id: "f9", q: "Gaya Lorentz terjadi pada kawat berarus yang berada dalam medan...", options: ["Listrik", "Magnet", "Gravitasi", "Nuklir"], answer: 1 },
        { id: "f10", q: "Sinar gamma merupakan jenis gelombang...", options: ["Mekanik", "Elektromagnetik", "Bunyi", "Longitudinal"], answer: 1 },
    ],
    bahasainggris: [
        { id: "b1", q: "The plural form of 'child' is...", options: ["childs", "childrens", "children", "childes"], answer: 2 },
        { id: "b2", q: "Identify the tense: 'I have been working here for 5 years.'", options: ["Present Perfect", "Present Perfect Continuous", "Past Continuous", "Past Perfect"], answer: 1 },
        { id: "b3", q: "Synonym of 'Abundant' is...", options: ["Scarce", "Plentiful", "Empty", "Rare"], answer: 1 },
        { id: "b4", q: "Antonym of 'Artificial' is...", options: ["Fake", "Synthetic", "Natural", "Unreal"], answer: 2 },
        { id: "b5", q: "He ___ to the market yesterday.", options: ["go", "goes", "gone", "went"], answer: 3 },
        { id: "b6", q: "If it rains, I ___ at home.", options: ["will stay", "would stay", "stayed", "stay"], answer: 0 },
        { id: "b7", q: "Choose the correct passive form: 'She wrote a letter.'", options: ["A letter was written by her.", "A letter is written by her.", "A letter wrote by her.", "She was writing a letter."], answer: 0 },
        { id: "b8", q: "What is the meaning of the idiom 'piece of cake'?", options: ["Delicious dessert", "Very easy task", "Difficult problem", "A small portion"], answer: 1 },
        { id: "b9", q: "Identify the adjective in the sentence: 'The quick brown fox jumps.'", options: ["The", "fox", "quick", "jumps"], answer: 2 },
        { id: "b10", q: "She is good ___ solving puzzles.", options: ["in", "at", "on", "with"], answer: 1 },
    ],
    informatika: [
        { id: "i1", q: "Kepanjangan dari CPU adalah...", options: ["Central Process Unit", "Computer Processing Unit", "Central Processing Unit", "Core Processing Unit"], answer: 2 },
        { id: "i2", q: "Bahasa pemrograman yang digunakan untuk membuat struktur halaman web adalah...", options: ["Python", "HTML", "Java", "C++"], answer: 1 },
        { id: "i3", q: "Algoritma pengurutan yang membandingkan dua elemen berdekatan dan menukarnya jika salah urutan disebut...", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Insertion Sort"], answer: 2 },
        { id: "i4", q: "Struktur data LIFO (Last In First Out) digunakan pada...", options: ["Queue", "Stack", "Array", "Linked List"], answer: 1 },
        { id: "i5", q: "Perintah SQL untuk mengambil data dari tabel adalah...", options: ["UPDATE", "DELETE", "INSERT", "SELECT"], answer: 3 },
        { id: "i6", q: "Di bawah ini yang merupakan sistem operasi open source adalah...", options: ["Windows", "macOS", "iOS", "Linux"], answer: 3 },
        { id: "i7", q: "Bilangan biner dari angka desimal 10 adalah...", options: ["1010", "1100", "1001", "1110"], answer: 0 },
        { id: "i8", q: "Jenis jaringan komputer yang mencakup area sebuah kota adalah...", options: ["LAN", "PAN", "MAN", "WAN"], answer: 2 },
        { id: "i9", q: "Dalam pemrograman, fungsi rekursif adalah...", options: ["Fungsi yang mengembalikan string", "Fungsi yang tidak memiliki return", "Fungsi yang memanggil dirinya sendiri", "Fungsi yang dipanggil oleh user"], answer: 2 },
        { id: "i10", q: "Perangkat lunak yang berfungsi sebagai penerjemah bahasa tingkat tinggi ke mesin adalah...", options: ["Editor", "Debugger", "Compiler", "Browser"], answer: 2 },
    ]
};

function getRandomQuestions(subject, count) {
    let pool = [];
    if (subject === 'campuran' || !questionBank[subject]) {
        pool = [
            ...questionBank.matematika,
            ...questionBank.fisika,
            ...questionBank.bahasainggris,
            ...questionBank.informatika
        ];
    } else {
        pool = [...questionBank[subject]];
    }

    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const selected = pool.slice(0, count);
    
    // Return without answers for client side
    return selected.map(q => ({
        id: q.id,
        q: q.q,
        options: q.options
    }));
}

function checkAnswer(questionId, answerIndex) {
    for (const sub in questionBank) {
        const q = questionBank[sub].find(x => x.id === questionId);
        if (q) {
            return q.answer === parseInt(answerIndex);
        }
    }
    return false;
}

function getQuestionData(questionId) {
    for (const sub in questionBank) {
        const q = questionBank[sub].find(x => x.id === questionId);
        if (q) {
            return q;
        }
    }
    return null;
}

module.exports = {
    getRandomQuestions,
    checkAnswer,
    getQuestionData,
    questionBank
};
