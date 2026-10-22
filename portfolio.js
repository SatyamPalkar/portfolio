// Make it yours: edit this object to update the content across the website.
const portfolio = {
  name: "Satyam Palkar",
  description: "Satyam Palkar — Data Analyst & Machine Learning Developer. Explore data pipelines, analytics, predictive models, and applied AI projects.",
  intro: "I’m Satyam. I use Python and SQL to analyze real-world datasets, build data pipelines, and turn machine learning models into usable applications.",
  about: "I’m Satyam Palkar, a data analyst and machine learning developer. My projects span data integration, exploratory analysis, forecasting, computer vision, and natural language processing. I enjoy connecting the whole process: preparing data, investigating patterns, comparing models, and making the results easier to explore.",
  interests: ["Data analysis", "Machine learning", "Data engineering", "Applied AI"],
  github: "https://github.com/SatyamPalkar",
  skills: [
    { title: "Data analysis", description: "Explore datasets, write SQL, and communicate findings.", tools: ["Python", "SQL", "pandas", "NumPy", "Matplotlib", "Plotly"], category: "analytics", linkLabel: "See analytics projects" },
    { title: "Machine learning", description: "Train, compare, and evaluate predictive models.", tools: ["scikit-learn", "PyTorch", "LightGBM", "XGBoost"], category: "ml", linkLabel: "See machine learning projects" },
    { title: "Data engineering", description: "Connect data sources and build analytical datasets.", tools: ["Airflow", "dbt", "PostgreSQL", "PySpark", "Databricks", "GCP"], category: "analytics", linkLabel: "See data pipeline projects" },
    { title: "Applied AI & serving", description: "Build model interfaces and measure inference behavior.", tools: ["Hugging Face", "FastAPI", "Streamlit", "Docker"], category: "ai", linkLabel: "See applied AI projects" },
  ],
  // Add your real email here to display a working email link.
  email: "",
  projects: [
    {
      title: "Muse EEG Dashboard",
      category: "ai",
      cover: "muse",
      image: "./assets/muse-dashboard.gif",
      imageAlt: "Animated Muse dashboard showing EEG frequency bands, a stress timeline, and session controls.",
      discipline: "EEG visualization & session analysis",
      technologies: ["Next.js", "TypeScript", "Python", "XGBoost", "PyTorch"],
      description: "An interactive dashboard for exploring EEG frequency bands, session trends, and experimental stress-analysis outputs.",
      challenge: "Make changing brainwave signals and session-level analysis easier to inspect in one dashboard.",
      approach: "A Next.js interface brings together brainwave charts, a stress timeline, connection status, and session controls. The Python project includes signal features, temporal analysis, and experimental XGBoost and neural-network components.",
      outcome: "Explore the deployed dashboard and the original animated walkthrough. Real headset streaming depends on a connected Muse device and its ingestion backend; the hosted interface alone does not verify a live hardware connection or model accuracy.",
      evidence: "Deployed EEG dashboard & animated walkthrough",
      repository: "https://github.com/SatyamPalkar/Muse-web",
      url: "https://muse-web-tgpk-hn8qjhvnf-saytams-projects-71ebe524.vercel.app/dashboard",
    },
    {
      title: "LLM Inference & Latency",
      category: "ai",
      cover: "latency",
      discipline: "Model serving & performance instrumentation",
      technologies: ["Transformers.js", "ONNX", "FastAPI", "Docker", "Plotly"],
      description: "Run a language model in your browser and explore streamed text, time to first token, generation latency, and throughput.",
      challenge: "Make the responsiveness of LLM generation measurable across prompts and response modes.",
      approach: "The free demo runs quantized distilgpt2 with Transformers.js and ONNX in a browser worker. The repository also includes a Dockerized FastAPI service with streaming endpoints, benchmark scripts, and API and metric tests.",
      outcome: "The browser demo performs real local inference. A separate reproducible Python CPU baseline records 180 measured requests and 12 excluded warmups on an Apple M3 Pro, with raw results, model revision, runtime metadata and hashes. Browser and server timing boundaries remain distinct; the baseline is not a production performance guarantee.",
      evidence: "180-request CPU baseline · live inference & raw results",
      repository: "https://github.com/SatyamPalkar/Latency-Fine-Tuning",
      url: "https://satyampalkar.github.io/Latency-Fine-Tuning/",
    },
    {
      title: "Job Portal Workspace",
      category: "ai",
      cover: "portal",
      discipline: "Application tracking & resume comparison",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "FastAPI"],
      description: "A browser workspace for saving job descriptions, comparing resume keywords, and tracking applications from saved role to offer.",
      challenge: "Keep job opportunities, resume evidence, and application progress organized without requiring a paid backend.",
      approach: "The React and TypeScript browser edition saves records locally, compares whole-word skill keywords, and provides application statuses, notes, TXT downloads, and validated JSON backups. The original server edition remains in the repository.",
      outcome: "The deployed workspace supports real local data and keyword comparisons. It uses rule-based coverage rather than an AI hiring score; shared accounts, live job feeds, and AI optimization belong to the separate backend edition.",
      evidence: "Live workspace, keyword comparison & backup export",
      repository: "https://github.com/SatyamPalkar/job-portal",
      url: "https://satyampalkar.github.io/job-portal/",
    },
    {
      title: "Airbnb × Census",
      category: "analytics",
      cover: "pipeline",
      discipline: "Data integration & analytical modeling",
      technologies: ["Python", "SQL", "SQLite", "JavaScript", "Data quality"],
      description: "Explore 12 months of historical NSW listing snapshots alongside Census context through an interactive, reproducible market dashboard.",
      challenge: "Bring separate listing and Census datasets into a consistent foundation for local market analysis.",
      approach: "A verified Python/SQLite bronze-to-gold workflow validates snapshot dates and prices, enforces listing-month uniqueness, joins explicit LGA codes to 2016 Census data, and exports anonymous aggregates. The dashboard supports month, LGA and room-type filters. Original Airflow/dbt coursework remains as architecture reference.",
      outcome: "412,122 source rows reconcile to 407,330 accepted observations across 29 LGAs. The pipeline rejects 4,780 misdated rows and 12 invalid prices, and the repository includes three SQL-reproducible findings plus source hashes. Advertised prices are not revenue; pandemic-era snapshots are not current market estimates.",
      evidence: "407,330 validated observations · SQL findings & live dashboard",
      repository: "https://github.com/SatyamPalkar/Airbnb-Census-Data-Integration-Pipeline",
      url: "https://satyampalkar.github.io/Airbnb-Census-Data-Integration-Pipeline/",
    },
    {
      title: "NYC Taxi: Patterns & Prediction",
      category: "analytics",
      cover: "taxi",
      discipline: "Exploratory analysis & fare modeling",
      technologies: ["Databricks", "PySpark", "Spark SQL", "scikit-learn"],
      description: "Exploring New York’s yellow and green taxi records through distributed analysis and fare prediction.",
      challenge: "Investigate how trip patterns, borough connections, duration, and tipping relate to taxi activity and fares.",
      approach: "Databricks notebooks use PySpark and Spark SQL for cleaning and aggregation, with visual analysis and comparisons between a mean baseline, linear regression, and random forest regression.",
      outcome: "The published project documents mobility and revenue patterns, a fare-model comparison, and a chronological holdout evaluation.",
      evidence: "Distributed analysis & fare-model comparison",
      repository: "https://github.com/SatyamPalkar/nyc-taxi-fare-prediction",
    },
    {
      title: "Ethereum Price Forecasting",
      category: "ml",
      cover: "forecast",
      discipline: "Predictive modeling & interactive exploration",
      technologies: ["LightGBM", "XGBoost", "Streamlit", "Plotly", "scikit-learn"],
      description: "A machine learning coursework project that combines price forecasting with an interactive Streamlit interface.",
      challenge: "Compare models for next-day high-price forecasting and make historical data and model outputs easier to explore.",
      approach: "The project compares LightGBM, XGBoost, and ElasticNet using market features, technical indicators, lags, and rolling statistics. Streamlit and Plotly present price history and model evaluation.",
      outcome: "The repository brings together training notebooks, saved models, performance reports, and a dashboard interface, with support for FastAPI integration.",
      evidence: "Training notebooks, saved models & Streamlit UI",
      repository: "https://github.com/SatyamPalkar/eth-streamlit",
    },
    {
      title: "CIFAR-10 Image Classification",
      category: "ml",
      cover: "vision",
      discipline: "Computer vision & transfer learning",
      technologies: ["PyTorch", "torchvision", "MobileNetV2", "Matplotlib"],
      description: "Comparing a custom convolutional network with a pretrained MobileNetV2 on CIFAR-10.",
      challenge: "Explore the trade-offs between a custom image classifier and transfer learning across ten image classes.",
      approach: "The notebook sets up reproducible training in PyTorch, adapts MobileNetV2’s classification head, and compares the models using accuracy curves, confusion matrices, and misclassified examples.",
      outcome: "The analysis includes model architecture diagrams, test-set comparisons, parameter counts, and inference throughput measurements.",
      evidence: "CNN comparison, confusion matrices & error analysis",
      repository: "https://github.com/SatyamPalkar/Image-Classification-on-CIFAR-10-",
    },
    {
      title: "Dialogue Summarization",
      category: "ai",
      cover: "language",
      discipline: "Natural language processing · Notebook study",
      technologies: ["Hugging Face", "PyTorch", "PEGASUS", "SAMSum"],
      description: "A notebook-based exploration of generating concise summaries from conversational text.",
      challenge: "Condense a dialogue into a short summary while retaining the information that matters.",
      approach: "The research notebook adapts a pretrained PEGASUS model to SAMSum dialogue data with Hugging Face Transformers, then compares generated summaries with references using ROUGE.",
      outcome: "The repository contains data preparation, training and evaluation code, and example summary generation. The work is presented as a notebook study.",
      evidence: "PEGASUS training notebook & ROUGE evaluation",
      repository: "https://github.com/SatyamPalkar/Text-Summarizer",
    },
    ...additionalProjects,
  ],
};

