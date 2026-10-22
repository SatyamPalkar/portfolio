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
      title: "Airbnb × Census",
      category: "analytics",
      cover: "pipeline",
      discipline: "Data integration & analytical modeling",
      technologies: ["Airflow", "dbt", "PostgreSQL", "Python", "GCP"],
      description: "Connecting Airbnb listings with Australian Census data to explore rental markets in their demographic context.",
      challenge: "Bring separate listing and Census datasets into a consistent foundation for local market analysis.",
      approach: "An ELT pipeline combines Airflow orchestration, dbt transformations, and PostgreSQL. Bronze, silver, and gold layers separate raw ingestion, cleaning, and analytical models, with source files staged in Google Cloud Storage.",
      outcome: "The repository includes LGA summaries, monthly listing facts, SQL analysis, and exported datasets for reporting.",
      evidence: "ELT pipeline, analytical tables & SQL reports",
      repository: "https://github.com/SatyamPalkar/Airbnb-Census-Data-Integration-Pipeline",
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
    {
      title: "LLM Inference & Latency",
      category: "ai",
      cover: "latency",
      discipline: "Model serving & performance instrumentation",
      technologies: ["FastAPI", "Hugging Face", "Docker", "Plotly", "pytest"],
      description: "A local inference platform for measuring time to first token, generation latency, and throughput.",
      challenge: "Make the responsiveness of local LLM generation measurable across prompts and response modes.",
      approach: "A Dockerized FastAPI service exposes streaming and non-streaming generation. Benchmark scripts collect request-level measurements, while Plotly dashboards make timing and throughput comparisons explorable.",
      outcome: "The project includes a live prompt interface, saved benchmark analysis, and API and metric tests. Its published benchmark snapshot is a small local sample; LoRA fine-tuning is listed as future work.",
      evidence: "Streaming API, latency dashboard & tests",
      repository: "https://github.com/SatyamPalkar/Latency-Fine-Tuning",
      url: "https://satyampalkar.github.io/Latency-Fine-Tuning/",
    },
  ],
};

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
function coverArt(cover) {
  const art = element("div", "cover-art");
  art.setAttribute("aria-hidden", "true");
  if (cover === "pipeline") {
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
    const link = element("a", "text-link", "Visit project ↗");
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
  const button = element("button", "project-button");
  button.type = "button";
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-label", `Read about ${project.title}`);
  const coverType = ["pipeline", "taxi", "forecast", "vision", "language", "latency"].includes(project.cover) ? project.cover : "latency";
  const cover = element("div", `project-cover cover-${coverType}`);
  if (project.sample) cover.append(element("span", "sample-label", "SAMPLE PROJECT"));
  if (project.image && safeUrl(project.image)) {
    const img = element("img");
    img.src = safeUrl(project.image);
    img.alt = project.imageAlt || project.title;
    img.loading = "lazy";
    img.style.cssText = "width:100%;height:100%;object-fit:cover;position:absolute;inset:0";
    cover.append(img);
  } else cover.append(coverArt(coverType));
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
  if (project.repository && safeUrl(project.repository)) {
    const source = element("a", "project-source-link", "GitHub repository ↗");
    source.href = safeUrl(project.repository);
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.setAttribute("aria-label", `Open ${project.title} on GitHub`);
    article.append(source);
  }
  $("#projects").append(article);
});

$("[data-filter='all'] span").textContent = String(portfolio.projects.length).padStart(2, "0");
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    let count = 0;
    document.querySelectorAll(".project").forEach((project) => {
      project.hidden = button.dataset.filter !== "all" && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count++;
    });
    $("#filter-status").textContent = `${count} project${count === 1 ? "" : "s"} shown.`;
  });
});

$(".close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  lastProjectButton?.focus();
});
