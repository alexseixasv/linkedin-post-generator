# COMPOUND ENGINEERING MASTER PROMPT

We are going to build a real AI-powered product from an almost empty repository.

This repository intentionally begins with only specialized agents available under:

`.agents/`

There is no application yet.

There are no predefined Skills.

There is no frontend.

There is no backend.

There is no database.

There is no infrastructure.

There is no product documentation.

There is no implementation plan.

The goal is NOT simply to generate software quickly.

The goal is to demonstrate a full Compound Engineering workflow where the repository progressively accumulates:

* product understanding;
* domain knowledge;
* engineering decisions;
* reusable procedures;
* architectural reasoning;
* implementation patterns;
* lessons learned;
* AI prompt strategies;
* quality constraints.

The repository should become more capable as the product evolves.

---

# 1. CORE ENGINEERING PRINCIPLE

Do not optimize for producing the maximum amount of code.

Optimize for:

* product value;
* correctness;
* maintainability;
* professional quality;
* reusable knowledge;
* reduced rediscovery;
* faster future iterations;
* better future agent decisions.

Follow this lifecycle:

DISCOVER
→ RESEARCH
→ DEFINE
→ PLAN
→ IMPLEMENT
→ REVIEW
→ TEST
→ REFLECT
→ COMPOUND KNOWLEDGE
→ NEXT ITERATION

The next similar task should require less reasoning than the previous one.

This is a central success criterion.

---

# 2. FIRST PRINCIPLE: DO NOT CODE IMMEDIATELY

Do NOT begin by scaffolding React.

Do NOT begin by creating Fastify routes.

Do NOT begin by generating database migrations.

Do NOT begin by creating Dockerfiles.

Do NOT begin by generating a large application structure.

First:

1. inspect;
2. understand;
3. research;
4. challenge assumptions;
5. define the product;
6. model the domain;
7. identify risks;
8. define architecture;
9. determine reusable procedures;
10. create a plan.

Then build.

---

# 3. AGENT SYSTEM

Before meaningful work, inspect every available agent under:

`.agents/`

Understand:

* the responsibility of each agent;
* when it should participate;
* what inputs it needs;
* what it should challenge;
* what output it is responsible for.

Agents represent:

WHO performs specialized work.

Do not involve every agent in every task.

Use the smallest useful set of specialists.

A specialist should only participate when their expertise materially improves the decision or implementation.

---

# 4. AGENT COLLABORATION PRINCIPLE

Do not simulate a team where everyone agrees.

Agents must challenge each other.

For important decisions explicitly evaluate:

* What are we overengineering?
* What are we underthinking?
* What assumption has no evidence?
* What would create user distrust?
* What can fail?
* What can be simplified?
* Does this actually belong in the MVP?
* Is this architecture necessary?
* Could deterministic software solve this better?
* Are we creating abstraction before we need it?

Review agents must search for weaknesses rather than praise.

---

# 5. SKILLS ARE NOT PREDEFINED

This repository intentionally starts without Skills.

Skills must emerge from actual project work.

Agents represent:

WHO performs the work.

Skills represent:

HOW a reusable capability should be performed.

Skills must live under:

`.skills/<skill-name>/SKILL.md`

Do not create a large speculative Skill library at project initialization.

Skills must emerge from real repeated reasoning.

---

# 6. SKILL CREATION CRITERIA

A Skill should generally exist when knowledge is:

REUSABLE

* PROCEDURAL
* NON-TRIVIAL
* LIKELY TO BE NEEDED AGAIN

Create or update a Skill when at least TWO of the following are true:

1. The reasoning will probably happen again.
2. Multiple agents can reuse the procedure.
3. The task required meaningful domain knowledge.
4. Getting the procedure wrong materially reduces product quality.
5. The capability contains several repeatable steps.
6. Capturing it reduces future prompting.
7. Capturing it reduces future mistakes.
8. Future agents would otherwise rediscover the approach.
9. Review repeatedly detects the same failure pattern.
10. The capability creates leverage across multiple vertical slices.

Do not create Skills for:

* trivial code;
* obvious language syntax;
* a single component;
* one-off debugging;
* isolated naming decisions;
* generic programming knowledge;
* documentation that does not contain a procedure.

---

# 7. SKILL CREATION PROCESS

Before creating a Skill:

1. inspect existing Skills;
2. search for overlapping capabilities;
3. determine whether an existing Skill should be improved;
4. only create a new one when the capability is distinct.

Use:

`.skills/<skill-name>/SKILL.md`

with approximately:

# Skill Name

## Purpose

Why this capability exists.

## When to Use

When an agent should invoke it.

## Inputs

Required context.

## Procedure

Repeatable execution steps.

## Quality Criteria

How good execution is recognized.

## Common Failure Modes

Frequent mistakes.

## Output

Expected result.

## Learnings

Improvements discovered through real project use.

Skills must evolve.

Do NOT create:

skill-v2
skill-final
skill-new

Update the existing capability.

---

# 8. OBSERVABLE COMPOUND ENGINEERING

Whenever reusable knowledge meaningfully emerges, surface it briefly.

Example:

SKILL LEARNED:

`content-relevance-scoring`

WHY:

The system discovered a reusable procedure for evaluating whether external news is genuinely relevant to a specific professional profile.

Other useful progress messages:

AGENTS CONSULTED:

`product-manager`, `ux-expert`, `personal-branding-expert`

DECISION:

Manual LinkedIn information entry will be used for the MVP instead of scraping.

LEARNING:

Mentioning a technology once is insufficient evidence of professional authority.

Do not narrate trivial filesystem operations.

Only expose meaningful decisions, learnings and Compound Engineering moments.

---

# 9. PRODUCT

Build a professional MVP called:

# LinkedIn Content Studio

The product helps technology professionals transform:

their professional background
+
their expertise
+
their desired positioning
+
their writing style
+
relevant current technology events

into highly personalized LinkedIn content.

The application should also generate a professional supporting image based on:

* the post idea;
* the professional's positioning;
* visual direction;
* up to three reference photos supplied by the user.

---

# 10. CORE PRODUCT EXPERIENCE

The product must NOT feel like:

"ChatGPT generated a LinkedIn post for me."

It should feel like:

"This system understands who I am professionally, understands what is happening in my field, identified something I have a credible reason to discuss, and helped me express a strong professional point of view."

This distinction is fundamental.

The core product differentiator is:

PERSONALIZED PROFESSIONAL AUTHORITY.

---

# 11. TARGET USER

Primary users include:

