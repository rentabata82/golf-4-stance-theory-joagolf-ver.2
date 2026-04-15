const questions = [
    { text: "Q1 アドレスはどちらが楽？", a: "膝をやや伸ばす", b: "膝をやや曲げる", type: "AB" },
    { text: "Q2 インパクトのイメージはどちらが自然？", a: "前足で踏ん張る", b: "後ろ足で踏ん張る", type: "AB" },
    { text: "Q3 クラブの握り方はどちらが自然？", a: "指で握る", b: "手のひらで握る", type: "AB" },
    { text: "Q4 「お先」のパターはどちらが安定する？", a: "左足軸", b: "右足軸", type: "AB" },
    { text: "Q5 スイング中(特にテークバック)どちらが自然？", a: "脇を締める", b: "脇を開ける", type: "AB" },
    { text: "Q6 スタンスはどちらが振りやすい？", a: "広め", b: "狭め", type: "CP" },
    { text: "Q7 グリップはどちらが振りやすい？", a: "斜めに握る", b: "横から真っ直ぐ握る", type: "CP" },
    { text: "Q8 走る時の腕の振り方はどちらが自然？", a: "前でやや交差", b: "体の横でまっすぐ", type: "CP" },
    { text: "Q9 背もたれにもたれる時どこが支点？", a: "みぞおちの裏", b: "首の付け根", type: "AB" },
    { text: "Q10 ビンの蓋を開ける時どちらが使いやすい？", a: "親・人差・中指", b: "親・中・薬指", type: "12" },
    { text: "Q11 うちわで仰ぐ時どちらが自然？", a: "手首中心", b: "肘から動かす", type: "AB" },
    { text: "Q12 紙を斜めにする方が文字が書きやすい？", a: "はい", b: "いいえ", type: "CP" },
    { text: "Q13 直立した時の手の甲の向きは？", a: "正面寄り", b: "横向き寄り", type: "CP" }
];

const results = {
    A1: { id: "rabbit", name: "🐰 ふわ飛びうさぎタイプ（A1）", features: ["前重心でつま先内側に乗りやすい", "上半身主導で体を上に使う", "2軸で斜めに、幅広く動くのが自然", "ゆったりしたリズムで大きく動くのが得意"], swing: ["テークバックは上に引き上げるような動き", "切り返しは“ためすぎず”自然に流れる", "ダウンスイングは空間を使って振るタイプ", "コンパクトにまとめるよりも“広く使う”方が安定"], notes: ["コンパクトにまとめすぎると動きが詰まりやすい", "下半身主導を意識しすぎると違和感が出る", "タメを作ろうとしすぎると本来のリズムが崩れる"], advice: ["「上に伸びるイメージ」で振るのが◎", "スイングは“横”より“斜め上”の意識", "リズム重視でゆったり振ると本来の力が出る"] },
    A2: { id: "flamingo", name: "🦩 スリムなフラミンゴタイプ（A2）", features: ["前重心でつま先内側", "上半身重心で縦に伸びる", "1軸でまっすぐコンパクト", "背筋が伸びた動きが自然"], swing: ["テークバックは縦方向", "軸を崩さず回る", "コンパクトで効率的な動き"], notes: ["大きく振ろうとしすぎるとブレる", "横に広げすぎると軸が崩れる"], advice: ["「真上に伸びる」意識", "コンパクトでOK", "軸キープ最優先"] },
    B1: { id: "duck", name: "🦆 しずかなアヒルタイプ（B1）", features: ["後ろ重心（かかと寄り）", "下半身重心", "1軸でまっすぐ", "背筋は伸びたまま、膝で重心を落とす"], swing: ["下に沈む動きが自然", "ためを作りやすい", "コンパクトで安定型", "上半身は静か、下で動く"], notes: ["上に伸びようとすると不自然になる", "大きく振ろうとするとバランス崩れる"], advice: ["「下で支える」意識", "膝を使って沈む", "上は静かに"] },
    B2: { id: "bear", name: "🐻 ゆったりくまタイプ（B2）", features: ["後ろ重心（かかと外側）", "下半身主導", "2軸で斜めに広く使う", "どっしり安定型"], swing: ["テークバックは低く広く", "体全体で動く", "ダイナミックなスイング"], notes: ["コンパクトにしすぎると力が出ない", "上半身主導になるとミス出やすい"], advice: ["下でどっしり", "広く使う", "リズムゆったり"] }
};

