/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Modality } from "@google/genai";

// Initialize the Google Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Pustaka Pose 100+ ---
const poseLibrary = [
    { group: 'Kustom', label: 'Tulis Prompt Kustom Sendiri', value: 'custom' },
    { group: 'Aksi & Petualangan', label: 'Pendaratan Superhero', value: 'Superhero landing pose on a rooftop' },
    { group: 'Aksi & Petualangan', label: 'Ahli Bela Diri', value: 'A martial artist in a dynamic fighting stance' },
    { group: 'Aksi & Petualangan', label: 'Pendaki di Puncak', value: 'A mountain climber reaching the summit, victorious' },
    { group: 'Aksi & Petualangan', label: 'Pemanah Fokus', value: 'An archer drawing a bow, aiming at a target' },
    { group: 'Aksi & Petualangan', label: 'Ksatria dengan Pedang', value: 'A knight in shining armor holding a sword' },
    { group: 'Aksi & Petualangan', label: 'Agen Rahasia', value: 'A secret agent in a suit, holding a pistol, in a noir city' },
    { group: 'Aksi & Petualangan', label: 'Prajurit Wanita', value: 'A female warrior with a spear and shield' },
    { group: 'Aksi & Petualangan', label: 'Berlari dari Ledakan', value: 'Running away from an explosion in the background' },
    { group: 'Aksi & Petualangan', label: 'Viking Bersiap Perang', value: 'A viking warrior ready for battle' },
    { group: 'Aksi & Petualangan', label: 'Penjelajah Hutan', value: 'An explorer cutting through jungle foliage with a machete' },
    { group: 'Aksi & Petualangan', label: 'Gladiator di Arena', value: 'A gladiator standing triumphantly in an arena' },
    { group: 'Aksi & Petualangan', label: 'Ninja di Atap', value: 'A ninja crouching on a rooftop at night' },
    { group: 'Aksi & Petualangan', label: 'Pembalap di Garis Start', value: 'A race car driver standing by their car at the starting line' },
    { group: 'Aksi & Petualangan', label: 'Spesialis Parkour', value: 'A parkour specialist leaping between buildings' },
    { group: 'Profesional', label: 'CEO di Meja Kantor', value: 'A CEO leaning confidently on a modern office desk' },
    { group: 'Profesional', label: 'Pembicara di Panggung', value: 'A public speaker commanding the stage with a microphone' },
    { group: 'Profesional', label: 'Dokter Menganalisis', value: 'A doctor looking thoughtfully at a medical chart' },
    { group: 'Profesional', label: 'Ilmuwan di Lab', value: 'A scientist looking into a microscope in a laboratory' },
    { group: 'Profesional', label: 'Pengacara di Ruang Sidang', value: 'A lawyer presenting a case in a courtroom' },
    { group: 'Profesional', label: 'Pemimpin Wanita Percaya Diri', value: 'A confident businesswoman with arms crossed' },
    { group: 'Profesional', label: 'Arsitek dengan Cetak Biru', value: 'An architect holding a blueprint at a construction site' },
    { group: 'Profesional', label: 'Guru di Kelas', value: 'A teacher pointing to a chalkboard in a classroom' },
    { group: 'Profesional', label: 'Insinyur di Pabrik', value: 'An engineer wearing a hard hat in a factory setting' },
    { group: 'Profesional', label: 'Chef di Dapur Restoran', value: 'A chef garnishing a plate in a professional kitchen' },
    { group: 'Profesional', label: 'Pilot di Kokpit', value: 'A pilot sitting in the cockpit of an airplane' },
    { group: 'Profesional', label: 'Jurnalis Meliput', value: 'A journalist holding a microphone reporting from the field' },
    { group: 'Fashion', label: 'Model di Runway', value: 'An elegant fashion model walking on a runway' },
    { group: 'Fashion', label: 'Pose High-Fashion', value: 'A model in a high-fashion, avant-garde pose' },
    { group: 'Fashion', label: 'Model Pria Berjas', value: 'A male model in a sharp suit, looking over his shoulder' },
    { group: 'Fashion', label: 'Gaun Malam Elegan', value: 'A woman in an elegant evening gown on a grand staircase' },
    { group: 'Fashion', label: 'Street Style Urban', value: 'A person in a casual but stylish urban street-style pose' },
    { group: 'Fashion', label: 'Kampanye Parfum', value: 'A dramatic black and white perfume advertisement pose' },
    { group: 'Fashion', label: 'Lookbook Pakaian Olahraga', value: 'A model in a sporty lookbook pose' },
    { group: 'Fashion', label: 'Gaya Bohemian Chic', value: 'A woman in a flowing bohemian dress in a field of wildflowers' },
    { group: 'Fashion', label: 'Editorial Majalah', value: 'A quirky and colorful magazine editorial pose' },
    { group: 'Fashion', label: 'Gaya Vintage 1950-an', value: 'A person dressed in 1950s vintage fashion' },
    { group: 'Fashion', label: 'Pose Musim Dingin', value: 'A model wearing a stylish winter coat in a snowy city' },
    { group: 'Olahraga', label: 'Pelari Garis Finis', value: 'A runner crossing the finish line, victorious' },
    { group: 'Olahraga', label: 'Pemain Basket Dunk', value: 'A basketball player mid-air, about to dunk' },
    { group: 'Olahraga', label: 'Pose Yoga Warrior', value: 'A person in a strong Warrior II yoga pose' },
    { group: 'Olahraga', label: 'Selebrasi Gol', value: 'A soccer player celebrating a goal' },
    { group: 'Olahraga', label: 'Servis Tenis', value: 'A tennis player in the middle of a powerful serve' },
    { group: 'Olahraga', label: 'Penari Balet', value: 'An elegant ballerina in a graceful pose' },
    { group: 'Olahraga', label: 'Angkat Besi', value: 'A weightlifter lifting a heavy barbell' },
    { group: 'Olahraga', label: 'Peselancar di Ombak', value: 'A surfer riding a wave' },
    { group: 'Olahraga', label: 'Pemain Golf Mengayun', value: 'A golfer mid-swing on a beautiful course' },
    { group: 'Olahraga', label: 'Pesenam di Palang', value: 'A gymnast performing on uneven bars' },
    { group: 'Olahraga', label: 'Pemain Baseball Melempar', value: 'A baseball pitcher in the middle of a throw' },
    { group: 'Olahraga', label: 'Perenang di Blok Start', value: 'A swimmer on the starting block, ready to dive' },
    { group: 'Santai', label: 'Membaca Buku', value: 'Reading a book comfortably in a cozy armchair' },
    { group: 'Santai', label: 'Minum Kopi', value: 'Laughing heartily with a cup of coffee at a cafe' },
    { group: 'Santai', label: 'Berjalan dengan Anjing', value: 'Walking a dog in a beautiful autumn park' },
    { group: 'Santai', label: 'Bersandar di Dinding', value: 'Leaning against a rustic brick wall, casual pose' },
    { group: 'Santai', label: 'Memasak di Dapur', value: 'Happily cooking in a modern kitchen' },
    { group: 'Santai', label: 'Mendengarkan Musik', value: 'Listening to music with headphones, eyes closed' },
    { group: 'Santai', label: 'Bermain Video Game', value: 'Intensely focused on playing a video game' },
    { group: 'Santai', label: 'Menonton Film di Sofa', value: 'Relaxing on a sofa watching a movie with popcorn' },
    { group: 'Santai', label: 'Berkebun', value: 'Tending to plants in a garden' },
    { group: 'Santai', label: 'Piknik di Taman', value: 'Sitting on a blanket during a sunny picnic in the park' },
    { group: 'Santai', label: 'Melamun di Jendela', value: 'Looking out a window on a rainy day, in a thoughtful pose' },
    { group: 'Santai', label: 'Duduk Termenung di Taman', value: 'Sitting pensively on a park bench' },
    { group: 'Santai', label: 'Pose Berpikir (Dagu)', value: 'A classic thinking pose with a hand on the chin' },
    { group: 'Seni & Kreatif', label: 'Musisi Piano', value: 'A musician passionately playing a grand piano' },
    { group: 'Seni & Kreatif', label: 'Seniman Melukis', value: 'An artist painting on a large canvas in a bright studio' },
    { group: 'Seni & Kreatif', label: 'Gitaris di Panggung', value: 'A guitarist performing on stage with stage lights' },
    { group: 'Seni & Kreatif', label: 'Fotografer Bekerja', value: 'A photographer holding a camera, taking a picture' },
    { group: 'Seni & Kreatif', label: 'Penulis di Meja', value: 'A writer typing on a vintage typewriter at a desk' },
    { group: 'Seni & Kreatif', label: 'Penyanyi di Mikrofon', value: 'A singer passionately singing into a vintage microphone' },
    { group: 'Seni & Kreatif', label: 'Pematung Bekerja', value: 'A sculptor working on a clay bust' },
    { group: 'Seni & Kreatif', label: 'DJ di Turntable', value: 'A DJ mixing music at a turntable' },
    { group: 'Seni & Kreatif', label: 'Aktor di Panggung Teater', value: 'An actor performing a dramatic monologue on a theater stage' },
    { group: 'Seni & Kreatif', label: 'Pembuat Film Melihat Kamera', value: 'A film director looking through the camera viewfinder' },
    { group: 'Fantasi', label: 'Astronot Melayang', value: 'An astronaut floating in the zero gravity of space' },
    { group: 'Fantasi', label: 'Penyihir Merapal Mantra', value: 'A powerful wizard casting a magic spell' },
    { group: 'Fantasi', label: 'Ratu di Singgasana', value: 'A queen sitting on a majestic throne' },
    { group: 'Fantasi', label: 'Karakter Cyberpunk', value: 'A cyberpunk character in a futuristic neon-lit city' },
    { group: 'Fantasi', label: 'Peri di Hutan Ajaib', value: 'A fairy with glowing wings in an enchanted forest' },
    { group: 'Fantasi', label: 'Detektif Era Noir', value: 'A film noir detective standing under a streetlamp in the rain' },
    { group: 'Fantasi', label: 'Pengendara Naga', value: 'A dragon rider standing next to their majestic dragon' },
    { group: 'Fantasi', label: 'Putri Duyung', value: 'A mermaid sitting on a rock by the sea' },
    { group: 'Fantasi', label: 'Kaisar Romawi', value: 'A Roman emperor in a toga addressing the senate' },
    { group: 'Fantasi', label: 'Vampir Bangsawan', value: 'An aristocratic vampire in a gothic castle' },
    { group: 'Tari', label: 'Penari Hip-Hop', value: 'A hip-hop dancer in a dynamic freeze pose' },
    { group: 'Tari', label: 'Penari Flamenco', value: 'A flamenco dancer in a passionate pose with a red dress' },
    { group: 'Tari', label: 'Tari Kontemporer', value: 'A contemporary dancer in an expressive, fluid pose' },
    { group: 'Tari', label: 'Pose Berputar', value: 'A dancer captured mid-spin, with fabric flowing' },
    { group: 'Tari', label: 'Breakdancer', value: 'A breakdancer performing a difficult move on the floor' },
    { group: 'Tari', label: 'Penari Ballroom', value: 'A couple in a dramatic ballroom dance pose' },
    { group: 'Tari', label: 'Penari Tradisional Bali', value: 'A traditional Balinese dancer in full costume' },
    { group: 'Konseptual', label: 'Merenung di Cermin', value: 'Looking thoughtfully at their own reflection in a mirror' },
    { group: 'Konseptual', label: 'Siluet Matahari Terbenam', value: 'A silhouette pose against a dramatic sunset' },
    { group: 'Konseptual', label: 'Levitasi', value: 'A surreal pose of levitating slightly off the ground' },
    { group: 'Konseptual', label: 'Wajah Terbelah Cahaya', value: 'A dramatic portrait with face half in shadow, half in light' },
    { group: 'Konseptual', label: 'Berjalan di Atas Air', value: 'A conceptual pose of walking on water' },
    { group: 'Konseptual', label: 'Memegang Jam Pasir', value: 'Holding an hourglass, contemplating time' },
    { group: 'Konseptual', label: 'Terperangkap dalam Kaca', value: 'A pose as if trapped behind a pane of glass' },
];

