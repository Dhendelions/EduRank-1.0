const LEARNING_STYLES = {
    visual:{
        label:"Visual",
        icon:"fa-regular fa-image",
        hint:"Diagram, warna, dan peta konsep singkat."
    },
    kinesthetic:{
        label:"Kinestetik",
        icon:"fa-solid fa-hand-pointer",
        hint:"Aktivitas, eksperimen kecil, dan latihan bergerak."
    },
    readwrite:{
        label:"Read/Write",
        icon:"fa-solid fa-pen-nib",
        hint:"Catatan, definisi, langkah, dan rangkuman tertulis."
    }
};

const MATERIALS = {
    matematika:{
        label:"Matematika",
        icon:"fa-solid fa-calculator",
        color:"math",
        classes:{
            "10":[
                {
                    title:"Eksponen dan Logaritma",
                    source:"MATEMATIKA/Kelas X/Eksponen dan Logaritma.pdf",
                    summary:"Eksponen membahas perpangkatan dan sifat-sifatnya. Logaritma adalah operasi kebalikan eksponen untuk mencari pangkat yang membuat suatu bilangan menjadi nilai tertentu.",
                    keywords:["Pangkat", "Akar", "Bentuk baku", "Logaritma"],
                    formula:["a^m x a^n = a^(m+n)", "a^m / a^n = a^(m-n)", "log_a b = c berarti a^c = b"],
                    steps:["Samakan basis jika memungkinkan.", "Gunakan sifat pangkat atau logaritma.", "Sederhanakan bentuk aljabar.", "Cek syarat basis dan numerus logaritma."],
                    example:"Jika 2^x = 32, maka 32 = 2^5 sehingga x = 5.",
                    activity:"Tulis 5 bilangan berpangkat dari benda sekitar, misalnya lipatan kertas 2, 4, 8, 16. Ubah setiap bentuknya menjadi logaritma."
                },
                {
                    title:"Barisan dan Deret",
                    source:"MATEMATIKA/Kelas X/Barisan dan Deret.pdf",
                    summary:"Barisan adalah susunan bilangan berpola. Deret adalah penjumlahan suku-suku barisan. Pola yang sering muncul adalah aritmetika dan geometri.",
                    keywords:["Suku ke-n", "Beda", "Rasio", "Jumlah suku"],
                    formula:["Un aritmetika = a + (n - 1)b", "Sn aritmetika = n/2(2a + (n - 1)b)", "Un geometri = ar^(n-1)"],
                    steps:["Tentukan apakah polanya tambah tetap atau kali tetap.", "Catat suku pertama.", "Hitung beda atau rasio.", "Pilih rumus suku ke-n atau jumlah n suku."],
                    example:"Barisan 3, 7, 11, 15 memiliki beda 4, sehingga U10 = 3 + 9(4) = 39.",
                    activity:"Buat pola dari langkah kaki: maju 2 ubin, lalu 4, 6, 8. Catat suku dan hitung total ubin setelah 6 langkah."
                },
                {
                    title:"Vektor dan Operasinya",
                    source:"MATEMATIKA/Kelas X/Vektor dan Operasinya.pdf",
                    summary:"Vektor memiliki besar dan arah. Operasinya meliputi penjumlahan, pengurangan, perkalian skalar, dan menentukan panjang vektor.",
                    keywords:["Arah", "Resultan", "Komponen", "Skalar"],
                    formula:["|v| = sqrt(x^2 + y^2)", "a + b = (x1 + x2, y1 + y2)", "k(a,b) = (ka,kb)"],
                    steps:["Ubah vektor menjadi komponen.", "Operasikan komponen x dengan x dan y dengan y.", "Gunakan teorema Pythagoras untuk panjang.", "Gambar arah resultan agar tidak keliru tanda."],
                    example:"Vektor (3,4) memiliki panjang sqrt(3^2 + 4^2) = 5.",
                    activity:"Gunakan lantai sebagai koordinat. Melangkah 3 ke kanan dan 4 ke depan, lalu ukur resultan dengan garis diagonal."
                }
            ],
            "11":[
                {
                    title:"Fungsi Komposisi dan Invers",
                    source:"MATEMATIKA/Kelas XI/Matematika Wajib/Fungsi Komposisi & Invers.pdf",
                    summary:"Fungsi komposisi memasukkan hasil satu fungsi ke fungsi lain. Invers membalik hubungan input dan output jika fungsi memenuhi syarat satu-satu.",
                    keywords:["f(g(x))", "Domain", "Range", "Invers"],
                    formula:["(f o g)(x) = f(g(x))", "Jika y = f(x), invers dicari dengan menukar x dan y"],
                    steps:["Tentukan fungsi bagian dalam.", "Substitusikan ke fungsi luar.", "Sederhanakan.", "Untuk invers, tukar x dan y lalu selesaikan y."],
                    example:"Jika f(x)=2x+1 dan g(x)=x-3, maka f(g(x))=2(x-3)+1=2x-5.",
                    activity:"Buat mesin fungsi dua tahap: kartu pertama mengurangi 3, kartu kedua mengali 2 lalu menambah 1. Coba beberapa angka."
                },
                {
                    title:"Lingkaran",
                    source:"MATEMATIKA/Kelas XI/Matematika Wajib/Materi Lingkaran.pdf",
                    summary:"Lingkaran adalah himpunan titik yang berjarak sama dari pusat. Materi ini mencakup persamaan, jari-jari, pusat, garis singgung, dan hubungan titik terhadap lingkaran.",
                    keywords:["Pusat", "Jari-jari", "Diameter", "Garis singgung"],
                    formula:["(x-a)^2 + (y-b)^2 = r^2", "Keliling = 2 pi r", "Luas = pi r^2"],
                    steps:["Identifikasi pusat dan jari-jari.", "Substitusi ke persamaan standar.", "Gunakan jarak titik ke pusat untuk posisi titik.", "Untuk singgung, perhatikan gradien tegak lurus radius."],
                    example:"Lingkaran berpusat (2,3) berjari-jari 5 memiliki persamaan (x-2)^2 + (y-3)^2 = 25.",
                    activity:"Gambar lingkaran dengan koin. Tandai pusat, tarik radius, lalu ukur diameter untuk melihat hubungan d = 2r."
                },
                {
                    title:"Statistika",
                    source:"MATEMATIKA/Kelas XI/Matematika Wajib/Statistika.pdf",
                    summary:"Statistika membantu membaca data melalui ukuran pemusatan dan penyebaran, seperti mean, median, modus, kuartil, dan simpangan.",
                    keywords:["Mean", "Median", "Modus", "Kuartil"],
                    formula:["Mean = jumlah data / banyak data", "Median = nilai tengah data terurut", "Jangkauan = data terbesar - data terkecil"],
                    steps:["Urutkan data.", "Tentukan ukuran yang diminta.", "Gunakan rumus sesuai jenis data.", "Tulis interpretasi hasil, bukan hanya angka."],
                    example:"Data 4, 5, 5, 8, 10 memiliki mean 6,4; median 5; modus 5.",
                    activity:"Kumpulkan tinggi 5 benda di meja. Urutkan, hitung mean dan median, lalu jelaskan mana yang paling mewakili."
                }
            ],
            "12":[
                {
                    title:"Transformasi Fungsi",
                    source:"MATEMATIKA/Kelas XII/Matematika Wajib/Transformasi Fungsi/Transformasi Fungsi.pdf",
                    summary:"Transformasi fungsi mempelajari pergeseran, pencerminan, perbesaran, dan perputaran suatu fungsi grafik dalam bidang kartesius.",
                    keywords:["Translasi", "Refleksi", "Dilatasi", "Rotasi"],
                    formula:["T(x,y) = (x+a, y+b)", "My(x,y) = (-x, y)", "Mx(x,y) = (x, -y)"],
                    steps:["Identifikasi jenis transformasi.", "Gunakan matriks transformasi jika diperlukan.", "Terapkan pada titik (x,y).", "Substitusikan nilai x' dan y' ke fungsi awal."],
                    example:"Fungsi y = x^2 ditranslasikan oleh T(0, 2) menjadi y = x^2 + 2.",
                    activity:"Gambar fungsi dasar y = x^2, lalu geser seluruh titik 2 satuan ke atas."
                },
                {
                    title:"Kaidah Pencacahan dan Peluang",
                    source:"MATEMATIKA/Kelas XII/Matematika Wajib/Kaidah Pencacahan dan Teori Peluang/XII_Matematika-Umum_KD-3.3_Final.pdf",
                    summary:"Materi ini membahas aturan penjumlahan, aturan perkalian, permutasi, kombinasi, dan teori peluang suatu kejadian majemuk.",
                    keywords:["Permutasi", "Kombinasi", "Faktorial", "Ruang Sampel"],
                    formula:["P(n,r) = n! / (n-r)!", "C(n,r) = n! / (r!(n-r)!)", "P(A) = n(A)/n(S)"],
                    steps:["Tentukan apakah urutan diperhatikan (Permutasi) atau tidak (Kombinasi).", "Hitung ruang sampel n(S).", "Hitung banyaknya kejadian n(A).", "Gunakan rumus peluang P(A)."],
                    example:"Dari 5 orang dipilih 3 orang pengurus tanpa melihat jabatan, maka gunakan kombinasi C(5,3) = 10.",
                    activity:"Lempar dua buah dadu 10 kali. Catat mata dadu yang muncul dan hitung peluang empirisnya."
                },
                {
                    title:"Busur dan Juring Lingkaran",
                    source:"MATEMATIKA/Kelas XII/Matematika Wajib/Busur dan Juring Lingkaran/materi Busur Lingkaran.pdf",
                    summary:"Membahas hubungan antara sudut pusat, panjang busur, dan luas juring pada lingkaran.",
                    keywords:["Busur", "Juring", "Sudut Pusat", "Lingkaran"],
                    formula:["Panjang Busur = (sudut/360) x 2*pi*r", "Luas Juring = (sudut/360) x pi*r^2"],
                    steps:["Tentukan besar sudut pusat.", "Tentukan jari-jari atau diameter lingkaran.", "Substitusikan ke dalam rumus panjang busur atau luas juring."],
                    example:"Sudut 90 derajat dengan jari-jari 7 cm memiliki panjang busur = (90/360) x 2 x (22/7) x 7 = 11 cm.",
                    activity:"Gunting kertas berbentuk lingkaran, lalu potong membentuk seperempat lingkaran. Hitung luas dan panjang pinggirannya."
                }
            ]
        }
    },
    fisika:{
        label:"Fisika",
        icon:"fa-solid fa-atom",
        color:"physics",
        classes:{
            "10":[
                {
                    title:"Besaran, Satuan, dan Pengukuran",
                    source:"FISIKA/Kelas X/BAB 1/Bagian 1.docx",
                    summary:"Fisika dimulai dari mengukur besaran secara konsisten. Besaran pokok, besaran turunan, satuan SI, angka penting, dan ketidakpastian membantu hasil ukur lebih dapat dipercaya.",
                    keywords:["Besaran", "Satuan SI", "Angka penting", "Ketidakpastian"],
                    formula:["ketidakpastian penggaris = 1/2 skala terkecil", "massa jenis = massa / volume"],
                    steps:["Kenali besaran yang diukur.", "Gunakan satuan SI.", "Catat alat ukur dan skala terkecil.", "Tulis hasil dengan angka penting yang sesuai."],
                    example:"Panjang 12,4 cm dengan penggaris berskala 1 mm dapat ditulis sebagai 12,40 cm jika ketelitian mendukung.",
                    activity:"Ukur panjang meja dengan penggaris atau meteran. Catat hasil, satuan, dan kemungkinan selisih pengukuran."
                },
                {
                    title:"Gerak Lurus",
                    source:"FISIKA/Kelas X/BAB 2/Bagian 2.docx",
                    summary:"Gerak lurus membahas posisi, jarak, perpindahan, kecepatan, kelajuan, dan percepatan pada lintasan garis lurus.",
                    keywords:["Jarak", "Perpindahan", "Kecepatan", "Percepatan"],
                    formula:["v = s / t", "a = perubahan v / t", "s = v0t + 1/2 at^2"],
                    steps:["Tentukan yang diketahui.", "Pilih GLB atau GLBB.", "Perhatikan arah dan tanda.", "Substitusi ke rumus yang sesuai."],
                    example:"Benda menempuh 20 m dalam 4 s, maka kelajuannya 5 m/s.",
                    activity:"Jalan 10 langkah sambil mengukur waktu. Hitung kelajuan rata-rata dan bandingkan dengan teman."
                },
                {
                    title:"Hukum Newton",
                    source:"FISIKA/Kelas X/BAB 3/Bagian 3.docx",
                    summary:"Hukum Newton menjelaskan hubungan gaya dan gerak. Resultan gaya nol membuat benda diam atau bergerak lurus beraturan, sedangkan resultan gaya tidak nol menghasilkan percepatan.",
                    keywords:["Gaya", "Massa", "Percepatan", "Resultan"],
                    formula:["Sigma F = ma", "w = mg", "aksi = -reaksi"],
                    steps:["Gambar diagram gaya.", "Tentukan arah positif.", "Jumlahkan gaya searah dan berlawanan.", "Gunakan Sigma F = ma."],
                    example:"Gaya 10 N pada massa 2 kg menghasilkan percepatan 5 m/s^2.",
                    activity:"Dorong buku pelan lalu lebih kuat. Rasakan perubahan percepatan dan hubungkan dengan besar gaya."
                }
            ],
            "11":[
                {
                    title:"Dinamika Rotasi",
                    source:"FISIKA/Kelas XI/BAB 1/Bagian 1.docx",
                    summary:"Dinamika rotasi membahas gerak benda berputar melalui torsi, momen inersia, momentum sudut, dan keseimbangan benda tegar.",
                    keywords:["Torsi", "Momen inersia", "Rotasi", "Kesetimbangan"],
                    formula:["tau = rF sin theta", "Sigma tau = I alpha", "L = I omega"],
                    steps:["Tentukan titik poros.", "Hitung lengan gaya.", "Tentukan arah putaran.", "Jumlahkan torsi searah dan berlawanan."],
                    example:"Gaya pada gagang pintu lebih mudah memutar jika diberikan jauh dari engsel karena lengan gaya lebih besar.",
                    activity:"Buka pintu dari dekat engsel dan dari ujung gagang. Bandingkan gaya yang dibutuhkan."
                },
                {
                    title:"Fluida",
                    source:"FISIKA/Kelas XI/BAB 2/Bagian 2.docx",
                    summary:"Fluida mencakup tekanan, hukum Pascal, gaya Archimedes, debit, dan prinsip Bernoulli pada zat cair atau gas yang diam maupun mengalir.",
                    keywords:["Tekanan", "Pascal", "Archimedes", "Bernoulli"],
                    formula:["P = F / A", "P = rho g h", "F_A = rho g V"],
                    steps:["Tentukan apakah fluida diam atau mengalir.", "Catat massa jenis dan kedalaman.", "Pilih prinsip tekanan, apung, atau aliran.", "Periksa satuan hasil."],
                    example:"Semakin dalam posisi di air, tekanan hidrostatis semakin besar karena h bertambah.",
                    activity:"Tekan botol plastik berisi air yang diberi lubang kecil. Amati pancaran air dari lubang yang berbeda tinggi."
                },
                {
                    title:"Termodinamika",
                    source:"FISIKA/Kelas XI/BAB 3/Bagian 3.docx",
                    summary:"Termodinamika mempelajari kalor, usaha, energi dalam, dan perubahan keadaan gas. Konsep ini menjelaskan mesin kalor dan proses pada gas ideal.",
                    keywords:["Kalor", "Usaha", "Energi dalam", "Gas ideal"],
                    formula:["Q = delta U + W", "PV = nRT", "W = P delta V"],
                    steps:["Kenali jenis proses gas.", "Tentukan arah kalor dan usaha.", "Gunakan hukum I termodinamika.", "Tafsirkan tanda positif atau negatif."],
                    example:"Gas memuai pada tekanan tetap melakukan usaha karena volumenya bertambah.",
                    activity:"Pegang botol kosong tertutup lalu hangatkan dengan tangan. Amati perubahan tekanan/volume kecil yang terasa."
                }
            ],
            "12":[
                {
                    title:"Listrik Statis",
                    source:"FISIKA/Kelas XII/BAB 1/Bagian 1.docx",
                    summary:"Listrik statis membahas muatan, gaya Coulomb, medan listrik, potensial listrik, dan energi potensial listrik.",
                    keywords:["Muatan", "Coulomb", "Medan listrik", "Potensial"],
                    formula:["F = k q1 q2 / r^2", "E = F / q", "V = kq / r"],
                    steps:["Tentukan jenis muatan.", "Hitung jarak antar muatan.", "Gunakan arah gaya tarik atau tolak.", "Jumlahkan vektor medan jika lebih dari satu muatan."],
                    example:"Dua muatan sejenis saling tolak, sedangkan muatan berbeda jenis saling tarik.",
                    activity:"Gosok penggaris plastik ke rambut kering, lalu dekatkan ke potongan kertas kecil untuk melihat efek muatan."
                },
                {
                    title:"Listrik Dinamis",
                    source:"FISIKA/Kelas XII/BAB 2/Bagian 2.docx",
                    summary:"Listrik dinamis mempelajari arus listrik, tegangan, hambatan, rangkaian seri-paralel, energi, dan daya listrik.",
                    keywords:["Arus", "Tegangan", "Hambatan", "Daya"],
                    formula:["V = IR", "P = VI", "R seri = R1 + R2", "1/R paralel = 1/R1 + 1/R2"],
                    steps:["Gambar rangkaian.", "Tentukan seri atau paralel.", "Hitung hambatan pengganti.", "Gunakan hukum Ohm untuk arus atau tegangan."],
                    example:"Jika V = 12 V dan R = 4 ohm, maka I = 3 A.",
                    activity:"Amati label charger atau lampu. Catat tegangan dan daya, lalu diskusikan artinya."
                },
                {
                    title:"Gelombang Elektromagnetik",
                    source:"FISIKA/Kelas XII/BAB 3/Bagian 3.docx",
                    summary:"Gelombang elektromagnetik tidak memerlukan medium dan mencakup radio, mikro, inframerah, cahaya tampak, ultraviolet, sinar-X, dan gamma.",
                    keywords:["Frekuensi", "Panjang gelombang", "Spektrum", "Energi"],
                    formula:["c = lambda f", "E = hf"],
                    steps:["Identifikasi jenis gelombang.", "Gunakan hubungan cepat rambat, panjang gelombang, dan frekuensi.", "Bandingkan energi melalui frekuensi.", "Hubungkan penerapan dengan kehidupan sehari-hari."],
                    example:"Frekuensi lebih tinggi berarti energi foton lebih besar.",
                    activity:"Urutkan contoh: radio, microwave, lampu, sinar-X dari frekuensi rendah ke tinggi."
                }
            ]
        }
    }
};

