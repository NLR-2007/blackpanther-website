/* ============================================
   BLACKPANTHERS CLUB — Problem Statement Data
   100 real-world problems with detailed specs.
   Exposes window.BP_PROBLEMS
   Each entry:
     d     - category (Software / Hardware / Hardware + Software)
     th    - theme
     t     - title
     desc  - short one-line description (table)
     detail- detailed background paragraph
     tags  - capability tags (drive recommended tech stack)
     features - key expected features
     how   - how it works / build flow
   ============================================ */

(function () {
  'use strict';

  var SW = 'Software';
  var HW = 'Hardware';
  var HS = 'Hardware + Software';

  window.BP_PROBLEMS = [
    /* ============ SOFTWARE ============ */
    {
      d: SW, th: 'Agriculture & Rural', t: 'Crop Disease Detection',
      desc: 'AI that identifies plant diseases from a photo of a leaf, so farmers can act before crops are lost.',
      detail: 'Small farmers often lose entire harvests because plant diseases are spotted too late or misdiagnosed. This solution lets a farmer photograph a leaf with a basic smartphone and instantly learn what disease it has and how to treat it — working even without internet in the field.',
      tags: ['ml', 'cv', 'mobile', 'edge'],
      features: ['Image-based disease classification', 'Offline on-device inference', 'Treatment & pesticide guidance', 'Regional-language voice output'],
      how: ['Farmer captures a leaf photo in the app', 'An on-device CNN model classifies the disease', 'App shows severity and step-by-step remedy', 'Results sync to a dashboard when online for agronomist review']
    },
    {
      d: SW, th: 'Accessibility', t: 'Sign Language Translator',
      desc: 'Real-time translation of sign language into text and speech using a standard camera.',
      detail: 'Deaf and hard-of-hearing people struggle to communicate with those who do not know sign language. This system uses a normal webcam or phone camera to recognise hand gestures in real time and convert them into readable text and spoken audio, enabling two-way conversation.',
      tags: ['cv', 'ml', 'mobile', 'realtime'],
      features: ['Real-time gesture recognition', 'Text + speech output', 'Support for regional sign languages', 'Two-way conversation mode'],
      how: ['Camera captures hand and body landmarks', 'A pose + sequence model maps gestures to words', 'Words are assembled into sentences with NLP', 'Output is rendered as live captions and TTS speech']
    },
    {
      d: SW, th: 'Smart Education', t: 'Offline-First Learning',
      desc: 'A study platform that works on low bandwidth and syncs when connectivity returns, for rural students.',
      detail: 'Students in low-connectivity regions cannot rely on streaming-based learning apps. This platform stores lessons, quizzes, and progress locally, works fully offline, and intelligently syncs only small deltas when a connection is briefly available.',
      tags: ['mobile', 'web', 'cloud', 'data'],
      features: ['Full offline lessons & quizzes', 'Delta-based background sync', 'Progress tracking & gamification', 'Low-data content delivery'],
      how: ['Content is packaged and cached on device', 'Learner studies and attempts quizzes offline', 'A sync engine queues progress and results', 'Data uploads compactly when any network appears']
    },
    {
      d: SW, th: 'Fintech', t: 'Payment Fraud Detection',
      desc: 'Detect fraudulent UPI and digital transactions in real time without blocking genuine users.',
      detail: 'Digital payment fraud is rising as UPI volumes explode. The challenge is to catch fraudulent transactions within milliseconds while keeping false positives low so real customers are not blocked. This requires learning normal behaviour and flagging anomalies instantly.',
      tags: ['ml', 'data', 'realtime', 'cloud'],
      features: ['Real-time transaction scoring', 'Behavioural anomaly detection', 'Low false-positive tuning', 'Analyst review dashboard'],
      how: ['Each transaction streams into a scoring engine', 'An ML model rates fraud risk using behaviour features', 'High-risk transactions trigger step-up verification', 'Confirmed cases retrain the model continuously']
    },
    {
      d: SW, th: 'Healthcare & MedTech', t: 'Mental Health Companion',
      desc: 'A supportive chatbot with regional-language support that guides users to the right help.',
      detail: 'Many people hesitate to seek mental health support due to stigma or lack of access. A private, empathetic chatbot in the user’s own language can offer coping techniques, screen for risk, and gently guide serious cases to professionals or helplines.',
      tags: ['nlp', 'ml', 'mobile', 'voice'],
      features: ['Empathetic conversational AI', 'Regional-language & voice support', 'Risk screening & escalation', 'Guided coping exercises'],
      how: ['User chats or speaks with the companion', 'An NLP model understands intent and sentiment', 'The bot responds with support or exercises', 'Detected risk escalates to a helpline or professional']
    },
    {
      d: SW, th: 'Smart Automation', t: 'Bias-Free Resume Screening',
      desc: 'Automated shortlisting that flags and removes gender, age, and name bias.',
      detail: 'Traditional resume screening can unintentionally discriminate. This tool evaluates candidates purely on skills and experience, masks bias-prone fields like name, gender, and age, and gives recruiters transparent, explainable scores.',
      tags: ['nlp', 'ml', 'web', 'data'],
      features: ['Skill-based candidate ranking', 'Automatic bias-field masking', 'Explainable match scores', 'Recruiter review dashboard'],
      how: ['Resumes are parsed into structured data', 'Bias-prone fields are anonymised', 'An NLP model scores skill-to-role fit', 'Recruiters see ranked, explainable shortlists']
    },
    {
      d: SW, th: 'Cybersecurity', t: 'Regional Fake-News Detector',
      desc: 'Identify misinformation spreading in regional languages across social platforms.',
      detail: 'Misinformation spreads fastest in regional languages where moderation tools are weak. This system detects false or misleading claims in vernacular text and images, cross-checks them against trusted sources, and flags viral misinformation early.',
      tags: ['nlp', 'ml', 'data', 'web'],
      features: ['Vernacular claim detection', 'Fact cross-referencing', 'Virality/spread tracking', 'Credibility scoring'],
      how: ['Posts are collected and language-detected', 'A model extracts and classifies claims', 'Claims are matched against verified databases', 'Suspicious content is scored and flagged for review']
    },
    {
      d: SW, th: 'Smart Automation', t: 'Legal Document Simplifier',
      desc: 'Summarize contracts and legal notices into plain, understandable language.',
      detail: 'Legal documents are dense and intimidating for ordinary people. This tool reads contracts, notices, and agreements and produces a plain-language summary, highlights risky clauses, and answers questions about the document.',
      tags: ['nlp', 'ml', 'web'],
      features: ['Plain-language summaries', 'Risky-clause highlighting', 'Q&A over the document', 'Multi-language output'],
      how: ['User uploads a legal document', 'The text is parsed and segmented into clauses', 'An LLM summarises and flags risks per clause', 'User can ask follow-up questions in plain language']
    },
    {
      d: SW, th: 'Transport & Logistics', t: 'Traffic Signal Optimizer',
      desc: 'Use live traffic data to dynamically adjust signal timing and cut congestion.',
      detail: 'Fixed-timer traffic signals cause needless jams. Using live vehicle counts from cameras or sensors, this system adapts signal timing in real time across an intersection network to minimise waiting and emissions.',
      tags: ['ml', 'data', 'realtime', 'iot', 'maps'],
      features: ['Live vehicle density sensing', 'Adaptive signal timing', 'Network-wide coordination', 'Emergency-vehicle priority'],
      how: ['Cameras/sensors count vehicles per lane', 'An optimiser computes ideal green times', 'Signals adjust dynamically and share state', 'A control dashboard monitors flow city-wide']
    },
    {
      d: SW, th: 'Accessibility', t: 'Voice Banking for the Blind',
      desc: 'Fully voice-driven banking so visually impaired users can transact independently.',
      detail: 'Visually impaired users find touch-based banking apps hard to navigate. A fully voice-driven interface lets them check balances, transfer money, and pay bills through natural spoken commands, with secure voice authentication.',
      tags: ['voice', 'nlp', 'mobile', 'cloud'],
      features: ['Natural voice commands', 'Voice biometric authentication', 'Spoken transaction confirmations', 'Screen-reader friendly UI'],
      how: ['User speaks a banking request', 'Speech-to-text and intent parsing interpret it', 'Voice biometrics authenticate the user', 'The action executes and is confirmed aloud']
    },
    {
      d: SW, th: 'Cybersecurity', t: 'Land Record Ledger',
      desc: 'Tamper-proof land ownership records to end disputes and fraud.',
      detail: 'Land records are often paper-based, easy to forge, and a source of endless disputes. A tamper-proof digital ledger records every ownership change immutably, making history transparent and verifiable by anyone.',
      tags: ['blockchain', 'web', 'cloud'],
      features: ['Immutable ownership history', 'Digital transfer workflow', 'Public verification portal', 'Role-based official access'],
      how: ['Existing records are digitised and hashed', 'Each transfer is written to a blockchain ledger', 'Officials approve transfers via signed transactions', 'Citizens verify ownership on a public portal']
    },
    {
      d: SW, th: 'Smart Education', t: 'Adaptive AI Tutor',
      desc: 'A tutor that adjusts difficulty and pace to each student’s learning curve.',
      detail: 'One-size-fits-all lessons leave some students bored and others lost. An adaptive tutor continuously measures a learner’s mastery and adjusts question difficulty, hints, and pacing to keep them in the ideal learning zone.',
      tags: ['ml', 'web', 'data', 'nlp'],
      features: ['Mastery estimation per topic', 'Adaptive difficulty & hints', 'Personalised learning paths', 'Progress analytics for teachers'],
      how: ['Student answers diagnostic questions', 'A model estimates mastery per concept', 'The next items adapt to their level', 'Teachers view analytics and interventions']
    },
    {
      d: SW, th: 'Clean & Green Tech', t: 'Carbon Footprint Tracker',
      desc: 'Help small businesses measure and reduce their emissions with actionable insights.',
      detail: 'Small businesses want to go green but lack tools to measure emissions. This tracker ingests energy, travel, and procurement data, estimates the carbon footprint, and recommends specific, cost-effective reductions.',
      tags: ['web', 'data', 'cloud', 'mobile'],
      features: ['Automated emissions calculation', 'Actionable reduction suggestions', 'Benchmarking vs peers', 'Progress reports & certificates'],
      how: ['Business connects bills and activity data', 'Emission factors convert data to CO₂e', 'The app highlights top emission sources', 'It recommends and tracks reduction actions']
    },
    {
      d: SW, th: 'Disaster Management', t: 'Disaster Relief Matcher',
      desc: 'Connect people in need with the nearest available resources during a crisis.',
      detail: 'In disasters, aid is often mismatched — supplies pile up in one place while another goes without. This platform maps real-time needs and available resources, then matches and routes help to where it is needed most.',
      tags: ['web', 'maps', 'realtime', 'cloud', 'mobile'],
      features: ['Real-time need & resource mapping', 'Automated matching & routing', 'Volunteer coordination', 'Offline SMS fallback'],
      how: ['Affected people and donors post needs/resources', 'Locations plot on a live map', 'A matcher pairs needs with nearest resources', 'Volunteers get routed dispatch instructions']
    },
    {
      d: SW, th: 'Smart Education', t: 'Cross-Language Code Plagiarism',
      desc: 'Detect copied logic even when translated between programming languages.',
      detail: 'Students hide plagiarism by translating code from one language to another. This tool compares the underlying logic and structure — not just text — to detect copied algorithms across different programming languages.',
      tags: ['ml', 'nlp', 'data', 'web'],
      features: ['Language-agnostic logic comparison', 'AST & structural analysis', 'Similarity scoring & highlighting', 'Batch submission checking'],
      how: ['Code is parsed into abstract syntax trees', 'Structures are normalised across languages', 'A model compares logic embeddings', 'Suspicious pairs are ranked and highlighted']
    },
    {
      d: SW, th: 'Disaster Management', t: 'Flood Prediction Engine',
      desc: 'Forecast local flooding from weather and terrain data hours in advance.',
      detail: 'Communities near rivers need early flood warnings to evacuate in time. This engine combines rainfall forecasts, river levels, and terrain elevation to predict where and when flooding will occur, and issues localised alerts.',
      tags: ['ml', 'data', 'maps', 'realtime'],
      features: ['Rainfall + river-level modelling', 'Terrain-based flood mapping', 'Localised early alerts', 'Evacuation route suggestions'],
      how: ['Weather and gauge data stream in', 'A hydrological ML model predicts flood extent', 'Risk zones render on a map', 'Alerts and safe routes push to residents']
    },
    {
      d: SW, th: 'Smart Automation', t: 'Kirana Demand Forecasting',
      desc: 'Predict what local shops should stock to reduce waste and stockouts.',
      detail: 'Small neighbourhood stores over-stock some items and run out of others. By learning sales patterns, seasonality, and local events, this tool forecasts demand and suggests smart reorder quantities.',
      tags: ['ml', 'data', 'mobile', 'cloud'],
      features: ['Item-level demand forecasts', 'Reorder quantity suggestions', 'Seasonality & festival awareness', 'Simple mobile dashboard'],
      how: ['Shop logs sales via a simple app', 'A forecasting model learns demand patterns', 'It predicts next-period demand per item', 'The app suggests what and how much to reorder']
    },
    {
      d: SW, th: 'Accessibility', t: 'Web Accessibility Auditor',
      desc: 'Automatically test sites against WCAG and suggest concrete fixes.',
      detail: 'Most websites fail accessibility standards, excluding disabled users. This auditor crawls a site, checks it against WCAG rules, and returns prioritised, concrete fixes with code snippets developers can apply.',
      tags: ['web', 'ml'],
      features: ['Automated WCAG checks', 'Prioritised issue list', 'Code-level fix suggestions', 'Continuous CI integration'],
      how: ['The tool crawls and renders each page', 'It runs accessibility rule checks', 'Issues are ranked by impact', 'Developers get fix snippets and re-test']
    },
    {
      d: SW, th: 'Smart Automation', t: 'Support Ticket Router',
      desc: 'Route multilingual customer queries to the right team instantly.',
      detail: 'Support teams waste time manually triaging tickets. This system reads incoming queries in any language, understands the issue, and routes each ticket to the correct team with a suggested priority and reply.',
      tags: ['nlp', 'ml', 'cloud', 'web'],
      features: ['Multilingual intent detection', 'Automatic team routing', 'Priority prediction', 'Suggested response drafts'],
      how: ['A ticket arrives via email/chat/form', 'NLP detects language, intent, and urgency', 'The ticket routes to the right queue', 'Agents get a suggested draft reply']
    },
    {
      d: SW, th: 'Smart Education', t: 'Interview Practice Coach',
      desc: 'Simulate interviews and give feedback on answers, tone, and clarity.',
      detail: 'Job seekers often lack a safe space to practise interviews. This coach conducts realistic mock interviews, analyses spoken answers for content, clarity, filler words, and confidence, and gives actionable feedback.',
      tags: ['nlp', 'ml', 'voice', 'web'],
      features: ['Role-specific mock questions', 'Speech & content analysis', 'Filler-word & pace feedback', 'Improvement tracking'],
      how: ['User selects a role and starts a mock interview', 'Answers are recorded and transcribed', 'AI evaluates content, tone, and delivery', 'Detailed feedback and scores are shown']
    },
    {
      d: SW, th: 'Healthcare & MedTech', t: 'Telemedicine Triage',
      desc: 'Prioritize remote patients by urgency before a doctor connects.',
      detail: 'Rural clinics and telehealth services get more patients than doctors can immediately see. A smart triage layer collects symptoms, assesses urgency, and queues patients so critical cases are seen first.',
      tags: ['ml', 'web', 'mobile', 'data'],
      features: ['Symptom intake questionnaire', 'Urgency scoring', 'Smart queue prioritisation', 'Doctor summary handoff'],
      how: ['Patient enters symptoms via app or health worker', 'A triage model scores urgency', 'Patients are queued by severity', 'The doctor receives a concise case summary']
    },
    {
      d: SW, th: 'Fintech', t: 'Gig Worker Finance Advisor',
      desc: 'Budgeting and tax help tailored to irregular gig-economy income.',
      detail: 'Gig workers face unpredictable income and confusing taxes. This advisor learns their earning patterns, smooths budgeting across lean and peak weeks, sets aside tax automatically, and offers savings nudges.',
      tags: ['ml', 'mobile', 'data'],
      features: ['Irregular-income budgeting', 'Automatic tax set-aside', 'Savings & goal nudges', 'Income trend insights'],
      how: ['Worker links earnings from gig apps', 'The model forecasts income volatility', 'It recommends weekly budgets and tax reserves', 'Nudges help build savings over time']
    },
    {
      d: SW, th: 'Smart Education', t: 'Handwriting Answer Grading',
      desc: 'Grade handwritten exam sheets accurately and at scale.',
      detail: 'Grading handwritten answer sheets is slow and inconsistent. This system reads scanned handwriting, understands the answer content, matches it to a rubric, and produces consistent scores with feedback.',
      tags: ['cv', 'ml', 'nlp', 'cloud'],
      features: ['Handwriting recognition', 'Rubric-based scoring', 'Consistency across graders', 'Feedback generation'],
      how: ['Answer sheets are scanned/photographed', 'OCR converts handwriting to text', 'An NLP model scores answers against a rubric', 'Teachers review and finalise the grades']
    },
    {
      d: SW, th: 'Sustainability', t: 'Ethical Supply Chain Tracker',
      desc: 'Trace products to their source to verify ethical and sustainable sourcing.',
      detail: 'Consumers and brands cannot easily verify where products come from. This tracker records each step of a product’s journey on an immutable ledger, letting anyone confirm ethical and sustainable sourcing via a QR scan.',
      tags: ['blockchain', 'web', 'data'],
      features: ['End-to-end traceability', 'QR-based provenance lookup', 'Supplier certification records', 'Sustainability scoring'],
      how: ['Each supply-chain step logs an event', 'Events are written immutably to a ledger', 'Products carry a QR linking to their history', 'Buyers scan to verify origin and ethics']
    },
    {
      d: SW, th: 'Cybersecurity', t: 'Deepfake Video Verifier',
      desc: 'Flag manipulated video and audio to protect against impersonation.',
      detail: 'Deepfakes are used for fraud and disinformation. This verifier analyses videos for tell-tale artefacts in faces, lip-sync, and audio, and returns a confidence score on whether the media is authentic or manipulated.',
      tags: ['cv', 'ml', 'data', 'web'],
      features: ['Face & lip-sync artefact detection', 'Audio manipulation analysis', 'Authenticity confidence score', 'Frame-level highlighting'],
      how: ['A video is uploaded for analysis', 'Models inspect visual and audio signals', 'Manipulation indicators are aggregated', 'A verdict and confidence score are returned']
    },
    {
      d: SW, th: 'Agriculture & Rural', t: 'Mandi Price Predictor',
      desc: 'Forecast crop prices and recommend the best market for farmers to sell.',
      detail: 'Farmers often sell at low prices due to lack of market information. This tool forecasts crop prices across nearby mandis and advises the best time and place to sell for maximum profit.',
      tags: ['ml', 'data', 'mobile'],
      features: ['Multi-mandi price forecasts', 'Best sell-time recommendation', 'Transport cost factoring', 'Price alert notifications'],
      how: ['Historical and live mandi prices are ingested', 'A model forecasts near-term prices', 'It compares net profit across markets', 'Farmers get sell recommendations and alerts']
    },
    {
      d: SW, th: 'Clean & Green Tech', t: 'Air Quality Health Advisory',
      desc: 'Forecast pollution and give personalized health guidance by location.',
      detail: 'Air pollution harms vulnerable groups who lack timely guidance. This service forecasts local air quality and gives personalised advice — when to avoid outdoor activity, wear a mask, or use a purifier — based on the user’s health profile.',
      tags: ['ml', 'data', 'maps', 'mobile'],
      features: ['Localised AQI forecasts', 'Personalised health advice', 'Sensitive-group alerts', 'Cleanest-route suggestions'],
      how: ['Sensor and satellite data feed a model', 'The model forecasts AQI by area', 'Advice is tailored to the user’s health profile', 'Alerts and safer routes push to the app']
    },
    {
      d: SW, th: 'Healthcare & MedTech', t: 'Personalized Dosage Engine',
      desc: 'Recommend safe medicine dosages based on patient history and vitals.',
      detail: 'Incorrect dosing causes avoidable harm, especially with multiple medications. This engine considers a patient’s weight, age, kidney function, and drug interactions to recommend safe dosages and warn clinicians of risks.',
      tags: ['ml', 'data', 'web'],
      features: ['Patient-specific dosing', 'Drug-interaction warnings', 'Renal/hepatic adjustment', 'Clinician override & audit'],
      how: ['Clinician enters patient vitals and drugs', 'The engine checks interactions and organ function', 'It computes a safe dosage range', 'Warnings and rationale are shown for approval']
    },
    {
      d: SW, th: 'Transport & Logistics', t: 'Pothole Reporting Platform',
      desc: 'Crowdsource road defects and give municipalities a repair dashboard.',
      detail: 'Road defects go unrepaired because reporting is hard and tracking is opaque. Citizens report potholes with a photo and location; the system clusters reports, prioritises by severity, and gives authorities a repair dashboard.',
      tags: ['mobile', 'cv', 'maps', 'web', 'cloud'],
      features: ['Photo + GPS reporting', 'Automatic severity detection', 'Duplicate clustering', 'Municipal repair dashboard'],
      how: ['Citizen submits a photo and location', 'CV estimates defect severity', 'Nearby reports cluster into one issue', 'Authorities track and close issues on a map']
    },
    {
      d: SW, th: 'Clean & Green Tech', t: 'Household Energy Optimizer',
      desc: 'Recommend habit changes and schedules to cut electricity bills.',
      detail: 'Households waste energy without realising where it goes. This optimiser analyses consumption patterns, identifies wasteful appliances and peak-hour usage, and recommends schedules and habits that cut bills.',
      tags: ['ml', 'data', 'iot', 'mobile'],
      features: ['Appliance-level usage insights', 'Peak-hour shift suggestions', 'Bill forecasting', 'Personalised saving tips'],
      how: ['Meter/plug data is collected', 'A model disaggregates usage by appliance', 'It spots waste and peak-hour spikes', 'The app recommends schedules and habits']
    },
    {
      d: SW, th: 'Smart Automation', t: 'Blue-Collar Job Matcher',
      desc: 'Match skilled workers to nearby jobs with voice and vernacular support.',
      detail: 'Skilled blue-collar workers struggle to find nearby jobs, and employers struggle to find them. This platform matches workers to jobs by skill and location, with voice-first, vernacular onboarding for low-literacy users.',
      tags: ['web', 'mobile', 'voice', 'data'],
      features: ['Skill + location matching', 'Voice-first vernacular onboarding', 'Verified worker profiles', 'In-app hiring & ratings'],
      how: ['Worker builds a profile by voice', 'Employers post jobs with requirements', 'A matcher ranks nearby suitable workers', 'Both parties connect, hire, and rate']
    },
    {
      d: SW, th: 'Sustainability', t: 'Poaching Acoustic Alerts',
      desc: 'Detect gunshots and chainsaws in forests and alert rangers in real time.',
      detail: 'Rangers cannot patrol vast forests continuously. Low-power acoustic sensors listen for gunshots, chainsaws, and vehicles, and an edge model instantly alerts rangers with the location of suspected poaching.',
      tags: ['ml', 'iot', 'edge', 'realtime'],
      features: ['Acoustic event detection', 'On-edge low-power inference', 'Real-time ranger alerts', 'Location triangulation'],
      how: ['Solar sensors record ambient sound', 'An edge model classifies threat sounds', 'Detections trigger geo-tagged alerts', 'Rangers respond via a live map']
    },
    {
      d: SW, th: 'Transport & Logistics', t: 'Public Transit Maintenance',
      desc: 'Predict when buses and trains need service before they break down.',
      detail: 'Unexpected vehicle breakdowns disrupt public transport and cost money. By analysing sensor and maintenance data, this system predicts failures before they happen and schedules proactive servicing.',
      tags: ['ml', 'data', 'iot', 'cloud'],
      features: ['Failure prediction per vehicle', 'Maintenance scheduling', 'Spare-parts forecasting', 'Fleet health dashboard'],
      how: ['Vehicle sensor data streams to the cloud', 'A model detects degradation patterns', 'It predicts remaining useful life', 'Maintenance is scheduled proactively']
    },
    {
      d: SW, th: 'Healthcare & MedTech', t: 'Elder Medication Assistant',
      desc: 'A voice assistant that reminds elderly users when and how to take medicines.',
      detail: 'Elderly patients often forget doses or take the wrong medicine. A friendly voice assistant reminds them what to take and when, confirms intake, and alerts family or caregivers if a dose is missed.',
      tags: ['voice', 'mobile', 'nlp', 'iot'],
      features: ['Spoken medication reminders', 'Intake confirmation', 'Caregiver miss-alerts', 'Simple voice interaction'],
      how: ['Schedule is set up by family or clinic', 'The assistant announces each dose by voice', 'The user confirms intake by voice', 'Missed doses notify the caregiver']
    },

    /* ============ HARDWARE ============ */
    {
      d: HW, th: 'Clean & Green Tech', t: 'Village Water Testing Kit',
      desc: 'A low-cost device that tests drinking water quality on the spot.',
      detail: 'Villages often have no quick way to know if water is safe. This handheld device measures key parameters like pH, turbidity, TDS, and bacterial indicators on the spot and shows a clear safe/unsafe verdict.',
      tags: ['sensor', 'embedded'],
      features: ['Multi-parameter water testing', 'Instant safe/unsafe verdict', 'Battery-powered & portable', 'Logs results for tracking'],
      how: ['User dips the probe into a water sample', 'Sensors read pH, turbidity, and TDS', 'A microcontroller compares to safe limits', 'A clear result and advice display on screen']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Affordable Prosthetic Hand',
      desc: 'A gripping prosthetic hand that costs a fraction of current options.',
      detail: 'Commercial prosthetic hands cost too much for most amputees. This design uses 3D-printed parts and muscle (EMG) signals to control gripping, delivering functional grasping at a tiny fraction of the cost.',
      tags: ['embedded', 'robotics', 'sensor'],
      features: ['EMG muscle-signal control', '3D-printed lightweight build', 'Multiple grip patterns', 'Rechargeable & low-cost'],
      how: ['EMG sensors read forearm muscle activity', 'A microcontroller interprets grip intent', 'Servo motors move the printed fingers', 'The hand holds various everyday objects']
    },
    {
      d: HW, th: 'Agriculture & Rural', t: 'Solar Cold Storage',
      desc: 'Off-grid solar refrigeration to stop post-harvest spoilage.',
      detail: 'Farmers lose produce because they lack refrigeration and grid power. This solar-powered cold storage unit keeps fruits and vegetables fresh off-grid, extending shelf life and reducing waste and losses.',
      tags: ['embedded', 'sensor'],
      features: ['Solar-powered cooling', 'Temperature & humidity control', 'Off-grid battery backup', 'Low running cost'],
      how: ['Solar panels charge a battery bank', 'A controller runs the compressor efficiently', 'Sensors maintain target temperature', 'Produce stays fresh for days longer']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Portable Rural ECG',
      desc: 'A pocket ECG device that health workers can use in remote villages.',
      detail: 'Heart conditions go undetected in villages without ECG access. This pocket-sized device records a clean ECG, runs basic anomaly screening on-device, and can share the trace with a doctor for review.',
      tags: ['embedded', 'sensor', 'ml'],
      features: ['Clinical-grade ECG capture', 'On-device anomaly screening', 'Shareable ECG reports', 'Battery-powered & rugged'],
      how: ['Electrodes are placed on the patient', 'The device records and filters the ECG', 'An embedded model flags abnormalities', 'The trace is shared with a doctor for review']
    },
    {
      d: HW, th: 'Transport & Logistics', t: 'Smart Safety Helmet',
      desc: 'A helmet that detects crashes and sends an SOS with location.',
      detail: 'Riders in accidents often cannot call for help. This helmet detects a crash via impact sensors and, if the rider is unresponsive, automatically sends an SOS with GPS location to emergency contacts.',
      tags: ['embedded', 'sensor', 'iot'],
      features: ['Crash impact detection', 'Automatic SOS with GPS', 'Helmet-worn enforcement', 'Emergency-contact alerts'],
      how: ['Accelerometer/gyro detect a hard impact', 'The helmet waits for a cancel tap', 'If none, it sends GPS location via GSM', 'Emergency contacts receive an SOS']
    },
    {
      d: HW, th: 'Agriculture & Rural', t: 'Soil Moisture Sensor',
      desc: 'A rugged sensor that tells farmers exactly when and how much to irrigate.',
      detail: 'Over- and under-watering waste water and hurt yields. This rugged in-soil sensor measures moisture at root depth and signals exactly when irrigation is needed, saving water and improving crops.',
      tags: ['sensor', 'embedded', 'iot'],
      features: ['Root-depth moisture sensing', 'Irrigation timing signal', 'Weatherproof & durable', 'Long battery life'],
      how: ['The probe measures soil moisture', 'A microcontroller compares to crop thresholds', 'It signals when irrigation is needed', 'Readings optionally relay to a phone']
    },
    {
      d: HW, th: 'Clean & Green Tech', t: 'Wearable Pollution Monitor',
      desc: 'A personal device that tracks the air quality you actually breathe.',
      detail: 'Fixed air-quality stations don’t reflect personal exposure. This wearable measures the pollutants you actually breathe throughout the day and warns you when exposure gets dangerous.',
      tags: ['wearable', 'sensor', 'embedded'],
      features: ['Personal PM2.5/gas sensing', 'Real-time exposure tracking', 'Compact wearable form', 'Exposure alerts'],
      how: ['Miniature sensors sample air continuously', 'A low-power MCU logs exposure', 'Data syncs to a phone over BLE', 'Alerts fire when exposure is high']
    },
    {
      d: HW, th: 'Accessibility', t: 'Assistive Smart Cane',
      desc: 'A cane that detects obstacles and guides the visually impaired.',
      detail: 'A traditional cane cannot detect obstacles at head height or drop-offs. This smart cane uses ultrasonic sensors to detect obstacles and warns the user through vibration and sound for safer navigation.',
      tags: ['embedded', 'sensor', 'edge'],
      features: ['Obstacle & drop-off detection', 'Vibration + audio feedback', 'Lightweight & rechargeable', 'Optional GPS guidance'],
      how: ['Ultrasonic sensors scan the path ahead', 'The MCU estimates distance to obstacles', 'Closer obstacles trigger stronger feedback', 'The user navigates via haptic/audio cues']
    },
    {
      d: HW, th: 'Sustainability', t: 'Energy-Harvesting Footwear',
      desc: 'Shoes that generate power from walking to charge small devices.',
      detail: 'People in off-grid areas struggle to charge small devices. This footwear harvests energy from each step using piezoelectric elements and stores it to charge phones, lights, or sensors.',
      tags: ['embedded', 'sensor'],
      features: ['Step energy harvesting', 'Onboard energy storage', 'USB charging output', 'Durable everyday wear'],
      how: ['Piezo elements flex with each step', 'Generated charge is rectified and stored', 'Energy accumulates in a small cell', 'A USB port charges small devices']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Automatic Pill Dispenser',
      desc: 'Dispenses the right pills at the right time for elderly patients.',
      detail: 'Elderly patients on multiple medications easily make dosing mistakes. This dispenser holds a week of medication, releases the correct pills at scheduled times, and alerts if a dose is not taken.',
      tags: ['embedded', 'robotics'],
      features: ['Scheduled pill dispensing', 'Audio/visual reminders', 'Missed-dose alerts', 'Tamper-resistant compartments'],
      how: ['Caregiver loads pills into compartments', 'The device tracks the dosing schedule', 'At each time it dispenses and alerts', 'Untaken doses trigger a caregiver alert']
    },
    {
      d: HW, th: 'Accessibility', t: 'Low-Cost Braille Display',
      desc: 'An affordable refreshable braille display for digital reading.',
      detail: 'Refreshable braille displays are prohibitively expensive. This design uses low-cost actuators to raise and lower braille dots, making digital text readable by touch at a fraction of the usual price.',
      tags: ['embedded', 'robotics'],
      features: ['Refreshable braille cells', 'Low-cost actuation', 'Connects to phone/PC', 'Compact and portable'],
      how: ['Text is received from a device', 'It converts to braille patterns', 'Actuators raise the correct dots', 'The user reads and advances line by line']
    },
    {
      d: HW, th: 'Clean & Green Tech', t: 'Smart Waste Segregator',
      desc: 'A bin that automatically separates dry, wet, and recyclable waste.',
      detail: 'Waste is rarely segregated at source, hurting recycling. This smart bin identifies each item as dry, wet, or recyclable and automatically sorts it into the correct compartment.',
      tags: ['embedded', 'cv', 'ml', 'robotics'],
      features: ['Automatic item classification', 'Motorised sorting', 'Fill-level sensing', 'Low-maintenance design'],
      how: ['An item is dropped into the intake', 'A camera + model classify the waste type', 'A motorised flap routes it to a bin', 'Fill levels are tracked for collection']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Senior Fall Detector',
      desc: 'A wearable that detects falls and instantly alerts caregivers.',
      detail: 'Falls are a leading cause of injury for seniors living alone. This wearable detects a fall from motion patterns and, unless cancelled, immediately alerts caregivers with the person’s location.',
      tags: ['wearable', 'sensor', 'ml', 'embedded'],
      features: ['Accurate fall detection', 'False-alarm cancel window', 'Caregiver alerts with location', 'Comfortable wearable design'],
      how: ['Motion sensors monitor movement', 'A model distinguishes falls from normal motion', 'A detected fall starts a cancel countdown', 'If uncancelled, caregivers are alerted']
    },
    {
      d: HW, th: 'Clean & Green Tech', t: 'Portable UV Purifier',
      desc: 'A handheld device that purifies water using UV light anywhere.',
      detail: 'People without clean water need a simple, chemical-free way to purify it. This handheld UV device disinfects a container of water in minutes by neutralising pathogens with ultraviolet light.',
      tags: ['embedded', 'sensor'],
      features: ['UV pathogen disinfection', 'Battery-powered & portable', 'Treatment-complete indicator', 'Chemical-free operation'],
      how: ['The device is placed in/over water', 'A UV-C lamp activates for a set time', 'Pathogens are neutralised', 'An indicator confirms water is safe']
    },
    {
      d: HW, th: 'Accessibility', t: 'Gesture-Controlled Wheelchair',
      desc: 'A wheelchair steered by simple hand gestures for limited mobility.',
      detail: 'Users with limited hand strength find joysticks difficult. This wheelchair is controlled by simple hand or head gestures detected by sensors, giving independent mobility to more people.',
      tags: ['embedded', 'sensor', 'robotics'],
      features: ['Gesture-based steering', 'Obstacle safety stop', 'Adjustable sensitivity', 'Manual override'],
      how: ['Sensors capture hand/head gestures', 'The controller maps gestures to motion', 'Motor drivers steer the wheelchair', 'Obstacle sensors stop it if needed']
    },
    {
      d: HW, th: 'Agriculture & Rural', t: 'Livestock Health Collar',
      desc: 'A collar that monitors cattle vitals and flags illness early.',
      detail: 'Illness in livestock is often noticed too late, hurting farmers. This collar tracks temperature, activity, and rumination, and alerts the farmer at the earliest sign of illness or heat cycle.',
      tags: ['wearable', 'sensor', 'iot', 'embedded'],
      features: ['Vitals & activity tracking', 'Early illness alerts', 'Heat-cycle detection', 'Long battery life'],
      how: ['The collar senses temperature and motion', 'A model detects abnormal patterns', 'Alerts relay to the farmer’s phone', 'Early care prevents bigger losses']
    },
    {
      d: HW, th: 'Clean & Green Tech', t: 'Anti-Theft Smart Meter',
      desc: 'An electricity meter that detects tampering and power theft.',
      detail: 'Power theft causes huge losses for utilities. This smart meter detects tampering, bypass, and abnormal consumption, and reports theft events with location to the utility in real time.',
      tags: ['embedded', 'iot', 'sensor'],
      features: ['Tamper & bypass detection', 'Abnormal-usage alerts', 'Remote reporting', 'Utility dashboard'],
      how: ['The meter monitors current and tamper switches', 'Anomalies indicate possible theft', 'Events are reported to the utility', 'Field teams act on flagged meters']
    },
    {
      d: HW, th: 'Sustainability', t: 'Household Biogas Unit',
      desc: 'A compact digester that turns kitchen waste into cooking gas.',
      detail: 'Households waste organic scraps and rely on costly fuel. This compact digester converts kitchen waste into clean biogas for cooking and produces nutrient-rich slurry for plants.',
      tags: ['embedded', 'sensor'],
      features: ['Kitchen-waste to biogas', 'Compact home-scale design', 'Gas pressure monitoring', 'Fertiliser by-product'],
      how: ['Food waste is fed into the digester', 'Microbes break it down producing gas', 'Sensors monitor pressure and level', 'Gas pipes to the stove; slurry to plants']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Posture Correction Wearable',
      desc: 'A discreet device that vibrates to correct slouching in real time.',
      detail: 'Poor posture from desk work causes chronic pain. This discreet wearable senses slouching and gently vibrates to remind the user to sit or stand correctly, building better posture habits.',
      tags: ['wearable', 'sensor', 'embedded'],
      features: ['Posture angle sensing', 'Gentle haptic reminders', 'Daily posture stats', 'Discreet wearable form'],
      how: ['The device senses spine/shoulder angle', 'Slouching beyond a threshold is detected', 'A gentle vibration prompts correction', 'Daily posture trends sync to the app']
    },
    {
      d: HW, th: 'Robotics & Drones', t: 'Agricultural Spray Drone',
      desc: 'A drone that sprays pesticide precisely, saving chemicals and labor.',
      detail: 'Manual pesticide spraying is slow, uneven, and hazardous. This drone sprays crops precisely along a planned path, covering fields quickly, cutting chemical use, and keeping workers away from toxins.',
      tags: ['drone', 'embedded', 'robotics'],
      features: ['Autonomous spray routes', 'Precise dosing control', 'Large-area coverage', 'Reduced chemical use'],
      how: ['A field boundary and route are set', 'The drone flies the path autonomously', 'It sprays a controlled dose per area', 'It returns to refill and resume']
    },
    {
      d: HW, th: 'Clean & Green Tech', t: 'Adaptive Streetlight',
      desc: 'A streetlight that brightens only when people or vehicles are near.',
      detail: 'Streetlights burn full power all night, wasting energy. This adaptive light dims when no one is around and brightens as people or vehicles approach, cutting energy use dramatically.',
      tags: ['embedded', 'sensor', 'iot'],
      features: ['Motion-adaptive brightness', 'Energy usage savings', 'Fault self-reporting', 'Networked control'],
      how: ['Motion sensors detect approach', 'The light brightens ahead of movement', 'It dims again when the area is empty', 'Faults report to a central dashboard']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Rural Neonatal Warmer',
      desc: 'A low-cost, reliable warmer to keep newborns safe in rural clinics.',
      detail: 'Newborn hypothermia is a major risk in under-resourced clinics. This low-cost warmer maintains a safe, stable temperature for infants, works with unreliable power, and is simple for staff to operate.',
      tags: ['embedded', 'sensor'],
      features: ['Stable infant warming', 'Overheat safety cutoff', 'Works with power backup', 'Simple, safe operation'],
      how: ['The infant is placed in the warmer', 'Sensors monitor temperature closely', 'A controller maintains a safe setpoint', 'Alarms trigger on any unsafe reading']
    },
    {
      d: HW, th: 'Accessibility', t: 'Navigation Belt for Blind',
      desc: 'A belt that guides direction through gentle vibration cues.',
      detail: 'Blind users need hands-free directional guidance. This belt vibrates on the side corresponding to the direction to turn, guiding the wearer along a route without occupying their hands or ears.',
      tags: ['embedded', 'sensor', 'edge'],
      features: ['Directional haptic cues', 'Hands-free navigation', 'Obstacle awareness', 'Rechargeable & comfortable'],
      how: ['A route is set via a paired phone', 'The belt computes the turn direction', 'Vibration motors cue left/right/forward', 'The wearer follows the haptic guidance']
    },
    {
      d: HW, th: 'Smart Education', t: '3D-Printed Lab Gear',
      desc: 'Open-source, printable lab equipment for under-funded schools.',
      detail: 'Under-funded schools cannot afford lab equipment. This project provides open-source, 3D-printable designs for microscopes, centrifuges, and other gear that schools can build cheaply and locally.',
      tags: ['embedded'],
      features: ['Printable equipment designs', 'Low-cost local fabrication', 'Assembly guides', 'Open-source library'],
      how: ['A school selects a design from the library', 'Parts are 3D-printed locally', 'Simple electronics/optics are added', 'Students use functional lab gear']
    },
    {
      d: HW, th: 'Disaster Management', t: 'Flood Warning Buoy',
      desc: 'A river sensor buoy that warns communities as water levels rise.',
      detail: 'Riverside communities need early flood warnings. This solar-powered buoy monitors water level and flow and broadcasts rising-water alerts to nearby villages before flooding reaches them.',
      tags: ['sensor', 'iot', 'embedded', 'realtime'],
      features: ['Water level & flow sensing', 'Early rising-water alerts', 'Solar-powered autonomy', 'Community siren/SMS'],
      how: ['The buoy measures water level continuously', 'Rapid rises trigger threshold alerts', 'Alerts broadcast via GSM/LoRa', 'Village sirens and phones are notified']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Stroke Rehab Glove',
      desc: 'A glove that guides and tracks hand exercises for stroke recovery.',
      detail: 'Stroke patients need consistent hand therapy but often lack access. This glove guides rehab exercises, measures finger movement, and tracks recovery progress, enabling effective therapy at home.',
      tags: ['wearable', 'sensor', 'embedded', 'ml'],
      features: ['Guided rehab exercises', 'Finger movement tracking', 'Progress measurement', 'Therapist-shareable data'],
      how: ['The patient wears the sensor glove', 'It guides a set of exercises', 'Flex sensors measure each movement', 'Progress is logged and shared with therapists']
    },
    {
      d: HW, th: 'Agriculture & Rural', t: 'Solar Food Dryer',
      desc: 'A solar dryer that preserves fruits and vegetables without power.',
      detail: 'Produce spoils quickly without preservation. This solar dryer removes moisture from fruits and vegetables efficiently using only sunlight, extending shelf life and adding value for farmers.',
      tags: ['sensor', 'embedded'],
      features: ['Solar-powered drying', 'Temperature/airflow control', 'Hygienic enclosed design', 'No electricity needed'],
      how: ['Produce is placed on drying trays', 'Solar heat warms circulating air', 'Sensors optimise airflow and temperature', 'Dried produce is stored or sold']
    },
    {
      d: HW, th: 'Disaster Management', t: 'Anti-Drowning Wearable',
      desc: 'A band that inflates and alerts lifeguards when a swimmer is in danger.',
      detail: 'Drowning happens fast and silently. This wearable detects distress via depth and motion, auto-inflates a floatation aid, and signals lifeguards with the swimmer’s location.',
      tags: ['wearable', 'sensor', 'embedded'],
      features: ['Distress detection', 'Auto-inflating floatation', 'Lifeguard alert', 'Waterproof & wearable'],
      how: ['Depth/motion sensors detect distress', 'A CO₂ cartridge inflates the float', 'A signal alerts the lifeguard station', 'Rescue is guided to the location']
    },
    {
      d: HW, th: 'Robotics & Drones', t: 'Railway Crack Robot',
      desc: 'A robot that patrols tracks and detects cracks before accidents.',
      detail: 'Undetected rail cracks cause derailments. This robot travels along the track, scans the rail with cameras and sensors, and flags cracks or defects with precise location for repair crews.',
      tags: ['robotics', 'cv', 'ml', 'embedded'],
      features: ['Autonomous track patrol', 'Crack/defect detection', 'GPS-tagged reporting', 'Rugged all-weather build'],
      how: ['The robot moves along the rail', 'Cameras and sensors scan continuously', 'A model detects cracks and faults', 'Geo-tagged defects go to repair crews']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Compact Transport Incubator',
      desc: 'A portable incubator to transport premature infants safely.',
      detail: 'Premature infants are at risk during transport between facilities. This compact, battery-backed incubator maintains temperature and humidity during transit, protecting fragile newborns on the way to care.',
      tags: ['embedded', 'sensor'],
      features: ['Stable transit warming', 'Battery-backed operation', 'Vibration-dampened cradle', 'Vitals monitoring'],
      how: ['The infant is secured in the unit', 'Sensors maintain temperature/humidity', 'A battery ensures power in transit', 'Alarms flag any unsafe condition']
    },
    {
      d: HW, th: 'Healthcare & MedTech', t: 'Smart Mosquito Trap',
      desc: 'A trap that lures and captures disease-carrying mosquitoes efficiently.',
      detail: 'Mosquito-borne diseases thrive where control is weak. This trap uses attractants and airflow to lure and capture mosquitoes, and can identify species to guide targeted disease-control efforts.',
      tags: ['embedded', 'sensor', 'cv'],
      features: ['Attractant-based luring', 'Efficient capture', 'Species identification', 'Population reporting'],
      how: ['Attractants and light draw mosquitoes', 'A fan pulls them into a capture chamber', 'A camera helps identify species', 'Counts inform local control measures']
    },
    {
      d: HW, th: 'Agriculture & Rural', t: 'Pedal Water Pump',
      desc: 'A human-powered pump that lifts irrigation water without electricity.',
      detail: 'Farmers without power or fuel cannot easily lift water for irrigation. This efficient pedal-powered pump lets a person draw and move irrigation water using leg power, needing no electricity or fuel.',
      tags: ['sensor', 'embedded'],
      features: ['Human-powered pumping', 'Efficient water lifting', 'Low-cost durable build', 'No fuel or power needed'],
      how: ['The farmer pedals the mechanism', 'A pump lifts water from the source', 'Flow is directed to the field', 'Optional metering tracks water used']
    },

    /* ============ HARDWARE + SOFTWARE ============ */
    {
      d: HS, th: 'Clean & Green Tech', t: 'Smart Home Energy Manager',
      desc: 'Sensors plus an app that monitor and automatically cut home energy waste.',
      detail: 'Homes waste power on idle appliances and peak-hour usage. This system pairs smart plugs and sensors with an app that monitors consumption, automates schedules, and cuts waste while lowering bills.',
      tags: ['iot', 'embedded', 'mobile', 'ml', 'cloud'],
      features: ['Appliance-level monitoring', 'Automated on/off schedules', 'Peak-hour load shifting', 'Bill savings insights'],
      how: ['Smart plugs measure appliance usage', 'Data streams to the cloud and app', 'A model suggests/automates schedules', 'The user tracks savings over time']
    },
    {
      d: HS, th: 'Healthcare & MedTech', t: 'Elder Living-Alone Monitor',
      desc: 'AI cameras and sensors that watch for emergencies and notify family.',
      detail: 'Seniors living alone are at risk if something goes wrong unseen. This privacy-respecting system uses cameras and motion sensors to detect falls or unusual inactivity and immediately notifies family.',
      tags: ['iot', 'cv', 'ml', 'cloud', 'mobile'],
      features: ['Fall & inactivity detection', 'Privacy-preserving processing', 'Instant family alerts', 'Daily wellbeing summary'],
      how: ['Sensors/cameras monitor the home', 'On-device AI detects anomalies', 'Emergencies trigger family alerts', 'A daily summary reassures relatives']
    },
    {
      d: HS, th: 'Agriculture & Rural', t: 'Connected Greenhouse',
      desc: 'Automated climate control with a dashboard for temperature, humidity, and light.',
      detail: 'Manual greenhouse management is labour-intensive and error-prone. This system automates temperature, humidity, and irrigation using sensors and actuators, all controllable and monitored from a dashboard.',
      tags: ['iot', 'sensor', 'embedded', 'mobile', 'cloud'],
      features: ['Automated climate control', 'Sensor-driven irrigation', 'Remote dashboard & alerts', 'Crop condition logging'],
      how: ['Sensors read temp, humidity, and soil', 'A controller runs fans, misters, pumps', 'The dashboard shows live conditions', 'Rules and alerts keep the climate ideal']
    },
    {
      d: HS, th: 'Transport & Logistics', t: 'Fleet Tracking & Fuel Analytics',
      desc: 'GPS hardware plus software to track vehicles and spot fuel theft.',
      detail: 'Fleet operators lose money to inefficient routes and fuel theft. This solution tracks each vehicle’s location and fuel level and analyses trips to flag theft, idling, and route inefficiencies.',
      tags: ['iot', 'maps', 'data', 'web', 'cloud'],
      features: ['Live GPS tracking', 'Fuel-level monitoring', 'Theft & idling alerts', 'Route efficiency analytics'],
      how: ['A device reports GPS and fuel data', 'Trips are analysed for anomalies', 'Sudden fuel drops flag theft', 'Managers optimise routes from the dashboard']
    },
    {
      d: HS, th: 'Transport & Logistics', t: 'App-Based Smart Parking',
      desc: 'Sensors detect free spots; an app lets drivers reserve and pay.',
      detail: 'Drivers waste time and fuel hunting for parking. This system senses which spots are free, shows availability in an app, and lets drivers reserve and pay in advance, easing congestion.',
      tags: ['iot', 'sensor', 'mobile', 'maps', 'cloud'],
      features: ['Live spot availability', 'Reserve & pay in app', 'Navigation to the spot', 'Operator analytics'],
      how: ['Sensors detect occupancy per spot', 'Availability updates in the app', 'Drivers reserve and pay ahead', 'Navigation guides them to the spot']
    },
    {
      d: HS, th: 'Healthcare & MedTech', t: 'Chronic Disease Wearable',
      desc: 'A wearable and app that track vitals and alert doctors to warning signs.',
      detail: 'Chronic patients need continuous monitoring between visits. This wearable tracks vitals like heart rate, oxygen, and glucose trends, and alerts the patient and doctor when readings signal danger.',
      tags: ['wearable', 'sensor', 'ml', 'mobile', 'cloud'],
      features: ['Continuous vitals tracking', 'Early-warning alerts', 'Doctor dashboard', 'Trend reports'],
      how: ['The wearable samples vitals continuously', 'Data syncs to the app and cloud', 'A model flags dangerous trends', 'Patient and doctor get timely alerts']
    },
    {
      d: HS, th: 'Agriculture & Rural', t: 'Automated Hydroponics',
      desc: 'Self-regulating nutrient and water system monitored from your phone.',
      detail: 'Hydroponics needs precise nutrient and pH control that is tedious to do by hand. This system automatically doses nutrients, balances pH, and manages water, all monitored and tunable from a phone.',
      tags: ['iot', 'sensor', 'embedded', 'mobile'],
      features: ['Auto nutrient dosing', 'pH & EC balancing', 'Water level management', 'Remote monitoring'],
      how: ['Sensors read pH, EC, and water level', 'Pumps dose nutrients and adjust pH', 'The app shows live readings', 'Alerts fire on any out-of-range value']
    },
    {
      d: HS, th: 'Smart Automation', t: 'Smart Access Lock',
      desc: 'A keyless lock with app control, guest passes, and full access logs.',
      detail: 'Physical keys are easily lost, copied, or hard to manage for guests. This smart lock allows keyless entry via app, temporary guest passes, and a full audit log of who entered and when.',
      tags: ['iot', 'embedded', 'mobile', 'cloud'],
      features: ['Keyless app entry', 'Time-limited guest passes', 'Full access logs', 'Offline PIN backup'],
      how: ['User unlocks via app or PIN', 'The lock verifies credentials', 'Every entry is logged to the cloud', 'Guest passes auto-expire']
    },
    {
      d: HS, th: 'Smart Automation', t: 'Machine Predictive Maintenance',
      desc: 'Industrial IoT sensors and analytics that predict equipment failure.',
      detail: 'Unplanned machine downtime is costly in factories. This platform attaches vibration and temperature sensors to machines and uses analytics to predict failures, enabling maintenance before breakdowns.',
      tags: ['iot', 'ml', 'data', 'cloud', 'edge'],
      features: ['Vibration/thermal sensing', 'Failure prediction', 'Maintenance scheduling', 'Downtime analytics'],
      how: ['Sensors monitor machine health', 'Edge/cloud models detect degradation', 'Remaining useful life is estimated', 'Maintenance is scheduled proactively']
    },
    {
      d: HS, th: 'Agriculture & Rural', t: 'Microclimate Weather Network',
      desc: 'Cheap connected stations that map hyper-local weather for farmers.',
      detail: 'Regional forecasts miss field-level variation that matters to farmers. A network of low-cost connected weather stations captures hyper-local temperature, humidity, and rainfall to guide farming decisions.',
      tags: ['iot', 'sensor', 'data', 'cloud'],
      features: ['Hyper-local weather data', 'Low-cost station network', 'Farmer advisories', 'Historical trend maps'],
      how: ['Stations sample local weather', 'Data aggregates in the cloud', 'Micro-forecasts are generated', 'Farmers receive field-level advisories']
    },
    {
      d: HS, th: 'Agriculture & Rural', t: 'Sensor-Driven Irrigation',
      desc: 'Soil sensors, weather data, and an app that water crops automatically.',
      detail: 'Irrigation by guesswork wastes water and reduces yield. This system combines soil moisture sensors and weather forecasts to water crops automatically at the right time and amount, all managed from an app.',
      tags: ['iot', 'sensor', 'ml', 'mobile'],
      features: ['Soil + weather-based watering', 'Automatic valve control', 'Water-use analytics', 'Remote app control'],
      how: ['Sensors read soil moisture', 'Weather forecasts adjust the plan', 'Valves open only when needed', 'Water use is tracked in the app']
    },
    {
      d: HS, th: 'Accessibility', t: 'AR Glasses for the Blind',
      desc: 'Wearable glasses that recognize objects and describe them aloud.',
      detail: 'Blind users need help understanding their surroundings. These glasses use a camera and on-device AI to recognise objects, text, and faces, and describe them aloud in real time.',
      tags: ['ar', 'cv', 'ml', 'edge', 'wearable'],
      features: ['Object & text recognition', 'Real-time audio description', 'Face recognition', 'Hands-free operation'],
      how: ['The glasses’ camera captures the scene', 'An edge model recognises objects/text', 'Descriptions are spoken via bone-conduction', 'The user navigates and reads independently']
    },
    {
      d: HS, th: 'Clean & Green Tech', t: 'EV Charging Management',
      desc: 'A platform that manages, schedules, and bills EV charging stations.',
      detail: 'Growing EV adoption needs coordinated charging infrastructure. This platform manages charger availability, schedules charging to balance grid load, and handles billing across a network of stations.',
      tags: ['iot', 'web', 'cloud', 'mobile', 'data'],
      features: ['Charger availability & booking', 'Smart load scheduling', 'Automated billing', 'Network analytics'],
      how: ['Chargers report status to the platform', 'Drivers find and book slots in the app', 'Charging is scheduled to balance load', 'Sessions are metered and billed']
    },
    {
      d: HS, th: 'Smart Education', t: 'Smart Classroom Analytics',
      desc: 'Track attendance and engagement to help teachers improve outcomes.',
      detail: 'Teachers lack objective feedback on engagement. This system automates attendance and gauges classroom engagement (privacy-respecting), giving teachers analytics to adapt their teaching.',
      tags: ['cv', 'ml', 'iot', 'web', 'data'],
      features: ['Automated attendance', 'Engagement analytics', 'Privacy-preserving design', 'Teacher insights dashboard'],
      how: ['A camera/sensor captures the class', 'Attendance is marked automatically', 'Engagement metrics are computed anonymously', 'Teachers view trends and adapt']
    },
    {
      d: HS, th: 'Healthcare & MedTech', t: 'Vaccine Cold-Chain Monitor',
      desc: 'Track temperature of vaccines in transit and alert on any breach.',
      detail: 'Vaccines spoil if the cold chain breaks, often undetected. This monitor tracks temperature throughout transit and storage and instantly alerts staff to any breach so doses can be saved.',
      tags: ['iot', 'sensor', 'cloud', 'realtime', 'mobile'],
      features: ['Continuous temp logging', 'Instant breach alerts', 'Location tracking', 'Compliance reports'],
      how: ['Sensors log temperature in transit', 'Data streams to the cloud', 'Any breach triggers instant alerts', 'Compliance reports are generated']
    },
    {
      d: HS, th: 'Cybersecurity', t: 'AI Home Security',
      desc: 'Cameras with on-device AI that tell real intrusions from false alarms.',
      detail: 'Traditional security cameras flood users with false alerts. This system uses on-device AI to distinguish real intrusions from pets, shadows, and passersby, alerting only for genuine threats.',
      tags: ['cv', 'ml', 'iot', 'edge', 'mobile'],
      features: ['Person/intrusion detection', 'False-alarm filtering', 'Edge processing for privacy', 'Instant verified alerts'],
      how: ['Cameras monitor the property', 'On-device AI classifies events', 'Only real threats trigger alerts', 'Clips are sent to the owner’s phone']
    },
    {
      d: HS, th: 'Agriculture & Rural', t: 'Smart Aquaculture Monitor',
      desc: 'Track pH, oxygen, and feeding in fish farms from a single app.',
      detail: 'Fish farmers lose stock to poor water conditions noticed too late. This system continuously monitors dissolved oxygen, pH, and temperature and automates aeration and feeding, all from one app.',
      tags: ['iot', 'sensor', 'ml', 'mobile'],
      features: ['Water quality monitoring', 'Automated aeration/feeding', 'Alert on unsafe levels', 'Yield analytics'],
      how: ['Sensors read oxygen, pH, temperature', 'Controllers run aerators and feeders', 'Unsafe readings trigger alerts', 'The app shows conditions and trends']
    },
    {
      d: HS, th: 'Healthcare & MedTech', t: 'Physio Gait Analysis',
      desc: 'A wearable that measures walking patterns to guide physiotherapy.',
      detail: 'Physiotherapists lack objective gait data outside the clinic. This wearable measures walking patterns, detects abnormalities, and tracks recovery, helping tailor and monitor physiotherapy.',
      tags: ['wearable', 'sensor', 'ml', 'mobile'],
      features: ['Gait pattern measurement', 'Abnormality detection', 'Recovery tracking', 'Therapist data sharing'],
      how: ['The wearable senses motion during walking', 'A model extracts gait metrics', 'Abnormalities and progress are tracked', 'Data is shared with the therapist']
    },
    {
      d: HS, th: 'Disaster Management', t: 'Fire Detect & Suppress',
      desc: 'Connected detection that triggers targeted suppression automatically.',
      detail: 'Fires spread fast before anyone reacts. This system detects fire early via smoke, heat, and flame sensors, alerts occupants, and automatically triggers targeted suppression to contain it.',
      tags: ['iot', 'sensor', 'embedded', 'realtime'],
      features: ['Early multi-sensor detection', 'Automatic suppression trigger', 'Occupant & fire-service alerts', 'Zone isolation'],
      how: ['Sensors detect smoke/heat/flame', 'The system confirms a real fire', 'Alarms alert people and services', 'Targeted suppression activates in the zone']
    },
    {
      d: HS, th: 'Clean & Green Tech', t: 'Smart Bin Route Optimizer',
      desc: 'Fill-level sensors that plan the most efficient garbage collection routes.',
      detail: 'Garbage trucks run fixed routes, emptying half-full bins and missing full ones. Fill-level sensors report which bins need collection, and software plans the most efficient routes, saving fuel and time.',
      tags: ['iot', 'sensor', 'maps', 'ml', 'web'],
      features: ['Bin fill-level sensing', 'Dynamic route optimisation', 'Overflow prevention', 'Fuel & time savings'],
      how: ['Sensors report each bin’s fill level', 'Full bins are prioritised', 'Software computes optimal routes', 'Trucks follow efficient collection paths']
    },
    {
      d: HS, th: 'Agriculture & Rural', t: 'Precision Livestock Feeding',
      desc: 'Automated feeders that dose nutrition per animal and log intake.',
      detail: 'Uniform feeding wastes feed and underserves some animals. This system identifies each animal and dispenses the right nutrition per its needs, logging intake to optimise health and cost.',
      tags: ['iot', 'embedded', 'robotics', 'mobile'],
      features: ['Per-animal identification', 'Precise feed dosing', 'Intake logging', 'Cost & health analytics'],
      how: ['An RFID tag identifies each animal', 'The feeder dispenses its ration', 'Intake is logged per animal', 'Analytics optimise feed and health']
    },
    {
      d: HS, th: 'Public Safety', t: 'Crowd Density Safety',
      desc: 'Sensors and analytics that prevent dangerous overcrowding at events.',
      detail: 'Overcrowding at events causes deadly stampedes. This system measures crowd density in real time via cameras and sensors and warns organisers before dangerous crowding builds up.',
      tags: ['cv', 'ml', 'iot', 'realtime', 'edge'],
      features: ['Real-time density estimation', 'Overcrowding early warning', 'Flow & bottleneck analytics', 'Control-room dashboard'],
      how: ['Cameras/sensors observe crowd areas', 'A model estimates density and flow', 'Rising density triggers early warnings', 'Organisers act to prevent crush']
    },
    {
      d: HS, th: 'Healthcare & MedTech', t: 'Smart Pill Adherence',
      desc: 'A connected pill bottle and app that track whether medicine is taken.',
      detail: 'Patients frequently miss doses, harming treatment. This connected pill bottle senses each opening, confirms doses in the app, and reminds patients and caregivers when a dose is missed.',
      tags: ['iot', 'embedded', 'mobile', 'cloud'],
      features: ['Dose-open detection', 'Smart reminders', 'Adherence reports', 'Caregiver alerts'],
      how: ['The bottle senses each open event', 'Doses are confirmed in the app', 'Missed doses trigger reminders', 'Adherence reports reach the doctor']
    },
    {
      d: HS, th: 'Robotics & Drones', t: 'App-Scheduled Cleaning Robot',
      desc: 'An autonomous floor cleaner you schedule and monitor remotely.',
      detail: 'Manual floor cleaning is repetitive and time-consuming. This robot maps a space, cleans autonomously on a schedule set in an app, and avoids obstacles, freeing people from the chore.',
      tags: ['robotics', 'embedded', 'mobile', 'edge'],
      features: ['Autonomous navigation', 'App scheduling & control', 'Obstacle avoidance', 'Cleaning maps & history'],
      how: ['The robot maps the space', 'It cleans on the app-set schedule', 'Sensors avoid obstacles and drops', 'Cleaning history shows in the app']
    },
    {
      d: HS, th: 'Transport & Logistics', t: 'GPS Bike Sharing',
      desc: 'Smart locks and an app for tracking and renting shared bicycles.',
      detail: 'Bike-sharing needs reliable tracking and access control. This system fits bikes with GPS smart locks and an app so users can locate, unlock, ride, and return bikes while operators track the fleet.',
      tags: ['iot', 'embedded', 'mobile', 'maps', 'cloud'],
      features: ['GPS bike tracking', 'App unlock & ride', 'Usage-based billing', 'Fleet management'],
      how: ['Bikes report location via GPS lock', 'Users find and unlock via the app', 'Rides are metered and billed', 'Operators monitor and rebalance the fleet']
    },
    {
      d: HS, th: 'Healthcare & MedTech', t: 'Health Smart Mirror',
      desc: 'A mirror that shows vitals, weather, and your schedule each morning.',
      detail: 'People want quick health and daily insights without extra devices. This smart mirror displays vitals from connected sensors, plus weather and schedule, and gives voice-driven daily briefings.',
      tags: ['iot', 'cv', 'ml', 'embedded', 'voice'],
      features: ['Vitals & health display', 'Daily brief (weather, schedule)', 'Voice interaction', 'Connected-device sync'],
      how: ['Connected sensors capture vitals', 'The mirror displays health and agenda', 'Voice commands fetch more info', 'Data trends sync to a health app']
    },
    {
      d: HS, th: 'Agriculture & Rural', t: 'Poultry Environment Controller',
      desc: 'Automate temperature, feed, and airflow in poultry farms via app.',
      detail: 'Poultry health depends on tightly controlled conditions. This system automates temperature, ventilation, feeding, and lighting in poultry sheds, monitored and adjustable from an app to boost yield and welfare.',
      tags: ['iot', 'sensor', 'embedded', 'mobile'],
      features: ['Climate & airflow automation', 'Automated feeding & lighting', 'Remote monitoring', 'Mortality/alert reporting'],
      how: ['Sensors read shed conditions', 'Controllers manage fans, heaters, feeders', 'The app shows and adjusts settings', 'Alerts flag unsafe conditions']
    },
    {
      d: HS, th: 'Public Safety', t: 'Women’s Safety Wearable',
      desc: 'A discreet device and app that send location and alerts in danger.',
      detail: 'People in danger cannot always reach their phone. This discreet wearable lets the user trigger an SOS with a hidden button, sending live location and alerts to trusted contacts and authorities.',
      tags: ['wearable', 'embedded', 'mobile', 'maps', 'cloud'],
      features: ['Discreet SOS trigger', 'Live location sharing', 'Trusted-contact alerts', 'Audio evidence capture'],
      how: ['User presses the hidden SOS button', 'The device signals the paired phone', 'Live location is sent to contacts', 'Optional audio is recorded as evidence']
    },
    {
      d: HS, th: 'Clean & Green Tech', t: 'Smart Water Tank',
      desc: 'Level sensors and auto-refill control managed from your phone.',
      detail: 'Overflowing or empty water tanks waste water and cause hassle. This system senses tank level, automatically controls the pump to refill at the right time, and lets users monitor usage from a phone.',
      tags: ['iot', 'sensor', 'embedded', 'mobile'],
      features: ['Tank level sensing', 'Automatic pump control', 'Overflow & dry-run protection', 'Usage monitoring'],
      how: ['A sensor measures water level', 'The controller runs the pump as needed', 'It prevents overflow and dry running', 'The app shows level and usage']
    },
    {
      d: HS, th: 'Clean & Green Tech', t: 'Office Air Purifier Network',
      desc: 'Connected purifiers that adjust to real-time indoor air quality.',
      detail: 'Indoor air quality varies across an office and over time. This network of connected purifiers senses air quality per zone and adjusts automatically, with a dashboard for facilities teams.',
      tags: ['iot', 'sensor', 'cloud', 'mobile'],
      features: ['Per-zone air sensing', 'Auto-adjusting purification', 'Facilities dashboard', 'Filter-life alerts'],
      how: ['Sensors measure air quality per zone', 'Purifiers ramp up where needed', 'A dashboard shows air quality trends', 'Filter-change alerts are issued']
    },
    {
      d: HS, th: 'Robotics & Drones', t: 'Crop Analytics Drone',
      desc: 'A drone plus dashboard that maps crop health and yield predictions.',
      detail: 'Farmers cannot easily assess large fields for crop stress. This drone captures multispectral imagery, maps crop health and problem areas, and predicts yield — visualised on a dashboard for action.',
      tags: ['drone', 'cv', 'ml', 'data', 'cloud'],
      features: ['Aerial crop-health mapping', 'Stress & pest detection', 'Yield prediction', 'Actionable field dashboard'],
      how: ['The drone flies and images the field', 'Multispectral analysis maps crop health', 'Models detect stress and predict yield', 'The dashboard guides targeted action']
    },
    {
      d: HS, th: 'Accessibility', t: 'Accessible Smart Home',
      desc: 'Voice and gesture control of the whole home for people with disabilities.',
      detail: 'People with disabilities struggle with standard home controls. This system lets users control lights, appliances, doors, and more through voice and simple gestures, granting independence at home.',
      tags: ['iot', 'voice', 'ml', 'embedded', 'mobile'],
      features: ['Voice & gesture control', 'Whole-home automation', 'Customisable routines', 'Caregiver access'],
      how: ['Voice/gesture inputs are captured', 'The hub interprets the command', 'Connected devices respond', 'Routines automate common needs']
    },
    {
      d: HS, th: 'Smart Automation', t: 'Bridge Health Monitor',
      desc: 'Structural sensors that warn engineers of stress and fatigue in bridges.',
      detail: 'Ageing bridges can fail without visible warning. This system embeds strain, vibration, and tilt sensors in a bridge and analyses the data to detect fatigue and stress, alerting engineers before failure.',
      tags: ['iot', 'sensor', 'ml', 'data', 'realtime'],
      features: ['Structural strain/vibration sensing', 'Fatigue & anomaly detection', 'Early engineer alerts', 'Long-term health trends'],
      how: ['Sensors monitor structural response', 'Data streams to an analysis engine', 'Models detect fatigue and anomalies', 'Engineers get alerts and trend reports']
    },
    {
      d: HS, th: 'Healthcare & MedTech', t: 'Connected Ambulance',
      desc: 'Stream patient vitals to the hospital before the ambulance arrives.',
      detail: 'Critical minutes are lost when hospitals learn a patient’s condition only on arrival. This system streams live patient vitals from the ambulance to the ER so the team is ready the moment the patient arrives.',
      tags: ['iot', 'sensor', 'realtime', 'cloud', 'mobile'],
      features: ['Live vitals streaming', 'ER pre-arrival dashboard', 'ETA & case sharing', 'Two-way communication'],
      how: ['In-ambulance monitors capture vitals', 'Data streams live to the hospital', 'The ER sees vitals and ETA in advance', 'Teams prepare before arrival']
    }
  ];
})();
