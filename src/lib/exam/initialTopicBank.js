/**
 * Official Topic Bank Seed - YouTube Automation Batch 2
 * Provided by Workshop Trainer (Sets A, B, C, D)
 * 4 Niches, 4 Characters, and 80 Official Topics (20 topics per niche).
 * Includes 3 character pose images and zip download for each character.
 */

export const INITIAL_EXAM_SETS = [
  {
    id: "set-a",
    code: "A",
    characterName: "Character A",
    nicheName: "Survival Stories / 2D Animation",
    characterDescription: "Apocalyptic survival character model for 2D animation, storyboarding, and thumbnail creation.",
    images: [
      "/characters/A/character-a-1.jpeg",
      "/characters/A/character-a-2.jpeg",
      "/characters/A/character-a-3.jpeg",
    ],
    zipUrl: "/characters/A/character-a-assets.zip",
    isActive: true,
    createdAt: "2026-11-08T00:00:00.000Z",
  },
  {
    id: "set-b",
    code: "B",
    characterName: "Character B",
    nicheName: "What If / 2D Animation",
    characterDescription: "Sci-fi / What-If conceptual character model for 2D animation and thought-experiment storytelling.",
    images: [
      "/characters/B/character-b-1.jpeg",
      "/characters/B/character-b-2.jpeg",
      "/characters/B/character-b-3.jpeg",
    ],
    zipUrl: "/characters/B/character-b-assets.zip",
    isActive: true,
    createdAt: "2026-11-08T00:00:00.000Z",
  },
  {
    id: "set-c",
    code: "C",
    characterName: "Character C",
    nicheName: "Monkey Explainer / Psychology",
    characterDescription: "Monkey explainer character model for educational psychology, finance, and productivity videos.",
    images: [
      "/characters/C/character-c-1.jpeg",
      "/characters/C/character-c-2.jpeg",
      "/characters/C/character-c-3.jpeg",
    ],
    zipUrl: "/characters/C/character-c-assets.zip",
    isActive: true,
    createdAt: "2026-11-08T00:00:00.000Z",
  },
  {
    id: "set-d",
    code: "D",
    characterName: "Character D",
    nicheName: "History 2D Explainer",
    characterDescription: "Historical warrior / ancient myth explainer character model for docu-drama style videos.",
    images: [
      "/characters/D/character-d-1.jpeg",
      "/characters/D/character-d-2.jpeg",
      "/characters/D/character-d-3.jpeg",
    ],
    zipUrl: "/characters/D/character-d-assets.zip",
    isActive: true,
    createdAt: "2026-11-08T00:00:00.000Z",
  },
];