MATERIALS["matematika-wajib"] = {
    label:"Matematika Wajib",
    icon:"fa-solid fa-calculator",
    color:"math",
    classes:{
        "11":MATERIALS.matematika.classes["11"],
        "12":[
            {
                title:"Transformasi Fungsi",
                source:"MATEMATIKA/Kelas XII/Matematika Wajib/Transformasi Fungsi/Transformasi Fungsi.pdf",
                summary:"Transformasi fungsi mempelajari pergeseran, pencerminan, perbesaran, dan perputaran suatu fungsi grafik dalam bidang kartesius.",
                keywords:["Translasi", "Refleksi", "Dilatasi", "Rotasi"],
                formula:["T(x,y) = (x+a, y+b)", "My(x,y) = (-x, y)", "Mx(x,y) = (x, -y)"],
                steps:["Identifikasi jenis transformasi.", "Gunakan matriks transformasi jika diperlukan.", "Terapkan pada titik (x,y).", "Substitusikan nilai x' dan y' ke fungsi awal."],
                example:"Fungsi y = x^2 ditranslasikan oleh T(0, 2) menjadi y = x^2 + 2.",
                activity:"Gambar fungsi dasar y = x^2, lalu geser seluruh titik 2 satuan ke atas."
            },
            {
                title:"Kaidah Pencacahan dan Peluang",
                source:"MATEMATIKA/Kelas XII/Matematika Wajib/Kaidah Pencacahan dan Teori Peluang/XII_Matematika-Umum_KD-3.3_Final.pdf",
                summary:"Materi ini membahas aturan penjumlahan, aturan perkalian, permutasi, kombinasi, dan teori peluang suatu kejadian majemuk.",
                keywords:["Permutasi", "Kombinasi", "Faktorial", "Ruang Sampel"],
                formula:["P(n,r) = n! / (n-r)!", "C(n,r) = n! / (r!(n-r)!)", "P(A) = n(A)/n(S)"],
                steps:["Tentukan apakah urutan diperhatikan (Permutasi) atau tidak (Kombinasi).", "Hitung ruang sampel n(S).", "Hitung banyaknya kejadian n(A).", "Gunakan rumus peluang P(A)."],
                example:"Dari 5 orang dipilih 3 orang pengurus tanpa melihat jabatan, maka gunakan kombinasi C(5,3) = 10.",
                activity:"Lempar dua buah dadu 10 kali. Catat mata dadu yang muncul dan hitung peluang empirisnya."
            },
            {
                title:"Busur dan Juring Lingkaran",
                source:"MATEMATIKA/Kelas XII/Matematika Wajib/Busur dan Juring Lingkaran/materi Busur Lingkaran.pdf",
                summary:"Membahas hubungan antara sudut pusat, panjang busur, dan luas juring pada lingkaran.",
                keywords:["Busur", "Juring", "Sudut Pusat", "Lingkaran"],
                formula:["Panjang Busur = (sudut/360) x 2*pi*r", "Luas Juring = (sudut/360) x pi*r^2"],
                steps:["Tentukan besar sudut pusat.", "Tentukan jari-jari atau diameter lingkaran.", "Substitusikan ke dalam rumus panjang busur atau luas juring."],
                example:"Sudut 90 derajat dengan jari-jari 7 cm memiliki panjang busur = (90/360) x 2 x (22/7) x 7 = 11 cm.",
                activity:"Gunting kertas berbentuk lingkaran, lalu potong membentuk seperempat lingkaran. Hitung luas dan panjang pinggirannya."
            }
        ]
    }
};