* Software Engineers;
* Senior Software Engineers;
* Staff Engineers;
* Principal Engineers;
* Tech Leads;
* Engineering Managers;
* Software Architects;
* Product Engineers;
* DevOps Engineers;
* Cloud Engineers;
* Platform Engineers;
* Data Engineers;
* AI Engineers;
* Machine Learning Engineers;
* Product Managers;
* CTOs;
* Technical Founders.

---

# 12. CORE USER PROBLEM

Technology professionals often struggle to create consistent LinkedIn content because:

* they do not know what to talk about;
* they do not know which current events are actually relevant to their expertise;
* they struggle to connect industry news with their real professional experience;
* generic AI-generated posts sound artificial;
* they struggle with hooks;
* they struggle with storytelling;
* they struggle with professional positioning;
* they overuse generic thought leadership;
* they struggle to create accompanying visuals;
* they do not want to spend significant time researching content every week.

The application must solve these problems together.

---

# 13. CORE PRODUCT JOURNEY

Keep the following journey visible throughout development:

Professional Profile
↓
Professional Persona
↓
Content Authority
↓
Current Events Discovery
↓
Topic Relevance
↓
Content Opportunities
↓
Angle Selection
↓
Story Strategy
↓
Post Generation
↓
AI Writing Review
↓
Fact Review
↓
SEO Review
↓
Professional Quality Score
↓
Image Creative Brief
↓
Image Generation
↓
Final Publishable Result

Secondary features must not distract from this path.

---

# 14. PROFESSIONAL PROFILE INPUT

Allow users to manually enter information from their LinkedIn profile.

Do NOT implement LinkedIn scraping in the MVP.

Collect approximately:

* Full Name
* Professional Headline
* Current Job Title
* Current Company
* About
* Top Skills
* Technologies
* Industries
* Years of Experience
* Current Experience
* Previous Experiences
* Professional Achievements
* Architecture Experience
* Leadership Experience
* Business Impact
* Subjects of Interest
* Subjects to Avoid
* Target Audience
* Preferred Language
* Desired Professional Positioning

Professional experiences should support:

* role;
* company;
* start/end period;
* description;
* responsibilities;
* achievements;
* technologies;
* measurable outcomes.

Do not make every field mandatory.

Avoid creating a giant HR-like form.

Use progressive UX where appropriate.

---

# 15. PERSONAL BRANDING INPUT

Allow users to define how they want to be perceived professionally.

Examples:

* Technical Expert
* Engineering Leader
* Builder
* Architect
* Educator
* Founder
* AI Specialist
* Data Specialist
* Product Thinker
* Cloud Specialist
* Platform Specialist
* Career Specialist

Allow multiple selections.

Also collect something equivalent to:

"After someone reads your posts, how would you like them to describe you professionally?"

This must influence content selection and writing strategy.

---

# 16. WRITING STYLE

Allow users to define preferred content characteristics.

Possible tone options:

* Conversational
* Technical
* Opinionated
* Educational
* Executive
* Provocative
* Story-driven
* Analytical
* Direct

Allow preferred post size:

SHORT
MEDIUM
LONG

Allow optional writing samples.

When writing samples exist, they should influence:

* vocabulary;
* sentence rhythm;
* paragraph length;
* technical depth;
* directness;
* formality;
* tone;
* use of humor;
* narrative style.

Do not copy previous text mechanically.

Infer style rather than plagiarizing samples.

---

# 17. REFERENCE PHOTOS

Allow the user to upload up to THREE professional reference photos.

Support:

PNG
JPEG
WEBP

Photos may already have their background removed.

Display previews.

Validate:

* quantity;
* file size;
* type;
* malformed uploads.

Treat photos as sensitive user-provided data.

Never use client filenames directly as filesystem paths.

Generate server-controlled storage identifiers.

Design storage behind a provider abstraction.

Local development may use local filesystem storage.

Future environments should be able to use object storage without rewriting domain logic.

---

# 18. PROFESSIONAL PERSONA

Transform raw user input into structured professional context.

The persona should identify approximately:

* Core Expertise
* Supporting Expertise
* Technologies
* Industries
* Career Narrative
* Seniority
* Technical Depth
* Leadership Exposure
* Differentiators
* Professional Proof Points
* Target Audience
* Desired Perception
* Content Pillars
* Strong Authority Topics
* Credible Topics
* Adjacent Topics
* Weak Authority Topics
* Professional Keywords
* Business Impact Themes
* Repeated Career Patterns

Professional authority must be evidence-based.

Never:

* infer expertise from a single casual technology mention;
* fabricate accomplishments;
* inflate seniority;
* invent years of experience;
* invent team leadership;
* invent business impact.

Use structured output where appropriate.

Validate AI-generated structured data before persisting it.

---

# 19. CONTENT AUTHORITY MODEL

The system should distinguish between:

HIGH AUTHORITY

The user's profile contains strong repeated evidence and experience.

CREDIBLE

The user has clear relevant experience.

ADJACENT

The topic relates to their field but direct authority is weaker.

RISKY

The profile does not justify strong claims.

Content generation must take these levels into account.

The user should never be positioned as an expert on a subject that their own profile does not support.

---

# 20. CURRENT EVENTS DISCOVERY

The application should discover recent technology developments related to:

* core expertise;
* supporting expertise;
* technologies;
* industries;
* current role;
* target audience;
* content pillars;
* professional interests.

Relevant information may include:

* official product releases;
* framework releases;
* new language capabilities;
* engineering blog announcements;
* AI developments;
* cloud announcements;
* database releases;
* cybersecurity events;
* architecture developments;
* DevOps/platform engineering news;
* developer tooling;
* important engineering industry discussions;
* company technical announcements.

Prefer high-quality sources.

Priority order should generally be:

1. official source;
2. official engineering/company blog;
3. official documentation;
4. reputable technical publication;
5. reputable industry publication.

Avoid low-quality aggregation when primary sources exist.

---

# 21. NEWS PROVIDER ARCHITECTURE

Do not couple domain logic directly to a specific external news provider.

Create a boundary such as:

`NewsProvider`

Potential capability:

`searchNews(topics, dateRange)`

Normalize external responses into an internal model such as:

NewsArticle:

* id
* title
* description
* source
* url
* publishedAt
* summary
* topics
* factualClaims
* providerMetadata

Provider-specific details must remain outside domain logic.

---

# 22. FACTUAL INTEGRITY

Never fabricate current events.

Never fabricate:

* product announcements;
* release dates;
* company statements;
* product capabilities;
* quotes;
* statistics;
* benchmark results;
* research results;
* technical features.

