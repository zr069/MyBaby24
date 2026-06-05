// ──────────────────────────────────────────────
// U-Untersuchungen (U1–U9) nach G-BA Kinder-Richtlinie
// Quelle: Kinderuntersuchungsheft (Gelbes Heft), G-BA,
//         PDF "U-Heft_Digi.pdf" aus Projektordner
// Stand: 2026-06 (letzte inhaltliche Pruefung)
//
// Hinweis: Die Inhalte wurden aus dem offiziellen
// Kinderuntersuchungsheft extrahiert. Bei der PDF-Extraktion
// konnten nicht alle Tabellen vollstaendig gelesen werden
// (113 MB Scan-PDF). Die Daten wurden daher mit den offiziellen
// G-BA-Richtlinien und kindergesundheit-info.de abgeglichen.
// Details siehe docs/u-heft-extraction.md
// ──────────────────────────────────────────────

export interface UExamDefinition {
  key: string;
  name: string;
  fullName: string;
  ageRange: {
    fromDays: number;
    toDays: number;
    label: string;
  };
  toleranceRange?: {
    fromDays: number;
    toDays: number;
    label: string;
  };
  description: string;
  examAreas: string[];
  measurements: string[];
  development: string[];
  senses: string[];
  nutrition: string[];
  parentAdvice: string[];
  warnings: string[];
  prepareForVisit: string[];
  vaccineAdvice?: string;
  source: string;
}

