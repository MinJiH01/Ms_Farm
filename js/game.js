let growth = 0;
let health = 100;
let points = 0;
let waterDrops = 0; 
let sunlightCount = 0; 

const plant = document.getElementById("plant");
const growthStatus = document.getElementById("growth");
const healthStatus = document.getElementById("health");
const pointsDisplay = document.getElementById("points");
const status = document.getElementById("status");
const waterDropsDisplay = document.getElementById("water-drops");

const waterButton = document.getElementById("water-button");
const sunlightButton = document.getElementById("sunlight-button");
const checkInButton = document.getElementById("check-in-button");

let healthInterval; // 건강 상태 감소 타이머
let gameInterval; // 성장 단계 타이머

// 출석체크 상태 확인
function checkAttendance() {
  const lastCheckIn = localStorage.getItem("lastCheckIn");
  const today = new Date().toISOString().slice(0, 10); // 오늘 날짜

  if (lastCheckIn === today) {
    // 출석체크를 한 경우
    checkInButton.disabled = true;
    checkInButton.textContent = "이미 출석체크를 완료하셨습니다.";
  } else {
    // 출석체크 가능
    checkInButton.disabled = false;
    checkInButton.textContent = "출석체크";
  }

  // 물방울 갱신
  const savedDrops = localStorage.getItem("waterDrops");
  waterDrops = savedDrops ? parseInt(savedDrops, 10) : 0;
  updateWaterDropsDisplay();
}

// 출석체크 기능
function handleCheckIn() {
  const today = new Date().toISOString().slice(0, 10);

  localStorage.setItem("lastCheckIn", today); // 출석 날짜 저장
  waterDrops += 1; // 물방울 1개 지급
  localStorage.setItem("waterDrops", waterDrops); // 물방울 저장

  checkInButton.disabled = true;
  checkInButton.textContent = "이미 출석체크를 완료하셨습니다.";
  updateWaterDropsDisplay();
  alert("출석체크 완료! 물방울 1개가 지급되었습니다.");
}

// 물방울 UI
function updateWaterDropsDisplay() {
  waterDropsDisplay.textContent = `남은 물방울: ${waterDrops}`;
  waterButton.disabled = waterDrops <= 0; // 물방울이 없으면 물 주기 버튼 비활성화
}

// 물 주기
waterButton.addEventListener("click", function () {
  if (waterDrops > 0) {
    waterDrops -= 1; // 물방울 소모
    localStorage.setItem("waterDrops", waterDrops); // 물방울 갱신 저장
    updateWaterDropsDisplay();

    if (health < 100) {
      health += 10; // 건강 상태 회복
      if (health > 100) health = 100; // 최대값 제한
      healthStatus.textContent = `건강 상태: ${health}%`;
    }

    increaseGrowth(); // 성장 증가
  } else {
    alert("물방울이 부족합니다.");
  }
});

// 햇빛 주기
sunlightButton.addEventListener("click", function () {
  sunlightCount += 1; // 햇빛 횟수 증가

  if (sunlightCount <= 5) {
    // 처음 5회까지는 건강 회복
    if (health < 100) {
      health += 5; // 건강 회복
      if (health > 100) health = 100; // 최대값 제한
    }
  } else {
    // 6회 이상은 건강 감소
    health -= 10; // 건강 감소
    if (health < 0) health = 0; // 최소값 제한
  }

  // 건강 상태 UI
  healthStatus.textContent = `건강 상태: ${health}%`;

  // 게임 오버 체크
  if (health === 0) {
    gameOver();
  } else {
    increaseGrowth(); // 성장 증가
  }
});

// 성장 상태
function increaseGrowth() {
  if (growth < 100) {
    growth += 5;
    updateGrowth();
    updatePlantAppearance();
  }
}

// 성장 상태 표시
function updateGrowth() {
  growthStatus.textContent = `성장 상태: ${growth}%`;

  if (growth === 100) {
    givePoints(); // 성장 완료 시 포인트 부여
  }
}

// 식물 단계별 이미지
function updatePlantAppearance() {
  if (growth > 80) {
    plant.src = "../image/검색창 장식.png";
  } else if (growth > 50) {
    plant.src = "../image/검색창 장식.png";
  } else if (growth > 20) {
    plant.src = "../image/검색창 장식.png";
  }
}

// 포인트 부여
function givePoints() {
  clearInterval(gameInterval);
  clearInterval(healthInterval);
  points += 100;
  pointsDisplay.textContent = `포인트: ${points}`;
  status.textContent = "축하합니다! 식물이 다 자랐습니다!";
}

// 건강 상태 감소
function updateHealth() {
  health -= 5;
  if (health <= 0) {
    health = 0;
    gameOver();
  }
  healthStatus.textContent = `건강 상태: ${health}%`;
}

// 게임 오버
function gameOver() {
  clearInterval(gameInterval);
  clearInterval(healthInterval);
  status.textContent = "식물이 시들어버렸습니다...";
  waterButton.disabled = true;
  sunlightButton.disabled = true;
}

// 출석체크 버튼 이벤트
checkInButton.addEventListener("click", handleCheckIn);

// 주기적 상태 업데이트
healthInterval = setInterval(updateHealth, 3000);
gameInterval = setInterval(updatePlantAppearance, 1000);

// 초기화
checkAttendance();
updateWaterDropsDisplay();