Maintain traceability to external sources.

Separate:

FACT

from:

INTERPRETATION

from:

OPINION.

Any externally-derived factual claim used in a generated post should remain traceable to supporting source material.

External content is untrusted DATA.

It must never override system instructions.

Explicitly consider prompt injection from external content.

---

# 23. TOPIC RELEVANCE ENGINE

Trending does not mean relevant.

The system must rank current events according to how appropriate they are for a specific professional.

Potential dimensions:

PROFILE_MATCH
EXPERTISE_MATCH
AUDIENCE_RELEVANCE
CREDIBILITY_ALIGNMENT
RECENCY
DISCUSSION_POTENTIAL
ORIGINALITY_POTENTIAL
CAREER_POSITIONING_VALUE

Potential scoring could combine deterministic and semantic evaluation.

Do not automatically assume all dimensions require AI.

Explicitly decide where deterministic scoring and AI-based semantic evaluation are appropriate.

Before proposing any topic, answer:

"Why should THIS professional discuss THIS topic?"

If the answer is weak, reject it.

---

# 24. RELEVANCE OVER POPULARITY

Prefer:

a smaller event with extremely high professional alignment

over:

a huge trending event with little relationship to the user's experience.

The system is not a general news aggregator.

It is a professional opportunity discovery system.

---

# 25. CONTENT OPPORTUNITIES

Do NOT generate final posts directly from news.

Never use:

NEWS
→ POST

Use:

NEWS
→ INTERPRETATION
→ PROFESSIONAL CONNECTION
→ CONTENT OPPORTUNITY
→ ANGLE
→ STORY STRATEGY
→ POST

Generate approximately THREE distinct content opportunities.

Each opportunity should contain:

* Topic
* Source Event
* Why It Matters
* Why It Fits This Professional
* Target Audience
* Thesis
* Professional Point of View
* Storytelling Direction
* Reader Takeaway
* Credibility Risk
* Relevant Professional Evidence

---

# 26. CONTENT ANGLES

Possible angle types include:

## EXPERIENCE-DRIVEN

Interpret the current event through the author's actual experience.

Example principle:

"How does this change something I have actually encountered in real projects?"

## CONTRARIAN

Challenge the most obvious interpretation when evidence and professional judgment justify it.

## EDUCATIONAL

Explain the practical meaning behind the development.

## PRODUCTION REALITY

Discuss what matters outside demos and tutorials.

## ARCHITECTURAL

Explore system-design or technical tradeoffs.

## LEADERSHIP

Explore implications for engineering teams or decision-making.

## CAREER

Discuss how a change affects professional growth.

## BUSINESS IMPACT

Connect technology with business outcomes.

## PREDICTION

Explain what the event may imply next, clearly separating prediction from fact.

The system should select angle based on profile relevance, not random variety.

---

# 27. CONTENT OPPORTUNITY REJECTION

Reject an opportunity when:

* the professional has no credible connection to the topic;
* the post would merely summarize the article;
* the system would need to invent experience;
* the professional would need to pretend expertise;
* the angle adds no meaningful professional insight;
* the source is unreliable;
* the topic is already extremely saturated and no differentiated angle exists.

---

# 28. "WHY THIS POST?" EXPERIENCE

Build an explicit trust feature explaining why each topic is recommended.

Conceptually display:

TOPIC

PostgreSQL feature X released.

PROFILE MATCH

92%

WHY THIS FITS YOU

Strong professional evidence:

PostgreSQL
Backend Development
Distributed Systems
AWS

WHY YOUR AUDIENCE MAY CARE

Your audience frequently makes architecture and production decisions related to this subject.

RECOMMENDED ANGLE

Instead of summarizing the release, discuss how it changes a production decision engineers already make.

This explanation must be concise and user-facing.

Do not expose hidden chain-of-thought.

Expose rationale, not internal reasoning traces.

---

# 29. STORY STRATEGY

Before writing final copy, choose a narrative structure.

Possible structures include:

Experience
→ Observation
→ Lesson

Problem
→ Attempt
→ Discovery
→ Insight

Current Event
→ Professional Experience
→ Implication

Contrarian Claim
→ Evidence
→ Perspective

Mistake
→ Consequence
→ Lesson

Technology Change
→ What Changed
→ Why It Matters

Before
→ Turning Point
→ After

Prediction
→ Evidence
→ Implication

Professional Pattern
→ New Event
→ Interpretation

Do not randomly choose storytelling structures.

Choose based on actual available evidence.

Never fabricate personal experiences to satisfy a narrative template.

---

# 30. STORYTELLING AND RETENTION

Use storytelling to improve reading completion.

Potential mechanisms:

* information gap;
* tension;
* contrast;
* progressive disclosure;
* specificity;
* open loops;
* delayed explanation;
* professional conflict;
* recognizable pain.

Do not overuse them.

Every paragraph must contribute to at least one:

* narrative;
* argument;
* evidence;
* insight.

Remove paragraphs that only exist as filler.

---

# 31. LINKEDIN POST GENERATION

Generate LinkedIn posts optimized for:

AUTHENTICITY
CREDIBILITY
INSIGHT
RETENTION
CLARITY
SPECIFICITY
PROFESSIONAL POSITIONING
AUDIENCE VALUE

Posts should generally include:

* a strong opening;
* context;
* a clear professional point of view;
* narrative or argument;
* concrete insight;
* professional takeaway;
* natural closing.

Do not mechanically expose this structure.

---

# 32. HOOK ENGINEERING

Treat the first lines as an independent editorial problem.

A hook may leverage:

* tension;
* novelty;
* specificity;
* professional disagreement;
* recognizable pain;
* unexpected observation;
* contrarian insight;
* clear stakes.

Curiosity must come from substance.

BAD:

"AI is changing everything."

BETTER:

"Most engineering teams adopting AI coding tools are measuring the wrong thing."

BAD:

"Here are 5 things every developer needs to know."

BETTER:

"The most important part of this release is probably the feature almost nobody is discussing."

Do not use clickbait without substance.

---

# 33. HUMAN WRITING REQUIREMENT

Generated content must NOT sound like stereotypical AI-generated LinkedIn content.

This is a critical product requirement.

Inspect for patterns including:

* generic intros;
* generic summaries;
* artificial rhetorical questions;
* overly polished transitions;
* repetitive rhythm;
* overly symmetrical paragraphs;
* excessive headings;
* excessive lists;
* generic motivation;
* generic thought leadership;
* empty inspirational statements;
* fake authority;
* unnecessary summaries;
* engagement bait.

