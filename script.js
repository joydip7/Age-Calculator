function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  const result = document.getElementById("result");

  if (!dobInput) {
    result.innerHTML = "⚠️ Please select your date of birth!";
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += prevMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // Next Birthday
  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const diffTime = nextBirthday - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weekday = nextBirthday.toLocaleDateString("en-US", { weekday: "long" });

  // Zodiac sign
  const zodiac = getZodiacSign(dob.getDate(), dob.getMonth() + 1);

  // Chinese Zodiac
  const chineseZodiac = getChineseZodiac(dob.getFullYear());

  result.innerHTML = `
    🧮 You are <strong>${ageYears}</strong> years, <strong>${ageMonths}</strong> months, and <strong>${ageDays}</strong> days old.<br><br>
    🎂 Next birthday in <strong>${daysLeft}</strong> days (on <strong>${weekday}</strong>).<br><br>
    ♈ Zodiac Sign: <strong>${zodiac}</strong><br>
    🐉 Chinese Zodiac: <strong>${chineseZodiac}</strong>
  `;
}

// Western Zodiac
function getZodiacSign(day, month) {
  const zodiac = [
    ["Capricorn", 20],
    ["Aquarius", 19],
    ["Pisces", 20],
    ["Aries", 20],
    ["Taurus", 21],
    ["Gemini", 21],
    ["Cancer", 22],
    ["Leo", 22],
    ["Virgo", 22],
    ["Libra", 23],
    ["Scorpio", 22],
    ["Sagittarius", 21],
    ["Capricorn", 31],
  ];
  return day > zodiac[month - 1][1] ? zodiac[month][0] : zodiac[month - 1][0];
}

// Chinese Zodiac
function getChineseZodiac(year) {
  const animals = [
    "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
    "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
  ];
  return animals[(year - 4) % 12];
}

// Reset Form
function resetForm() {
  document.getElementById("dob").value = "";
  document.getElementById("result").innerHTML = "";
}

// Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("themeToggle");
  btn.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