document.addEventListener('DOMContentLoaded', () => {
    // --- POSE GENERATOR ---
    const imageUpload = document.getElementById('image-upload') as HTMLInputElement;
    const imagePreview = document.getElementById('image-preview') as HTMLImageElement;
    const previewPlaceholder = document.getElementById('preview-placeholder') as HTMLSpanElement;
    const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
    const loadingIndicator = document.getElementById('loading-indicator') as HTMLDivElement;
    const resultsGrid = document.getElementById('results-grid') as HTMLDivElement;
    const errorMessage = document.getElementById('error-message') as HTMLDivElement;
    const resultsPlaceholder = document.getElementById('results-placeholder') as HTMLDivElement;
    const promptPreviewInput = document.getElementById('prompt-preview-input') as HTMLTextAreaElement;
    const categorySelect = document.getElementById('category-select') as HTMLSelectElement;
    const poseSelect = document.getElementById('pose-select') as HTMLSelectElement;
    const poseSelectContainer = document.getElementById('pose-select-container') as HTMLDivElement;
    const modelSelect = document.getElementById('model-select') as HTMLSelectElement;
    let base64ImageData: string | null = null;

    function populateCategories() {
        const categories = [...new Set(poseLibrary.map(p => p.group))];
        categorySelect.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    function populatePoses() {
        const selectedCategory = categorySelect.value;
        if (selectedCategory === 'Kustom') {
            poseSelectContainer.classList.add('hidden');
        } else {
            poseSelectContainer.classList.remove('hidden');
        }
        const filteredPoses = poseLibrary.filter(p => p.group === selectedCategory);
        poseSelect.innerHTML = filteredPoses.map(p => `<option value="${p.value}">${p.label}</option>`).join('');
        generateModelPrompt(); // Generate prompt after populating
    }

    function generateModelPrompt() {
        const selectedPoseValue = poseSelect.value;
        const modelStyle = modelSelect.value;
        let finalPrompt = '';

        if (categorySelect.value === 'Kustom') {
             promptPreviewInput.value = '';
             promptPreviewInput.placeholder = 'Ketik prompt kustom Anda di sini... Instruksi untuk mempertahankan wajah akan ditambahkan secara otomatis.';
             return;
        }

        const coreInstruction = "CRITICAL PROMPT DETAIL: RETAIN ORIGINAL FACE IDENTITY with maximum natural detail; DO NOT alter or transform the original face.";

        switch (modelStyle) {
            case 'chatgpt':
                finalPrompt = `Photo of the person from the uploaded image. The person is now in a new pose: "${selectedPoseValue}". Important: Maintain the exact facial identity from the original photo without any changes. The style should be hyper-realistic.`;
                break;
            case 'meta':
                finalPrompt = `In the style of a photorealistic image, depict the person from the reference photo, but they are now posed as: "${selectedPoseValue}". The original face must remain unchanged with maximum detail.`;
                break;
            case 'simple':
                finalPrompt = `The person from the image, new pose: ${selectedPoseValue}. Retain face.`;
                break;
            case 'gemini':
            default:
                finalPrompt = `A hyper-realistic photo of the person from the uploaded image, in a new pose: "${selectedPoseValue}". ${coreInstruction}`;
                break;
        }
        promptPreviewInput.value = finalPrompt;
    }

    imageUpload.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                base64ImageData = result.split(',')[1];
                imagePreview.src = result;
                imagePreview.classList.remove('hidden');
                previewPlaceholder.classList.add('hidden');
            };
            reader.readAsDataURL(file);
        }
    });
    
    categorySelect.addEventListener('change', populatePoses);
    poseSelect.addEventListener('change', generateModelPrompt);
    modelSelect.addEventListener('change', generateModelPrompt);

    generateBtn.addEventListener('click', async () => {
        if (!base64ImageData) {
            displayError("Silakan unggah gambar wajah Anda terlebih dahulu.", errorMessage);
            return;
        }
        
        let finalApiPrompt = promptPreviewInput.value.trim();
        if (!finalApiPrompt) {
             displayError("Prompt tidak boleh kosong. Silakan pilih gaya atau tulis prompt kustom Anda.", errorMessage);
             return;
        }
        // Ensure critical instruction is present for custom prompts
        if (categorySelect.value === 'Kustom' && !finalApiPrompt.includes("RETAIN ORIGINAL FACE IDENTITY")) {
            finalApiPrompt += " CRITICAL PROMPT DETAIL: RETAIN ORIGINAL FACE IDENTITY with maximum natural detail; DO NOT alter or transform the original face.";
        }

        setLoadingState(true, loadingIndicator, resultsPlaceholder, resultsGrid, errorMessage, generateBtn);
        
        const promises = Array(3).fill(null).map(() => 
            ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        {
                            inlineData: {
                                data: base64ImageData!,
                                mimeType: 'image/png',
                            },
                        },
                        {
                            text: finalApiPrompt,
                        },
                    ],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            }).then(response => {
                const inlineDataPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
                if (!inlineDataPart?.inlineData?.data) throw new Error("No image data in API response.");
                return { success: true, base64Data: inlineDataPart.inlineData.data };
            }).catch(error => ({ success: false, error: error.toString() }))
        );

        try {
            const results = await Promise.all(promises);
            results.forEach((result, i) => {
                if (result.success) createResultCard(result.base64Data, i + 1, resultsGrid, resultsPlaceholder);
                else createErrorCard(i + 1, result.error, resultsGrid, resultsPlaceholder);
            });
            if (results.every(r => !r.success)) displayError(results[0]?.error || "Semua permintaan gagal.", errorMessage);
        } catch (error: any) {
            displayError(error.message || "Gagal berkomunikasi dengan API.", errorMessage);
        } finally {
            setLoadingState(false, loadingIndicator, resultsPlaceholder, resultsGrid, errorMessage, generateBtn);
        }
    });

    // --- LOGO GENERATOR ---
    const logoPromptInput = document.getElementById('logo-prompt-input') as HTMLInputElement;
    const generateLogoBtn = document.getElementById('generate-logo-btn') as HTMLButtonElement;
    const logoLoadingIndicator = document.getElementById('logo-loading-indicator') as HTMLDivElement;
    const logoResultPlaceholder = document.getElementById('logo-result-placeholder') as HTMLDivElement;
    const logoResultDisplay = document.getElementById('logo-result-display') as HTMLDivElement;
    const logoErrorMessage = document.getElementById('logo-error-message') as HTMLDivElement;

    generateLogoBtn.addEventListener('click', async () => {
        const userPrompt = logoPromptInput.value.trim();
        if (!userPrompt) {
            displayError("Mohon jelaskan logo yang Anda inginkan.", logoErrorMessage);
            return;
        }

        setLoadingState(true, logoLoadingIndicator, logoResultPlaceholder, logoResultDisplay, logoErrorMessage, generateLogoBtn);
        const finalApiPrompt = `logo for "${userPrompt}", vector, minimalist, clean, high quality, SVG style, on a plain white background`;

        try {
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: finalApiPrompt,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/png',
                },
            });
            const base64Data = response.generatedImages?.[0]?.image?.imageBytes;
            if (base64Data) {
                createLogoResult(base64Data);
            } else {
                throw new Error("No image data received from API.");
            }
        } catch (error: any) {
            displayError(error.message, logoErrorMessage);
        } finally {
            setLoadingState(false, logoLoadingIndicator, logoResultPlaceholder, logoResultDisplay, logoErrorMessage, generateLogoBtn);
        }
    });

    function createLogoResult(base64Data: string) {
        logoResultDisplay.innerHTML = '';
        logoResultDisplay.classList.remove('hidden');
        logoResultDisplay.classList.add('flex');
        const imageUrl = `data:image/png;base64,${base64Data}`;
        
        const card = document.createElement('div');
        card.className = 'bg-gray-700 rounded-lg p-3 space-y-3 flex flex-col animate-fade-in max-w-sm';
        card.innerHTML = `<img src="${imageUrl}" alt="Generated Logo" class="w-full h-auto rounded-md object-cover aspect-square bg-white"><a href="${imageUrl}" download="logo_studio_${Date.now()}.png" class="w-full mt-auto text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Unduh Logo</a>`;
        logoResultDisplay.appendChild(card);
        logoResultPlaceholder.style.display = 'none';
    }

    // --- FUNGSI UMUM ---
    populateCategories();
    populatePoses();

    function setLoadingState(isLoading: boolean, loader: HTMLElement, placeholder: HTMLElement, grid: HTMLElement | null, errorEl: HTMLElement, button: HTMLButtonElement) {
        button.disabled = isLoading;
        loader.style.display = isLoading ? 'flex' : 'none';
        if (isLoading) {
            if (grid) grid.innerHTML = '';
            if(grid && grid.id === 'logo-result-display') grid.classList.add('hidden');
            errorEl.classList.add('hidden');
            placeholder.style.display = 'none';
        } else {
            if (grid && grid.children.length === 0) {
                placeholder.style.display = 'flex';
            }
        }
    }
    
    function displayError(message: string, errorEl: HTMLElement) {
         errorEl.textContent = `Terjadi Kesalahan: ${message}`;
         errorEl.classList.remove('hidden');
    }

    function createResultCard(base64Data: string, index: number, grid: HTMLElement, placeholder: HTMLElement) {
        const imageUrl = `data:image/png;base64,${base64Data}`;
        const card = document.createElement('div');
        card.className = 'bg-gray-700 rounded-lg p-3 space-y-3 flex flex-col animate-fade-in';
        card.innerHTML = `<img src="${imageUrl}" alt="Generated Pose ${index}" class="w-full h-auto rounded-md object-cover aspect-square"><a href="${imageUrl}" download="pose_studio_${Date.now()}_${index}.png" class="w-full mt-auto text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Unduh</a>`;
        grid.appendChild(card);
        placeholder.style.display = 'none';
    }

    function createErrorCard(index: number, errorMsg: string, grid: HTMLElement, placeholder: HTMLElement) {
        const card = document.createElement('div');
        card.className = 'bg-gray-700 rounded-lg p-3 flex flex-col items-center justify-center text-center h-full animate-fade-in border border-red-500 aspect-square';
        card.innerHTML = `<svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-red-300 font-semibold">Gagal membuat gambar ${index}</p><p class="text-xs text-gray-400 mt-1">${errorMsg || 'Coba lagi.'}</p>`;
        grid.appendChild(card);
        placeholder.style.display = 'none';
    }
    
    // Social Link Obfuscation
    document.getElementById('social-links')?.addEventListener('click', function(event) {
        let target = (event.target as HTMLElement).closest('a');
        if (target && target.dataset.link) {
            event.preventDefault();
            try {
                const decodedUrl = atob(target.dataset.link);
                window.open(decodedUrl, '_blank');
            } catch (e) {
                console.error("Failed to decode link:", e);
            }
        }
    });
});
