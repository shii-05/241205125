const timeLabels = [
  '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

const shops = [
  {
    name: "なんじゃもんじゃ",
    type: "on-campus",
    mapUrl: "https://goo.gl/maps/xxxxx",
    congestionByDay: {
      monday:    [0, 1, 4, 5, 3, 2, 1, 1, 2, 3, 3, 2, 1, 1],
      tuesday:   [1, 2, 3, 4, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1],
      wednesday: [0, 1, 2, 3, 4, 3, 2, 2, 1, 1, 2, 2, 1, 0],
      thursday:  [1, 2, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 0, 0],
      friday:    [0, 0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0]
    }
  },
  {
    name: "食堂カーサ",
    type: "off-campus",
    mapUrl: "https://goo.gl/maps/yyyyy",
    congestionByDay: {
      monday:    [0, 1, 3, 4, 5, 4, 2, 2, 3, 4, 4, 3, 2, 1],
      tuesday:   [1, 2, 3, 3, 4, 3, 2, 2, 3, 3, 3, 2, 1, 1],
      wednesday: [0, 0, 1, 2, 2, 3, 3, 2, 2, 1, 1, 1, 1, 0],
      thursday:  [1, 2, 3, 4, 4, 3, 2, 2, 2, 2, 2, 1, 1, 1],
      friday:    [0, 0, 2, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0]
    }
  },
  {
    name: "ベーカリーカフェ オリーブ",
    type: "off-campus",
    mapUrl: "https://goo.gl/maps/zzzzz",
    congestionByDay: {
      monday:    [1, 2, 3, 3, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1],
      tuesday:   [0, 1, 2, 3, 3, 2, 1, 1, 1, 1, 1, 0, 0, 0],
      wednesday: [1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0],
      thursday:  [1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
      friday:    [0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0]
    }
  }
];

function populateSelectors() {
  const timeSelect = document.getElementById('time');
  const daySelect = document.getElementById('day');

  timeSelect.innerHTML = "";
  timeLabels.forEach((label, i) => {
    const hour = 9 + i;
    const option = document.createElement('option');
    option.value = hour;
    option.textContent = label;
    if (hour === 12) option.selected = true;
    timeSelect.appendChild(option);
  });

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const labels = ['月曜', '火曜', '水曜', '木曜', '金曜'];
  daySelect.innerHTML = "";
  days.forEach((day, i) => {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = labels[i];
    if (day === 'monday') option.selected = true;
    daySelect.appendChild(option);
  });
}

function filterShops() {
  const selectedHour = parseInt(document.getElementById('time').value);
  const selectedDay = document.getElementById('day').value;
  const index = selectedHour - 9;
  const container = document.getElementById('shops-container');
  container.innerHTML = "";

  shops.forEach((shop, i) => {
    const congestion = shop.congestionByDay[selectedDay];
    const isRecommended = congestion[index] <= 2;

    const div = document.createElement('div');
    div.className = 'shop';
    div.innerHTML = `
      <h2><a href="${shop.mapUrl}" target="_blank">${shop.name}</a> ${isRecommended ? '<span class="recommendation">←おすすめ！</span>' : ''}</h2>
      <canvas id="chart${i}" height="300"></canvas>
    `;
    container.appendChild(div);

    new Chart(document.getElementById(`chart${i}`), {
      type: 'bar',
      data: {
        labels: timeLabels,
        datasets: [{
          label: '混雑レベル（0〜5）',
          data: congestion,
          backgroundColor: timeLabels.map((_, idx) => idx === index ? '#ffcccb' : '#e6e6fa')
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            min: 0,
            max: 5,
            title: { display: true, text: '混雑レベル' },
            ticks: { stepSize: 1 }
          },
          x: {
            title: { display: true, text: '時間帯' }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `混雑レベル: ${ctx.raw}`
            }
          }
        }
      }
    });
  });
}

window.onload = () => {
  populateSelectors();
  filterShops();
};

function toggleMenu(el) {
  document.querySelector('.nav-links').classList.toggle('active');
  el.classList.toggle('active');
}

window.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".hero-image");

  // 初期状態：最初の画像（校舎）だけ表示
  images.forEach(img => img.style.display = "none");
  images[0].style.display = "block";

  // 関数：指定の index の画像だけ表示
  function showImage(index) {
    images.forEach(img => img.style.display = "none");
    images[index].style.display = "block";
  }

// 虫眼鏡ごとにホバーで切り替え
document.querySelector(".N").addEventListener("mouseenter", () => showImage(1));        // 名城食堂
document.querySelector(".TOWER").addEventListener("mouseenter", () => showImage(4));    // タワー
document.querySelector(".BEKARY").addEventListener("mouseenter", () => showImage(2));   // ベーカリー
document.querySelector(".SUGAKIYA").addEventListener("mouseenter", () => showImage(3)); // スガキヤ
document.querySelector(".GAISYOKU").addEventListener("mouseenter", () => showImage(5)); // 外食 ←追加
});

  document.addEventListener("DOMContentLoaded", function () {
    const titleAnim = document.getElementById("title-animation");

    const hasSeenAnimation = sessionStorage.getItem("seenAnimation");

    if (!hasSeenAnimation) {
      // ✅ 初回だけアニメーションを表示
      titleAnim.style.display = "flex";

      setTimeout(() => {
        titleAnim.style.display = "none";
        sessionStorage.setItem("seenAnimation", "true");
      }, 3000);
    } else {
      // ✅ 2回目以降は非表示にしてスキップ
      titleAnim.style.display = "none";
    }
  });