MATERIALS["matematika-lanjut"] = {
    label:"Matematika Lanjut",
    icon:"fa-solid fa-square-root-variable",
    color:"math",
    classes:{
        "11":[
            {
                title:"Bilangan Kompleks",
                source:"MATEMATIKA/Kelas XI/Matematika Tingkat Lanjut/Pengertian & Operasi Bilangan Kompleks.pdf",
                summary:"Bilangan kompleks adalah bilangan yang dapat ditulis dalam bentuk x + iy, dengan x sebagai bagian real dan y sebagai bagian imajiner. File menjelaskan bentuk kompleks, pasangan berurutan, kesamaan bilangan kompleks, serta operasi dasarnya.",
                keywords:["Real", "Imajiner", "x + iy", "Operasi kompleks"],
                formula:["z = x + iy", "Re(z) = x", "Im(z) = y", "i^2 = -1"],
                steps:["Tulis bilangan dalam bentuk x + iy.", "Identifikasi bagian real dan imajiner.", "Untuk kesamaan, samakan real dengan real dan imajiner dengan imajiner.", "Operasikan suku real dan imajiner sesuai aturan aljabar."],
                example:"Jika z = 3 + 2i, maka Re(z)=3 dan Im(z)=2.",
                activity:"Buat bidang koordinat, letakkan 3 + 2i sebagai titik (3,2), lalu bandingkan dengan 2 + 3i.",
                details:[
                    "Semua bilangan real dapat dipandang sebagai bilangan kompleks berbentuk x + 0i.",
                    "Bilangan imajiner murni berbentuk iy, yaitu bagian realnya nol.",
                    "Dua bilangan kompleks sama jika bagian realnya sama dan bagian imajinernya sama."
                ]
            },
            {
                title:"Polinomial",
                source:"MATEMATIKA/Kelas XI/Matematika Tingkat Lanjut/Polinomial.pdf",
                summary:"Polinomial atau suku banyak adalah bentuk aljabar yang terdiri dari beberapa suku dengan variabel berpangkat bulat positif. Materi membahas pengertian, operasi penjumlahan, pengurangan, perkalian, kesamaan, dan nilai polinomial.",
                keywords:["Suku banyak", "Derajat", "Koefisien", "Nilai polinomial"],
                formula:["P(x)=an x^n + ... + a1 x + a0", "an tidak sama dengan 0", "n bilangan bulat positif"],
                steps:["Urutkan suku dari pangkat terbesar.", "Identifikasi derajat dan koefisien.", "Gabungkan suku sejenis untuk operasi tambah/kurang.", "Substitusikan nilai x untuk mencari nilai polinomial."],
                example:"6x^2 + 3x + 5 + 4x^3 adalah polinomial dan dapat diurutkan menjadi 4x^3 + 6x^2 + 3x + 5.",
                activity:"Tulis 4 bentuk aljabar. Pisahkan mana yang polinomial dan mana yang bukan, lalu jelaskan alasannya.",
                details:[
                    "Pangkat variabel pada polinomial harus bilangan bulat tidak negatif.",
                    "Suku dengan pangkat tertinggi menentukan derajat polinomial.",
                    "Bentuk yang memuat variabel di penyebut atau akar variabel bukan polinomial biasa."
                ]
            }
        ],
        "12":[
            {
                title:"Limit Fungsi Trigonometri",
                source:"MATEMATIKA/Kelas XII/Matematika Tingkat Lanjut/XII_Matematika Peminatan_KD 3.1_Final.pdf",
                summary:"Limit fungsi trigonometri membahas nilai pendekatan suatu fungsi trigonometri ketika variabel mendekati nilai tertentu.",
                keywords:["Limit", "Trigonometri", "Pendekatan", "Substitusi"],
                formula:["lim(x->0) sin(ax)/(bx) = a/b", "lim(x->0) tan(ax)/(bx) = a/b"],
                steps:["Coba substitusi langsung.", "Jika hasilnya 0/0, gunakan rumus dasar limit trigonometri atau manipulasi identitas trigonometri."],
                example:"lim x->0 sin(2x) / 3x = 2/3.",
                activity:"Hitung lim x->0 tan(5x) / sin(2x) dengan menggunakan rumus dasar limit trigonometri."
            },
            {
                title:"Turunan Fungsi Trigonometri",
                source:"MATEMATIKA/Kelas XII/Matematika Tingkat Lanjut/XII_Matematika Peminatan_KD 3.3_Final.pdf",
                summary:"Turunan fungsi trigonometri menggunakan prinsip limit untuk mencari laju perubahan sesaat dari fungsi sin, cos, tan, dll.",
                keywords:["Turunan", "Sinus", "Cosinus", "Aturan Rantai"],
                formula:["d/dx(sin x) = cos x", "d/dx(cos x) = -sin x", "d/dx(tan x) = sec^2 x"],
                steps:["Identifikasi fungsi dasar.", "Gunakan rumus turunan dasar.", "Terapkan aturan rantai jika fungsinya komposit."],
                example:"Turunan dari y = sin(3x) adalah y' = 3 cos(3x).",
                activity:"Carilah turunan pertama dari y = cos^2(x) menggunakan aturan rantai."
            },
            {
                title:"Distribusi Peluang Binomial",
                source:"MATEMATIKA/Kelas XII/Matematika Tingkat Lanjut/XII_Matematika Peminatan_KD 3.5_Final.pdf",
                summary:"Distribusi binomial digunakan untuk menghitung probabilitas dalam suatu percobaan yang hanya memiliki dua kemungkinan hasil (sukses atau gagal).",
                keywords:["Binomial", "Probabilitas", "Sukses", "Gagal"],
                formula:["P(X=x) = C(n,x) * p^x * q^(n-x)"],
                steps:["Tentukan jumlah percobaan (n).", "Tentukan peluang sukses (p) dan peluang gagal (q = 1-p).", "Tentukan banyak sukses yang dicari (x).", "Masukkan ke dalam rumus probabilitas binomial."],
                example:"Peluang muncul gambar tepat 2 kali dari 3 lemparan koin adalah C(3,2) * (1/2)^2 * (1/2)^1 = 3/8.",
                activity:"Hitung peluang mendapatkan tebakan benar sebanyak 4 dari 5 soal pilihan ganda (5 opsi) jika dijawab sembarang."
            }
        ]
    }
};