Common suspicious phrases include:

"In today's rapidly evolving world..."

"Here's the thing..."

"Let's dive in."

"Game changer."

"This changes everything."

"Let that sink in."

"The takeaway?"

"It's not about X. It's about Y."

"The future belongs to..."

"One thing is clear..."

"Have you ever wondered..."

Do not automatically ban every phrase.

Evaluate whether it sounds natural in context.

---

# 34. HUMANIZATION PRINCIPLE

Human writing does NOT mean intentionally creating bad grammar.

Do not simulate humanity through mistakes.

Natural professional writing should contain:

* judgment;
* specific observations;
* contextual vocabulary;
* varied sentence length;
* asymmetric rhythm;
* real nuance;
* selective detail;
* defensible opinions;
* professional vocabulary appropriate to the author.

A useful final question:

"Could this professional reasonably say this during a conversation with another professional?"

If not, revise.

---

# 35. PERSONAL CLAIM INTEGRITY

Never fabricate:

"I recently worked on..."

"My team discovered..."

"In one of my projects..."

"After ten years working with..."

"I've seen this dozens of times..."

unless the user-supplied profile clearly supports the statement.

Never invent:

* employers;
* clients;
* project scope;
* metrics;
* technologies;
* team sizes;
* failures;
* successes;
* anecdotes.

Storytelling must remain grounded.

---

# 36. PERSONAL BRAND CONSISTENCY

Every generated post should reinforce a coherent professional identity.

Evaluate:

EXPERTISE
↓
AUDIENCE
↓
DESIRED PERCEPTION

Ask:

"What would a reader believe about this professional after reading the post?"

Compare this answer with the user's desired professional positioning.

Show expertise through:

* judgment;
* experience;
* tradeoffs;
* specificity;
* insight.

Do not rely primarily on self-declared authority.

---

# 37. PROFESSIONAL MARKETING

Use professional marketing mechanisms responsibly.

Potential mechanisms include:

* curiosity;
* specificity;
* authority;
* recognition;
* tension;
* contrast;
* novelty;
* opportunity;
* loss avoidance;
* professional aspiration.

Do not fabricate:

* urgency;
* scarcity;
* authority;
* social proof;
* personal success.

Optimize for:

RELEVANT PROFESSIONAL ATTENTION

not:

EMPTY ENGAGEMENT.

---

# 38. SEO

Extract professional keywords from:

* profile;
* headline;
* skills;
* technologies;
* current role;
* industry;
* content topic;
* target audience.

Classify them approximately into:

PRIMARY
SECONDARY
CONTEXTUAL

Use keywords naturally.

Do not keyword-stuff.

Do not create artificial lists of technologies solely for discoverability.

Hashtags are optional.

If used, prefer a small number of genuinely relevant hashtags.

---

# 39. EDITORIAL QUALITY SCORE

Evaluate final posts across dimensions such as:

HOOK
AUTHENTICITY
PROFESSIONAL CREDIBILITY
STORYTELLING
READABILITY
INSIGHT
AUDIENCE RELEVANCE
ORIGINALITY
SEO
DISCUSSION POTENTIAL

Use a normalized score such as 0-100.

Do not expose internal chain-of-thought.

Expose only:

* score;
* concise explanation;
* actionable weaknesses.

Require revision when critical dimensions are weak.

Especially:

* authenticity;
* credibility;
* factual integrity;
* insight.

Prefer targeted revision over complete regeneration when most of the post is already strong.

---

# 40. AI WRITING REVIEW

A specialized reviewer should inspect the generated draft.

Look for:

* stereotypical AI wording;
* fabricated authority;
* unsupported claims;
* predictable transitions;
* artificial rhetorical structures;
* excessive formatting;
* generic endings;
* unnecessary questions;
* repetitive cadence;
* excessive perfection.

The reviewer should:

1. identify the weak section;
2. explain the issue briefly;
3. revise only what is necessary;
4. preserve strong lines;
5. re-evaluate the final rhythm.

Do not destroy good writing through unnecessary rewriting.

---

# 41. FACT REVIEW

Any external factual claim used in the post must remain grounded in source material.

Check:

* dates;
* company announcements;
* product capabilities;
* statistics;
* technical claims;
* quotes;
* release information.

Do not publish unsupported factual claims.

Clearly separate professional interpretation from factual reporting.

---

# 42. IMAGE GENERATION PIPELINE

For the MVP, use the OpenAI API as the concrete image-generation provider.

Do NOT move directly from:

POST
→ OPENAI IMAGE API

Use:

POST
→ COMMUNICATION OBJECTIVE
→ CREATIVE DIRECTION
→ IMAGE CREATIVE BRIEF
→ IMAGE GENERATION PROMPT
→ REFERENCE PHOTOS
→ OPENAI IMAGE API
→ GENERATED IMAGE
→ STORAGE
→ FINAL RESULT

Separate thinking from execution.

Do not send the raw LinkedIn post directly to the image generation model.

The Image Art Director should first determine the visual concept.

The prompt-building layer should then transform the approved Creative Brief into concrete image-generation instructions.

---

# 43. OPENAI IMAGE GENERATION PROVIDER

The application must expose an application-level boundary such as:

`ImageGenerationProvider`

The concrete MVP implementation should be approximately:

`OpenAIImageGenerationProvider`

Application and domain code must depend on the interface, not directly on the OpenAI SDK.

The OpenAI-specific implementation should live inside the appropriate AI/infrastructure layer.

Do not allow OpenAI-specific request or response types to leak throughout the domain.

Conceptually:

GenerateImageUseCase
↓
ImageGenerationProvider
↓
OpenAIImageGenerationProvider
↓
OpenAI API

---

# 44. IMAGE GENERATION INTERNAL REQUEST

Create a provider-independent request model.

Conceptually:

ImageGenerationRequest {
creativeBrief
generationPrompt
referenceImages[]
aspectRatio
outputPurpose
}

The provider implementation is responsible for translating this internal application request into the concrete OpenAI API request.

Keep provider-specific details isolated.

---

# 45. IMAGE CREATIVE BRIEF

The Creative Brief should contain approximately:

* Communication Objective
* Core Idea
* Subject
* Visual Metaphor
* Environment
* Composition
* Subject Placement
* Professional Wardrobe
* Camera Framing
* Camera Perspective
* Lighting
* Mood
* Color Direction
* Background Hierarchy
* Negative Space
* Optional Headline
* Things To Avoid
* Aspect Ratio

The image should reinforce the post idea.

