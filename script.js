const fixtures = [
  {
    league: "Premier League",
    home: "Arsenal",
    away: "Aston Villa",
    kickoff: "Today • 18:30",
    status: "Scheduled",
    score: "-"
  },
  {
    league: "La Liga",
    home: "Barcelona",
    away: "Sevilla",
    kickoff: "Today • 20:00",
    status: "Live 52'",
    score: "2 - 1"
  },
  {
    league: "Ligue 1",
    home: "PSG",
    away: "Lyon",
    kickoff: "Today • 19:45",
    status: "Scheduled",
    score: "-"
  },
  {
    league: "Bundesliga",
    home: "Bayern",
    away: "Leverkusen",
    kickoff: "Tomorrow • 16:30",
    status: "Scheduled",
    score: "-"
  },
  {
    league: "Serie A",
    home: "Inter",
    away: "Napoli",
    kickoff: "Tomorrow • 19:00",
    status: "Live 69'",
    score: "1 - 1"
  }
];

const scorelines = ["1 - 0", "1 - 1", "2 - 1", "2 - 2", "3 - 2"];

const filter = document.querySelector("#leagueFilter");
const refreshBtn = document.querySelector("#refreshBtn");
const fixtureList = document.querySelector("#fixtureList");
const template = document.querySelector("#fixtureTemplate");

function renderFixtures() {
  fixtureList.innerHTML = "";
  const selectedLeague = filter.value;
  const visibleFixtures = fixtures.filter(
    (fixture) => selectedLeague === "all" || fixture.league === selectedLeague
  );

  if (!visibleFixtures.length) {
    fixtureList.innerHTML = '<p class="empty-state">No fixtures in this league right now.</p>';
    return;
  }

  visibleFixtures.forEach((fixture) => {
    const card = template.content.cloneNode(true);
    card.querySelector(".teams").textContent = `${fixture.home} vs ${fixture.away}`;
    card.querySelector(".meta").textContent = `${fixture.league} • ${fixture.kickoff}`;

    const status = card.querySelector(".status");
    status.textContent = fixture.status;
    status.classList.toggle("live", fixture.status.startsWith("Live"));

    card.querySelector(".score").textContent = fixture.score;
    fixtureList.appendChild(card);
  });
}

function randomUpdate() {
  fixtures.forEach((fixture) => {
    if (Math.random() > 0.5) {
      fixture.status = "Live " + `${Math.floor(Math.random() * 90) + 1}'`;
      fixture.score = scorelines[Math.floor(Math.random() * scorelines.length)];
    }
  });
  renderFixtures();
}

filter.addEventListener("change", renderFixtures);
refreshBtn.addEventListener("click", randomUpdate);

renderFixtures();
