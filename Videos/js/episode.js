
// ==========================================
// FIXED LOKTV COMPREHENSIVE DATA ENGINE (js/episodes.js)
// ==========================================

const animeData = {
    season1: [],
    season2: [],
    season3: [],
    season4: []
};

// FIXED Season 1 Generator (Ep 1 to 51)
for (let i = 1; i <= 51; i++) {
    let epNum = i < 10 ? '0' + i : i;
    animeData.season1.push({
        ep: i.toString(),
        displayEp: epNum.toString(),
        title: `Episode ${epNum}`,
        url: `https://archive.org{epNum}%20-%20Asta%20and%20Yuno%20%5B1080p%5D%5BDub%5D.mp4`
    });
}

// FIXED Season 2 Generator (Ep 52 to 102) -> Fixes Episode 93 server pathway mismatch
for (let i = 52; i <= 102; i++) {
    animeData.season2.push({
        ep: i.toString(),
        displayEp: i.toString(),
        title: `Episode ${i}`,
        url: `https://archive.org{i}.mp4`
    });
}

// FIXED Season 3 Generator (Ep 103 to 141)
for (let i = 103; i <= 141; i++) {
    animeData.season3.push({
        ep: i.toString(),
        displayEp: i.toString(),
        title: `Episode ${i}`,
        url: `https://archive.org{i}.mp4`
    });
}

// FIXED Season 4 Generator (Ep 142 to 170)
for (let i = 142; i <= 170; i++) {
    animeData.season4.push({
        ep: i.toString(),
        displayEp: i.toString(),
        title: `Episode ${i}`,
        url: `https://archive.org{i}.mp4`
    });
}

let currentActiveSeason = 'season1';

// Initialized when the browser finishes loading the website framework
window.onload = function() {
    loadSeason('season1'); 
};

// Generates the episode card blocks inside the HTML carousel
function renderCards(epDataArray) {
    const carousel = document.getElementById('episodeList');
    carousel.innerHTML = ''; 

    if(epDataArray.length === 0) {
        carousel.innerHTML = `<p style="padding:15px; color:var(--text-muted); font-size:0.9rem;">No matching episodes found.</p>`;
        return;
    }

    epDataArray.forEach(episode => {
        const card = document.createElement('div');
        card.className = 'episode-card';
        card.onclick = function() { changeEpisode(episode.url, episode.title); };
        card.innerHTML = `
            <div class="thumb-placeholder">EP ${episode.displayEp}</div>
            <div class="ep-info">
                <span class="title">${episode.title}</span>
                <span class="desc">Tap to Stream</span>
            </div>
        `;
        carousel.appendChild(card);
    });
}

// Switches your tabs and loads the correct season set
function loadSeason(seasonKey) {
    currentActiveSeason = seasonKey;
    document.getElementById('searchBar').value = ''; 
    document.getElementById('carouselTitle').innerText = "Select Episode";
    
    renderCards(animeData[seasonKey]);

    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById('tab-' + seasonKey).classList.add('active');
}

// Real-time keyword filter search bar mechanics
function searchEpisodes() {
    const query = document.getElementById('searchBar').value.trim().toLowerCase();
    
    if(query === "") {
        loadSeason(currentActiveSeason);
        return;
    }

    document.getElementById('carouselTitle').innerText = "Search Results";
    let allEpisodes = [...animeData.season1, ...animeData.season2, ...animeData.season3, ...animeData.season4];
    
    let matchedEpisodes = allEpisodes.filter(episode => {
        return episode.ep === query || episode.title.toLowerCase().includes(query);
    });

    renderCards(matchedEpisodes);
}

// Injects the active streaming source path and launches player controls
function changeEpisode(videoUrl, episodeTitle) {
    const player = document.getElementById('mainPlayer');
    const source = document.getElementById('videoSource');
    const titleText = document.getElementById('nowPlayingTitle');
    const downloadBtn = document.getElementById('downloadLink');

    source.src = videoUrl;
    downloadBtn.href = videoUrl;
    downloadBtn.setAttribute('download', episodeTitle.replace(/ /g, "_") + '.mp4');
    titleText.innerText = episodeTitle + ' (Now Playing)';
    
    player.load();
    
    const playPromise = player.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Playback engine paused until explicit user interaction registers.");
        });
    }
    
    window.scrollTo({ top: 130, behavior: 'smooth' });
}