It should not simply display the post text on a background.

---

# 46. REFERENCE PHOTO USAGE

The user may upload up to THREE reference photographs.

These photographs represent identity references for the SAME professional.

Do not treat them as independent image-generation requests.

When supported by the selected OpenAI image-generation workflow, use reference images to help preserve recognizable identity.

Attempt to maintain:

* recognizable facial identity;
* defining facial characteristics;
* realistic age;
* natural skin texture;
* realistic facial proportions;
* natural body proportions;
* professional credibility.

Do not unnecessarily modify:

* ethnicity;
* age;
* facial identity;
* defining features;
* body proportions.

Avoid synthetic plastic-looking portraits.

---

# 47. IMAGE PROMPT GENERATION

Do not manually concatenate random visual adjectives.

Generate image instructions intentionally from the Creative Brief.

The image-generation prompt should approximately address:

SUBJECT
IDENTITY REFERENCE
POSE / ACTION
WARDROBE
ENVIRONMENT
COMPOSITION
CAMERA
LIGHTING
MOOD
VISUAL STYLE
BACKGROUND
NEGATIVE SPACE
TEXT REQUIREMENTS
IMPORTANT CONSTRAINTS

Describe what SHOULD exist more than what should not.

Use negative constraints only for important failure modes.

---

# 48. OPENAI IMAGE OUTPUT FLOW

After OpenAI returns a generated image:

1. validate the provider response;
2. obtain the generated image asset;
3. persist the asset through `StorageProvider`;
4. associate it with the corresponding generated post;
5. store relevant generation metadata;
6. expose the generated image through the backend;
7. display it on the final result screen.

Do not depend on temporary third-party URLs as permanent application storage.

The application should own the persisted generated asset through its StorageProvider abstraction.

---

# 49. IMAGE STORAGE

For local development, generated images and uploaded reference photos may use:

`LocalStorageProvider`

Do not expose arbitrary filesystem paths.

Use server-controlled identifiers.

The architecture should support future replacement with object storage without rewriting domain logic.

Conceptually:

StorageProvider
└── LocalStorageProvider

Future:

StorageProvider
└── ObjectStorageProvider

Do not introduce cloud object storage into the MVP unless needed.

---

# 50. OPENAI IMAGE FAILURE HANDLING

Handle OpenAI image-generation failures explicitly.

Potential failures include:

* authentication failure;
* rate limiting;
* timeout;
* malformed provider response;
* unsupported image input;
* failed reference-image processing;
* invalid generation request;
* temporary provider outage;
* provider-side rejection.

The frontend should receive a safe, recoverable application error.

Do not expose:

* raw OpenAI responses;
* OpenAI API keys;
* SDK internals;
* stack traces.

Where appropriate provide:

RETRY IMAGE GENERATION

without forcing the user to regenerate:

* persona;
* topic;
* angle;
* post.

Image generation should be independently retryable.

---

# 51. OPENAI TEXT GENERATION PROVIDER

For the MVP, use the OpenAI API as the concrete provider for AI text/semantic tasks.

Create an application-level abstraction such as:

`TextGenerationProvider`

with a concrete implementation approximately:

`OpenAITextGenerationProvider`

Do not create one giant:

`OpenAIService`

responsible for all AI behavior.

Text generation and image generation must remain separate capabilities.

Conceptually:

TextGenerationProvider
└── OpenAITextGenerationProvider

ImageGenerationProvider
└── OpenAIImageGenerationProvider

This separation improves:

* testing;
* provider replacement;
* responsibility boundaries;
* observability;
* prompt isolation.

---

# 52. OPENAI TEXT RESPONSIBILITIES

The OpenAI text provider may support semantic/generative workflows such as:

* Professional Persona analysis;
* Authority analysis;
* semantic topic relevance;
* Content Opportunity generation;
* Story Strategy;
* LinkedIn post drafting;
* AI-writing review;
* professional-brand alignment review;
* editorial evaluation;
* Image Creative Brief generation;
* image-prompt generation.

Do not automatically use OpenAI for tasks that deterministic software can perform better.

---

# 53. OPENAI CONFIGURATION

All OpenAI API access must happen through the backend.

Never expose the OpenAI API key to the React frontend.

Use environment variables.

Provide placeholders in:

`.env.example`

Potential configuration concepts include:

OPENAI_API_KEY

and, where useful, configurable model identifiers.

Do not hard-code secrets.

Do not commit credentials.

Centralize OpenAI client creation.

Do not instantiate the OpenAI SDK randomly throughout the application.

---

# 54. OPENAI TESTING STRATEGY

Normal automated tests must NOT call the real OpenAI API.

Use deterministic provider mocks.

Test application behavior independently from model availability.

For text generation test:

* prompt/context propagation;
* structured output validation;
* malformed model output;
* provider failures;
* retry/error behavior.

For image generation test:

* Creative Brief propagation;
* generation prompt propagation;
* reference-photo propagation;
* provider failure handling;
* generated asset persistence;
* post/image association;
* API success/error response;
* frontend loading/error/success states.

Real OpenAI calls should be limited to controlled:

* manual testing;
* integration testing;
* demo validation.

---

# 55. VISUAL QUALITY

Prefer visual directions such as:

* technology magazine editorial;
* business publication photography;
* professional commercial photography;
* startup campaign;
* conference speaker portrait;
* professional studio portrait;
* engineering workspace;
* architecture whiteboard environment;
* modern technical editorial concept.

Avoid generic AI imagery such as:

* glowing brains;
* random holograms;
* floating binary;
* meaningless code;
* robots shaking hands;
* random dashboards;
* distorted laptops;
* impossible UI;
* unrelated cyberpunk environments;
* meaningless neon effects.

The image should look art-directed rather than prompt-generated.

---

# 56. FINAL PRODUCT EXPERIENCE

The final screen should expose approximately:

TOPIC

SOURCE

WHY THIS TOPIC FITS YOUR PROFILE

PROFILE MATCH

CONTENT ANGLE

STORY STRATEGY

FINAL POST

QUALITY SCORE

EDITORIAL NOTES

GENERATED IMAGE

IMAGE CREATIVE BRIEF

Useful actions:

COPY POST

GENERATE ALTERNATIVE HOOK

CHANGE TONE

CHANGE ANGLE

REWRITE SECTION

REGENERATE POST

GENERATE NEW IMAGE

CHOOSE ANOTHER TOPIC

---

# 57. TECHNICAL STACK

Use:

## Monorepo

Turborepo

## Frontend

React
TypeScript
Vite