MATERIALS.informatika = {
    label:"Informatika",
    icon:"fa-solid fa-laptop-code",
    color:"info",
    classes:{
        "10":[
            {
                title:"Data, Informasi, dan Validasinya",
                source:"INFORMATIKA/Kelas X/Data, Informasi, dan Validasinya.pdf",
                summary:"Membahas konsep pencarian informasi dengan banyak variabel, pengumpulan data (koleksi), serta pentingnya memvalidasi kebenaran informasi melalui ekosistem periksa fakta untuk menghindari hoaks.",
                keywords:["Data", "Informasi", "Koleksi Data", "Periksa Fakta"],
                formula:["Informasi = Data + Konteks", "Validasi = Verifikasi Sumber + Triangulasi"],
                steps:["Tentukan kata kunci pencarian spesifik.", "Gunakan filter pencarian (waktu, jenis file, dll).", "Kumpulkan data dari sumber terpercaya.", "Verifikasi kebenaran info menggunakan situs periksa fakta (misal: cekfakta.com)."],
                example:"Mencari data statistik pertumbuhan ekonomi dengan kata kunci 'PDB Indonesia 2023 filetype:pdf' untuk mendapatkan laporan resmi dari BPS.",
                activity:"Buka mesin pencari, cari satu berita populer hari ini, lalu gunakan teknik periksa fakta untuk memverifikasi apakah berita tersebut valid atau hoaks."
            },
            {
                title:"Algoritma dan Struktur Data",
                source:"INFORMATIKA/Kelas X/Algoritma dan Struktur Data.pdf",
                summary:"Mengenalkan konsep dasar berpikir komputasional, perancangan algoritma menggunakan flowchart dan pseudocode, serta implementasi struktur kendali (percabangan dan perulangan) dalam pemrograman.",
                keywords:["Algoritma", "Flowchart", "Pseudocode", "Struktur Kontrol"],
                formula:["Input -> Proses (Algoritma) -> Output", "Kompleksitas Waktu = O(f(n))"],
                steps:["Analisis masalah yang ingin diselesaikan.", "Rancang urutan langkah logis (algoritma).", "Gambarkan dalam flowchart atau tulis dalam pseudocode.", "Implementasikan ke dalam kode program.", "Uji program dengan berbagai variasi input."],
                example:"Algoritma menentukan bilangan ganjil/genap: jika bilangan habis dibagi 2 maka genap, jika tidak maka ganjil.",
                activity:"Tuliskan algoritma membuat secangkir teh manis hangat dalam bentuk langkah-langkah terstruktur dari awal sampai siap diminum."
            },
            {
                title:"Teknologi dan Budaya Digital",
                source:"INFORMATIKA/Kelas X/Teknologi dan Budaya Digital.pdf",
                summary:"Membahas komponen sistem komputer (hardware, software, brainware), pemanfaatan aplikasi perkantoran secara integratif, serta etika dan budaya kerja baru di era transformasi digital.",
                keywords:["Sistem Komputer", "Software Perkantoran", "Budaya Digital", "Sertifikasi"],
                formula:["Sistem Komputer = Hardware + Software + Brainware"],
                steps:["Pahami fungsi masing-masing komponen komputer.", "Gunakan integrasi aplikasi perkantoran (misal: Mail Merge).", "Terapkan etika komunikasi digital yang baik.", "Kenali peluang karier dan sertifikasi IT yang relevan."],
                example:"Mengintegrasikan data tabel dari Excel ke dalam dokumen Word menggunakan fitur Mail Merge untuk membuat surat massal secara otomatis.",
                activity:"Buat daftar 3 aturan penting etika berkomunikasi di grup chat sekolah agar tidak menyinggung anggota lain."
            },
            {
                title:"Keamanan dan Manajemen Informasi",
                source:"INFORMATIKA/Kelas X/Keamananan dan Manajemen Informasi.pdf",
                summary:"Membahas dasar-dasar jaringan komputer, cara kerja internet, proteksi data pribadi di ruang digital, serta langkah-langkah meningkatkan keamanan informasi personal.",
                keywords:["Jaringan Komputer", "Internet", "Proteksi Data", "Keamanan Informasi"],
                formula:["IP Address = Identitas Perangkat", "Enkripsi = Pengamanan Data"],
                steps:["Pahami perbedaan jaringan lokal (LAN) dan internet (WAN).", "Gunakan kata sandi yang kuat dan unik.", "Aktifkan autentikasi dua faktor (2FA).", "Hindari mengklik tautan mencurigakan (phishing)."],
                example:"Mengaktifkan Two-Factor Authentication (2FA) di akun Google atau media sosial untuk mencegah akses ilegal meskipun kata sandi bocor.",
                activity:"Buat rancangan kata sandi yang kuat menggunakan kombinasi huruf besar-kecil, angka, dan simbol khusus."
            }
        ],
        "11":[
            {
                title:"Informasi Digital",
                source:"INFORMATIKA/Kelas XI/Informasi Digital.pdf",
                summary:"Membahas teknik penelusuran informasi digital tingkat lanjut untuk riset, metode evaluasi informasi menggunakan teknik membaca lateral (lateral reading), serta aspek hukum teknologi informasi (UU ITE).",
                keywords:["Riset Digital", "Membaca Lateral", "Kredibilitas Konten", "UU ITE"],
                formula:["Membaca Lateral = Cek Tab Baru + Bandingkan Sumber", "Kredibilitas = Otoritas Penulis + Bukti + Objektivitas"],
                steps:["Gunakan mesin pencari dengan operator pencarian spesifik.", "Lakukan membaca lateral: buka tab baru untuk meneliti reputasi situs.", "Evaluasi keaslian konten gambar/video dengan reverse image search.", "Pahami konsekuensi hukum penyebaran info sesuai UU ITE."],
                example:"Melakukan verifikasi foto berita menggunakan Google Lens (Reverse Image Search) untuk memeriksa apakah foto tersebut asli atau hasil manipulasi.",
                activity:"Cari satu artikel berita kontroversial, lalu temukan minimal 3 sumber independen lain yang membahas atau mengklarifikasi kebenaran artikel tersebut."
            },
            {
                title:"Analisis Data",
                source:"INFORMATIKA/Kelas XI/Analisis Data.pdf",
                summary:"Mempelajari siklus analisis data mulai dari pengumpulan, pembersihan, pengolahan, hingga visualisasi data menggunakan alat bantu spreadsheet atau pemrograman untuk mendukung pengambilan keputusan.",
                keywords:["Analisis Data", "Data Terbuka", "Spreadsheet", "Visualisasi"],
                formula:["Data Mentah -> Pembersihan -> Analisis -> Visualisasi", "Akurasi = Data Valid / Total Data"],
                steps:["Tentukan tujuan atau pertanyaan analisis.", "Kumpulkan data dari sumber terbuka dan legal.", "Lakukan pembersihan data dari nilai kosong atau duplikat.", "Olah data menggunakan rumus statistik atau pivot table.", "Buat grafik/visualisasi untuk mempermudah pembacaan data."],
                example:"Mengolah data nilai ujian kelas menggunakan rumus AVERAGE, MEDIAN, dan STDEV di Excel, lalu menyajikannya dalam bentuk histogram.",
                activity:"Kumpulkan data waktu belajar harianmu selama seminggu, hitung rata-ratanya, dan buat grafik garis sederhana menggunakan kertas atau aplikasi."
            },
            {
                title:"Strategi Algoritmik, Desain Struktur Data, dan Analisis Solusi",
                source:"INFORMATIKA/Kelas XI/Strategi Algoritmik, Desain Struktur Data, dan Analisis Solusi.pdf",
                summary:"Mendalami strategi perancangan algoritma yang efisien menggunakan teknik Rekursi, Algoritma Greedy, dan Pemrograman Dinamis, serta struktur data lanjut seperti Array multi-dimensi dan String.",
                keywords:["Rekursi", "Algoritma Greedy", "Dynamic Programming", "Struktur Data"],
                formula:["Rekursi: f(n) = f(n-1) + f(n-2)", "Greedy = Memilih opsi lokal terbaik di setiap langkah"],
                steps:["Pahami struktur dasar masalah dan cari sub-masalahnya.", "Pilih strategi algoritmik yang paling sesuai (Greedy atau Dinamis).", "Rancang struktur data penampung (misal: array atau list).", "Tulis fungsi rekursif dengan mendefinisikan base case agar tidak loop tanpa henti.", "Analisis efisiensi solusi (kompleksitas)."],
                example:"Menyelesaikan masalah pecahan uang kembalian menggunakan Algoritma Greedy: selalu pilih nominal koin terbesar yang muat.",
                activity:"Tulis deret Fibonacci hingga suku ke-8 secara manual, lalu identifikasi pola pengulangan (sub-masalah) yang terjadi."
            },
            {
                title:"Berpikir Komputasional dan Implementasi Algoritma",
                source:"INFORMATIKA/Kelas XI/Pengembangan Kemampuan Berpikir Komputasional dan Implementasi Algoritma.pdf",
                summary:"Menerapkan pemikiran komputasional untuk memecahkan simulasi sains dan matematika, serta belajar merancang aplikasi mobile dan kecerdasan buatan (AI) sederhana menggunakan MIT App Inventor.",
                keywords:["Simulasi", "App Inventor", "Aplikasi Mobile", "Kecerdasan Buatan"],
                formula:["Simulasi = Model Matematika + Iterasi Komputer", "AI = Input Sensor/Data -> Model Kognitif -> Aksi"],
                steps:["Pahami fenomena atau problem dunia nyata yang akan disimulasikan.", "Rancang antarmuka aplikasi di desainer App Inventor.", "Susun logika program menggunakan blok kode (blocks).", "Integrasikan komponen sensor atau ekstensi AI.", "Uji coba aplikasi langsung di smartphone."],
                example:"Membuat aplikasi pendeteksi emosi wajah menggunakan MIT App Inventor yang terhubung ke ekstensi Machine Learning.",
                activity:"Rancang rancangan kasar (wireframe) aplikasi mobile impianmu di atas selembar kertas lengkap dengan tombol dan fungsinya."
            },
            {
                title:"Merancang Jaringan Komputer dan Keamanan",
                source:"INFORMATIKA/Kelas XI/Merancang Jaringan Komputer dan Konfigurasi Keamanannya.pdf",
                summary:"Mempelajari konsep perancangan jaringan komputer melalui berbagai topologi, model OSI & TCP/IP, media transmisi kabel & nirkabel, instalasi kabel UTP, serta dasar-dasar pengamanan jaringan.",
                keywords:["Topologi Jaringan", "OSI Layer", "Kabel UTP", "Keamanan Jaringan"],
                formula:["Urutan Kabel Straight = Putih-Orange, Orange, Putih-Hijau, Biru, Putih-Biru, Hijau, Putih-Cokelat, Cokelat"],
                steps:["Pilih topologi jaringan (Star, Mesh, dll) yang paling efisien.", "Siapkan perangkat keras (Router, Switch, kabel UTP).", "Lakukan crimping kabel UTP tipe Straight atau Crossover.", "Konfigurasikan IP address pada masing-masing perangkat.", "Setel firewall dan kata sandi keamanan jaringan."],
                example:"Menggunakan topologi Star untuk lab komputer sekolah karena kerusakan pada satu komputer tidak akan mengganggu komputer lainnya.",
                activity:"Urutkan warna kabel UTP standar T568B (Straight-Through) dan jelaskan kegunaan masing-masing pin."
            }
        ],
        "12":[
            {
                title:"Informatika Sekarang dan Masa Depan",
                source:"INFORMATIKA/Kelas XII/Informatika_BS_KLS_XII.pdf",
                summary:"Menjelajahi tren teknologi terkini di era Revolusi Industri 4.0 seperti Internet of Things (IoT), Big Data, Artificial Intelligence (AI), Cloud Computing, serta pentingnya literasi digital.",
                keywords:["Industri 4.0", "IoT", "Big Data", "Artificial Intelligence", "Cloud Computing"],
                formula:["IoT = Sensor + Konektivitas + Pengolah Data", "AI = Data + Algoritma Pembelajaran"],
                steps:["Pahami pilar-pilar utama Revolusi Industri 4.0.", "Kenali cara kerja perangkat IoT yang terhubung ke internet.", "Pelajari bagaimana Big Data diolah untuk analisis prediktif.", "Gunakan teknologi Cloud Computing untuk kolaborasi data."],
                example:"Smart Home system yang menyalakan lampu otomatis saat mendeteksi kehadiran orang merupakan aplikasi nyata dari IoT.",
                activity:"Identifikasi 3 perangkat pintar di sekitarmu yang tergolong dalam Internet of Things (IoT) dan jelaskan fungsinya."
            },
            {
                title:"Sistem Komputer dan Single Board Controller",
                source:"INFORMATIKA/Kelas XII/Informatika_BS_KLS_XII.pdf",
                summary:"Mempelajari arsitektur sistem komputer mini melalui pengenalan Single Board Computer (SBC) dan Single Board Controller (SBC/Arduino), instalasi IDE, simulator, dan komponen penunjangnya.",
                keywords:["SBC", "Arduino", "IDE Arduino", "Simulator", "UnoArduSim"],
                formula:["V = I x R (Hukum Ohm untuk rangkaian sensor)", "Arduino Pinout = Input/Output Digital & Analog"],
                steps:["Pahami perbedaan Single Board Computer (misal: Raspberry Pi) dan Single Board Controller (misal: Arduino).", "Instal Arduino IDE di komputer.", "Pelajari pinout Arduino Uno (Digital, Analog, VCC, GND).", "Siapkan komponen penunjang (LED, Resistor, Breadboard).", "Gunakan simulator (UnoArduSim) untuk menguji rangkaian sebelum merakit fisik."],
                example:"Menggunakan papan Arduino Uno sebagai pengendali utama untuk membaca data dari sensor suhu dan menampilkan hasilnya di LCD.",
                activity:"Buka skema pin Arduino Uno, tunjukkan mana pin analog input dan mana pin digital output, lalu catat nomor-nomor pin tersebut."
            },
            {
                title:"Berpikir Komputasional dan Pemrograman Arduino",
                source:"INFORMATIKA/Kelas XII/Informatika_BS_KLS_XII.pdf",
                summary:"Menerapkan teknik berpikir komputasional untuk perancangan algoritma logika kontrol. Mempelajari sintaks dasar bahasa C untuk Arduino termasuk variabel, operator, percabangan, perulangan, array, dan fungsi I/O pin.",
                keywords:["Bahasa C", "Sintaks Arduino", "Digital I/O", "Analog I/O"],
                formula:["setup() = Dijalankan sekali saat awal", "loop() = Dijalankan terus menerus berulang", "pinMode(pin, INPUT/OUTPUT)"],
                steps:["Rancang logika kontrol menggunakan flowchart.", "Tulis struktur program Arduino dasar dengan fungsi void setup() dan void loop().", "Konfigurasikan mode pin menggunakan pinMode().", "Tulis atau baca nilai pin menggunakan digitalWrite() / digitalRead() / analogRead().", "Gunakan serial monitor (Serial.print) untuk debugging program."],
                example:"Program berkedip (Blink): digitalWrite(13, HIGH); delay(1000); digitalWrite(13, LOW); delay(1000);",
                activity:"Tulis kode program Arduino sederhana untuk menghidupkan LED pada pin 13 jika tombol pada pin 2 ditekan."
            },
            {
                title:"Jaringan Komputer dan Cyber Security",
                source:"INFORMATIKA/Kelas XII/Informatika_BS_KLS_XII.pdf",
                summary:"Mendalami arsitektur teknis jaringan komputer (OSI Layer, TCP/IP Layer), mekanisme komunikasi data, serta aspek keamanan siber (cyber security) untuk melindungi database dan sistem jaringan dari ancaman luar.",
                keywords:["OSI Layer", "TCP/IP", "Cyber Security", "Database Security"],
                formula:["OSI 7 Layers = Application, Presentation, Session, Transport, Network, Data Link, Physical", "TCP/IP 4 Layers = Application, Transport, Internet, Network Access"],
                steps:["Pahami alur pembungkusan data (enkapsulasi) melalui lapisan OSI.", "Identifikasi potensi ancaman siber (malware, DDoS, SQL Injection).", "Terapkan metode keamanan siber seperti enkripsi database.", "Konfigurasikan pembatasan hak akses (access control) pada server.", "Lakukan audit dan monitoring jaringan secara berkala."],
                example:"Menggunakan enkripsi hashing (seperti bcrypt) untuk menyimpan kata sandi pengguna di database guna meminimalkan risiko kebocoran data.",
                activity:"Urutkan ke-7 lapisan OSI dari yang paling dekat dengan pengguna (Application) hingga media transmisi fisik (Physical)."
            },
            {
                title:"Dampak Sosial Informatika dan UU ITE",
                source:"INFORMATIKA/Kelas XII/Informatika_BS_KLS_XII.pdf",
                summary:"Menganalisis peran dan dampak positif/negatif teknologi digital pada bidang sosial, pendidikan, ekonomi, serta mempelajari aturan hukum internet yang tertuang dalam Undang-Undang Informasi dan Transaksi Elektronik (UU ITE).",
                keywords:["Dampak Sosial", "Media Sosial", "Ekonomi Digital", "UU ITE"],
                formula:["Bijak Digital = Saring Sebelum Sharing", "UU ITE Pasal 27-29 = Pembatasan Hukum Konten Negatif"],
                steps:["Pahami dampak positif dan negatif media sosial di masyarakat.", "Gunakan platform digital secara bijak, kreatif, dan produktif.", "Pelajari hak dan kewajiban hukum dalam UU ITE.", "Hindari menyebarkan berita bohong, ujaran kebencian, atau melanggar hak cipta."],
                example:"Menghindari penyebaran informasi tanpa verifikasi yang dapat memicu ujaran kebencian (SARA) karena melanggar Pasal 28 UU ITE.",
                activity:"Diskusikan sebuah studi kasus mengenai penyebaran berita bohong (hoaks) di media sosial dan tentukan pasal UU ITE mana yang dilanggar."
            }
        ]
    }
};