export const U_EXAMINATIONS: UExamDefinition[] = [
  {
    key: 'U1',
    name: 'U1',
    fullName: 'U1 — Neugeborenen-Erstuntersuchung',
    ageRange: {
      fromDays: 0,
      toDays: 0,
      label: 'unmittelbar nach der Geburt',
    },
    description:
      'Erste Untersuchung direkt nach der Geburt. Beurteilung der Vitalitaet, Reifezeichen und Erkennung akut behandlungsbeduerftiger Zustaende.',
    examAreas: [
      'Beurteilung Vitalitaet (Apgar-Score nach 1, 5, 10 Minuten)',
      'Reifezeichen',
      'Erkennung lebensbedrohlicher Zustaende',
      'Fehlbildungsscreening (grobe Inspektion)',
      'Nabelschnur-pH',
      'Koerpermasse',
    ],
    measurements: ['Geburtsgewicht', 'Koerperlaenge', 'Kopfumfang'],
    development: ['Spontanbewegungen', 'Schreien', 'Muskeltonus'],
    senses: ['Pupillenreaktion (grob)'],
    nutrition: ['Erstes Anlegen / Stillen foerdern'],
    parentAdvice: [
      'Vitamin-K-Prophylaxe (1. Gabe: 2 mg oral)',
      'Bonding / Hautkontakt',
      'Information zum Neugeborenen-Screening',
      'Rachitisprophylaxe (Vitamin D) ab dem Folgetag',
    ],
    warnings: [
      'Atemnotsyndrom',
      'Schwere Fehlbildungen',
      'Geburtsverletzungen',
      'Hypoglykaeamie bei Risikofaktoren',
    ],
    prepareForVisit: [],
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U2',
    name: 'U2',
    fullName: 'U2 — Neugeborenen-Basisuntersuchung',
    ageRange: {
      fromDays: 3,
      toDays: 10,
      label: '3.–10. Lebenstag',
    },
    description:
      'Umfassende koerperliche Untersuchung des Neugeborenen. Erkennung angeborener Erkrankungen und Stoffwechselstoerungen.',
    examAreas: [
      'Koerperliche Untersuchung Kopf bis Fuss',
      'Haut (Ikterus, Haematome, Naevi)',
      'Herz-Kreislauf (Auskultation, Pulse)',
      'Abdomen (Leber, Milz, Nieren)',
      'Genitale',
      'Hueftgelenke (klinisch)',
      'Skelett und Wirbelsaeule',
      'Fontanellen',
    ],
    measurements: ['Gewicht', 'Laenge', 'Kopfumfang'],
    development: [
      'Muskeltonus',
      'Spontanmotorik',
      'Neugeborenenreflexe (Moro, Greifreflex, Suchreflex)',
    ],
    senses: [
      'Augen (Rotlichtreflex, Fehlstellungen)',
      'Hoerscreening (TEOAE/AABR)',
    ],
    nutrition: [
      'Stillberatung',
      'Trinkverhalten beurteilen',
      'Gewichtsverlauf seit Geburt',
    ],
    parentAdvice: [
      'Vitamin-K-Prophylaxe (2. Gabe)',
      'Vitamin-D- und Fluoridprophylaxe',
      'Neugeborenen-Screening (Blut) — falls nicht erfolgt',
      'Mukoviszidose-Screening',
      'Pulsoxymetrie-Screening (kritische Herzfehler)',
      'Hoerscreening',
      'Informationen zu Impfungen',
      'Unfallverhuetung (sicherer Schlafplatz, Rueckenlage)',
      'Hinweis auf Frueherkennungsuntersuchungen',
    ],
    warnings: [
      'Trinkschwaeche, Erbrechen',
      'Starke Gelbsucht (Ikterus)',
      'Gewichtsverlust > 10%',
      'Herzgeraeusch',
      'Hueftreifungsstoerung',
    ],
    prepareForVisit: [
      'Gelbes Heft mitbringen',
      'Fragen zur Ernaehrung und zum Schlafverhalten notieren',
    ],
    vaccineAdvice:
      'Information ueber Impfungen gemaess STIKO-Empfehlung. Erste Impfungen ab dem vollendeten 2. Lebensmonat.',
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U3',
    name: 'U3',
    fullName: 'U3 — 4.–5. Lebenswoche',
    ageRange: {
      fromDays: 22,
      toDays: 35,
      label: '4.–5. Lebenswoche',
    },
    toleranceRange: {
      fromDays: 21,
      toDays: 42,
      label: '3.–6. Lebenswoche (Toleranz)',
    },
    description:
      'Erste Vorsorge beim Kinderarzt/bei der Kinderaerztin. Beurteilung der Entwicklung, Ernaehrung und des Wachstums in den ersten Lebenswochen.',
    examAreas: [
      'Koerperliche Untersuchung (komplett)',
      'Haut',
      'Herz-Kreislauf',
      'Abdomen',
      'Genitale',
      'Hueftgelenke (klinisch + Sonographie)',
      'Fontanellen',
      'Mund und Gaumen',
    ],
    measurements: ['Gewicht', 'Laenge', 'Kopfumfang'],
    development: [
      'Muskeltonus',
      'Spontanmotorik',
      'Reflexe (Moro, asymmetrisch-tonischer Nackenreflex)',
      'Kopfkontrolle in Bauchlage',
      'Fixieren und Verfolgen mit den Augen',
    ],
    senses: [
      'Augen: Fixation, Folgebewegungen, Rotlichtreflex',
      'Reaktion auf Geraeusche',
      'Hoerscreening-Ergebnis kontrollieren',
    ],
    nutrition: [
      'Stillen / Flaschenernaehrung beurteilen',
      'Gewichtszunahme seit Geburt',
      'Stuhlverhalten',
    ],
    parentAdvice: [
      'Vitamin-K-Prophylaxe (3. Gabe)',
      'Vitamin-D-Prophylaxe fortfuehren',
      'Impfberatung fuer die anstehenden Impfungen',
      'Unfallverhuetung (Sturz vom Wickeltisch, Erstickungsgefahr)',
      'Schlafumgebung (Rueckenlage, Schlafsack, rauchfreie Umgebung)',
      'Foerderung der Eltern-Kind-Bindung',
    ],
    warnings: [
      'Trinkschwaeche',
      'Auffaellige Bewegungsmuster',
      'Keine Fixation / kein Blickkontakt',
      'Keine Reaktion auf Geraeusche',
      'Persistierender Ikterus',
      'Unzureichende Gewichtszunahme',
    ],
    prepareForVisit: [
      'Gelbes Heft mitbringen',
      'Ergebnisse des Neugeborenen-Screenings erfragen',
      'Hoerscreening-Befund mitbringen',
      'Fragen zur Ernaehrung und zum Schreien notieren',
    ],
    vaccineAdvice:
      'Impfberatung. Erste Impfungen (6-fach, Pneumokokken, Rotaviren) ab vollendetem 2. Lebensmonat geplant.',
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U4',
    name: 'U4',
    fullName: 'U4 — 3.–4. Lebensmonat',
    ageRange: {
      fromDays: 60,
      toDays: 120,
      label: '3.–4. Lebensmonat',
    },
    toleranceRange: {
      fromDays: 56,
      toDays: 133,
      label: '2.–4,5. Lebensmonat (Toleranz)',
    },
    description:
      'Untersuchung der altersgerechten Entwicklung. Besonderer Fokus auf Motorik, Interaktion und Reaktion auf Umweltreize.',
    examAreas: [
      'Koerperliche Untersuchung (komplett)',
      'Herz-Kreislauf',
      'Abdomen',
      'Haut',
      'Skelett, Wirbelsaeule',
      'Fontanellen',
    ],
    measurements: ['Gewicht', 'Laenge', 'Kopfumfang'],
    development: [
      'Kopfkontrolle in Bauchlage und beim Hochziehen',
      'Haende oeffnen sich spontan',
      'Greifen nach Gegenstaenden beginnt',
      'Soziales Laecheln',
      'Lautaeusserungen (Gurren, Vokalisation)',
    ],
    senses: [
      'Augen: Fixation, Folgebewegungen in alle Richtungen',
      'Hoeren: Reaktion auf Ansprache und Geraeusche',
    ],
    nutrition: [
      'Stillen/Flaschenernaehrung',
      'Gewichtszunahme beurteilen',
      'Ggf. Beikostberatung vorbereiten',
    ],
    parentAdvice: [
      'Impfungen durchfuehren (1. oder 2. Impftermin)',
      'Unfallverhuetung (Greifen, Rollen)',
      'Schlafempfehlungen',
      'Spielanregungen und Foerderung',
    ],
    warnings: [
      'Kein soziales Laecheln',
      'Keine Kopfkontrolle',
      'Asymmetrische Bewegungen',
      'Keine Reaktion auf Geraeusche',
      'Starkes Ueberstrecken',
      'Unzureichende Gewichtszunahme',
    ],
    prepareForVisit: [
      'Gelbes Heft und Impfpass mitbringen',
      'Fragen zu Schreien, Schlaf, Entwicklung notieren',
    ],
    vaccineAdvice:
      '1. oder 2. Impftermin gemaess STIKO: 6-fach-Impfung, Pneumokokken, Rotaviren.',
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U5',
    name: 'U5',
    fullName: 'U5 — 6.–7. Lebensmonat',
    ageRange: {
      fromDays: 150,
      toDays: 210,
      label: '6.–7. Lebensmonat',
    },
    toleranceRange: {
      fromDays: 140,
      toDays: 224,
      label: '5.–8. Lebensmonat (Toleranz)',
    },
    description:
      'Beurteilung der koerperlichen und geistigen Entwicklung. Besonderer Fokus auf Greifen, Drehen und Interaktion.',
    examAreas: [
      'Koerperliche Untersuchung (komplett)',
      'Herz-Kreislauf',
      'Abdomen',
      'Bewegungsapparat',
      'Haut',
    ],
    measurements: ['Gewicht', 'Laenge', 'Kopfumfang'],
    development: [
      'Drehen von Ruecken auf Bauch',
      'Gezieltes Greifen',
      'Umgreifen von einer Hand in die andere',
      'Abstuetzen auf Haenden in Bauchlage',
      'Lallen (Silbenketten)',
      'Fremdeln beginnt',
    ],
    senses: [
      'Augen: Strabismus-Screening',
      'Hoeren: Reaktion auf leise Geraeusche, Kopfwenden zur Schallquelle',
    ],
    nutrition: [
      'Beikost-Einfuehrung',
      'Allergiepraeventionsberatung',
      'Zahnpflege beginnt',
    ],
    parentAdvice: [
      'Impfstatus pruefen',
      'Unfallverhuetung (Greifen, Rollen, Verschlucken)',
      'Zahnpflege und Fluoridprophylaxe',
      'Schlafempfehlungen',
    ],
    warnings: [
      'Kein Greifen',
      'Kein Drehen',
      'Kein Lallen',
      'Kein Blickkontakt',
      'Schielen (Strabismus)',
      'Asymmetrien in der Bewegung',
    ],
    prepareForVisit: [
      'Gelbes Heft und Impfpass mitbringen',
      'Beobachtungen zur Entwicklung notieren',
    ],
    vaccineAdvice:
      'Impfstatus pruefen. Ggf. 3. Impftermin 6-fach und Pneumokokken.',
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U6',
    name: 'U6',
    fullName: 'U6 — 10.–12. Lebensmonat',
    ageRange: {
      fromDays: 270,
      toDays: 365,
      label: '10.–12. Lebensmonat',
    },
    toleranceRange: {
      fromDays: 252,
      toDays: 399,
      label: '9.–14. Lebensmonat (Toleranz)',
    },
    description:
      'Entwicklungsbeurteilung zum Ende des ersten Lebensjahres. Fokus auf Mobilität, Sprachentwicklung und Interaktion.',
    examAreas: [
      'Koerperliche Untersuchung (komplett)',
      'Herz-Kreislauf',
      'Bewegungsapparat',
      'Haut',
      'Zaehne und Mundhygiene',
    ],
    measurements: ['Gewicht', 'Laenge', 'Kopfumfang'],
    development: [
      'Hochziehen zum Stand',
      'Seitwaertsschritte an Moebeln (Cruising)',
      'Pinzettengriff',
      'Doppelsilben (Mama, Papa — unspezifisch)',
      'Verstaendnis einfacher Aufforderungen',
      'Winken, Zeigen',
    ],
    senses: [
      'Augen: Fixation, Folgebewegungen',
      'Hoeren: Reaktion auf Namensnennung, einfache Woerter',
    ],
    nutrition: [
      'Beikost und Familienkost',
      'Abstillen ggf. thematisieren',
      'Trinkverhalten',
    ],
    parentAdvice: [
      'Impfungen pruefen und vervollstaendigen',
      'Unfallverhuetung (Treppen, Steckdosen, Kleinteile)',
      'Sprachfoerderung',
      'Zahnpflege',
    ],
    warnings: [
      'Kein Hochziehen zum Stand',
      'Keine Doppelsilben',
      'Kein Zeigen/Winken',
      'Keine Reaktion auf Namensnennung',
      'Kein Pinzettengriff',
    ],
    prepareForVisit: [
      'Gelbes Heft und Impfpass mitbringen',
      'Fragen zum Laufen lernen und Sprache notieren',
    ],
    vaccineAdvice:
      'Impfstatus pruefen. Ab 11. Monat: 1. MMR + Varizellen. Meningokokken C.',
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U7',
    name: 'U7',
    fullName: 'U7 — 21.–24. Lebensmonat',
    ageRange: {
      fromDays: 630,
      toDays: 730,
      label: '21.–24. Lebensmonat (ca. 2 Jahre)',
    },
    toleranceRange: {
      fromDays: 588,
      toDays: 779,
      label: '20.–27. Lebensmonat (Toleranz)',
    },
    description:
      'Wichtige Vorsorge im Kleinkindalter. Beurteilung von Sprache, Motorik, Sozialverhalten und koerperlicher Gesundheit.',
    examAreas: [
      'Koerperliche Untersuchung (komplett)',
      'Bewegungsapparat',
      'Herz-Kreislauf',
      'Zaehne',
      'Haut',
    ],
    measurements: ['Gewicht', 'Laenge/Koerpergroesse', 'Kopfumfang'],
    development: [
      'Freies Laufen (sicher)',
      'Treppensteigen mit Festhalten',
      'Turm aus Bausteinen (mind. 3)',
      'Zwei-Wort-Saetze',
      'Wortschatz mind. 50 Woerter',
      'Zeigt auf benannte Gegenstaende',
      'Symbolspiel (So-tun-als-ob)',
    ],
    senses: [
      'Augen: Sehvermoegenspruefung',
      'Hoeren: Sprachverstaendnis als Indikator',
    ],
    nutrition: [
      'Familienkost',
      'Trinkverhalten',
      'Zahngesundheit',
    ],
    parentAdvice: [
      'Impfstatus pruefen (insb. MMR 2. Dosis, Varizellen 2. Dosis)',
      'Unfallverhuetung (Fenster, Treppen, Wasser, Verkehr)',
      'Sprachfoerderung (Vorlesen, Sprechen)',
      'Zahnarztbesuch empfehlen',
      'Medienkonsum begrenzen',
    ],
    warnings: [
      'Kein freies Laufen',
      'Weniger als 10 Woerter',
      'Kein Sprachverstaendnis',
      'Kein Interesse an anderen Kindern',
      'Auffaelligkeiten im Sozialverhalten',
    ],
    prepareForVisit: [
      'Gelbes Heft und Impfpass mitbringen',
      'Sorgen zur Sprachentwicklung oder zum Verhalten notieren',
    ],
    vaccineAdvice:
      '2. MMR und 2. Varizellen, falls noch nicht erfolgt. Impfstatus komplettieren.',
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U7a',
    name: 'U7a',
    fullName: 'U7a — 34.–36. Lebensmonat',
    ageRange: {
      fromDays: 1005,
      toDays: 1095,
      label: '34.–36. Lebensmonat (ca. 3 Jahre)',
    },
    toleranceRange: {
      fromDays: 945,
      toDays: 1155,
      label: '33.–38. Lebensmonat (Toleranz)',
    },
    description:
      'Zusaetzliche Vorsorge mit Fokus auf Sehvermögen, Sprachentwicklung und Sozialverhalten. Wichtig fuer fruehzeitige Foerderung vor dem Kindergartenalter.',
    examAreas: [
      'Koerperliche Untersuchung',
      'Sehtest (Sehschaerfe, Stereosehen)',
      'Sprachentwicklung',
      'Sozialverhalten',
      'Zaehne',
    ],
    measurements: ['Gewicht', 'Koerpergroesse'],
    development: [
      'Satzbildung (3+ Woerter)',
      'Verstaendliche Sprache',
      'Treppensteigen im Wechselschritt',
      'Malen (Kreise, Striche)',
      'An-/Ausziehen mit Hilfe',
      'Rollenspiel',
    ],
    senses: [
      'Sehtest (Amblyopie-Screening)',
      'Hoeren (Sprachentwicklung als Indikator)',
    ],
    nutrition: ['Ernaehrungsberatung', 'Zahngesundheit'],
    parentAdvice: [
      'Sehtest-Ergebnis besprechen',
      'Sprachfoerderung',
      'Kindergartenbesuch vorbereiten',
      'Medienkonsum',
    ],
    warnings: [
      'Schielen / Sehstoerung',
      'Kaum verstaendliche Sprache',
      'Keine Saetze',
      'Soziale Isolation',
      'Keine altersgemaesse Motorik',
    ],
    prepareForVisit: [
      'Gelbes Heft und Impfpass mitbringen',
      'Beobachtungen zum Spielverhalten und zur Sprache notieren',
    ],
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U8',
    name: 'U8',
    fullName: 'U8 — 46.–48. Lebensmonat',
    ageRange: {
      fromDays: 1370,
      toDays: 1460,
      label: '46.–48. Lebensmonat (ca. 4 Jahre)',
    },
    toleranceRange: {
      fromDays: 1310,
      toDays: 1520,
      label: '43.–50. Lebensmonat (Toleranz)',
    },
    description:
      'Umfassende Vorsorge im Vorschulalter. Beurteilung von Fein-/Grobmotorik, Sprache, Sozialverhalten und Schulreife-Vorbereitung.',
    examAreas: [
      'Koerperliche Untersuchung (komplett)',
      'Sehtest',
      'Hoertest',
      'Urinuntersuchung',
      'Blutdruckmessung (ab diesem Alter)',
      'Zaehne',
    ],
    measurements: ['Gewicht', 'Koerpergroesse', 'BMI'],
    development: [
      'Einbeinstand (mind. 3 Sekunden)',
      'Einbein-Huepfen',
      'Malen (Kreuz, Viereck, Kreis)',
      'Mensch-Zeichnung (Kopffuessler)',
      'Grammatikalisch korrekte Saetze',
      'Erzaehlen von Erlebnissen',
      'Selbststaendiges An-/Ausziehen',
    ],
    senses: [
      'Sehschaerfe (Einzeloptotypen)',
      'Stereosehen',
      'Hoertest (Audiometrie)',
    ],
    nutrition: [
      'Ernaehrungsberatung',
      'Gewichtsentwicklung beurteilen',
    ],
    parentAdvice: [
      'Impfstatus pruefen und Auffrischungen',
      'Unfallverhuetung (Verkehr, Fahrrad, Wasser)',
      'Medienkonsum',
      'Schulvorbereitung thematisieren',
      'Zahnarzt regelmaessig besuchen',
    ],
    warnings: [
      'Kein Einbeinstand',
      'Keine verstaendliche Sprache',
      'Keine Mensch-Zeichnung',
      'Einnaesung/Einkotung',
      'Verhaltensauffaelligkeiten',
      'Uebergewicht',
    ],
    prepareForVisit: [
      'Gelbes Heft und Impfpass mitbringen',
      'Fragen zur Kindergarten-Eingewoehnung oder zum Verhalten notieren',
    ],
    vaccineAdvice:
      'Impfstatus pruefen. Ggf. Auffrischimpfungen nachholen.',
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
  {
    key: 'U9',
    name: 'U9',
    fullName: 'U9 — 60.–64. Lebensmonat',
    ageRange: {
      fromDays: 1796,
      toDays: 1948,
      label: '60.–64. Lebensmonat (ca. 5 Jahre)',
    },
    toleranceRange: {
      fromDays: 1736,
      toDays: 2008,
      label: '58.–66. Lebensmonat (Toleranz)',
    },
    description:
      'Letzte Vorsorge vor der Einschulung. Umfassende Beurteilung der Schulfaehigkeit: Motorik, Sprache, Kognition und Sozialverhalten.',
    examAreas: [
      'Koerperliche Untersuchung (komplett)',
      'Sehtest',
      'Hoertest',
      'Urinuntersuchung',
      'Blutdruckmessung',
      'Zaehne und Gebissentwicklung',
    ],
    measurements: ['Gewicht', 'Koerpergroesse', 'BMI'],
    development: [
      'Einbeinstand (laenger als 5 Sekunden)',
      'Rueckwaerts gehen / Seiltaenzergang',
      'Mensch-Zeichnung (Kopf, Rumpf, Arme, Beine)',
      'Dreieck und Viereck nachmalen',
      'Grammatikalisch komplexe Saetze',
      'Erzaehlen zusammenhaengender Geschichten',
      'Farben benennen',
      'Zaehlen bis 10',
      'Selbststaendigkeit im Alltag',
    ],
    senses: [
      'Sehschaerfe (Reihenoptotypen)',
      'Stereosehen',
      'Farbensehen',
      'Hoertest',
    ],
    nutrition: [
      'Ernaehrungsberatung',
      'Gewichtsentwicklung / BMI',
    ],
    parentAdvice: [
      'Impfstatus vollstaendig pruefen vor Schulbeginn',
      'Auffrischimpfungen (Tetanus, Diphtherie, Pertussis, Polio)',
      'Schulvorbereitung',
      'Medienkonsum-Beratung',
      'Verkehrserziehung',
    ],
    warnings: [
      'Sprachentwicklungsstoerung',
      'Fein-/Grobmotorische Defizite',
      'Konzentrations-/Aufmerksamkeitsprobleme',
      'Sozial-emotionale Auffaelligkeiten',
      'Sehstoerung / Hoerstoerung',
      'Uebergewicht / Untergewicht',
    ],
    prepareForVisit: [
      'Gelbes Heft und Impfpass mitbringen',
      'Schulreife-Fragen notieren',
      'Kindergartenberichte mitnehmen (falls vorhanden)',
    ],
    vaccineAdvice:
      'Impfstatus vor Einschulung vollstaendig pruefen. Auffrischimpfungen: Tetanus, Diphtherie, Pertussis. Masernschutznachweis fuer Gemeinschaftseinrichtungen.',
    source: 'G-BA Kinder-Richtlinie, Kinderuntersuchungsheft',
  },
];

// Screenings that are part of newborn care
export interface ScreeningDefinition {
  key: string;
  name: string;
  timing: string;
  description: string;
  source: string;
}

export const NEWBORN_SCREENINGS: ScreeningDefinition[] = [
  {
    key: 'extended_newborn_screening',
    name: 'Erweitertes Neugeborenen-Screening',
    timing: '36.–72. Lebensstunde',
    description:
      'Blutentnahme aus der Ferse. Screening auf seltene angeborene Stoffwechsel- und Hormonstoerungen (z.B. Hypothyreose, PKU, AGS, Galaktosamie, u.a.).',
    source: 'G-BA Kinder-Richtlinie',
  },
  {
    key: 'cystic_fibrosis_screening',
    name: 'Mukoviszidose-Screening',
    timing: 'zusammen mit erweitertem NG-Screening',
    description:
      'Screening auf Mukoviszidose (Zystische Fibrose) aus derselben Blutprobe.',
    source: 'G-BA Kinder-Richtlinie',
  },
  {
    key: 'pulse_oximetry',
    name: 'Pulsoxymetrie-Screening',
    timing: '24.–48. Lebensstunde',
    description:
      'Messung der Sauerstoffsaettigung am Fuss. Screening auf kritische angeborene Herzfehler.',
    source: 'G-BA Kinder-Richtlinie',
  },
  {
    key: 'hearing_screening',
    name: 'Neugeborenen-Hoerscreening',
    timing: 'bis zum 3. Lebenstag',
    description:
      'TEOAE (otoakustische Emissionen) und/oder AABR. Fruehkennung von Hoerstoerungen.',
    source: 'G-BA Kinder-Richtlinie',
  },
  {
    key: 'hip_ultrasound',
    name: 'Hueftsonographie',
    timing: 'U3 (4.–5. Lebenswoche)',
    description:
      'Ultraschalluntersuchung der Hueftgelenke. Fruehkennung von Hueftreifungsstoerungen/Dysplasie.',
    source: 'G-BA Kinder-Richtlinie',
  },
];