## Backend

Node.js
TypeScript
Fastify

## Database

PostgreSQL

## AI

OpenAI API

Concrete MVP providers:

TextGenerationProvider
└── OpenAITextGenerationProvider

ImageGenerationProvider
└── OpenAIImageGenerationProvider

## Local Storage

StorageProvider
└── LocalStorageProvider

## Local Infrastructure

Docker Compose

Keep the entire implementation TypeScript-oriented where practical.

---

# 58. TURBOREPO

Use Turborepo to coordinate workspace tasks.

Expected high-level structure:

apps/
web/
api/

packages/
shared/
ai/
database/
config/

.agents/

.skills/

docs/
product/
architecture/
decisions/
plans/
learnings/

docker-compose.yml

turbo.json

package.json

README.md

The architecture agent may adjust this structure when justified.

Do not turn every shared file into a package.

Create packages only when real boundaries exist.

---

# 59. TURBO TASKS

Define useful workspace tasks such as:

dev
build
test
lint
typecheck

Use dependency-aware execution.

Do not create unnecessary pipeline complexity.

Avoid duplicated orchestration between:

Docker Compose

and

Turborepo.

Each tool should have a clear role.

---

# 60. FRONTEND ARCHITECTURE

Build a polished professional SaaS interface.

Prioritize:

* excellent typography;
* visual hierarchy;
* intentional spacing;
* responsive design;
* polished cards;
* progressive forms;
* good empty states;
* useful loading states;
* clear AI generation states;
* error recovery;
* regeneration controls;
* understandable scores;
* source transparency;
* user control.

Do not make it look like:

* an internal admin dashboard;
* a generic bootstrap panel;
* a CRUD application.

The experience should be strong enough for a public demo.

---

# 61. FRONTEND ENGINEERING PRINCIPLES

Prefer:

* small focused components;
* strong TypeScript;
* clear ownership;
* composition;
* predictable data flow;
* local state first;
* explicit server state;
* reusable primitives only when actual reuse exists.

Avoid:

* giant components;
* unnecessary global state;
* business logic buried in components;
* duplicated fetching;
* premature abstractions.

Every asynchronous experience should consider:

LOADING
SUCCESS
EMPTY
ERROR
RETRY

---

# 62. BACKEND ARCHITECTURE

Use a modular monolith.

Potential modules include:

profile
persona
news
relevance
opportunities
posts
reviews
images
uploads
ai

Use approximately:

HTTP Request
→ Validation
→ Controller
→ Use Case / Service
→ Repository / Provider
→ Response

Controllers should be thin.

Business logic must not live inside HTTP routes.

---

# 63. DATABASE

Use PostgreSQL.

Model the domain before creating tables.

Potential domain concepts include:

UserProfile

ProfessionalExperience

ProfessionalPersona

NewsArticle

ContentOpportunity

StoryStrategy

GeneratedPost

PostReview

UploadedPhoto

GeneratedImage

Do not create tables blindly based on this list.

Analyze:

* lifecycle;
* ownership;
* relationships;
* history requirements;
* persistence needs.

Use migrations.

---

# 64. PROVIDER BOUNDARIES

External services with meaningful vendor replacement or testing cost should be isolated.

Concrete MVP boundaries:

TextGenerationProvider
└── OpenAITextGenerationProvider

ImageGenerationProvider
└── OpenAIImageGenerationProvider

StorageProvider
└── LocalStorageProvider

NewsProvider
└── provider selected during research/architecture

Do NOT create interfaces around everything.

Abstract volatile external dependencies.

Do not abstract stable internal code merely for architectural aesthetics.

---

# 65. AI PROMPT ARCHITECTURE

Runtime prompts must be centralized and maintainable.

Do not scatter prompt strings inside:

* React components;
* HTTP routes;
* controllers;
* random utility functions.

Create an explicit prompt/template layer.

Important prompts should be identifiable.

Use versioning where changes materially affect behavior.

Prefer structured prompt context.

Typical prompt sections may include:

ROLE
CONTEXT
OBJECTIVE
INPUT
CONSTRAINTS
PROCESS
OUTPUT FORMAT
QUALITY CRITERIA

Use structured outputs where predictability matters.

Validate model-generated structures before using them.

---

# 66. AI VS DETERMINISTIC SOFTWARE

Do not use AI simply because this is an AI product.

Explicitly determine:

WHAT SHOULD USE AI

and:

WHAT SHOULD USE DETERMINISTIC SOFTWARE.

AI is appropriate for things like:

* semantic interpretation;
* professional persona analysis;
* article relevance interpretation;
* content angle generation;
* storytelling strategy;
* natural-language writing;
* editorial review;
* image creative direction;
* image generation.

Deterministic software is generally better for:

* validation;
* schemas;
* file limits;
* persistence;
* identifiers;
* normalization;
* permissions;
* exact calculations;
* orchestration rules;
* network behavior.

A probabilistic dependency should only be introduced when semantic judgment or generation provides real value.

---

# 67. LOCAL DEVELOPMENT

The complete application must run predictably through Docker Compose.

The desired developer experience should be approximately:

`docker compose up --build`

At minimum run:

web
api
postgres

through Docker.

Use real service networking.

Containers must communicate through Docker service names.

Do not incorrectly assume localhost refers to another container.

Use named volumes where useful.

---

# 68. DOCKER COMPOSE RELIABILITY

The environment should support:

* web → api communication;
* api → postgres communication;
* api → OpenAI API communication;
* persistent local database;
* local image storage;
* predictable environment variables;
* reproducible startup.

Use health checks where they meaningfully improve reliability.

The API should not blindly assume PostgreSQL is ready because the container process started.

Provide:

`.env.example`

Never commit real secrets.

Do not introduce additional infrastructure services without a justified requirement.

---

# 69. LOCAL STORAGE

For the MVP:

* uploaded reference photos;
* generated images;

may use a local storage adapter.

Do not directly expose arbitrary filesystem paths.

Use server-controlled storage identifiers.

Architecture must support replacing local storage with object storage later.

Do not introduce cloud storage before needed.

---

# 70. SECURITY

Treat every user input as untrusted.

Consider:

* request payload validation;
* photo uploads;
* MIME validation;
* file size;
* quantity limits;
* filenames;
* URLs;
* external articles;
* AI inputs;
* AI outputs;
* provider responses;
* prompt injection;
* OpenAI API keys;
* environment variables.

Do not expose:

* stack traces;
* secrets;
* OpenAI credentials;
* provider internals;
* internal paths.