MATERIALS.bahasainggris = {
    label:"Bahasa Inggris",
    icon:"fa-solid fa-language",
    color:"english",
    classes:{
        "10":[
            {
                title:"Procedure Text",
                source:"BAHASA INGGRIS/Kelas X/Procedure Text.docx",
                summary:"Teks yang menjelaskan langkah-langkah untuk melakukan, membuat, atau menggunakan sesuatu melalui serangkaian instruksi terstruktur.",
                keywords:["Procedure", "Steps", "Imperative", "Goal"],
                formula:["Goal + Materials + Steps", "Simple Present Tense"],
                steps:["Tentukan tujuan teks (Goal) dengan jelas.", "Tuliskan alat dan bahan yang dibutuhkan (Materials).", "Susun langkah secara kronologis menggunakan transition words (first, then, finally).", "Gunakan kalimat perintah (imperative sentences)."],
                example:"How to Make a Cup of Tea: Boil water, pour it into a cup, add tea bag, and stir.",
                activity:"Tulis 3 langkah sederhana cara menyalakan laptop dalam Bahasa Inggris."
            },
            {
                title:"Descriptive Text",
                source:"BAHASA INGGRIS/Kelas X/Descriptive Text.docx",
                summary:"Teks yang digunakan untuk menggambarkan ciri fisik, sifat, atau karakter dari seseorang, tempat, atau benda secara rinci agar pembaca dapat membayangkannya.",
                keywords:["Describe", "Adjectives", "Identification", "Description"],
                formula:["Identification + Description", "Simple Present Tense"],
                steps:["Kenalkan objek yang akan digambarkan (Identification).", "Tulis rincian fisik, perilaku, atau kualitas objek menggunakan kata sifat (Description).", "Pastikan penggunaan Simple Present Tense yang konsisten."],
                example:"My school is clean. It has a large garden and bright classrooms.",
                activity:"Deskripsikan hewan peliharaan atau benda favoritmu menggunakan 3 kata sifat dalam Bahasa Inggris."
            },
            {
                title:"Asking and Giving Permission",
                source:"BAHASA INGGRIS/Kelas X/Asking_Giving Permission.docx",
                summary:"Mempelajari cara meminta dan memberikan izin secara sopan dalam kehidupan sehari-hari baik dalam situasi formal maupun informal.",
                keywords:["Permission", "Politeness", "Modal Verbs", "Socializing"],
                formula:["Asking: May I / Can I / Could I + Verb 1?", "Giving: Sure / Of course / Go ahead"],
                steps:["Tentukan tingkat formalitas situasi.", "Gunakan 'Can' untuk teman sebaya dan 'May' atau 'Could' untuk orang yang lebih tua/dihormati.", "Berikan respon persetujuan secara ramah."],
                example:"May I borrow your book? -> Of course, you can.",
                activity:"Tulis kalimat meminta izin meminjam pulpen kepada gurumu dengan sopan."
            },
            {
                title:"Narrative Text",
                source:"BAHASA INGGRIS/Kelas X/Narative Text.docx",
                summary:"Teks cerita fiksi atau nyata yang disusun secara kronologis untuk menghibur pembaca dan menyampaikan pesan moral (moral value).",
                keywords:["Narrative", "Orientation", "Complication", "Resolution"],
                formula:["Orientation + Complication + Resolution", "Simple Past Tense"],
                steps:["Perkenalkan tokoh, latar tempat, dan waktu cerita (Orientation).", "Tunjukkan munculnya masalah atau konflik utama (Complication).", "Selesaikan masalah yang terjadi (Resolution).", "Tarik simpulan nilai moral dari cerita tersebut."],
                example:"Once upon a time, a kind princess lived in a peaceful kingdom until a dragon attacked.",
                activity:"Tuliskan satu kalimat amanat moral yang bisa diambil dari dongeng Malin Kundang."
            },
            {
                title:"Expressing Regret, Apology, and Sympathy",
                source:"BAHASA INGGRIS/Kelas X/Expressing Regret, Apology, Sympathy.docx",
                summary:"Mempelajari ungkapan untuk menyampaikan penyesalan atas suatu peristiwa, meminta maaf atas kesalahan, serta menunjukkan rasa empati/simpati atas kemalangan orang lain.",
                keywords:["Regret", "Apology", "Sympathy", "Empathy"],
                formula:["Apology: I'm sorry for...", "Sympathy: I'm sorry to hear that", "Regret: I wish I had..."],
                steps:["Pahami kondisi atau perasaan lawan bicara.", "Pilih ungkapan penyesalan, maaf, atau simpati yang sesuai.", "Tunjukkan ekspresi wajah dan intonasi suara yang tulus."],
                example:"I'm deeply sorry for being late. I'm sorry to hear about your lost file.",
                activity:"Tulis kalimat simpati untuk temanmu yang sedang sakit dalam Bahasa Inggris."
            }
        ],
        "11":[
            {
                title:"Analytical Exposition Text",
                source:"BAHASA INGGRIS/Kelas XI/Analytical Exposition Text.docx",
                summary:"Teks argumentatif yang mengulas suatu isu sosial hangat secara mendalam dan meyakinkan pembaca bahwa topik tersebut penting untuk dibahas.",
                keywords:["Arguments", "Thesis", "Reiteration", "Persuasion"],
                formula:["Thesis + Arguments + Reiteration", "Simple Present Tense"],
                steps:["Sampaikan sudut pandang utama penulis tentang isu terkait (Thesis).", "Sajikan argumen penjelas yang didukung fakta konkret (Arguments).", "Tegaskan kembali kesimpulan di akhir paragraf (Reiteration)."],
                example:"Why We Should Reduce Plastic Use: Plastic harms marine life, pollutes soil, and takes years to decompose.",
                activity:"Tuliskan 1 argumen singkat mengapa kita harus rajin mencuci tangan."
            },
            {
                title:"Hortatory Exposition Text",
                source:"BAHASA INGGRIS/Kelas XI/Hortatory Exposition Text.docx",
                summary:"Teks persuasif yang memaparkan argumen ilmiah mengenai suatu permasalahan dan diakhiri dengan rekomendasi saran tindakan bagi pembaca.",
                keywords:["Arguments", "Persuasion", "Recommendation", "Should/Must"],
                formula:["Thesis + Arguments + Recommendation", "Simple Present Tense + Modals"],
                steps:["Perkenalkan topik atau fenomena (Thesis).", "Ulas faktor-faktor penyebab dan dampaknya secara logis (Arguments).", "Berikan rekomendasi tindakan nyata yang harus dilakukan (Recommendation)."],
                example:"Students Should Exercise Regularly: Exercise keeps the body fit. Therefore, students should walk or jog daily.",
                activity:"Tulis kalimat rekomendasi untuk membujuk orang lain agar menghemat air."
            },
            {
                title:"Cause and Effect",
                source:"BAHASA INGGRIS/Kelas XI/Cause and Effect.docx",
                summary:"Mempelajari hubungan logis sebab-akibat dari suatu peristiwa menggunakan kata penghubung (connectors) yang tepat.",
                keywords:["Cause", "Effect", "Connectors", "Because/So"],
                formula:["Cause + Connector (so/as a result) + Effect", "Connector (because of/due to) + Noun Phrase"],
                steps:["Tentukan tindakan pemicu (Cause).", "Tentukan konsekuensi yang ditimbulkan (Effect).", "Hubungkan keduanya menggunakan konjungsi sebab-akibat."],
                example:"The code had a major error; as a result, the program crashed.",
                activity:"Hubungkan kalimat 'He studied hard' dan 'He passed the exam' menggunakan kata 'so'."
            },
            {
                title:"Comparison and Contrast",
                source:"BAHASA INGGRIS/Kelas XI/Comparison and Contrast.docx",
                summary:"Mengajarkan cara membandingkan kesamaan (comparison) dan perbedaan (contrast) antara dua hal secara berimbang dan objektif.",
                keywords:["Compare", "Contrast", "Similarity", "Difference"],
                formula:["Similarity: both / similarly / like", "Difference: while / on the other hand / however"],
                steps:["Pilih dua objek atau konsep yang sepadan untuk dibandingkan.", "Urai persamaan dan perbedaannya secara berurutan.", "Gunakan kata hubung komparatif agar struktur kalimat rapi."],
                example:"Desktop PCs provide high processing power; on the other hand, laptops offer portability.",
                activity:"Tulis kalimat perbandingan singkat antara sepeda motor dan mobil."
            },
            {
                title:"Explanation Text",
                source:"BAHASA INGGRIS/Kelas XI/Explanation Text.docx",
                summary:"Teks ilmiah yang menjelaskan secara berurutan bagaimana atau mengapa suatu fenomena alam, sosial, atau teknologi dapat terjadi.",
                keywords:["Process", "Phenomenon", "Chronological", "Passive Voice"],
                formula:["General Statement + Sequenced Explanation", "Passive Voice & Technical Terms"],
                steps:["Kenalkan fenomena yang akan dijelaskan (General Statement).", "Uraikan rangkaian proses kejadian dari awal hingga akhir secara kronologis.", "Gunakan kalimat pasif (Passive Voice) dan istilah teknis pendukung."],
                example:"How a Rainbow is Formed: Sun light passes through raindrops, gets refracted, and splits into colors.",
                activity:"Sebutkan 3 kata transisi penunjuk waktu (sequence connectors) yang biasa digunakan dalam Explanation Text."
            }
        ],
        "12":[
            {
                title:"Procedure Text",
                source:"BAHASA INGGRIS/Kelas XII/Procedure Text.docx",
                summary:"Penyusunan panduan operasional teknis tingkat lanjut untuk pengoperasian sistem, peralatan, atau perangkat lunak secara aman dan akurat.",
                keywords:["Technical Manual", "Steps", "Imperative Command", "Structure"],
                formula:["Technical Goal + Equipment + Operational Steps"],
                steps:["Tentukan tujuan operasional dengan spesifik.", "Tuliskan langkah demi langkah instruksi kerja menggunakan kalimat perintah.", "Tambahkan tips keselamatan kerja atau peringatan penting."],
                example:"First, insert the cable properly, then switch on the main power.",
                activity:"Buatlah 2 langkah perintah cara menyimpan file di komputer dalam Bahasa Inggris."
            },
            {
                title:"Descriptive Text",
                source:"BAHASA INGGRIS/Kelas XII/Descriptive Text.docx",
                summary:"Menggambarkan spesifikasi teknis, tata letak spasial, atau arsitektur fisik perangkat modern dengan kosakata teknis yang presisi.",
                keywords:["Technical Description", "Adjectives", "Spatial Mapping", "Details"],
                formula:["Identification + Detailed Technical Description"],
                steps:["Pilih objek teknologi atau arsitektur modern.", "Urai bagian-bagian, ukuran, material, dan spesifikasinya.", "Gunakan pengarah spasial (on the left, at the bottom, dll) untuk mendeskripsikan letak."],
                example:"This equipment features a solid metallic surface and a compact design.",
                activity:"Tulis deskripsi singkat mengenai bentuk fisik mouse komputer dalam Bahasa Inggris."
            },
            {
                title:"Asking and Giving Permission",
                source:"BAHASA INGGRIS/Kelas XII/Asking and Giving Permission.docx",
                summary:"Penggunaan ungkapan meminta dan memberi izin secara formal di lingkungan akademis profesional untuk menjaga jarak kesopanan sosial.",
                keywords:["Formal Permission", "Professional Distance", "Polite Request", "Modals"],
                formula:["Asking: Would you mind if I + Past Tense Verb?", "Giving: Go ahead / No, not at all"],
                steps:["Identifikasi status sosial atau profesional lawan bicara.", "Gunakan struktur permohonan izin tingkat lanjut yang sopan.", "Ucapkan permohonan dengan tenang dan intonasi formal."],
                example:"Would you mind if I adjusted the environment settings on this terminal, Sir?",
                activity:"Tulis kalimat formal meminta izin kepada atasan untuk menggunakan ruang rapat."
            },
            {
                title:"Narrative Text",
                source:"BAHASA INGGRIS/Kelas XII/Narrative Text.docx",
                summary:"Menganalisis perkembangan emosi karakter, alur konflik kompleks (klimaks), serta merumuskan pesan moral dalam teks naratif sastra tingkat lanjut.",
                keywords:["Plot Shift", "Climax", "Resolution", "Moral Lesson"],
                formula:["Complex Orientation + Climax + Dynamic Resolution"],
                steps:["Bangun latar cerita dan konflik internal tokoh.", "Rancang titik balik utama cerita (Climax).", "Selesaikan konflik dengan resolusi yang menunjukkan perubahan karakter."],
                example:"The young traveler achieved his goal; however, he realized that he had lost everything in the process.",
                activity:"Tulis satu kalimat moral tentang bahaya keserakahan manusia berdasarkan dongeng yang kamu ketahui."
            },
            {
                title:"Expressing Regret, Apology, and Sympathy",
                source:"BAHASA INGGRIS/Kelas XII/Expressing Regret, Apology, and Sympathy.docx",
                summary:"Menyampaikan ungkapan penyesalan profesional atas kegagalan sistem, permintaan maaf formal, serta rasa simpati empati mendalam dalam relasi kerja.",
                keywords:["Regret Reflex", "Apology", "Professional Sympathy", "Formal Empathy"],
                formula:["Regret: I deeply regret that I...", "Formal Apology: Please accept my sincere apologies for..."],
                steps:["Sebutkan kesalahan teknis atau kejadian malang yang dialami.", "Nyatakan permintaan maaf/penyesalan secara profesional tanpa alasan pembelaan.", "Tawarkan solusi pemulihan situasi secara nyata."],
                example:"I deeply regret that I did not back up the project database yesterday.",
                activity:"Tulis pesan minta maaf singkat karena terlambat mengumpulkan laporan projek."
            }
        ]
    }
};