// Lead with the two complete, evidence-backed flagship projects.
const featuredOrder = ["LLM Inference & Latency", "Airbnb × Census", "Muse EEG Dashboard", "Job Portal Workspace"];
portfolio.projects.sort((a, b) => {
  const rank = project => featuredOrder.includes(project.title) ? featuredOrder.indexOf(project.title) : featuredOrder.length;
  return rank(a) - rank(b);
});

const $ = (selector) => document.querySelector(selector);
const dialog = $("#project-dialog");
let lastProjectButton;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function safeUrl(value) {
  try {
    const url = new URL(value, document.baseURI);
    return ["https:", "http:", "file:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

// Decorative project illustrations, not screenshots or measured results.
function coverArt(cover, project) {
  const art = element("div", "cover-art");
  art.setAttribute("aria-hidden", "true");
  if (cover === "catalog") {
    art.classList.add("catalog-art");
    art.append(element("small", "", project.status.toUpperCase()), element("strong", "", project.title), element("span", "", project.technologies.slice(0, 2).join(" / ")));
  } else if (cover === "pipeline") {
    art.classList.add("pipeline-art");
    for (const [number, name, caption] of [["01", "Bronze", "Ingest & preserve"], ["02", "Silver", "Clean & connect"], ["03", "Gold", "Model & understand"]]) {
      const stage = element("div", "pipeline-stage");
      const copy = element("div");
      copy.append(element("strong", "", name), element("small", "", caption));
      stage.append(element("span", "stage-number", number), copy, element("span", "stage-arrow", "↗"));
      art.append(stage);
    }
  } else if (cover === "taxi") {
    art.classList.add("taxi-art");
    art.append(element("small", "", "NEW YORK / YELLOW + GREEN"), element("strong", "", "City in\nnumbers."), element("span", "", "MOBILITY · PATTERNS · PREDICTION"));
  } else if (cover === "forecast") {
    art.classList.add("forecast-art");
    art.append(element("small", "", "MODELING WHAT COMES NEXT"));
    const models = element("div", "model-orbit");
    for (const label of ["LightGBM", "XGBoost", "ElasticNet"]) models.append(element("span", "", label));
    art.append(models, element("strong", "", "Patterns → predictions"));
  } else if (cover === "vision") {
    art.classList.add("vision-art");
    const pixels = element("div", "pixel-grid");
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const pixel = element("i");
        pixel.style.setProperty("--tone", ["#e7c79e", "#d7916f", "#a96550", "#f5e6cc", "#743e34"][(row * row + col * 3 + Math.floor(col / 3)) % 5]);
        pixels.append(pixel);
      }
    }
    art.append(pixels, element("strong", "", "Pixels → patterns"), element("small", "", "CUSTOM CNN / MOBILENETV2"));
  } else if (cover === "portal") {
    art.classList.add("portal-art");
    art.append(element("small", "", "YOUR NEXT CHAPTER, ORGANIZED"), element("strong", "", "A clearer\nnext move."));
    const stages = element("div", "portal-stages");
    for (const stage of ["Saved", "Applied", "Interview"]) stages.append(element("span", "", stage));
    art.append(stages);
  } else if (cover === "language") {
    art.classList.add("language-art");
    const source = element("div", "language-card source-card");
    source.append(element("small", "", "THE CONVERSATION"));
    for (let i = 0; i < 5; i++) source.append(element("i"));
    const summary = element("div", "language-card summary-card");
    summary.append(element("small", "", "THE ESSENTIALS"), element("strong", "", "Less text.\nMore meaning."));
    art.append(source, summary);
  } else {
    art.classList.add("terminal");
    const bar = element("div", "terminal-bar", "~/inference/latency");
    const code = element("pre", "terminal-code", "POST /generate-stream\n\n→ first token\n→ generation latency\n→ tokens per second\n\nMeasure. Compare. Understand.");
    art.append(bar, code);
  }
  return art;
}

function showProject(project, trigger) {
  lastProjectButton = trigger;
  const content = $("#dialog-content");
  content.replaceChildren();
  const title = element("h2", "", project.title);
  title.id = "dialog-title";
  content.append(title, element("span", "dialog-tag", project.sample ? "Sample project · Replace with your work" : project.discipline), element("p", "", project.description));
  if (project.upstream) {
    const source = element("a", "text-link repository-link", `Forked from ${project.upstream} ↗`);
    source.href = `https://github.com/${project.upstream}`;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    content.append(source);
  }
  if (project.technologies?.length) {
    const tags = element("div", "project-technologies");
    tags.setAttribute("aria-label", "Project technologies");
    project.technologies.forEach((technology) => tags.append(element("span", "", technology)));
    content.append(tags);
  }
  for (const [heading, value] of [["The problem", project.challenge], ["Technical approach", project.approach], ["Results & lessons", project.outcome]]) {
    if (value) content.append(element("h3", "", heading), element("p", "", value));
  }
  if (project.url && safeUrl(project.url)) {
    const link = element("a", "text-link", "Open live demo ↗");
    link.href = safeUrl(project.url);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    content.append(link);
  }
  if (project.repository && safeUrl(project.repository)) {
    const link = element("a", "text-link repository-link", "Explore repository ↗");
    link.href = safeUrl(project.repository);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    content.append(link);
  }
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

document.title = `${portfolio.name} — Data & Machine Learning`;
$("meta[name='description']").content = portfolio.description;
$("[data-name]").replaceChildren(document.createTextNode(portfolio.name), element("span", "accent", "."));
$("[data-footer-name]").textContent = portfolio.name;
$("[data-intro]").textContent = portfolio.intro;
$("[data-about]").textContent = portfolio.about;
$("#year").textContent = new Date().getFullYear();
portfolio.interests.forEach((interest) => $("#interests").append(element("span", "", interest)));
portfolio.skills.forEach((skill) => {
  const group = element("div", "skill-group");
  group.append(element("h3", "", skill.title), element("p", "", skill.description));
  const tools = element("ul", "skill-tools");
  skill.tools.forEach((tool) => tools.append(element("li", "", tool)));
  group.append(tools);
  const link = element("a", "skill-project-link", `${skill.linkLabel} ↗`);
  link.href = "#work";
  link.addEventListener("click", () => {
    document.querySelector(`[data-filter='${skill.category}']`)?.click();
  });
  group.append(link);
  $("#skill-groups").append(group);
});

if (portfolio.github && safeUrl(portfolio.github)) {
  const github = element("a", "email-link", "Connect on GitHub ↗");
  github.href = safeUrl(portfolio.github);
  github.target = "_blank";
  github.rel = "noopener noreferrer";
  $("#contact-action").replaceChildren(github);
}

if (portfolio.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portfolio.email)) {
  const email = element("a", "email-link", `${portfolio.email} ↗`);
  email.href = `mailto:${portfolio.email}`;
  $("#contact-action").replaceChildren(email);
}

portfolio.projects.forEach((project) => {
  const article = element("article", "project");
  article.dataset.category = project.category;
  if (project.compact) article.classList.add("project-compact");
  const button = element("button", "project-button");
  button.type = "button";
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-label", `Read about ${project.title}`);
  const coverType = ["pipeline", "taxi", "forecast", "vision", "language", "latency", "portal", "muse", "catalog"].includes(project.cover) ? project.cover : "latency";
  const cover = element("div", `project-cover cover-${coverType}`);
  cover.dataset.category = project.category;
  if (project.sample) cover.append(element("span", "sample-label", "SAMPLE PROJECT"));
  if (project.image && safeUrl(project.image)) {
    const img = element("img");
    img.src = safeUrl(project.image);
    img.alt = project.imageAlt || project.title;
    img.loading = "lazy";
    img.decoding = "async";
    img.className = "project-preview";
    cover.append(img);
  } else cover.append(coverArt(coverType, project));
  const meta = element("div", "project-meta");
  const details = element("div");
  details.append(element("h3", "", project.title), element("p", "", project.discipline));
  const arrow = element("span", "project-arrow", "↗");
  arrow.setAttribute("aria-hidden", "true");
  meta.append(details, arrow);
  button.append(cover, meta);
  button.append(element("p", "project-summary", project.description));
  if (project.technologies?.length) {
    const tags = element("div", "project-technologies");
    project.technologies.forEach((technology) => tags.append(element("span", "", technology)));
    button.append(tags);
  }
  if (project.evidence) {
    const evidence = element("p", "project-evidence");
    evidence.append(element("strong", "", "Deliverables"), document.createTextNode(project.evidence));
    button.append(evidence);
  }
  button.append(element("span", "case-study-prompt", "View project details ↗"));
  button.addEventListener("click", () => showProject(project, button));
  article.append(button);
  const links = element("div", "project-links");
  if (project.url && safeUrl(project.url)) {
    const live = element("a", "project-live-link", "Live demo ↗");
    live.href = safeUrl(project.url);
    live.target = "_blank";
    live.rel = "noopener noreferrer";
    live.setAttribute("aria-label", `Open ${project.title} live demo`);
    links.append(live);
  }
  if (project.repository && safeUrl(project.repository)) {
    const source = element("a", "project-source-link", "GitHub repository ↗");
    source.href = safeUrl(project.repository);
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.setAttribute("aria-label", `Open ${project.title} on GitHub`);
    links.append(source);
  }
  article.append(links);
  $("#projects").append(article);
});

let activeFilter = "all";
function filterProjects() {
  const query = $("#project-search").value.trim().toLowerCase();
  let count = 0;
  document.querySelectorAll(".project").forEach((article, index) => {
    const project = portfolio.projects[index];
    const categoryMatch = activeFilter === "all" || (activeFilter === "live" ? Boolean(project.url) : project.category === activeFilter);
    const textMatch = [project.title, project.description, project.repository, project.status || "", ...project.technologies].join(" ").toLowerCase().includes(query);
    article.hidden = !categoryMatch || !textMatch;
    if (!article.hidden) count++;
  });
  $("#filter-status").textContent = `${count} of ${portfolio.projects.length} repositories shown.`;
  $("#projects-empty").hidden = count !== 0;
}
$("[data-filter='all'] span").textContent = String(portfolio.projects.length).padStart(2, "0");
$("#project-search").addEventListener("input", filterProjects);
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    activeFilter = button.dataset.filter;
    filterProjects();
  });
});
filterProjects();

$(".close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  lastProjectButton?.focus();
});