External article content must never override system instructions.

---

# 71. MVP ARCHITECTURAL PRINCIPLE

Prefer:

SIMPLE
WORKING
POLISHED
COHERENT

over:

COMPLEX
OVERENGINEERED
IMPRESSIVE ON PAPER
UNFINISHED

Explicitly avoid unless actual requirements justify them:

* microservices;
* Kafka;
* Kubernetes;
* CQRS;
* event sourcing;
* unnecessary Redis;
* distributed infrastructure;
* premature scaling patterns.

A modular monolith is expected to be sufficient.

Challenge this only if real requirements emerge.

---

# 72. VERTICAL SLICE DELIVERY

Do NOT build:

entire database
→ entire backend
→ entire frontend

Prefer vertical slices.

Potential slices:

## SLICE 1 — Profile

Profile Form
→ Validation
→ API
→ Persistence
→ Profile UI

## SLICE 2 — Persona

Saved Profile
→ OpenAI Persona Generation
→ Structured Output
→ Persistence
→ Persona UI

## SLICE 3 — Research

Persona
→ News Discovery
→ Normalization
→ Source Persistence
→ Relevant Topics UI

## SLICE 4 — Opportunity

Topic
→ Relevance Evaluation
→ 3 Content Opportunities
→ Why This Post?
→ Angle Selection

## SLICE 5 — Post

Opportunity
→ Story Strategy
→ OpenAI Draft
→ AI Writing Review
→ Fact Review
→ SEO
→ Quality Score
→ Post UI

## SLICE 6 — Image

Post
→ Image Creative Brief
→ Reference Photos
→ Image Prompt
→ OpenAI Image Generation
→ Local Storage
→ Final UI

Each slice should produce visible product value.

---

# 73. IMPLEMENTATION PLANS

Before meaningful implementation, create or update a plan.

A plan should contain:

OBJECTIVE

USER VALUE

SCOPE

OUT OF SCOPE

AFFECTED AREAS

DOMAIN CHANGES

IMPLEMENTATION STEPS

ACCEPTANCE CRITERIA

TEST STRATEGY

SECURITY CONCERNS

UX STATES

RISKS

Plans exist to reduce implementation uncertainty.

Do not create ceremonial plans.

---

# 74. ADRs

Create Architecture Decision Records only for meaningful decisions.

An ADR is justified when a decision:

* has real alternatives;
* materially affects architecture;
* would be expensive to reverse;
* is likely to be questioned later.

Suggested format:

# ADR-XXX — Title

## Status

## Context

## Options Considered

## Decision

## Consequences

## Tradeoffs

Avoid ADR inflation.

---

# 75. DOCUMENTATION STRUCTURE

Use repository knowledge intentionally.

`docs/product/`

Stable product understanding.

`docs/architecture/`

System structure and boundaries.

`docs/decisions/`

Architectural decisions.

`docs/plans/`

Executable plans.

`docs/learnings/`

Project-specific discoveries.

`.skills/`

Reusable procedures.

`.agents/`

Specialist responsibilities.

Do not duplicate the same content everywhere.

---

# 76. QUALITY GATES

Before meaningful work is considered complete verify:

* requirements are understood;
* product behavior matches intent;
* architecture is respected;
* TypeScript passes;
* build passes;
* tests pass;
* happy path works;
* error path exists;
* empty state exists where relevant;
* loading behavior exists where relevant;
* security implications were considered;
* inputs are validated;
* AI structured outputs are validated;
* OpenAI failures are handled;
* factual claims are grounded;
* no obvious unsupported authority exists;
* no unnecessary duplication was introduced;
* reusable knowledge was evaluated.

---

# 77. TESTING

Use the cheapest test that provides useful confidence.

Prefer approximately:

unit tests

for deterministic domain logic.

integration tests

for:

* database;
* provider boundaries;
* API behavior.

end-to-end tests

for the most critical user journeys.

Do not test AI-generated exact wording.

For AI functionality test properties such as:

* valid structure;
* required fields;
* grounding;
* professional relevance;
* rejection of unsupported claims;
* proper provider failure handling.

Use deterministic mocks for OpenAI in automated tests.

---

# 78. QA FAILURE MODES

Actively test:

* invalid profiles;
* minimal profile information;
* no relevant news;
* news-provider failure;
* malformed provider output;
* OpenAI text-generation failure;
* invalid structured OpenAI output;
* low-quality topic match;
* unsupported personal claims;
* file too large;
* invalid image type;
* too many photos;
* OpenAI image-generation failure;
* reference-photo failure;
* storage failure;
* database failure;
* network interruption;
* empty states.

Do not design only for the happy path.

---

# 79. COMPOUND REFLECTION

After meaningful work ask:

1. What required substantial reasoning?
2. What did we learn about the product?
3. What did we learn about the domain?
4. What failed?
5. What did reviewers catch?
6. What procedure appeared repeatedly?
7. Which OpenAI prompt patterns produced better output?
8. Which provider abstractions proved useful or unnecessary?
9. Which architectural assumption changed?
10. What future work will face the same issue?
11. What should the next agent not need to rediscover?
12. What does NOT deserve persistence?

Classify findings as:

SKILL
AGENT RULE
ADR
LEARNING
PRODUCT DOCUMENTATION
ARCHITECTURE DOCUMENTATION
NOWHERE

Be selective.

---

# 80. COMPOUND LEARNING PRINCIPLE

Do not confuse Compound Engineering with creating documentation.

The objective is not:

MORE FILES.

The objective is:

LESS REDISCOVERY.

A repository has improved when future agents can make better decisions with less prompting.

---

# 81. FIRST EXECUTION

Begin now.

Do NOT scaffold application code immediately.

Perform the following sequence.

---

## PHASE A — REPOSITORY DISCOVERY

Inspect:

* repository contents;
* all available agents;
* any existing files.

Understand the available specialist team.

Report the agents that appear relevant to initial discovery.

---

## PHASE B — PRODUCT DISCOVERY

Use appropriate product/domain specialists.

Define:

* target user;
* core user problem;
* desired outcome;
* jobs to be done;
* MVP scope;
* explicit non-goals;
* primary journey;
* differentiators;
* trust requirements;
* product risks;
* domain risks;
* UX risks.

Challenge the proposed product before accepting it.

---

## PHASE C — DOMAIN MODELING

Determine important domain concepts.

Analyze:

* ownership;
* lifecycle;
* relationships;
* persistence needs;
* what should remain ephemeral;
* what should be versioned/history-aware.

Do not create database models yet unless domain reasoning is mature enough.