function enrichLessonBank(){
    addLessons("fisika", "10", [
        {
            title:"Momentum, Impuls, Getaran, dan Gelombang",
            source:"FISIKA/Kelas X/BAB 4/Bagian 4.docx",
            summary:"Materi membahas momentum sebagai ukuran kesukaran menghentikan benda bergerak, impuls sebagai hasil kali gaya dan selang waktu, serta hubungan impuls dengan perubahan momentum. Bagian akhir mengenalkan getaran harmonis dan gelombang dasar.",
            keywords:["Momentum", "Impuls", "Tumbukan", "Gelombang"],
            formula:["p = m v", "I = F delta t", "I = delta p", "F delta t = m(v2 - v1)"],
            steps:["Tentukan massa dan kecepatan benda.", "Hitung momentum awal dan akhir.", "Gunakan perubahan momentum untuk impuls.", "Perhatikan arah karena momentum dan impuls adalah vektor."],
            example:"Truk dan sepeda dengan kecepatan sama tidak sama mudah dihentikan karena massa truk jauh lebih besar, sehingga momentumnya lebih besar.",
            activity:"Dorong bola ringan dan benda lebih berat dengan gaya mirip. Amati benda mana yang lebih sulit dihentikan.",
            details:["Momentum searah dengan kecepatan benda.", "Impuls sering muncul pada kontak singkat seperti pukulan, tendangan, atau tabrakan.", "Memperbesar waktu kontak dapat memperkecil gaya rata-rata pada tumbukan."]
        },
        {
            title:"Gravitasi, Tata Surya, Radioaktivitas, dan Pemanasan Global",
            source:"FISIKA/Kelas X/BAB 5/Bagian 5.docx",
            summary:"Materi memuat hukum gravitasi Newton, medan gravitasi, hukum Kepler, konsep tata surya, radioaktivitas, dan isu pemanasan global sebagai aplikasi fisika dalam lingkungan.",
            keywords:["Gravitasi", "Kepler", "Tata surya", "Pemanasan global"],
            formula:["F = G m1 m2 / r^2", "g = G M / r^2"],
            steps:["Identifikasi massa benda dan jaraknya.", "Gunakan hukum gravitasi untuk gaya tarik.", "Gunakan medan gravitasi untuk percepatan gravitasi.", "Hubungkan konsep dengan orbit planet atau fenomena bumi."],
            example:"Percepatan gravitasi di kutub sedikit lebih besar daripada di khatulistiwa karena jarak ke pusat Bumi berbeda.",
            activity:"Bandingkan berat benda yang sama di Bumi dan Bulan melalui simulasi nilai gravitasi.",
            details:["Gaya gravitasi berlaku universal pada semua benda bermassa.", "Hukum Kepler menjelaskan gerak planet mengorbit Matahari.", "Fisika juga dipakai untuk memahami masalah lingkungan seperti pemanasan global."]
        }
    ]);

    addLessons("fisika", "11", [
        {
            title:"Gelombang Mekanik dan Gelombang Bunyi",
            source:"FISIKA/Kelas XI/BAB 4/Bagian 4.docx",
            summary:"Gelombang mekanik memerlukan medium untuk merambat, seperti tali, air, dan bunyi. Materi juga menjelaskan gelombang transversal, longitudinal, gelombang berjalan, serta hubungan cepat rambat, frekuensi, periode, dan panjang gelombang.",
            keywords:["Gelombang mekanik", "Transversal", "Longitudinal", "Bunyi"],
            formula:["v = lambda f", "v = lambda / T", "f = 1 / T", "y = A sin(omega t +/- kx)"],
            steps:["Tentukan jenis gelombang.", "Catat frekuensi atau periode.", "Gunakan hubungan v, lambda, dan f.", "Perhatikan arah rambat untuk persamaan gelombang."],
            example:"Bunyi termasuk gelombang longitudinal karena arah getarnya sejajar dengan arah rambat.",
            activity:"Gunakan slinki atau tali untuk membedakan gelombang transversal dan longitudinal.",
            details:["Gelombang mekanik tidak dapat merambat tanpa medium.", "Gelombang transversal memiliki bukit dan lembah.", "Gelombang longitudinal memiliki rapatan dan renggangan."]
        },
        {
            title:"Optika Fisis dan Alat Optik",
            source:"FISIKA/Kelas XI/BAB 5/Bagian 5.docx",
            summary:"Materi membahas cahaya sebagai gelombang elektromagnetik transversal serta gejala interferensi, difraksi, polarisasi, dan penerapannya pada alat optik.",
            keywords:["Interferensi", "Difraksi", "Polarisasi", "Alat optik"],
            formula:["d sin theta = n lambda", "d p / L = n lambda", "Pola gelap = (n - 1/2) lambda"],
            steps:["Kenali gejala cahaya yang terjadi.", "Tentukan apakah pola terang atau gelap.", "Pilih rumus interferensi atau difraksi.", "Substitusikan jarak celah, layar, dan panjang gelombang."],
            example:"Warna-warni pada gelembung sabun muncul karena interferensi pada lapisan tipis.",
            activity:"Amati pantulan warna pada lapisan minyak tipis di air dan kaitkan dengan interferensi.",
            details:["Interferensi adalah perpaduan gelombang cahaya koheren.", "Difraksi adalah pelenturan cahaya melalui celah sempit.", "Polarisasi menunjukkan cahaya sebagai gelombang transversal."]
        }
    ]);

    addLessons("fisika", "12", [
        {
            title:"Kemagnetan dan Induksi Elektromagnetik",
            source:"FISIKA/Kelas XII/BAB 3/Bagian 3.docx",
            summary:"Materi membahas medan magnet di sekitar magnet atau kawat berarus, kaidah tangan kanan, induksi magnetik, gaya Lorentz, serta dasar induksi elektromagnetik.",
            keywords:["Medan magnet", "Induksi", "Lorentz", "Kaidah tangan kanan"],
            formula:["B = mu0 I / (2 pi a)", "B = mu0 I N / (2a)", "F = B I L sin theta"],
            steps:["Tentukan bentuk penghantar: lurus, melingkar, atau solenoida.", "Gunakan kaidah tangan kanan untuk arah medan.", "Hitung besar induksi magnetik.", "Jika ada gaya, tentukan arah gaya Lorentz."],
            example:"Di sekitar kawat berarus terdapat medan magnet melingkar yang arahnya dapat ditentukan dengan ibu jari dan empat jari tangan kanan.",
            activity:"Gambar kawat lurus berarus ke atas, lalu tentukan arah medan magnet di sisi kiri dan kanan kawat.",
            details:["Medan magnet digambarkan dengan garis gaya magnet.", "Arus listrik dapat menghasilkan medan magnet.", "Muatan bergerak dalam medan magnet dapat mengalami gaya Lorentz."]
        },
        {
            title:"Gelombang Elektromagnetik dan Teknologi Digital",
            source:"FISIKA/Kelas XII/BAB 4/Bagian 4.docx",
            summary:"Gelombang elektromagnetik dapat merambat tanpa medium karena osilasi medan listrik dan medan magnet. Materi juga membahas sifat gelombang elektromagnetik, spektrum, energi foton, dan kaitannya dengan teknologi digital.",
            keywords:["GEM", "Spektrum", "Foton", "Teknologi digital"],
            formula:["c = f lambda", "E = h f", "E = h c / lambda"],
            steps:["Tentukan frekuensi atau panjang gelombang.", "Gunakan c = f lambda untuk hubungan gelombang.", "Gunakan E = h f untuk energi foton.", "Hubungkan posisi spektrum dengan penerapannya."],
            example:"Gelombang radio, cahaya tampak, sinar-X, dan gamma berada dalam satu keluarga spektrum elektromagnetik.",
            activity:"Urutkan radio, inframerah, cahaya tampak, ultraviolet, sinar-X dari frekuensi rendah ke tinggi.",
            details:["Gelombang elektromagnetik bersifat transversal.", "Di ruang hampa, cepat rambatnya sekitar 3 x 10^8 m/s.", "Gelombang elektromagnetik dapat mengalami refleksi, refraksi, interferensi, difraksi, dan polarisasi."]
        },
        {
            title:"Fisika Modern dan Inti Atom",
            source:"FISIKA/Kelas XII/BAB 5/Bagian 5.docx",
            summary:"Materi membahas relativitas khusus Einstein, faktor Lorentz, dilatasi waktu, kontraksi panjang, massa relativistik, kesetaraan massa-energi, dan pengantar inti atom.",
            keywords:["Relativitas", "Lorentz", "Energi massa", "Inti atom"],
            formula:["gamma = 1 / sqrt(1 - v^2/c^2)", "t = gamma t0", "L = L0 / gamma", "E = m c^2"],
            steps:["Bandingkan kecepatan benda dengan kecepatan cahaya.", "Hitung faktor Lorentz.", "Pilih rumus dilatasi waktu atau kontraksi panjang.", "Gunakan E = mc^2 untuk hubungan massa dan energi."],
            example:"Benda yang bergerak mendekati kecepatan cahaya mengalami waktu terukur lebih lambat dari pengamat diam.",
            activity:"Buat tabel nilai v/c: 0,1; 0,5; 0,9 lalu bandingkan perubahan faktor Lorentz.",
            details:["Relativitas khusus berdasar pada kesamaan hukum fisika di kerangka inersial dan konstannya cepat rambat cahaya.", "Efek relativistik baru terasa besar saat kecepatan mendekati c.", "Massa dapat dipandang setara dengan energi."]
        }
    ]);
}