let currentStep = 0;
let userAnswers = [];

const quizSection = document.getElementById('quiz-area');
const resultSection = document.getElementById('result-area');
const qText = document.getElementById('question-text');
const btnA = document.getElementById('choice-a');
const btnB = document.getElementById('choice-b');
const textA = document.getElementById('text-a');
const textB = document.getElementById('text-b');
const progressCore = document.getElementById('progress-core');
const progressText = document.getElementById('progress-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    quizSection.style.display = 'block';
    showQuestion();
});

function showQuestion() {
    const q = questions[currentStep];
    qText.innerText = q.text;

    // 「A」「B」という文字を入れず、中身のテキストだけを表示する
    textA.innerText = q.a; 
    textB.innerText = q.b;
    
    // ボタンの選択状態（見た目）の管理
    btnA.classList.toggle('selected', userAnswers[currentStep] === 'A');
    btnB.classList.toggle('selected', userAnswers[currentStep] === 'B');

    // ボタンの制御
    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = userAnswers[currentStep] === undefined;

    // 進捗バーの更新
    const percent = ((currentStep + 1) / questions.length) * 100;
    progressCore.style.width = percent + "%";
    progressText.innerText = `Q ${currentStep + 1} / ${questions.length}`;
}

function handleAnswer(choice) {
    userAnswers[currentStep] = choice;
    if (currentStep < questions.length - 1) {
        currentStep++;
        showQuestion();
    } else {
        showResult();
    }
}

btnA.addEventListener('click', () => handleAnswer('A'));
btnB.addEventListener('click', () => handleAnswer('B'));

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) { currentStep--; showQuestion(); }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < questions.length - 1) { currentStep++; showQuestion(); }
});

function showResult() {
    quizSection.style.display = 'none';
    resultSection.style.display = 'block';

    let scores = { A: 0, B: 0, CP: 0, t1: 0, t2: 0, totalCP: 0 };
    userAnswers.forEach((ans, i) => {
        const type = questions[i].type;
        if (type === "AB") ans === 'A' ? scores.A++ : scores.B++;
        if (type === "CP") { scores.totalCP++; if(ans === 'A') scores.CP++; }
        if (type === "12") ans === 'A' ? scores.t1++ : scores.t2++;
    });

    const isA = scores.A >= scores.B;
    const isCross = scores.CP >= (scores.totalCP / 2);
    const isType1 = scores.t1 >= scores.t2;

    let key = (isA && isType1 && isCross) ? "A1" :
              (isA && !isType1 && !isCross) ? "A2" :
              (!isA && isType1 && !isCross) ? "B1" : "B2";

    const data = results[key];

    resultSection.innerHTML = `
        <div class="result-container">
            <p class="result-lead">あなたのタイプは...</p>
            <div class="type-header">
                <img src="images/${data.id}.jpeg" alt="${data.id}" class="type-image">
                <h2 class="type-title">${data.name}</h2>
                <p class="probability-text">の可能性があります！</p>
                <p class="disclaimer-text">※あくまで診断ベースのため、参考タイプとなります。</p>
            </div>
            <div class="result-details">
            ${createBlock("■ 特徴", data.features)}
            ${createBlock("■ スイング傾向", data.swing)}
            ${createBlock("■ 注意点", data.notes)}
            <div class="detail-block point-advice">
                <h3>■ アドバイス</h3>
                <ul>${data.advice.map(t => `<li>${t}</li>`).join('')}</ul>
            </div>
        </div>
        <button class="main-btn" style="background:#666; margin-top:50px;" onclick="location.reload()">最初からやり直す</button>
    </div>
`;
    window.scrollTo(0, 0);
}

function createBlock(title, list) {
    return `<div class="detail-block"><h3>${title}</h3><ul>${list.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
}