export const INITIAL_EXAM_TOPICS = [
  // ==========================================
  // SET A: Character A — Survival Stories / 2D Animation (20 Topics)
  // ==========================================
  { id: "topic-a-1", setId: "set-a", title: "Zombie Outbreak: 30 Days Trapped in an Apartment", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-2", setId: "set-a", title: "Zombie Outbreak: Surviving on a Rooftop with Almost No Food", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-3", setId: "set-a", title: "Zombie Outbreak: Escaping a Building — 30 Floors Down", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-4", setId: "set-a", title: "Zombie Outbreak: Trapped in a Flooding Basement with a Broken Key", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-5", setId: "set-a", title: "Zombie Outbreak: 12 Days Trapped in a Stadium", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-6", setId: "set-a", title: "Zombie Outbreak: 100 Days Inside a Surrounded Barn", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-7", setId: "set-a", title: "Zombie Outbreak: 72 Hours Trapped in a Hospital", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-8", setId: "set-a", title: "Zombie Outbreak: 14 Days Trapped in a Shopping Mall", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-9", setId: "set-a", title: "Zombie Outbreak: 14 Days Surviving in an Abandoned City", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-10", setId: "set-a", title: "Zombie Outbreak: 100 Days Trapped on a Cruise Ship", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-11", setId: "set-a", title: "Zombie Outbreak: 15 Days Hiding in a Floating Town of Boats", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-12", setId: "set-a", title: "Zombie Outbreak: 15 Days at a Lighthouse — They Come to the Light", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-13", setId: "set-a", title: "Zombie Outbreak: 61 Days Trapped on a Dead-End Street", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-14", setId: "set-a", title: "Zombie Outbreak: 100 Days Stranded at a Truck Stop", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-15", setId: "set-a", title: "Zombie Outbreak: The Laboratory Doors Sealed Before Escape", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-16", setId: "set-a", title: "Zombie Outbreak: The Only Survivor Above the Toxic Fog", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-17", setId: "set-a", title: "Nuclear Apocalypse: Surviving the First 30 Days", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-18", setId: "set-a", title: "Zombie Outbreak: 48 Hours Trapped in an Underground Subway Station", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-19", setId: "set-a", title: "Zombie Outbreak: 7 Days Inside a Supermarket with No Electricity", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-a-20", setId: "set-a", title: "Zombie Outbreak: Trapped on a Bridge — Both Ends Are Blocked", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },

  // ==========================================
  // SET B: Character B — What If / 2D Animation (20 Topics)
  // ==========================================
  { id: "topic-b-1", setId: "set-b", title: "What If Your Reaction Time Was 10x Faster?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-2", setId: "set-b", title: "What If You Had 500 IQ?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-3", setId: "set-b", title: "What If One Second Felt Like Ten?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-4", setId: "set-b", title: "What If One Second Felt Like Forever?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-5", setId: "set-b", title: "What If You Were Trapped in a Time Loop?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-6", setId: "set-b", title: "What If You Could Rewind 10 Seconds?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-7", setId: "set-b", title: "What If You Were Reborn with All Your Memories?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-8", setId: "set-b", title: "What If You Stopped Aging at 18?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-9", setId: "set-b", title: "What If You Aged Backwards?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-10", setId: "set-b", title: "What If You Were the Last Human on Earth?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-11", setId: "set-b", title: "What If Everyone Could Read Each Other’s Minds?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-12", setId: "set-b", title: "What If You Could See Who Will Betray You?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-13", setId: "set-b", title: "What If You Were the Luckiest Person in the World?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-14", setId: "set-b", title: "What If Every Lie You Told Became Reality?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-15", setId: "set-b", title: "What If Everything Got 10,000x Cheaper?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-16", setId: "set-b", title: "What If You Could Heal Everything?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-17", setId: "set-b", title: "What If We Live in a Simulation?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-18", setId: "set-b", title: "What If Everyone Else Had Zero EQ?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-19", setId: "set-b", title: "What If Everyone Had a Power Level — and Yours Was 1?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-b-20", setId: "set-b", title: "What If You Could Undo Every Mistake You Made?", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },

  // ==========================================
  // SET C: Character C — Monkey Explainer / Psychology (20 Topics)
  // ==========================================
  { id: "topic-c-1", setId: "set-c", title: "How to Become Dangerously Self-Educated — Explained by a Monkey", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-2", setId: "set-c", title: "Studying Is Hard Until You Build Systems Like These", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-3", setId: "set-c", title: "How to Learn More in 2 Hours Than Most People Do All Day", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-4", setId: "set-c", title: "How Monkey Got Addicted to Studying", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-5", setId: "set-c", title: "Don’t Delete Social Media — Do This Instead", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-6", setId: "set-c", title: "You’re Probably Wasting Your Youth", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-7", setId: "set-c", title: "30 Small Habits That Quietly Change a Monkey’s Life", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-8", setId: "set-c", title: "How to Train Your Monkey Brain to Enjoy Doing Hard Things", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-9", setId: "set-c", title: "The Night Routine That Ruins Every Morning", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-10", setId: "set-c", title: "Why You’re Always Tired Even When You Do Nothing", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-11", setId: "set-c", title: "How the Algorithm Hijacks Your Monkey Brain", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-12", setId: "set-c", title: "How to Rest and Recharge Properly — Explained by a Monkey", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-13", setId: "set-c", title: "How to Figure Out What You Actually Want in Life", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-14", setId: "set-c", title: "6 Things Monkey Did to Stop Wasting Evenings", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-15", setId: "set-c", title: "AI Investment Bubbles Explained Using Bananas", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-16", setId: "set-c", title: "The US National Debt Explained Using Bananas", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-17", setId: "set-c", title: "Tariff Wars Explained Using Bananas", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-18", setId: "set-c", title: "Credit Card Fees Explained Using Bananas", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-19", setId: "set-c", title: "RAM Prices Explained Using Bananas", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-c-20", setId: "set-c", title: "US Government Shutdowns Explained Using Bananas", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },

  // ==========================================
  // SET D: Character D — History 2D Explainer (20 Topics)
  // ==========================================
  { id: "topic-d-1", setId: "set-d", title: "Craziest Things Alexander the Great Did", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-2", setId: "set-d", title: "The Most Legendary Battles in History", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-3", setId: "set-d", title: "Historical Myths That Turned Out to Be Real", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-4", setId: "set-d", title: "Ancient Myths That Turned Out to Be True", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-5", setId: "set-d", title: "Urban Legends That Turned Out to Be True", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-6", setId: "set-d", title: "How History’s Greatest Warriors Died", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-7", setId: "set-d", title: "Completely Wrong History “Facts” You Probably Believe", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-8", setId: "set-d", title: "History’s Biggest Lies", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-9", setId: "set-d", title: "Facts That Sound Fake but Are Actually Real", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-10", setId: "set-d", title: "Ancient Mysteries That Were Finally Solved", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-11", setId: "set-d", title: "Greek Mythology Explained — From the Beginning", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-12", setId: "set-d", title: "The Origins of the Titans and Olympian Gods — Greek Mythology", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-13", setId: "set-d", title: "How Zeus Became King of the Gods — Greek Mythology", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-14", setId: "set-d", title: "The Titanomachy: Titans vs. Olympians — Greek Mythology", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-15", setId: "set-d", title: "The Story of the Cyclopes — Greek Mythology", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-16", setId: "set-d", title: "Achilles: The Myth Behind the Legendary Warrior", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-17", setId: "set-d", title: "Titanic Myths: What People Still Get Wrong", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-18", setId: "set-d", title: "Viking Myths: Separating History from Fiction", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-19", setId: "set-d", title: "Napoleon: Famous Myths vs. Historical Facts", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
  { id: "topic-d-20", setId: "set-d", title: "Survival Myths That Can Get You Killed", isActive: true, createdAt: "2026-11-08T00:00:00.000Z" },
];
