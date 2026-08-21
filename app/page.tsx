"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "ru" | "en" | "sv";
type ProjectKey = "ostrov" | "laboris" | "nordic";
type ProjectStatus = "progress" | "completed";
type Filter = "all" | ProjectStatus;

const SOCIAL = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
};

const content = {
  ru: {
    nav: { work: "Проекты", about: "Обо мне", skills: "Навыки", contact: "Контакты" },
    statusLine: "Открыт к новым возможностям",
    heroTitle: "Frontend / Full-Stack разработчик",
    heroAccent: "& UI/UX дизайнер",
    heroIntro: "Проектирую и создаю цифровые продукты — от первой UX-идеи до запуска.",
    heroDetail: "Фокусируюсь на React, Next.js, TypeScript, продуктовом дизайне и full-stack разработке.",
    location: "Норрботтен, Швеция",
    availability: "Лулео · гибридно · удалённо",
    viewWork: "Смотреть проекты",
    selectedKicker: "Избранные проекты",
    selectedTitle: "Продукты, которые я спроектировал и создал",
    selectedIntro: "Здесь дизайн-мышление соединяется с frontend-разработкой, архитектурой и реальными бизнес-задачами.",
    filters: { all: "Все", progress: "В работе", completed: "Завершены" },
    projectLabels: { progress: "В работе", completed: "Завершён" },
    roleLabel: "Моя роль",
    caseStudy: "Открыть кейс",
    visit: "Открыть сайт",
    projects: {
      ostrov: {
        title: "OstrovUA",
        subtitle: "Платформа сообщества и верификации",
        description: "Цифровая система для координации общественных проектов, проверки вкладов и прозрачной модерации.",
        role: "Продукт · UI/UX · Frontend · Backend · Mobile",
        intro: "OstrovUA строит прозрачную цифровую инфраструктуру вокруг подтверждённого участия. Пользователь может найти проект, присоединиться, выполнить работу, предоставить доказательства и получить независимую проверку.",
        challenge: "Общественные инициативы часто опираются на разрозненную коммуникацию, ручную координацию и неясную историю вкладов. Задача — сделать каждое действие понятным, проверяемым и доступным для аудита.",
        flow: ["Найти проект", "Присоединиться", "Выполнить вклад", "Отправить доказательства", "Проверка модератором", "Подтверждение", "История вклада"],
        details: [
          ["Роли и доверие", "Участник отправляет результат, координатор управляет активностью, модератор принимает решение, а слой аудита сохраняет историю. Самопроверка исключена правилами конфликта интересов."],
          ["Дизайн-система", "Повторно используемые компоненты, статусы, формы, таблицы и инструменты модерации создают единый опыт на desktop, tablet и mobile."],
          ["Архитектура", "Next.js и TypeScript на интерфейсе, NestJS API, PostgreSQL и Prisma для данных, Redis/BullMQ для фоновых задач, Supabase Auth, Docker и Cloudflare."],
          ["Mobile", "SwiftUI-прототип переосмысливает ключевые сценарии для нативного iOS-опыта, а не просто копирует web-интерфейс."],
        ],
      },
      laboris: {
        title: "Laboris",
        subtitle: "Платформа прозрачного поиска работы",
        description: "Отзывы о работодателях, рейтинги и проверенные данные, которые помогают выбрать работу без неприятных сюрпризов.",
        role: "Продукт · UI/UX · Full-Stack · AI-модерация",
        intro: "Laboris помогает кандидатам оценить работодателя до отклика: увидеть честные отзывы, текучесть кадров, качество управления и прозрачность условий.",
        challenge: "Информация о работодателях разрознена, а публичным отзывам часто не хватает контекста и доверия. Продукт должен защищать анонимность автора и одновременно снижать количество фейковых публикаций.",
        flow: ["Найти компанию", "Изучить рейтинг", "Проверить сигналы риска", "Прочитать отзывы", "Сравнить условия", "Принять решение"],
        details: [
          ["Trust layer", "Публичные источники, модерация, проверка контекста и прозрачные критерии рейтинга помогают отделять полезный сигнал от шума."],
          ["Для кандидатов", "Текучесть кадров, work-life balance, зарплатная прозрачность, качество менеджмента и стабильность собраны в одном понятном профиле."],
          ["Безопасность", "Анонимная публикация и приватность автора заложены в продуктовый сценарий, а не добавлены поверх готового интерфейса."],
          ["Интерфейс", "Быстрый поиск по компаниям и городам, компактные карточки, ясная иерархия и адаптивный mobile-first опыт."],
        ],
      },
      nordic: {
        title: "Nordic Eatery",
        subtitle: "Цифровая платформа ресторана",
        description: "Мультиязычный ресторанный продукт с аутентификацией, платежами, заказами и транзакционными письмами.",
        role: "UI/UX · Frontend · Full-Stack · Deployment",
        intro: "Nordic Eatery объединяет презентацию ресторана и полный цифровой путь клиента — от выбора блюда до оплаты, подтверждения и получения чека.",
        challenge: "Нужно было выйти за рамки landing page и собрать production-продукт: адаптивный каталог, четыре языка, аккаунт клиента, checkout, платежи, чеки и SEO.",
        flow: ["Открыть меню", "Выбрать блюда", "Войти", "Оформить заказ", "Оплатить", "Проверить платёж", "Получить чек"],
        details: [
          ["Mobile first", "Большинство гостей открывают меню со смартфона, поэтому путь заказа сначала спроектирован для маленького экрана, сохраняя сильный desktop-опыт."],
          ["Четыре языка", "Шведский, английский, польский и русский встроены в архитектуру приложения без дублирования отдельных страниц."],
          ["Платежи и доступ", "Supabase управляет аутентификацией и данными, Stripe и Swish формируют платёжный слой, а Resend доставляет транзакционные письма."],
          ["Production и SEO", "Vercel, metadata, Restaurant JSON-LD, мультиязычная маршрутизация и проверка checkout-сессии после успешной оплаты."],
        ],
      },
    },
    aboutKicker: "Обо мне",
    aboutTitle: "Мне нравится работать на стыке дизайна и инженерии.",
    aboutText: "Мой опыт объединяет computer science, UI/UX и практическую продуктовую разработку. Я превращаю идею в исследование, пользовательский сценарий, интерфейс, frontend, backend и production-решение.",
    aboutNote: "Особенно интересны команды, где разработчики участвуют в продуктовых решениях, а не только реализуют готовые макеты.",
    lookingFor: "Ищу возможности",
    roles: ["Frontend Developer", "Full-Stack Developer", "Product Developer", "UI Engineer"],
    process: ["Исследование", "User flow", "Интерфейс", "Прототип", "Frontend", "Backend", "Production"],
    skillsKicker: "Технологии",
    skillsTitle: "Инструменты для полного продуктового цикла",
    skillGroups: [
      ["Frontend", ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/UI"]],
      ["Backend & Data", ["Node.js", "NestJS", "PostgreSQL", "Prisma", "Supabase", "Redis", "REST APIs"]],
      ["Design & UI/UX", ["Figma", "Wireframing", "Prototyping", "Design Systems", "Responsive Design", "User Flows"]],
      ["Infrastructure", ["Git", "Docker", "Vercel", "Cloudflare", "Sentry", "OpenTelemetry"]],
      ["Mobile", ["Swift", "SwiftUI"]],
    ],
    aiTitle: "AI-assisted development",
    aiText: "Использую современные AI-инструменты для быстрого прототипирования, исследования кода, реализации, отладки и рефакторинга. AI ускоряет процесс — продуктовые решения, архитектура и финальная реализация требуют инженерного мышления.",
    education: "Образование",
    degree: "Бакалавр компьютерных наук",
    university: "Донецкий национальный университет",
    languagesTitle: "Языки",
    languages: [["Русский", "Родной"], ["Английский", "Рабочий уровень"], ["Шведский", "Базовый · изучаю"]],
    contactKicker: "Контакты",
    contactTitle: "Есть продукт, который нужно создать? Или команда, которой я могу помочь?",
    contactText: "Сейчас я открыт к предложениям во frontend, full-stack и продуктовой разработке.",
    email: "Написать мне",
    close: "Закрыть",
    overview: "Обзор",
    challenge: "Задача",
    productFlow: "Продуктовый сценарий",
  },
  en: {
    nav: { work: "Work", about: "About", skills: "Skills", contact: "Contact" },
    statusLine: "Available for new opportunities",
    heroTitle: "Frontend / Full-Stack Developer",
    heroAccent: "& UI/UX Designer",
    heroIntro: "I design and build digital products from the first UX idea to production.",
    heroDetail: "Focused on React, Next.js, TypeScript, product design and full-stack development.",
    location: "Norrbotten, Sweden",
    availability: "Luleå · hybrid · remote",
    viewWork: "View selected work",
    selectedKicker: "Selected work",
    selectedTitle: "Products I’ve designed and built",
    selectedIntro: "Work where design thinking meets frontend development, architecture and real business needs.",
    filters: { all: "All", progress: "In progress", completed: "Completed" },
    projectLabels: { progress: "In progress", completed: "Completed" },
    roleLabel: "My role",
    caseStudy: "View case study",
    visit: "Visit website",
    projects: {
      ostrov: {
        title: "OstrovUA",
        subtitle: "Community & Verification Platform",
        description: "A digital system for coordinating community projects, verifying contributions and creating transparent moderation workflows.",
        role: "Product · UI/UX · Frontend · Backend · Mobile",
        intro: "OstrovUA builds transparent digital infrastructure around verified participation. People can discover a project, join, complete work, submit evidence and receive an independent review.",
        challenge: "Community initiatives often rely on fragmented communication, manual coordination and unclear contribution records. The goal was to make every action understandable, verifiable and auditable.",
        flow: ["Discover", "Join", "Contribute", "Submit evidence", "Moderator review", "Approval", "Contribution history"],
        details: [
          ["Roles & trust", "Participants submit results, coordinators manage activity, moderators make decisions, and the audit layer preserves history. Conflict-of-interest rules prevent self-review."],
          ["Design system", "Reusable components, statuses, forms, tables and moderation controls create a consistent experience across desktop, tablet and mobile."],
          ["Architecture", "Next.js and TypeScript on the frontend, NestJS API, PostgreSQL and Prisma for data, Redis/BullMQ for background work, Supabase Auth, Docker and Cloudflare."],
          ["Mobile", "A SwiftUI prototype rethinks key flows for a native iOS experience instead of simply copying the web interface."],
        ],
      },
      laboris: {
        title: "Laboris",
        subtitle: "Transparent Job Discovery Platform",
        description: "Employer reviews, ratings and verified signals that help people choose a workplace without unpleasant surprises.",
        role: "Product · UI/UX · Full-Stack · AI moderation",
        intro: "Laboris helps candidates evaluate an employer before applying through honest reviews, staff turnover, management quality and workplace transparency.",
        challenge: "Employer information is fragmented, while public reviews often lack context and trust. The product must protect the author’s identity while reducing fabricated submissions.",
        flow: ["Find a company", "Review the score", "Check risk signals", "Read reviews", "Compare conditions", "Decide"],
        details: [
          ["Trust layer", "Public sources, moderation, contextual checks and transparent rating criteria help separate useful signals from noise."],
          ["For candidates", "Staff turnover, work-life balance, salary transparency, management quality and stability live in one clear company profile."],
          ["Safety", "Anonymous publishing and author privacy are built into the product flow instead of added after the interface."],
          ["Experience", "Fast company and city search, compact cards, clear hierarchy and a responsive mobile-first interface."],
        ],
      },
      nordic: {
        title: "Nordic Eatery",
        subtitle: "Restaurant Digital Platform",
        description: "A multilingual restaurant product with authentication, payments, ordering and transactional email.",
        role: "UI/UX · Frontend · Full-Stack · Deployment",
        intro: "Nordic Eatery combines restaurant presentation with the customer’s full digital journey — from choosing a dish to payment, verification and receipt delivery.",
        challenge: "The product had to go beyond a landing page: responsive menu, four languages, customer accounts, checkout, payments, receipts and SEO in one production system.",
        flow: ["Open the menu", "Choose dishes", "Sign in", "Checkout", "Pay", "Verify payment", "Receive receipt"],
        details: [
          ["Mobile first", "Most guests open a menu from a phone, so the ordering path was designed for smaller screens first while retaining a strong desktop experience."],
          ["Four languages", "Swedish, English, Polish and Russian are built into the application architecture without duplicating separate pages."],
          ["Payments & access", "Supabase manages authentication and data, Stripe and Swish provide the payment layer, and Resend delivers transactional email."],
          ["Production & SEO", "Vercel, metadata, Restaurant JSON-LD, multilingual routing and checkout-session verification after successful payment."],
        ],
      },
    },
    aboutKicker: "About me",
    aboutTitle: "I like working between design and engineering.",
    aboutText: "My background combines computer science, UI/UX and hands-on product development. I turn an idea into research, a user flow, an interface, frontend, backend and a production solution.",
    aboutNote: "I’m especially interested in teams where developers participate in product decisions rather than only implementing predefined screens.",
    lookingFor: "Looking for",
    roles: ["Frontend Developer", "Full-Stack Developer", "Product Developer", "UI Engineer"],
    process: ["Research", "User flow", "Interface", "Prototype", "Frontend", "Backend", "Production"],
    skillsKicker: "Technologies",
    skillsTitle: "Tools for the complete product cycle",
    skillGroups: [
      ["Frontend", ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/UI"]],
      ["Backend & Data", ["Node.js", "NestJS", "PostgreSQL", "Prisma", "Supabase", "Redis", "REST APIs"]],
      ["Design & UI/UX", ["Figma", "Wireframing", "Prototyping", "Design Systems", "Responsive Design", "User Flows"]],
      ["Infrastructure", ["Git", "Docker", "Vercel", "Cloudflare", "Sentry", "OpenTelemetry"]],
      ["Mobile", ["Swift", "SwiftUI"]],
    ],
    aiTitle: "AI-assisted development",
    aiText: "I use modern AI tools for rapid prototyping, code exploration, implementation, debugging and refactoring. AI accelerates development — product decisions, architecture and final implementation still require engineering judgment.",
    education: "Education",
    degree: "Bachelor’s Degree in Computer Science",
    university: "Donetsk National University",
    languagesTitle: "Languages",
    languages: [["Russian", "Native"], ["English", "Working proficiency"], ["Swedish", "Basic · currently learning"]],
    contactKicker: "Contact",
    contactTitle: "Have a product to build? Or a team I could help?",
    contactText: "I’m currently open to frontend, full-stack and product development opportunities.",
    email: "Email me",
    close: "Close",
    overview: "Overview",
    challenge: "The challenge",
    productFlow: "Product flow",
  },
  sv: {
    nav: { work: "Projekt", about: "Om mig", skills: "Kompetens", contact: "Kontakt" },
    statusLine: "Öppen för nya möjligheter",
    heroTitle: "Frontend- / fullstackutvecklare",
    heroAccent: "& UI/UX-designer",
    heroIntro: "Jag designar och bygger digitala produkter från den första UX-idén till produktion.",
    heroDetail: "Fokus på React, Next.js, TypeScript, produktdesign och fullstackutveckling.",
    location: "Norrbotten, Sverige",
    availability: "Luleå · hybrid · distans",
    viewWork: "Se utvalda projekt",
    selectedKicker: "Utvalda projekt",
    selectedTitle: "Produkter som jag har designat och byggt",
    selectedIntro: "Arbete där designtänkande möter frontendutveckling, arkitektur och verkliga affärsbehov.",
    filters: { all: "Alla", progress: "Pågående", completed: "Färdiga" },
    projectLabels: { progress: "Pågående", completed: "Färdigt" },
    roleLabel: "Min roll",
    caseStudy: "Visa fallstudie",
    visit: "Besök webbplatsen",
    projects: {
      ostrov: {
        title: "OstrovUA",
        subtitle: "Plattform för gemenskap och verifiering",
        description: "Ett digitalt system för att samordna samhällsprojekt, verifiera bidrag och skapa transparenta modereringsflöden.",
        role: "Produkt · UI/UX · Frontend · Backend · Mobil",
        intro: "OstrovUA bygger transparent digital infrastruktur kring verifierat deltagande. Användare kan hitta ett projekt, delta, utföra arbetet, skicka bevis och få en oberoende granskning.",
        challenge: "Samhällsinitiativ bygger ofta på splittrad kommunikation, manuell samordning och otydlig historik. Målet var att göra varje handling begriplig, verifierbar och granskningsbar.",
        flow: ["Upptäck", "Gå med", "Bidra", "Skicka bevis", "Moderering", "Godkännande", "Bidragshistorik"],
        details: [
          ["Roller och tillit", "Deltagare skickar resultat, samordnare leder aktiviteten, moderatorer fattar beslut och revisionslagret sparar historiken. Regler förhindrar egen granskning."],
          ["Designsystem", "Återanvändbara komponenter, statusar, formulär, tabeller och modereringskontroller skapar en konsekvent upplevelse på dator, surfplatta och mobil."],
          ["Arkitektur", "Next.js och TypeScript i gränssnittet, NestJS API, PostgreSQL och Prisma för data, Redis/BullMQ för bakgrundsjobb, Supabase Auth, Docker och Cloudflare."],
          ["Mobil", "En SwiftUI-prototyp tänker om viktiga flöden för en inbyggd iOS-upplevelse i stället för att kopiera webbgränssnittet."],
        ],
      },
      laboris: {
        title: "Laboris",
        subtitle: "Transparent plattform för jobbsökning",
        description: "Arbetsgivarrecensioner, betyg och verifierade signaler som hjälper människor att välja jobb utan obehagliga överraskningar.",
        role: "Produkt · UI/UX · Fullstack · AI-moderering",
        intro: "Laboris hjälper kandidater att utvärdera en arbetsgivare före ansökan genom ärliga recensioner, personalomsättning, ledarskap och transparens.",
        challenge: "Information om arbetsgivare är splittrad och offentliga recensioner saknar ofta sammanhang och tillit. Produkten måste skydda författarens identitet och samtidigt minska falska inlägg.",
        flow: ["Hitta företag", "Se betyg", "Kontrollera risker", "Läs omdömen", "Jämför villkor", "Välj"],
        details: [
          ["Tillitslager", "Offentliga källor, moderering, kontextkontroller och transparenta kriterier hjälper till att skilja användbara signaler från brus."],
          ["För kandidater", "Personalomsättning, balans, lönetransparens, ledarskap och stabilitet samlas i en tydlig företagsprofil."],
          ["Säkerhet", "Anonym publicering och författarens integritet är inbyggda i produktflödet i stället för att läggas till i efterhand."],
          ["Upplevelse", "Snabb sökning efter företag och städer, kompakta kort, tydlig hierarki och ett responsivt mobile-first-gränssnitt."],
        ],
      },
      nordic: {
        title: "Nordic Eatery",
        subtitle: "Digital restaurangplattform",
        description: "En flerspråkig restaurangprodukt med autentisering, betalningar, beställning och transaktionsmail.",
        role: "UI/UX · Frontend · Fullstack · Driftsättning",
        intro: "Nordic Eatery förenar restaurangens presentation med kundens hela digitala resa — från val av rätt till betalning, verifiering och kvitto.",
        challenge: "Produkten behövde bli mer än en landningssida: responsiv meny, fyra språk, kundkonto, checkout, betalningar, kvitton och SEO i ett produktionssystem.",
        flow: ["Öppna menyn", "Välj rätter", "Logga in", "Till kassan", "Betala", "Verifiera", "Få kvitto"],
        details: [
          ["Mobile first", "De flesta gäster öppnar menyn på mobilen. Därför designades beställningsflödet först för små skärmar utan att kompromissa med desktop."],
          ["Fyra språk", "Svenska, engelska, polska och ryska är inbyggda i arkitekturen utan duplicerade separata sidor."],
          ["Betalning och åtkomst", "Supabase hanterar autentisering och data, Stripe och Swish utgör betalningslagret och Resend levererar transaktionsmail."],
          ["Produktion och SEO", "Vercel, metadata, Restaurant JSON-LD, flerspråkig routing och verifiering av checkout-sessionen efter betalning."],
        ],
      },
    },
    aboutKicker: "Om mig",
    aboutTitle: "Jag trivs i mötet mellan design och teknik.",
    aboutText: "Min bakgrund kombinerar datavetenskap, UI/UX och praktisk produktutveckling. Jag förvandlar en idé till research, användarflöde, gränssnitt, frontend, backend och en produktionslösning.",
    aboutNote: "Jag är särskilt intresserad av team där utvecklare deltar i produktbeslut och inte bara implementerar färdiga skisser.",
    lookingFor: "Söker roller som",
    roles: ["Frontendutvecklare", "Fullstackutvecklare", "Produktutvecklare", "UI Engineer"],
    process: ["Research", "Användarflöde", "Gränssnitt", "Prototyp", "Frontend", "Backend", "Produktion"],
    skillsKicker: "Teknik",
    skillsTitle: "Verktyg för hela produktcykeln",
    skillGroups: [
      ["Frontend", ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/UI"]],
      ["Backend och data", ["Node.js", "NestJS", "PostgreSQL", "Prisma", "Supabase", "Redis", "REST APIs"]],
      ["Design och UI/UX", ["Figma", "Wireframing", "Prototyping", "Design Systems", "Responsive Design", "User Flows"]],
      ["Infrastruktur", ["Git", "Docker", "Vercel", "Cloudflare", "Sentry", "OpenTelemetry"]],
      ["Mobil", ["Swift", "SwiftUI"]],
    ],
    aiTitle: "AI-assisterad utveckling",
    aiText: "Jag använder moderna AI-verktyg för snabb prototypframtagning, kodutforskning, implementation, felsökning och refaktorering. AI accelererar arbetet — produktbeslut, arkitektur och slutlig implementation kräver fortfarande ingenjörsmässigt omdöme.",
    education: "Utbildning",
    degree: "Kandidatexamen i datavetenskap",
    university: "Donetsks nationella universitet",
    languagesTitle: "Språk",
    languages: [["Ryska", "Modersmål"], ["Engelska", "Arbetsnivå"], ["Svenska", "Grundnivå · lär mig"]],
    contactKicker: "Kontakt",
    contactTitle: "Har du en produkt att bygga? Eller ett team som jag kan hjälpa?",
    contactText: "Jag är öppen för möjligheter inom frontend, fullstack och produktutveckling.",
    email: "Mejla mig",
    close: "Stäng",
    overview: "Översikt",
    challenge: "Utmaningen",
    productFlow: "Produktflöde",
  },
} as const;

const projectMeta: Record<ProjectKey, { status: ProjectStatus; url: string; stack: string[]; tone: string; number: string }> = {
  ostrov: { status: "progress", url: "https://ostrovua.com", stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "SwiftUI"], tone: "mint", number: "01" },
  laboris: { status: "progress", url: "https://laboris.dev", stack: ["Next.js", "TypeScript", "PostgreSQL", "AI", "Vercel"], tone: "blue", number: "02" },
  nordic: { status: "completed", url: "https://nordiceatery.se", stack: ["Next.js", "Supabase", "Stripe", "Swish", "Resend"], tone: "amber", number: "03" },
};

const projectKeys = Object.keys(projectMeta) as ProjectKey[];

function ProjectMockup({ project }: { project: ProjectKey }) {
  if (project === "ostrov") {
    return <div className="mockup ostrov-mock" aria-hidden="true"><div className="browser"><div className="browser-bar"><i /><i /><i /></div><div className="dashboard"><aside><b>O</b><span /><span /><span /><span /></aside><div className="dash-main"><strong>Community projects</strong><div className="metric-row"><i /><i /><i /></div><div className="project-row"><i /><i /><i /><i /></div></div></div></div><div className="phone"><div className="phone-notch" /><strong>Projects</strong><i /><i /><i /></div><div className="verify-float">✓ Verification flow</div></div>;
  }
  if (project === "laboris") {
    return <div className="mockup laboris-mock" aria-hidden="true"><div className="laboris-word">LABORIS <small>HONEST WORKPLACES</small></div><div className="search-ui"><b>Find your next job<br />without surprises</b><div className="search-line">Find a company… <span>Search</span></div><div className="company-cards"><i><b>4.8</b><small>Work-life</small></i><i><b>92%</b><small>Trust</small></i><i><b>Low</b><small>Turnover</small></i></div></div><div className="review-float">★★★★★<small>Verified review</small></div></div>;
  }
  return <div className="mockup nordic-mock" aria-hidden="true"><div className="menu-window"><div className="menu-top">NORDIC EATERY <span>Menu · About · Order</span></div><div className="dish"><div className="plate"><i /><i /><i /><i /></div><div><small>NORDIC FLAVORS</small><b>Made with care.</b><span>Explore menu →</span></div></div></div><div className="food-phone"><div className="phone-notch" /><b>Your order</b><i>Burger <span>145 kr</span></i><i>Salad <span>110 kr</span></i><strong>Checkout</strong></div></div>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const [filter, setFilter] = useState<Filter>("all");
  const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = content[language];

  const visibleProjects = useMemo(() => projectKeys.filter((key) => filter === "all" || projectMeta[key].status === filter), [filter]);

  useEffect(() => {
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.style.overflow = activeProject ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setActiveProject(null);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [language, activeProject]);

  return (
    <main id="top">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Danylo Rodnaiev — home">DANYLO<br />RODNAIEV</a>
        <nav aria-label="Primary navigation">
          <a href="#work">{t.nav.work}</a><a href="#about">{t.nav.about}</a><a href="#skills">{t.nav.skills}</a><a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="header-right">
          <a className="social-link" href={SOCIAL.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="social-link linkedin" href={SOCIAL.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <div className="language-switcher" aria-label="Language selector">
            {(["ru", "en", "sv"] as Language[]).map((item) => <button key={item} className={language === item ? "active" : ""} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}
          </div>
        </div>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy" key={language}>
          <p className="eyebrow"><span />{t.statusLine}</p>
          <h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1>
          <p className="hero-intro">{t.heroIntro}</p>
          <p className="hero-detail">{t.heroDetail}</p>
          <div className="hero-actions"><a className="primary-button" href="#work">{t.viewWork}<span>↓</span></a><a className="secondary-button" href={SOCIAL.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
          <div className="location-line"><span>⌖</span><p><b>{t.location}</b><small>{t.availability}</small></p></div>
        </div>
        <div className="hero-visual" aria-label="Interactive developer workspace illustration">
          <div className="hero-grid" /><div className="orb orb-one" /><div className="orb orb-two" />
          <div className="code-window"><div className="window-top"><i /><i /><i /><span>portfolio.tsx</span><small>● LIVE</small></div><pre><code><b>const</b> developer = {`{`}<br />  craft: <mark>"full-stack"</mark>,<br />  design: <mark>true</mark>,<br />  ships: <mark>"to production"</mark>,<br />  location: <mark>"Sweden"</mark><br />{`}`};</code></pre><div className="code-status"><span>✓</span> Type-safe build</div></div>
          <div className="floating-card"><b>03</b><span>products<br />designed & built</span></div>
          <div className="tech-pill pill-one">NEXT.JS</div><div className="tech-pill pill-two">FIGMA</div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-shell">
          <div className="section-heading"><div><p className="section-kicker">{t.selectedKicker}</p><h2>{t.selectedTitle}</h2><p>{t.selectedIntro}</p></div><div className="project-filters" aria-label="Project status filter">{(["all", "progress", "completed"] as Filter[]).map((item) => <button key={item} className={filter === item ? "active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{t.filters[item]}</button>)}</div></div>
          <div className="project-list">
            {visibleProjects.map((key) => {
              const project = t.projects[key]; const meta = projectMeta[key];
              return <article className={`project-card ${meta.tone}`} key={`${language}-${key}`}>
                <div className="project-visual"><span className="project-number">{meta.number}</span><ProjectMockup project={key} /></div>
                <div className="project-copy">
                  <span className={`status ${meta.status}`}>● {t.projectLabels[meta.status]}</span>
                  <h3>{project.title}</h3><h4>{project.subtitle}</h4><p>{project.description}</p>
                  <div className="role"><small>{t.roleLabel}</small><span>{project.role}</span></div>
                  <div className="tags">{meta.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-actions"><button onClick={() => setActiveProject(key)}>{t.caseStudy} <span>→</span></button><a href={meta.url} target="_blank" rel="noreferrer">{t.visit} ↗</a></div>
                </div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="about-section section-shell" id="about">
        <div className="portrait-card" aria-hidden="true"><div className="portrait-grid" /><div className="monogram">DR</div><span>DESIGN × ENGINEERING</span></div>
        <div className="about-copy"><p className="section-kicker">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><p>{t.aboutNote}</p><div className="role-list"><small>{t.lookingFor}</small>{t.roles.map((role) => <span key={role}>{role}</span>)}</div></div>
        <div className="process"><span className="vertical-label">PROCESS / 01—07</span>{t.process.map((step, index) => <div key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span></div>)}</div>
      </section>

      <section className="skills-section" id="skills">
        <div className="section-shell"><div className="section-heading compact"><div><p className="section-kicker">{t.skillsKicker}</p><h2>{t.skillsTitle}</h2></div></div><div className="skills-grid">
          {t.skillGroups.map(([name, skills], index) => <article className={`skill-card skill-${index + 1}`} key={name}><div className="skill-index">0{index + 1}</div><h3>{name}</h3><div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}
          <article className="ai-card"><div className="ai-orb">AI</div><div><h3>{t.aiTitle}</h3><p>{t.aiText}</p></div><code>human_judgment = true;</code></article>
        </div></div>
      </section>

      <section className="credentials section-shell">
        <article><p className="section-kicker">{t.education}</p><span className="credential-icon">⌁</span><h3>{t.degree}</h3><p>{t.university}</p></article>
        <article><p className="section-kicker">{t.languagesTitle}</p><div className="language-levels">{t.languages.map(([name, level], index) => <div key={name}><span><b>{name}</b><small>{level}</small></span><i style={{ "--level": `${[100, 76, 34][index]}%` } as React.CSSProperties} /></div>)}</div></article>
      </section>

      <section className="contact-section" id="contact"><div className="contact-glow" /><div className="section-shell contact-inner"><div><p className="section-kicker">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div><div className="contact-actions"><a className="email-button" href="mailto:borodkin0311@gmail.com"><span>↗</span><small>{t.email}</small><b>borodkin0311@gmail.com</b></a><div><a href={SOCIAL.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={SOCIAL.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></div></section>

      <footer className="section-shell"><a className="wordmark" href="#top">DANYLO<br />RODNAIEV</a><p>Frontend / Full-Stack Developer<br />UI/UX Designer</p><p>Luleå / Norrbotten, Sweden</p><p>© 2026</p></footer>

      {activeProject && (() => {
        const project = t.projects[activeProject]; const meta = projectMeta[activeProject];
        return <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveProject(null)}><article className={`case-modal ${meta.tone}`} role="dialog" aria-modal="true" aria-labelledby="case-title" onMouseDown={(event) => event.stopPropagation()}>
          <div className="modal-top"><span>{meta.number} / CASE STUDY</span><button autoFocus onClick={() => setActiveProject(null)} aria-label={t.close}>{t.close} ×</button></div>
          <div className="case-hero"><div><span className={`status ${meta.status}`}>● {t.projectLabels[meta.status]}</span><h2 id="case-title">{project.title}</h2><h3>{project.subtitle}</h3><p>{project.intro}</p><div className="tags">{meta.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div><ProjectMockup project={activeProject} /></div>
          <section className="case-section split"><div><p className="section-kicker">01 / {t.overview}</p><h3>{t.challenge}</h3></div><p>{project.challenge}</p></section>
          <section className="case-section"><p className="section-kicker">02 / {t.productFlow}</p><div className="flow-list">{project.flow.map((step, index) => <div key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span>{index < project.flow.length - 1 && <i>→</i>}</div>)}</div></section>
          <section className="case-details">{project.details.map(([title, text], index) => <article key={title}><span>0{index + 3}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
          <div className="case-footer"><a href={meta.url} target="_blank" rel="noreferrer">{t.visit} ↗</a><button onClick={() => setActiveProject(null)}>{t.close}</button></div>
        </article></div>;
      })()}
    </main>
  );
}
