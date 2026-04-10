export type NavItem = {
  href: string;
  label: string;
};

export type ImageItem = {
  src: string;
  alt: string;
};

export type ServicePreview = {
  href: string;
  label: string;
  title: string;
  description: string;
  image: ImageItem;
};

export type ServiceSection = {
  title: string;
  description: string[];
  bullets?: string[];
  images: ImageItem[];
};

export type ServicePageData = {
  href: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroImage: ImageItem;
  sections: ServiceSection[];
  gallery: ImageItem[];
  callToActionLabel: string;
};

export const company = {
  name: 'Lemino',
  legalName: 'Lemino s.r.o.',
  email: 'lemino@lemino.sk',
  phoneDisplay: '+421 948 303 906',
  phoneHref: 'tel:+421948303906',
  addressLine1: 'Na Výslní 3/B',
  addressLine2: '821 09, Bratislava',
  fullAddress: 'Na Výslní 3/B, 821 09, Bratislava',
  ico: '53263014',
  dic: '2121371373',
  icDph: 'SK2121371373',
  facebook: 'https://www.facebook.com/lesenienaprenajom/',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664!2d17.1422!3d48.1492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8912a9fed895%3A0xc42f0fef761ac6c1!2sLemino+s.r.o.!5e0!3m2!1ssk!2ssk!4v1712345678901!5m2!1ssk!2ssk',
};