function addLessons(subjectKey, classKey, lessons){
    const subject = MATERIALS[subjectKey];
    if(!subject) return;
    if(!subject.classes[classKey]) subject.classes[classKey] = [];
    subject.classes[classKey].push(...lessons);
}

enrichLessonBank();

function enhanceExistingLessons(){
    updateLesson("Eksponen dan Logaritma", {
        details:[
            "File modul menyebut topik ini terbagi menjadi dua bagian utama: fungsi eksponen dan fungsi logaritma.",
            "Kompetensi yang ditekankan adalah mendeskripsikan, menentukan penyelesaian, dan memakai fungsi eksponen/logaritma dalam masalah kontekstual.",
            "Eksponen memuat konsep perpangkatan, fungsi eksponen, sifat operasi eksponen, dan aplikasinya.",
            "Logaritma dipahami sebagai kebalikan eksponen dan dipakai untuk menyelesaikan bentuk pangkat yang tidak langsung terlihat."
        ]
    });
    updateLesson("Vektor dan Operasinya", {
        details:[
            "Modul mengawali vektor dari pengalaman arah dan jarak pada papan petunjuk jalan.",
            "Vektor selalu memiliki dua informasi: besar dan arah.",
            "Ruang lingkup awal meliputi komponen vektor, notasi vektor, penggambaran vektor, kesamaan vektor, vektor nol, vektor posisi, dan vektor satuan.",
            "Contoh gerak lembing atau anak panah menunjukkan bahwa kecepatan dapat memiliki arah tertentu."
        ]
    });
    updateLesson("Barisan dan Deret", {
        details:[
            "Barisan fokus pada pola urutan bilangan, sedangkan deret fokus pada jumlah dari suku-suku barisan.",
            "Barisan aritmetika memiliki beda tetap antar suku berurutan.",
            "Barisan geometri memiliki rasio tetap antar suku berurutan.",
            "Langkah paling penting adalah mengenali pola sebelum memilih rumus."
        ]
    });
    updateLesson("Fungsi Komposisi dan Invers", {
        details:[
            "File menjelaskan komposisi fungsi sebagai proses bertahap: keluaran fungsi pertama menjadi masukan fungsi berikutnya.",
            "Urutan komposisi penting, seperti proses membuat barang yang melalui tahap pengerjaan dan finishing.",
            "Invers fungsi membalik hubungan input-output dan hanya menjadi fungsi jika syaratnya terpenuhi.",
            "Masalah sehari-hari dapat dimodelkan sebagai fungsi bertahap sehingga cocok dilatih dengan diagram alur."
        ]
    });
    updateLesson("Lingkaran", {
        details:[
            "Materi membuka konsep lingkaran dari benda sehari-hari seperti roda sepeda, gelas, dan botol.",
            "Lingkaran tidak memiliki titik sudut dan semua titik pada kelilingnya berjarak sama dari pusat.",
            "Jari-jari ditarik dari pusat ke lingkaran, sedangkan diameter sama dengan dua kali jari-jari.",
            "Persamaan lingkaran dipakai untuk memodelkan jarak titik-titik yang sama dari sebuah pusat."
        ]
    });
    updateLesson("Statistika", {
        details:[
            "Statistika berhubungan dengan pengumpulan, pengolahan, penganalisisan, dan penarikan kesimpulan dari data.",
            "Data kuantitatif berbentuk bilangan, sedangkan data kualitatif tidak berbentuk bilangan.",
            "Data kuantitatif dapat berupa data diskrit hasil mencacah atau data kontinu hasil mengukur.",
            "Populasi adalah seluruh objek yang diteliti, sedangkan sampel adalah sebagian objek yang mewakili populasi."
        ]
    });
    updateLesson("Besaran, Satuan, dan Pengukuran", {
        details:[
            "File Fisika kelas X BAB 1 memulai dari hakikat fisika sebagai ilmu yang mempelajari alam semesta dan gejalanya.",
            "Fisika penting untuk memahami fenomena alam, menciptakan teknologi, memecahkan masalah kehidupan, dan melatih berpikir logis-kritis.",
            "Hakikat fisika dipandang sebagai produk, proses, dan sikap ilmiah.",
            "Produk fisika meliputi fakta, konsep, prinsip, hukum, dan teori."
        ]
    });
    updateLesson("Gerak Lurus", {
        details:[
            "File BAB 2 membedakan besaran skalar dan vektor.",
            "Besaran skalar hanya memiliki nilai dan satuan, misalnya massa, waktu, suhu, jarak, kelajuan, energi, daya, tekanan, dan massa jenis.",
            "Besaran vektor memiliki nilai sekaligus arah, sehingga perubahan arah memengaruhi maknanya.",
            "Konsep vektor menjadi dasar untuk memahami perpindahan, kecepatan, percepatan, dan gaya."
        ]
    });
    updateLesson("Hukum Newton", {
        details:[
            "File BAB 3 menjelaskan tiga hukum Newton sebagai dasar mekanika klasik.",
            "Hukum I Newton menyatakan benda mempertahankan keadaan diam atau gerak lurus beraturan jika resultan gaya nol.",
            "Hukum II Newton menghubungkan resultan gaya, massa, dan percepatan.",
            "Hukum III Newton menjelaskan pasangan gaya aksi-reaksi yang sama besar dan berlawanan arah."
        ]
    });
}

