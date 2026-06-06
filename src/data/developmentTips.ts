import { DevelopmentTip } from '@/lib/types';

export const DEVELOPMENT_TIPS: DevelopmentTip[] = [
  // ── Physisch: 0-3 Monate ──────────────────
  {
    id: 'tummy-time',
    title: 'Bauchlage (Tummy Time)',
    category: 'physical',
    ageFromDays: 0,
    ageToDays: 365,
    shortDescription: 'Staerkt Nacken-, Schulter- und Rueckenmuskulatur.',
    fullDescription:
      'Tummy Time ist eine der wichtigsten Uebungen fuer Babys. In der Bauchlage lernt dein Baby, den Kopf zu heben und zu drehen. Das staerkt die Muskeln, die spaeter fuer Drehen, Krabbeln und Sitzen gebraucht werden.',
    steps: [
      'Baby wach und nach dem Fuettern (ca. 30 Min warten) auf den Bauch legen',
      'Weiche Unterlage verwenden (Spieldecke, nicht zu weiches Kissen)',
      'Anfangs nur 1-2 Minuten, langsam steigern',
      'Augenkontakt halten und mit dem Baby sprechen',
      'Spielzeug oder Kontrastbilder in Blickrichtung legen',
      'Wenn Baby weint: kurze Pause, dann erneut versuchen',
    ],
    duration: 'Anfangs 1-2 Min, Ziel: 3x taeglich bis zu 10-15 Min',
    frequency: 'Mehrmals taeglich',
    source: 'kindergesundheit-info.de (BZgA)',
  },
  {
    id: 'skin-to-skin',
    title: 'Hautkontakt / Bonding',
    category: 'physical',
    ageFromDays: 0,
    ageToDays: 180,
    shortDescription: 'Foerdert Bindung, Waermeregulation und Beruhigung.',
    fullDescription:
      'Direkter Hautkontakt (Haut an Haut) hilft dem Baby bei der Waermeregulation, beruhigt und foerdert die Eltern-Kind-Bindung. Beide Elternteile koennen und sollten Hautkontakt anbieten.',
    steps: [
      'Baby nur mit Windel bekleidet auf die nackte Brust legen',
      'Mit einer Decke zudecken',
      'Ruhig atmen und das Baby spueren lassen',
      'Ideal nach dem Baden oder in ruhigen Momenten',
    ],
    duration: 'So lange wie angenehm, mind. 20 Minuten',
    frequency: 'Taeglich',
  },
  {
    id: 'gentle-massage',
    title: 'Babymassage',
    category: 'physical',
    ageFromDays: 14,
    ageToDays: 365,
    shortDescription: 'Foerdert Koerperwahrnehmung und Entspannung.',
    fullDescription:
      'Sanfte Massage foerdert die Durchblutung, hilft bei Blaehungen und staerkt die Bindung. Verwende ein mildes Babyoel und massiere mit sanftem Druck.',
    steps: [
      'Warmen, ruhigen Raum waehlen',
      'Etwas Babyoel in die Haende nehmen und waermen',
      'Mit sanften, streichenden Bewegungen an den Beinen beginnen',
      'Ueber Bauch (im Uhrzeigersinn) streichen',
      'Arme und Haende sanft massieren',
      'Auf Signale des Babys achten — aufhoeren wenn es unruhig wird',
    ],
    duration: '5-15 Minuten',
    frequency: '1-2x taeglich',
  },
  {
    id: 'supported-sitting',
    title: 'Gestuetztes Sitzen',
    category: 'physical',
    ageFromDays: 90,
    ageToDays: 270,
    shortDescription: 'Staerkt Rumpfmuskulatur und Gleichgewicht.',
    fullDescription:
      'Ab ca. 3-4 Monaten kann das Baby im Schoss oder zwischen den Beinen gestuetzt sitzen. Das trainiert die Rumpfmuskulatur und bereitet auf das freie Sitzen vor.',
    steps: [
      'Baby in deinen Schoss setzen, Ruecken an deinen Bauch',
      'Oder: zwischen deinen ausgestreckten Beinen auf dem Boden sitzen',
      'Baby an der Huefte/am Rumpf leicht stuetzen',
      'Spielzeug anbieten, das gegriffen werden kann',
    ],
    duration: '5-10 Minuten',
    frequency: 'Mehrmals taeglich',
  },

  // ── Kognitiv: 0-3 Monate ──────────────────
  {
    id: 'contrast-images',
    title: 'Kontrastbilder anschauen',
    category: 'cognitive',
    ageFromDays: 0,
    ageToDays: 120,
    shortDescription: 'Foerdert Sehentwicklung und visuelle Aufmerksamkeit.',
    fullDescription:
      'Neugeborene sehen am besten in ca. 20-30 cm Entfernung und reagieren stark auf hohe Kontraste. Schwarz-weisse Bilder mit einfachen Mustern (Streifen, Kreise, Schachbrett) regen die Sehentwicklung an.',
    steps: [
      'Schwarz-weisse Kontrastkarten oder -buecher besorgen',
      'In 20-30 cm Abstand zeigen',
      'Langsam von einer Seite zur anderen bewegen',
      'Beobachten, ob das Baby dem Bild folgt',
      'Ab ca. 6-8 Wochen auch einfache Farben (rot, gruen) ergaenzen',
    ],
    duration: '2-5 Minuten pro Session',
    frequency: 'Mehrmals taeglich',
  },
  {
    id: 'talking-singing',
    title: 'Sprechen und Singen',
    category: 'language',
    ageFromDays: 0,
    ageToDays: 1825,
    shortDescription: 'Foerdert Sprachentwicklung und Bindung.',
    fullDescription:
      'Babys lernen Sprache durch Zuhoeren. Sprich viel mit deinem Baby — beim Wickeln, Fuettern, Spazierengehen. Beschreibe was du tust. Singe Lieder. Das Baby versteht die Woerter noch nicht, aber es lernt Melodie, Rhythmus und Satzstruktur.',
    steps: [
      'Bei Alltagshandlungen kommentieren: "Jetzt ziehen wir die Socken an"',
      'Blickkontakt halten beim Sprechen',
      'Auf Lautaeusserungen des Babys eingehen und "antworten"',
      'Einfache Lieder und Reime wiederholen',
      'Bilderbuecher vorlesen — auch wenn das Baby noch nicht versteht',
    ],
    frequency: 'Den ganzen Tag',
    source: 'kindergesundheit-info.de',
  },
  {
    id: 'reading',
    title: 'Vorlesen',
    category: 'language',
    ageFromDays: 0,
    ageToDays: 1825,
    shortDescription: 'Foerdert Sprachverstaendnis, Wortschatz und Konzentration.',
    fullDescription:
      'Vorlesen gehoert zu den wirksamsten Foerdermassnahmen. Schon Neugeborene profitieren von der Stimme und dem Rhythmus. Spaeter lernen Kinder Woerter, Zusammenhaenge und Fantasie. Tipp: Mach es zum taeglichen Ritual, z.B. vor dem Schlafen.',
    steps: [
      'Bilderbuecher mit grossen, klaren Bildern waehlen',
      'Baby auf den Schoss nehmen',
      'Bilder zeigen und benennen',
      'Stimme variieren (verschiedene Figuren)',
      'Kind die Seiten umblaetern lassen (ab ca. 6 Monaten)',
    ],
    duration: '5-15 Minuten',
    frequency: 'Taeglich, idealerweise als Ritual',
    source: 'Stiftung Lesen',
  },

  // ── Kognitiv: 3-12 Monate ─────────────────
  {
    id: 'object-permanence',
    title: 'Guck-Guck-Spiel (Objektpermanenz)',
    category: 'cognitive',
    ageFromDays: 120,
    ageToDays: 365,
    shortDescription: 'Lehrt, dass Dinge existieren auch wenn man sie nicht sieht.',
    fullDescription:
      'Das Guck-Guck-Spiel (Peek-a-Boo) ist nicht nur lustig, sondern foerdert das Verstaendnis von Objektpermanenz — ein wichtiger kognitiver Meilenstein. Das Baby lernt: Mama/Papa ist noch da, auch wenn das Gesicht verdeckt ist.',
    steps: [
      'Gesicht hinter den Haenden verstecken',
      '"Guck-guck!" sagen und Haende wegnehmen',
      'Variante: Tuch ueber Spielzeug legen, Baby suchen lassen',
      'Variante: Hinter einem Moebelstueck verstecken',
    ],
    frequency: 'Mehrmals taeglich im Spiel',
  },
  {
    id: 'cause-effect',
    title: 'Ursache und Wirkung entdecken',
    category: 'cognitive',
    ageFromDays: 120,
    ageToDays: 545,
    shortDescription: 'Baby lernt: Mein Handeln hat Konsequenzen.',
    fullDescription:
      'Spielzeug, das auf Aktionen reagiert (Rassel schuetteln = Geraeusch, Knopf druecken = Musik) lehrt Babys den Zusammenhang zwischen Handlung und Ergebnis.',
    steps: [
      'Rasseln und Greiflinge anbieten',
      'Spieluhren mit einfachen Mechanismen',
      'Gemeinsam mit Bausteinen Tuerme bauen und umwerfen',
      'Wasser schuetten, Sachen fallen lassen (Phase!)',
    ],
    frequency: 'Im taeglichen Spiel',
  },

  // ── Sozial ────────────────────────────────
  {
    id: 'eye-contact',
    title: 'Blickkontakt und Fixation',
    category: 'social',
    ageFromDays: 0,
    ageToDays: 120,
    shortDescription: 'Grundlage fuer soziale Kommunikation und Bindung.',
    fullDescription:
      'Blickkontakt ist einer der ersten Wege, wie Babys mit ihrer Umwelt kommunizieren. Neugeborene koennen Gesichter in ca. 20-30 cm Entfernung erkennen — genau der Abstand beim Stillen oder Fuettern. Wenn dein Baby dein Gesicht fixiert und dir in die Augen schaut, ist das ein wichtiger Entwicklungsschritt.',
    steps: [
      'Beim Fuettern Blickkontakt suchen',
      'Gesicht nah (20-30 cm) ans Baby halten',
      'Langsam den Kopf bewegen — schaut das Baby mit?',
      'Laecheln und in ruhigem Ton sprechen',
      'Ab ca. 6-8 Wochen erwidert das Baby das Laecheln',
    ],
    frequency: 'Bei jeder Interaktion',
  },

  // ── Physisch: 6-12 Monate ─────────────────
  {
    id: 'crawling-prep',
    title: 'Krabbelspiele',
    category: 'physical',
    ageFromDays: 150,
    ageToDays: 365,
    shortDescription: 'Motiviert zum Bewegen und foerdert Koordination.',
    fullDescription:
      'Viele Babys beginnen zwischen 6 und 10 Monaten zu krabbeln. Du kannst die Motivation foerdern, indem du Spielzeug knapp ausser Reichweite legst und eine sichere Umgebung zum Erkunden schaffst.',
    steps: [
      'Spielzeug knapp ausser Reichweite legen',
      'Auf dem Boden gemeinsam spielen',
      'Tunnel oder Kissen-Parcours aufbauen',
      'Sichere Umgebung schaffen (Steckdosen, scharfe Kanten)',
    ],
    frequency: 'Taeglich freies Spielen auf dem Boden',
  },

  // ── Kognitiv: 12+ Monate ──────────────────
  {
    id: 'counting-play',
    title: 'Spielerisch Zaehlen',
    category: 'cognitive',
    ageFromDays: 365,
    ageToDays: 1825,
    shortDescription: 'Erstes Zahlenverstaendnis durch Alltagssituationen.',
    fullDescription:
      'Zaehle im Alltag laut mit: Treppenstufen, Bausteeine, Obstscheiben. Kinder lernen Zahlen zunaechst als Woerter kennen, das Mengenverstaendnis kommt spaeter.',
    steps: [
      'Beim Treppensteigen jede Stufe mitzaehlen',
      'Beim Essen: "Hier sind 3 Erdbeeren — eins, zwei, drei!"',
      'Bausteintuerme bauen und Steine zaehlen',
      'Fingerreime und Zahllieder singen',
    ],
    frequency: 'Im Alltag einbauen',
  },
  {
    id: 'letter-discovery',
    title: 'Buchstaben entdecken',
    category: 'cognitive',
    ageFromDays: 730,
    ageToDays: 1825,
    shortDescription: 'Erstes Buchstabenverstaendnis durch Spiel und Buecher.',
    fullDescription:
      'Ab ca. 2-3 Jahren beginnen manche Kinder, Buchstaben zu erkennen — besonders die im eigenen Namen. Foerdere das spielerisch ohne Druck. Manche Kinder sind frueher interessiert, andere spaeter — beides ist normal.',
    steps: [
      'Den Namen des Kindes an die Zimmertuer haengen',
      'ABC-Buecher gemeinsam anschauen',
      'Buchstaben-Magnete am Kuehlschrank',
      'Im Alltag: "Schau, da steht ein A — wie bei Arian!"',
      'Nicht forcieren — Interesse des Kindes folgen',
    ],
    frequency: 'Wenn das Kind Interesse zeigt',
  },
];

// Helper: Get tips relevant for a specific age
export function getTipsForAge(ageDays: number): DevelopmentTip[] {
  return DEVELOPMENT_TIPS.filter(t => ageDays >= t.ageFromDays && ageDays <= t.ageToDays);
}

// Helper: Get tips by category
export function getTipsByCategory(tips: DevelopmentTip[], category: DevelopmentTip['category']): DevelopmentTip[] {
  return tips.filter(t => t.category === category);
}

export function getCategoryLabel(cat: DevelopmentTip['category']): string {
  switch (cat) {
    case 'physical': return 'Koerperlich / Motorik';
    case 'cognitive': return 'Kognitiv / Lernen';
    case 'social': return 'Sozial / Emotional';
    case 'language': return 'Sprache / Kommunikation';
  }
}

export function getCategoryIcon(cat: DevelopmentTip['category']): string {
  switch (cat) {
    case 'physical': return '\u{1F3CB}';
    case 'cognitive': return '\u{1F9E0}';
    case 'social': return '\u{1F91D}';
    case 'language': return '\u{1F4AC}';
  }
}