export const navigation: NavItem[] = [
  { href: '/', label: 'Domov' },
  { href: '/lesenie', label: 'Lešenie' },
  { href: '/stropne-debnenie', label: 'Stropné debnenie' },
  { href: '/stavebne-vytahy', label: 'Stavebné výťahy' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const stats = [
  { value: '15000 m2', label: 'Postavených lešení' },
  { value: '100 +', label: 'Spokojných zákazníkov' },
  { value: '100 +', label: 'Dokončených projektov' },
  { value: '5000 +', label: 'Použitých hmoždiniek' },
];

export const reasons = [
  'Ponúkame individuálny, zodpovedný a profesionálny prístup.',
  'Garantujeme bezpečnosť, kvalitu a maximálnu spokojnosť.',
  'Vytvoríme riešenie na mieru pre vašu stavbu alebo rekonštrukciu.',
  'Zabezpečíme dodanie a montážne práce za najlepšiu cenu.',
];

export const homeServicePreviews: ServicePreview[] = [
  {
    href: '/lesenie',
    label: 'Lešenie',
    title: 'Fasádne a mobilné lešenia',
    description:
      'Ponúkame montáž a prenájom fasádneho, priestorového, mobilného a špeciálneho lešenia. Využiť ho môžete pri zatepľovaní, murovaní, oprave komína alebo pri rekonštrukčných a montážnych prácach.',
    image: {
      src: '/media/lesenie_4-e1743107303233.jpg',
      alt: 'Fasádne lešenie Lemino na stavbe',
    },
  },
  {
    href: '/stropne-debnenie',
    label: 'Debnenie',
    title: 'Stropné debnenie',
    description:
      'Stropné debnenie je jednoduchý systém na zadebnenie vodorovných železobetónových konštrukcií, ktorý umožní zrealizovať akýkoľvek pôdorys a veľkosť.',
    image: {
      src: '/media/debnenie_2-e1743107761381.jpg',
      alt: 'Stropné debnenie na stavbe',
    },
  },
  {
    href: '/stavebne-vytahy',
    label: 'Výťahy a sklzy',
    title: 'Stavebné výťahy a sklzy',
    description:
      'Stavebné výťahy sú skvelou pomôckou nielen pre pokrývačov striech. Nasadenie môže byť kolmé alebo šikmé. Znižuje náklady a prácnosť pri preprave materiálu. Nosnosť až 250 kg.',
    image: {
      src: '/media/vytah-GEDA-lift-3-1.jpg',
      alt: 'Stavebný výťah GEDA na stavbe',
    },
  },
];

export const homeGallery: ImageItem[] = [
  { src: '/media/20241107_094459-EDIT.jpg', alt: 'Lešenie pri obnove fasády' },
  { src: '/media/photo_20220927_131730-1.jpg', alt: 'Zostava lešenia na objekte' },
  {
    src: '/media/20210802_105747-scaled-e1743100455804-2048x1396-1-e1743107163916.jpg',
    alt: 'Pracovné lešenie pri realizácii stavby',
  },
  { src: '/media/lesenia-lemino-6-scaled.jpg', alt: 'Lemino lešenie na veľkej stavbe' },
  {
    src: '/media/20220210_163600-3-scaled-e1743107790712.jpg',
    alt: 'Montáž lešenia pri novostavbe',
  },
  { src: '/media/debnenie_2-e1743107761381.jpg', alt: 'Debnenie stropnej dosky' },
  { src: '/media/lesenie_4-e1743107303233.jpg', alt: 'Fasádne lešenie v detailnom pohľade' },
  { src: '/media/lesenia-lemino-1-1-scaled-1.jpg', alt: 'Lešenie Lemino na bytovom dome' },
];

export const servicePages: Record<'lesenie' | 'stropneDebnenie' | 'stavebneVytahy', ServicePageData> = {
  lesenie: {
    href: '/lesenie',
    eyebrow: 'Montáž a prenájom lešenia',
    title: 'Lešenie',
    lead:
      'Riešime fasádne, mobilné aj montované lešenárske systémy tak, aby boli bezpečné, rýchle na nasadenie a ekonomické pre konkrétny projekt.',
    heroImage: {
      src: '/media/lesenie_1-e1681134827533.jpg',
      alt: 'Fasádne lešenie Lemino',
    },
    sections: [
      {
        title: 'Fasádne lešenia',
        description: [
          'Rámové lešenie PERI UP T 70 umožňuje hospodárne a technicky riešiť všetky lešenárske práce. Univerzálny systém spĺňa optimálne predpoklady pre možnosti horizontálnej aj vertikálnej kombinácie dielov. Systém PERI UP T 70 navyše ponúka osvedčenú kvalitu, jednoduchosť pri montáži a predovšetkým bezpečné stavebné fasádne riešenie.',
          'Cena prenájmu je individuálna v závislosti od veľkosti projektu a podmienok stavby.',
        ],
        bullets: [
          'Veľkosť polí lešenia 1 m, 1,5 m, 2,5 m a 3 m',
          'Doplnkové diely ako konzoly, premostenia a zastrešenie',
          'Montáž bez potreby náradia — diely do seba logicky zapadajú',
          'Možnosť projektu nasadenia lešenia pre vašu stavbu',
        ],
        images: [
          {
            src: '/media/lesenie_1-e1681134827533.jpg',
            alt: 'Fasádne lešenie na objekte',
          },
          {
            src: '/media/lemino-matadorka.png',
            alt: 'Lešenie Lemino Matadorka',
          },
        ],
      },
      {
        title: 'Mobilné lešenie',
        description: [
          'Mobilné hliníkové lešenia CUSTERS handy sú určené pre náročné podmienky v priemysle aj na stavbe. Výhodou je rýchla manipulácia a jednoduché presúvanie tam, kde to práve potrebujete.',
        ],
        bullets: [
          'Mobilita vďaka kolieskam',
          'Ľahké diely a jednoduchý transport',
          'Montáž bez náradia',
          'Výška podlahy lešenia až do 11 m',
        ],
        images: [
          {
            src: '/media/mobilne-hlinikove-lesenie-custers-handy-1-scaled-e1706733529104-622x1024-1.jpg',
            alt: 'Mobilné hliníkové lešenie',
          },
          {
            src: '/media/mobilne-lesenie-CUSTERS-HANDY.jpg',
            alt: 'Lešenie CUSTERS HANDY',
          },
        ],
      },
      {
        title: 'Montáž lešenia',
        description: [
          'K prenájmu zabezpečujeme aj montáž a demontáž lešenia. Máme skúsený tím lešenárov, ktorí sú pravidelne preškoľovaní a pri práci používajú rozum, nie skratky.',
          'Cena montáže a demontáže závisí od veľkosti projektu, náročnosti montáže a podmienok na stavbe.',
        ],
        images: [
          {
            src: '/media/20241107_094459-EDIT.jpg',
            alt: 'Montáž lešenia na fasáde',
          },
          {
            src: '/media/lesenia-lemino-8-scaled-1-e1743105811859.jpg',
            alt: 'Dokončené lešenie pri realizácii projektu',
          },
        ],
      },
    ],
    gallery: [
      { src: '/media/20241107_094459-EDIT.jpg', alt: 'Projekt lešenia 1' },
      { src: '/media/photo_20220927_131730-1.jpg', alt: 'Projekt lešenia 2' },
      { src: '/media/lesenia-lemino-8-scaled-1-e1743105811859.jpg', alt: 'Projekt lešenia 3' },
      { src: '/media/lesenia-lemino-6-scaled-1.jpg', alt: 'Projekt lešenia 4' },
      { src: '/media/20220915_105715.jpeg', alt: 'Projekt lešenia 5' },
      { src: '/media/bazovskeho.jpg', alt: 'Lešenie Bázovskeho' },
      { src: '/media/bazovskeho-lemino-lesenie.jpg', alt: 'Lešenie Lemino Bázovskeho' },
      { src: '/media/20250628_121044.jpg', alt: 'Projekt lešenia' },
    ],
    callToActionLabel: 'Objednať lešenie',
  },
  stropneDebnenie: {
    href: '/stropne-debnenie',
    eyebrow: 'Prenájom debniacich systémov',
    title: 'Stropné debnenie',
    lead:
      'Dodávame celé systémy stropného debnenia aj jednotlivé prvky tak, aby montáž prebehla rýchlo, presne a podľa kladačského plánu priamo pre vašu stavbu.',
    heroImage: {
      src: '/media/debnenie_2-e1743107761381.jpg',
      alt: 'Stropné debnenie Lemino',
    },
    sections: [
      {
        title: 'Kompletný systém debnenia',
        description: [
          'Prenajímame celý systém stropného debnenia PERI MULTIFLEX s použitím nosníkov GT 24 a VT 20, vysokonosných stojok PERI a DOKA a všetkého potrebného príslušenstva. Celý systém podopretia stropnej dosky je výhodný najmä pre rýchlu, presnú montáž, vysokú variabilitu a priaznivú cenu.',
          'Časti systému sú nasadené na stavbe na základe kladačského plánu, ktorý vám predložíme spolu s cenovou kalkuláciou.',
          'Jednotlivé časti systému — stojky, nosníky aj dosky — vám samozrejme vieme prenajať aj samostatne. Cena prenájmu kompletného systému je však oveľa výhodnejšia.',
        ],
        images: [
          {
            src: '/media/20250129_124835.jpg',
            alt: 'Nasadené debnenie na stavbe',
          },
          {
            src: '/media/20250128_100900.jpg',
            alt: 'Podopretie stropnej dosky systémom PERI',
          },
        ],
      },
      {
        title: 'Nosník GT 24',
        description: [
          'Priehradkový nosník stropného debnenia s vysokou pevnosťou a nosnosťou pre stropné aj stenové konštrukcie.',
        ],
        bullets: [
          'Výška 24 cm',
          'Dĺžky 0,9 m, 1,5 m, 2,4 m, 3 m, 3,3 m, 4,2 m a 4,8 m',
          'Použitie na debnenie stropných a stenových konštrukcií',
        ],
        images: [
          {
            src: '/media/nosnik-GT-24-2048x1152-1-1.jpg',
            alt: 'Nosník GT 24',
          },
        ],
      },
      {
        title: 'Stropné stojky PERI a DOKA',
        description: [
          'Stropné stojky PERI a DOKA sú oceľové stojky s plynulým nastavením dĺžky, ktoré sa používajú ako vertikálne podopretie dočasných konštrukcií.',
        ],
        bullets: [
          'Dĺžky stojok v ponuke: 250 cm, 300 cm, 350 cm, 400 cm, 550 cm',
          'Nosnosť stojok 20 kN až 35 kN',
        ],
        images: [
          {
            src: '/media/stropne-debnenie-peri-1-2048x1152-1-e1743101685343.jpg',
            alt: 'Stropné stojky PERI a DOKA',
          },
        ],
      },
      {
        title: 'Debniace dosky 3S',
        description: [
          'Debniace dosky 3S sú laminované 3-vrstvé lepené dosky, ktoré zaručujú presný a hladký povrch stropu.',
        ],
        bullets: [
          'Štandardná hrúbka dosky 21 mm',
          'Dĺžky 1,5 m, 2 m a 2,5 m',
        ],
        images: [
          {
            src: '/media/doska.png',
            alt: 'Debniaca doska 3S',
          },
        ],
      },
    ],
    gallery: [
      { src: '/media/debnenie_2-e1743107761381.jpg', alt: 'Debnenie projektu 1' },
      {
        src: '/media/stropne-debnenie-peri-1-2048x1152-1-e1743101685343.jpg',
        alt: 'Debnenie projektu 2',
      },
      {
        src: '/media/20160714_161517-scaled-e1743101758229.jpg',
        alt: 'Debnenie projektu 3',
      },
      {
        src: '/media/stropne-debnenie-prenajom-1-scaled-e1743101834191.jpg',
        alt: 'Debnenie projektu 4',
      },
    ],
    callToActionLabel: 'Dopyt na debnenie',
  },
  stavebneVytahy: {
    href: '/stavebne-vytahy',
    eyebrow: 'Zdvih a odsun materiálu',
    title: 'Stavebné výťahy',
    lead:
      'Výťahy, vrátky a sklzy výrazne zrýchľujú pohyb materiálu na stavbe a znižujú prácnosť tam, kde rozhoduje každé naloženie aj každý meter.',
    heroImage: {
      src: '/media/vytah-geda-lift-hero.jpg',
      alt: 'Stavebný výťah GEDA LIFT',
    },
    sections: [
      {
        title: 'Stavebné výťahy GEDA LIFT',
        description: [
          'Výťahy GEDA LIFT 250 sú ideálne zdvíhacie zariadenia nielen na stavbe. Montáž a demontáž prebieha rýchlo a bez použitia náradia.',
          'Výťah môže byť postavený v šikmom aj kolmom prevedení a umožňuje použitie rôznych nadstavieb pre prepravu rôznych materiálov.',
        ],
        bullets: [
          'Napájanie 230 V',
          'Maximálna výška pri šikmom nasadení 19 m',
          'Maximálna výška pri kolmom nasadení do 30 m',
          'Maximálna nosnosť 250 kg',
          'Príslušenstvo pre sypký materiál, tehlu aj väčšie prvky',
        ],
        images: [
          {
            src: '/media/vytah-geda-lift-lemino.jpg',
            alt: 'Výťah GEDA LIFT 250 Lemino',
          },
          {
            src: '/media/vytah-geda-lift-scaled-1.jpg',
            alt: 'Výťah GEDA pri práci',
          },
        ],
      },
      {
        title: 'Stavebné vrátky',
        description: [
          'Vrátok GEDA Star 150 comfort s otočným ramenom je možné primontovať na lešenie, do okna medzi poschodiami alebo na strechu.',
        ],
        bullets: ['Maximálna pracovná výška 50 m', 'Maximálna nosnosť vrátku 150 kg'],
        images: [
          {
            src: '/media/3-5.jpg',
            alt: 'Stavebný vrátok GEDA Star 150 comfort',
          },
          {
            src: '/media/vratok-geda-star.jpg',
            alt: 'Vrátok GEDA Star na stavbe',
          },
        ],
      },
      {
        title: 'Sklzy na stavebnú suť',
        description: [
          'Sklzy na suť preberajú funkciu lievika, ktorým možno materiál z horných poschodí dopraviť dole do kontajnera alebo na nákladné auto bez veľkého prachu a hluku.',
          'Jednotlivé diely je možné skladať do sutinového tubusu a prispôsobiť ich výške staveniska aj spôsobu uchytenia.',
        ],
        images: [
          {
            src: '/media/2-4.jpg',
            alt: 'Sklz na stavebnú suť',
          },
          {
            src: '/media/1-5.jpg',
            alt: 'Diely sklzu na suť',
          },
        ],
      },
    ],
    gallery: [
      { src: '/media/vytah-GEDA-lift-3-1.jpg', alt: 'Výťah projekt 1' },
      { src: '/media/vytah-geda-lift-scaled-1.jpg', alt: 'Výťah projekt 2' },
      { src: '/media/bazovskeho-vytah.jpg', alt: 'Výťah GEDA na Bázovskeho' },
      { src: '/media/3-5.jpg', alt: 'Vrátok projekt 3' },
      { src: '/media/2-4.jpg', alt: 'Sklz projekt 4' },
      { src: '/media/1-5.jpg', alt: 'Sklz projekt 5' },
    ],
    callToActionLabel: 'Objednať výťah',
  },
};

export const team = [
  {
    name: 'Marián Hollý',
    role: 'Majiteľ a teamleader',
    image: '/media/28947556_10211867093934514_1809026356286921461_o-e1681137421870-300x281-1-150x150.jpg',
    bio: 'Pochádza zo stavebníckej rodiny. Prakticky celý život je pri fasádach a na stavbe. Keď si s vami podá ruku, berie to osobne a zodpovedne.',
  },
  {
    name: 'Veronika Lesňáková',
    role: 'Asistentka',
    image: '/media/50241651_10210880308924067_8713290768615211008_n-300x300-1-150x150.jpg',
    bio: 'Stará sa o administratívu, termíny a fakturáciu. Má technické myslenie, rozumie číslam a drží firme poriadok v zázemí.',
  },
  {
    name: 'Boris Holečka',
    role: 'Vedúci technik',
    image: '/media/boris-holecka.jpg',
    bio: 'Zabezpečuje plynulý chod prác a bezpečnosť v každom momente. Je to človek, na ktorého sa dá pokojne spoľahnúť.',
  },
];

export const privacySections = [
  {
    title: 'I. Kontaktný formulár',
    paragraphs: [
      'Na stránke prevádzkujeme kontaktný formulár, ktorého účelom je umožniť vám položiť otázku k našim produktom a službám alebo požiadať o cenovú ponuku.',
      'Spracúvame meno a priezvisko, e-mailovú adresu a telefónne číslo, aby sme vás mohli kontaktovať a reagovať na váš dopyt.',
      'Právnym základom je článok 6 ods. 1 písm. b) GDPR. Údaje uchovávame maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.',
    ],
  },
  {
    title: 'II. Súbory cookies',
    paragraphs: [
      'Na našej webovej stránke používame nevyhnutné cookies pre základnú funkčnosť a štatistické cookies na pochopenie používania stránky, a to len so súhlasom používateľa.',
      'Súhlas so štatistickými cookies môže používateľ kedykoľvek odvolať prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.',
    ],
  },
  {
    title: 'III. Práva dotknutej osoby',
    paragraphs: [
      'Podľa GDPR máte právo na prístup k údajom, opravu, vymazanie, obmedzenie spracovania, prenosnosť údajov a odvolanie súhlasu.',
      'V prípade otázok alebo uplatnenia práv nás môžete kontaktovať e-mailom na lemino@lemino.sk alebo telefonicky na +421 948 303 906.',
      'Sťažnosť môžete podať aj na Úrad na ochranu osobných údajov SR.',
    ],
  },
];