function updateLesson(title, patch){
    Object.values(MATERIALS).forEach(subject => {
        Object.values(subject.classes).forEach(lessons => {
            lessons.forEach(lesson => {
                if(lesson.title === title) Object.assign(lesson, patch);
            });
        });
    });
}

enhanceExistingLessons();

let currentLessons = [];
let currentLessonIndex = 0;
let currentStyle = "visual";
let currentClass = "10";
let currentSubject = "matematika";

document.addEventListener("DOMContentLoaded", initMaterialPage);

function initMaterialPage(){
    const params = new URLSearchParams(window.location.search);
    currentClass = params.get("kelas") || localStorage.getItem("selectedMaterialClass") || "10";
    currentSubject = params.get("mapel") || "matematika";

    if(currentSubject === "matematika" && currentClass !== "10"){
        currentSubject = "matematika-wajib";
        params.set("mapel", currentSubject);
        params.set("kelas", currentClass);
        window.history.replaceState(null, "", `materi.html?${params.toString()}`);
    }

    if(!MATERIALS[currentSubject]) currentSubject = "matematika";
    localStorage.setItem("selectedMaterialClass", currentClass);

    currentStyle = localStorage.getItem("learningStyle") || "visual";
    if(!LEARNING_STYLES[currentStyle]) currentStyle = "visual";

    const backLink = document.getElementById("lessonBackLink");
    if(backLink) backLink.href = `mapel.html?kelas=${currentClass}`;

    renderMaterialHeader();
    renderLearningStyleSwitch();
    renderLessonList();
    renderLessonContent(0);
}

function renderMaterialHeader(){
    const subject = MATERIALS[currentSubject];
    const lessons = subject.classes[currentClass] || [];
    currentLessons = lessons;

    setText("lessonBreadcrumb", `SMA / Kelas ${currentClass} / ${subject.label}`);
    setText("lessonTitle", `${subject.label} Kelas ${currentClass}`);
    setText("lessonIntro", lessons.length ? `Tersedia ${lessons.length} materi dari folder ${subject.label.toUpperCase()}. Penyampaian mengikuti gaya belajar yang dipilih.` : "Materi kelas ini belum tersedia di folder, pilih kelas lain untuk membuka konten.");
    setText("lessonCount", lessons.length);
}

function renderLearningStyleSwitch(){
    const switcher = document.getElementById("learningStyleSwitch");
    if(!switcher) return;

    switcher.innerHTML = Object.entries(LEARNING_STYLES).map(([key, style]) => `
        <button class="learning-style-btn ${key === currentStyle ? "active" : ""}" type="button" onclick="setMaterialLearningStyle('${key}')">
            <i class="${style.icon}"></i>
            <span>${style.label}</span>
        </button>
    `).join("");
}

function renderLessonList(){
    const list = document.getElementById("lessonList");
    if(!list) return;

    if(!currentLessons.length){
        list.innerHTML = `
            <div class="lesson-empty">
                <i class="fa-regular fa-folder-open"></i>
                <strong>Belum ada materi</strong>
                <span>Coba Kelas 10 atau 11 untuk Matematika, atau Kelas 10-12 untuk Fisika.</span>
            </div>
        `;
        return;
    }

    list.innerHTML = currentLessons.map((lesson, index) => `
        <button class="lesson-list-item ${index === currentLessonIndex ? "active" : ""}" type="button" onclick="renderLessonContent(${index})">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <div>
                <strong>${lesson.title}</strong>
                <small>${lesson.source}</small>
            </div>
        </button>
    `).join("");
}

function renderLessonContent(index){
    currentLessonIndex = index;
    const content = document.getElementById("lessonContent");
    const lesson = currentLessons[index];
    const style = LEARNING_STYLES[currentStyle];

    renderLessonList();

    if(!content) return;
    if(!lesson){
        content.innerHTML = `
            <div class="lesson-empty lesson-empty-large">
                <i class="fa-regular fa-folder-open"></i>
                <h2>Materi belum tersedia</h2>
                <p>Folder untuk kombinasi kelas dan mapel ini belum memiliki materi yang bisa ditampilkan di webapp.</p>
            </div>
        `;
        return;
    }

    content.innerHTML = `
        <div class="lesson-content-top">
            <div class="subject-icon ${MATERIALS[currentSubject].color}">
                <i class="${MATERIALS[currentSubject].icon}"></i>
            </div>
            <div>
                <span class="lesson-eyebrow">${style.label} Mode</span>
                <h2>${lesson.title}</h2>
                <p>${style.hint}</p>
            </div>
        </div>
        ${renderStyleDelivery(lesson, currentStyle)}
        <div class="lesson-source">
            <i class="fa-solid fa-folder-open"></i>
            <span>Sumber folder: ${lesson.source}</span>
        </div>
    `;
}

function renderStyleDelivery(lesson, styleKey){

    if(styleKey === "kinesthetic"){
        return `
            <section class="delivery-block kinesthetic-delivery">
                <h3><i class="fa-solid fa-person-running"></i> Praktik Cepat</h3>
                <p>${lesson.summary}</p>
                <div class="activity-card">
                    <strong>Aktivitas 3 menit</strong>
                    <span>${lesson.activity}</span>
                </div>
                <ol class="lesson-steps">${lesson.steps.map(step => `<li>${step}</li>`).join("")}</ol>
                ${renderDetails(lesson)}
            </section>
        `;
    }

    if(styleKey === "readwrite"){
        return `
            <section class="delivery-block readwrite-delivery">
                <h3><i class="fa-solid fa-pen-nib"></i> Catatan Terstruktur</h3>
                <p>${lesson.summary}</p>
                <div class="note-grid">
                    <div>
                        <strong>Kata Kunci</strong>
                        <ul>${lesson.keywords.map(item => `<li>${item}</li>`).join("")}</ul>
                    </div>
                    <div>
                        <strong>Rumus/Ide Utama</strong>
                        <ul>${lesson.formula.map(item => `<li>${item}</li>`).join("")}</ul>
                    </div>
                </div>
                <p class="lesson-example"><strong>Contoh:</strong> ${lesson.example}</p>
                ${renderDetails(lesson)}
            </section>
        `;
    }

    return `
        <section class="delivery-block visual-delivery">
            <h3><i class="fa-solid fa-diagram-project"></i> Peta Konsep</h3>
            <div class="concept-map">
                ${lesson.keywords.map((keyword, index) => `
                    <div class="concept-node ${index === 0 ? "main" : ""}">
                        <span>${keyword}</span>
                    </div>
                `).join("")}
            </div>
            <p>${lesson.summary}</p>
            ${renderDetails(lesson)}
            <div class="formula-strip">${lesson.formula.map(item => `<span>${item}</span>`).join("")}</div>
            <p class="lesson-example"><strong>Contoh:</strong> ${lesson.example}</p>
        </section>
    `;
}

function renderDetails(lesson){
    if(!lesson.details || !lesson.details.length) return "";
    return `
        <div class="lesson-detail-list">
            ${lesson.details.map(item => `<p><i class="fa-solid fa-circle-check"></i><span>${item}</span></p>`).join("")}
        </div>
    `;
}

function setMaterialLearningStyle(styleKey){
    if(!LEARNING_STYLES[styleKey]) return;
    currentStyle = styleKey;
    localStorage.setItem("learningStyle", styleKey);
    localStorage.setItem("learningStyleLabel", LEARNING_STYLES[styleKey].label);
    renderLearningStyleSwitch();
    renderLessonContent(currentLessonIndex);
}

function setText(id, value){
    const element = document.getElementById(id);
    if(element) element.textContent = value;
}
