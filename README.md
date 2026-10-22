# Satyam Palkar — Data & Machine Learning

A portfolio for Satyam Palkar’s work in data analysis and machine learning, with responsive layouts, category filters, project details, technology lists, and GitHub links. The cream, green, and terracotta visual style is built with plain HTML, CSS, and JavaScript; no dependencies or build step.

## GitHub Pages

GitHub Pages publishes the repository root on `main`. Commit and push changes to
update the site. All asset paths are relative, so the portfolio works under the
`/portfolio/` repository path. `.nojekyll` disables Jekyll processing. No server,
API key or paid compute plan is required.

The LLM project detail links to the live browser inference demo; its measurements
are performed on the visitor's device. The repository retains the Python server
and its separate benchmark implementation.

Muse, LLM Latency and Job Portal appear first, with direct demo and source links
on their cards and in project details. Muse uses the original animated dashboard
preview from `Muse-web` (`docs/images/dashboard-demo.gif`, branch `version_2.4`),
copied into `assets/muse-dashboard.gif`. The complete GIF fits inside the card
without cropping the dashboard. Muse's supplied dashboard link is a specific
Vercel deployment URL; update its `url` if that deployment is replaced.

Job Portal is the browser-local workspace edition, with rule-based keyword
coverage. Muse's animation is a recorded walkthrough, not proof that hardware is
connected to the deployed dashboard.

## Preview

From this folder, run:

```sh
npm run dev
```

Open http://127.0.0.1:5173. Stop with Ctrl+C. You can also open `index.html` directly in your browser.

## Make it yours

- **Content:** edit the `portfolio` object at the top of `portfolio.js` to update your name, introduction, about text, interests, skills, email, and projects.
- **Projects:** edit each project’s title, discipline, description, challenge, approach, outcome, technologies, and repository URL. Optionally add an `image`, `imageAlt`, or live demo `url`. Put local images in a new `assets/` folder and use paths like `./assets/my-project.jpg`.
- **Categories:** use `analytics`, `ml`, or `ai`, or update the filters in `index.html` to match your categories.
- **Cover illustrations:** select `pipeline`, `taxi`, `forecast`, `vision`, `language`, or `latency` using the project’s `cover` field. The covers are decorative illustrations, not screenshots or measured results.
- **Page structure:** edit `index.html` to change headings or add sections.
- **Appearance:** edit the color variables at the top of `styles.css`, then adjust type or spacing below.
- **Contact:** GitHub is the current contact destination. Adding a valid `email` replaces it with a mail link. Update `github` to change the contact profile.

## Content sources

Project descriptions and the toolkit were informed by the public repository documentation and notebooks reviewed on 22 October 2026:

- [Airbnb × Census pipeline](https://github.com/SatyamPalkar/Airbnb-Census-Data-Integration-Pipeline): Airflow, dbt, PostgreSQL, Google Cloud Storage, and analytical models.
- [NYC taxi analysis](https://github.com/SatyamPalkar/nyc-taxi-fare-prediction): Databricks, PySpark, Spark SQL, exploratory analysis, and fare-model comparisons.
- [Ethereum forecasting](https://github.com/SatyamPalkar/eth-streamlit): boosting models, Streamlit, Plotly, and model evaluation.
- [CIFAR-10 classification](https://github.com/SatyamPalkar/Image-Classification-on-CIFAR-10-): PyTorch notebook comparing a custom CNN with MobileNetV2.
- [Dialogue summarization](https://github.com/SatyamPalkar/Text-Summarizer): PEGASUS/SAMSum research notebook. Presented as a notebook study; application scaffolding is incomplete.
- [LLM inference and latency](https://github.com/SatyamPalkar/Latency-Fine-Tuning): FastAPI model serving, streaming, benchmarks, Docker, and dashboards. LoRA is future work in the README.

No employer, commercial deployment, or performance improvement is inferred from these repositories. Forks were not presented as original projects. The profile README’s placeholder email was omitted.

## Checks

```sh
npm run check
```

The development server is for local preview. The website itself can be hosted as static files; `scripts/` and `package.json` are not required for hosting.

## Reading and navigation

The opening states the role and core technologies, followed by skill groups linked to filtered projects. Project cards expose deliverables, technology keywords, and direct repository links. Main descriptions use 17–20px text; supporting labels and technology tags use 13–16px. The cream, green, and terracotta palette and illustration style remain consistent.

This structure applies [NN/g’s guidance on descriptive headings and scanning](https://www.nngroup.com/articles/layer-cake-pattern-scanning/) and [Indeed’s portfolio guidance on relevant skills, clear case studies, and work evidence](https://ca.indeed.com/career-advice/finding-a-job/how-to-make-a-portfolio). These are design choices to make the work easier to assess, not a tested prediction of hiring outcomes.