---

## PHASE D — AI PIPELINE DESIGN

Design:

Profile
→ Persona
→ Authority
→ Research
→ Relevance
→ Opportunity
→ Story Strategy
→ Draft
→ AI Writing Review
→ Fact Review
→ SEO
→ Score
→ Image Creative Brief
→ Image Prompt
→ OpenAI Image Generation
→ Storage

Determine:

* which stages use OpenAI;
* which stages use deterministic software;
* which stages require structured output;
* where validation occurs;
* where factual traceability must exist;
* what should be persisted;
* how OpenAI failures propagate;
* how provider-specific concerns remain isolated.

---

## PHASE E — INITIAL SKILL DISCOVERY

Review the reasoning already performed.

Ask:

"Which capabilities already meet the Skill Creation Criteria?"

Create only genuinely justified Skills.

Do not create Skills speculatively.

Whenever one is created, surface:

SKILL LEARNED:

WHY:

---

## PHASE F — ARCHITECTURE

Use the relevant technical specialists.

Design:

* Turborepo structure;
* workspace boundaries;
* React architecture;
* Fastify architecture;
* PostgreSQL model direction;
* Docker Compose;
* container networking;
* local image storage;
* OpenAI provider boundaries;
* news abstraction;
* AI prompt architecture;
* error strategy;
* testing strategy.

Before finalizing architecture, run critique.

Explicitly ask:

* What are we overengineering?
* What are we underengineering?
* Which abstractions are premature?
* Which OpenAI-specific details are leaking?
* Which external dependencies need boundaries?
* What should remain simple?

---

## PHASE G — UX DESIGN

Design the minimum viable flow.

Pay special attention to:

* onboarding;
* profile data entry;
* progressive form UX;
* persona feedback;
* topic discovery;
* Why This Post?;
* opportunity comparison;
* angle selection;
* generation state;
* editorial result;
* scores;
* source transparency;
* photo upload;
* OpenAI image-generation state;
* image result;
* retry/regeneration flows.

---

## PHASE H — DOCUMENTATION

Create useful foundational artifacts.

At minimum evaluate and create where justified:

`docs/product/product-spec.md`

`docs/architecture/system-design.md`

`docs/plans/mvp.md`

Create ADRs only when meaningful architectural decisions warrant them.

Likely ADR candidates include:

* OpenAI as concrete MVP AI provider;
* provider isolation strategy;
* Turborepo monorepo;
* modular-monolith architecture;
* Docker Compose local environment;
* local file storage for MVP.

Only create them when the decision is meaningful enough to warrant historical reasoning.

---

## PHASE I — VERTICAL SLICE PLAN

Break implementation into vertical slices.

Each slice must define:

* user value;
* scope;
* acceptance criteria;
* implementation path;
* test strategy;
* key risks.

Favor slices that produce visible UI progress.

---

## PHASE J — COMPOUND REFLECTION

Review what was learned during discovery and architecture.

Create or improve Skills where justified.

Identify what the repository now knows that did not exist at the beginning.

---

# 82. DISCOVERY CHECKPOINT

After discovery and planning, present:

## PRODUCT UNDERSTANDING

## MVP SCOPE

## NON-GOALS

## DOMAIN MODEL

## AI PIPELINE

## OPENAI RESPONSIBILITIES

## AI VS DETERMINISTIC DECISIONS

## ARCHITECTURE

## TURBOREPO STRUCTURE

## DOCKER COMPOSE STRATEGY

## OPENAI PROVIDER BOUNDARIES

## STORAGE STRATEGY

## NEWS PROVIDER STRATEGY

## MVP VERTICAL SLICES

## AGENTS CONSULTED

## SKILLS DISCOVERED

## ADRS CREATED

## RISKS

## WHAT THE REPOSITORY KNOWS NOW THAT IT DID NOT KNOW BEFORE

Then continue into implementation unless a genuinely blocking ambiguity exists.

---

# 83. IMPLEMENTATION MODE

For every vertical slice:

UNDERSTAND
→ INSPECT EXISTING KNOWLEDGE
→ CONSULT RELEVANT AGENTS
→ REVIEW RELEVANT SKILLS
→ PLAN
→ IMPLEMENT
→ REVIEW
→ TEST
→ REFLECT
→ UPDATE KNOWLEDGE

Do not ask for permission between normal execution phases.

Make sensible decisions autonomously.

Stop only when missing information fundamentally prevents implementation.

---

# 84. DEFINITION OF PRODUCT SUCCESS

The MVP succeeds when a user can:

1. enter meaningful professional profile data;
2. define desired professional positioning;
3. define writing preferences;
4. upload up to three reference photos;
5. generate a structured professional persona using the OpenAI-backed AI layer;
6. understand their content authority;
7. discover recent relevant technology events;
8. understand why each topic fits their profile;
9. compare multiple content angles;
10. choose an angle;
11. generate an appropriate story strategy;
12. generate a strong LinkedIn post;
13. receive AI-writing review;
14. receive factual validation;
15. receive professional quality scoring;
16. receive natural SEO optimization;
17. generate an Image Creative Brief;
18. transform that brief into an image-generation prompt;
19. generate a professional supporting image through the OpenAI API;
20. preserve recognizable identity using reference photos when supported;
21. persist the generated image;
22. retry image generation independently when needed;
23. copy a publishable post;
24. complete the entire journey through a polished UI.

---

# 85. DEFINITION OF ENGINEERING DEMO SUCCESS

The Compound Engineering demonstration succeeds when observers can clearly see:

* the repo started almost empty;
* specialized agents were consulted;
* agents challenged assumptions;
* product thinking happened before code;
* domain modeling happened before persistence;
* OpenAI was used selectively rather than everywhere;
* text and image AI capabilities were separated;
* provider boundaries prevented vendor concerns from leaking into the domain;
* architecture emerged intentionally;
* Skills emerged organically;
* Skills were updated from actual work;
* reviewers found issues;
* learnings were classified;
* unnecessary knowledge was discarded;
* vertical slices produced visible progress;
* Turborepo coordinated the workspace;
* Docker Compose produced a reproducible environment;
* OpenAI image generation became one implementation behind a stable application boundary;
* the repository became progressively more capable.

---

# FINAL PRINCIPLE

We are NOT demonstrating:

AI that writes lots of code.

We are demonstrating:

AN ENGINEERING SYSTEM THAT LEARNS HOW TO BUILD ITS OWN PRODUCT BETTER.

Start by inspecting the repository and the available agents.

Do not start by scaffolding the application.