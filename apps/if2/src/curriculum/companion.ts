/** Original study notes for the 2026 IF2 paper. Not the CII study text. */

export type CompanionBlock = {
  id: string;
  heading: string;
  hold?: string;
  paras: string[];
  bullets?: string[];
};

export type CompanionChapter = {
  chapter: number;
  title: string;
  lo: string;
  weight: string;
  blocks: CompanionBlock[];
};

export const COMPANION: CompanionChapter[] = [
  {
    chapter: 1,
    title: "Motor insurance",
    lo: "1.1",
    weight: "Inside the 36 product questions. Motor is the class they come back to.",
    blocks: [
      {
        id: "c1-how",
        heading: "How to read this chapter",
        hold: "Injury is unlimited at every rung. Property damage is not. That single split answers half the motor items.",
        paras: [
          "Private motor is one ladder, not four unrelated policies. Road Traffic Act only is the legal floor. Third party only is that floor plus the extras insurers actually sell. Third party, fire and theft adds the insured’s own car, but only for fire and theft. Comprehensive is the first rung that pays accidental and malicious damage to that car, and even then it is ‘all risks’ with a list of holes, not a promise to pay every loss.",
          "When a question names a driver, a passenger, a loading bay or a car that is not theirs, sort it before you look at the options. Whose car? Whose injury? On a road, or off it? Own damage, or someone else’s? The headings under this chapter are the full key-facts walk, in order. Use them as the book. Use this note as the map.",
          "Two exceptions people invent in the exam and that the specimen paper does not accept: a car in a garage, and a car on a private driveway. The stated way to be off the insurance duty is a Statutory Off Road Notification to the DVLA. Say that out loud once so the wrong options feel wrong.",
        ],
      },
      {
        id: "c1-split",
        heading: "The splits that actually get marked",
        paras: [
          "Motorcycle is not ‘a small car’. Accessories and spare parts are only covered if the machine itself is stolen at the same time. There is no personal accident benefit and no medical expenses beyond emergency treatment. Commercial motor is about the vehicle, not the load — goods in transit is another class. Commercial third-party property is usually tighter than the private-car £20 million, and driving other vehicles is left out because the range of vehicles is too wide to give away.",
          "Foreign use has two layers. Minimum cover for the country you visit is already there. The same cover you bought at home is an extension you ask for. A green card is a certificate, not a second policy, and the countries where it is not required have changed — learn the rule from the heading, not from a blog.",
        ],
      },
    ],
  },
  {
    chapter: 2,
    title: "Health insurance",
    lo: "1.1",
    weight: "Still inside the 36. Small chapter, sharp distinctions.",
    blocks: [
      {
        id: "c2-how",
        heading: "Benefit is not a refund",
        hold: "Personal accident pays a stated sum when a contingency happens. Medical expenses pays the bill.",
        paras: [
          "A personal accident and sickness policy is a benefit contract. The insurer does not measure your financial loss and reimburse it. They pay the capital sum or the weekly benefit you bought, if the contingency in the wording happens. That is why occupation rates the accident element — the chance of injury — and not the sickness element in the same way. It is also why weekly benefits are kept near normal earnings: not because the insurer thinks you will hurt yourself on purpose, but because a benefit that beats wages is a reason to stay off work.",
          "A franchise is the trap in the sickness section. Seven days usually means nothing is paid if you are back before day seven, and the whole period is paid if you are not. An excess is the opposite habit: it is always sliced off the claim. If you mix those two words you will miss an easy item.",
          "Medical expenses insurance is the other product in this chapter. It buys private treatment outside the NHS — hospital, specialist, ambulance — often as an employee benefit. It is indemnity for the cost of treatment. It is not a lump sum for losing a limb, and it is not long-term residential care.",
        ],
      },
    ],
  },
  {
    chapter: 3,
    title: "Package policies",
    lo: "1.1",
    weight: "Inside the 36. Household is the one they write scenes about.",
    blocks: [
      {
        id: "c3-how",
        heading: "One document, several boxes",
        hold: "Buildings, contents, and things away from the home are different boxes even when they share a schedule.",
        paras: [
          "A package exists because the customers look alike, not because the perils became one peril. A household policy can hold buildings, contents, liability, and sometimes travel or legal expenses. The exam still wants you to know which box pays. Subsidence is a buildings question, usually with a heavy excess. Storm damage to a fence may be out. Theft of contents often depends on forcible entry. All risks, or personal possessions, is the extension for things that leave the risk address.",
          "New for old is not the same promise as indemnity. Indemnity puts you back, wear and tear included. New for old replaces without that deduction, usually with conditions about the sum insured being enough. If the sum insured is short, average can still cut the claim. Commercial packages — shop, office, tradesman, hotel — are the same idea with a different schedule: property, money, liability, and sometimes business interruption, each with its own limit.",
        ],
      },
    ],
  },
  {
    chapter: 4,
    title: "Property insurance",
    lo: "1.1",
    weight: "Inside the 36. Name the peril before you name the policy.",
    blocks: [
      {
        id: "c4-how",
        heading: "Four questions, four policies",
        hold: "Fire, theft, glass and money do not answer each other.",
        paras: [
          "Fire and special perils is about the building or contents being damaged by named events: fire, lightning, explosion, and the special perils the wording adds — storm, flood, burst pipes, impact, riot, malicious damage. Unoccupancy changes the risk, so the wording often restricts cover or asks you to tell them. Do not assume a closed shop is still on full perils.",
          "Theft is not ‘anything missing’. The usual trigger is forcible and violent entry or exit, with hold-up as its own event. Money is a different policy because cash walks. Employee fraud is often fidelity, not theft. Glass is the shop front and the sign, often with a boarding-up extension, and a glass claim on a motor policy is the one that may leave the no-claims discount alone. All risks is specified or unspecified property against accidental loss, with a list of exclusions, not a mood.",
        ],
      },
    ],
  },
  {
    chapter: 5,
    title: "Pecuniary insurance",
    lo: "1.1",
    weight: "Inside the 36. Two products carry it: legal expenses, and business interruption.",
    blocks: [
      {
        id: "c5-how",
        heading: "Money that is not the building",
        hold: "Business interruption does not start until there is a valid material-damage claim. The indemnity period is how long they pay, not ‘until renewal’.",
        paras: [
          "Pecuniary means the loss is money — profit, fees, legal bills — rather than a burnt wall. Legal expenses pays the cost of specified disputes. It is not public liability. If the question is ‘a guest was injured’, you are in liability, not here. If the question is ‘they need a lawyer for a contract fight the wording covers’, you are here.",
          "Business interruption pays for the trading loss after insured damage: loss of gross profit or revenue, and extra cost of working, for the indemnity period. The material damage warranty is the hinge. No valid claim on the property policy, no business interruption, even if the shop is shut. The sum insured is built from turnover or gross profit, not from the rebuild cost. Fidelity and credit sit in the same family when the question is employee dishonesty or a customer who does not pay.",
        ],
      },
    ],
  },
  {
    chapter: 6,
    title: "Liability insurance",
    lo: "1.1",
    weight: "Inside the 36. The richest set of mix-ups in the product half.",
    blocks: [
      {
        id: "c6-how",
        heading: "Three questions, in this order",
        hold: "Who was hurt? Was there property damage? Does the policy care when the injury happened, or when the claim was made?",
        paras: [
          "Employers’ liability is compulsory for most employers in Great Britain. It pays for injury or disease to employees arising out of and in the course of employment. It does not pay for damage to their property. The statutory floor and the limit insurers actually write are different numbers — learn both from the heading, and do not borrow public liability’s figure.",
          "Public liability is the open policy for third parties who are not employees. Injury and property damage, happening in the period. The exclusions do the sorting: employees go to employers’ liability, products often go to a products section, professional advice goes to professional indemnity, motor goes to motor. Products liability is injury or damage from goods you supplied, often with a yearly aggregate, and it is not the buyer’s extended warranty. Extended warranty is the buyer paying to stretch the maker’s guarantee. A television that dies in month fourteen is warranty. A television that burns the house is products.",
          "Directors’ and officers’, professional indemnity, and pension trustees are claims-made. The claim has to be made in the period, usually with a retroactive date. Employers’ liability is occurrence: the injury is caused in the period, even if the claim arrives years later. If you only remember one sentence from this chapter, remember that trigger.",
        ],
      },
    ],
  },
  {
    chapter: 7,
    title: "Non-insurance services",
    lo: "1.2",
    weight: "The rest of learning outcome 1. Services sit beside the policy. They are not extra perils.",
    blocks: [
      {
        id: "c7-map",
        heading: "What this chapter is actually examining",
        hold: "If no sum insured is paying a loss, you are in a service: a helpline, a repair network, a survey, or a recovery chase.",
        paras: [
          "Learning outcome 1 is the products, and then the things insurers do that are not insurance. This chapter is that second half. A question here will describe help, a garage, a surveyor, or someone chasing the other driver. Your job is to name the service and to know what it does not pay. Do not reach for a peril you already learned in chapters 1 to 6.",
          "Four services carry the chapter. Helplines. Authorised repairers and suppliers. Risk control, which means surveys and the difference between a requirement and a recommendation. Uninsured loss recovery. Frequency and severity are the two words the survey half is built on. Learn those two before the checklists.",
        ],
      },
      {
        id: "c7-help",
        heading: "Helplines",
        hold: "A helpline is usually inside the premium and often open all day. It is advice and a route to a contractor. It is not the claim payment.",
        paras: [
          "The customer hears ‘part of my policy’. On the paper it is still a service. The premium commonly includes a line that runs around the clock. What that line will do depends on the class.",
          "On motor, the insured still pays the labour and the parts for a breakdown. The exception is a breakdown that follows an accident the policy actually covers. Then the insurer pays to recover the vehicle. Do not turn a puncture at midnight into an own-damage claim just because someone answered the phone.",
          "On household, the same idea splits three ways. There is legal advice, typically for accidents, consumer problems and employment problems. There is an emergency contractor — roof, drains, something that is dangerous — who can be sent even when it is not a claim, and the insured pays a reasonable charge for that call-out. There is glazing through a named supplier, often at a discount. Travel is different again: a specialist medical line, in more than one language, because the person is abroad and the NHS is not there.",
          "Apps sit in the same family. They take photographs, push updates, and collect feedback. They do not change the sum insured. Insurers like the whole arrangement for boring commercial reasons you can be asked: a smashed window gets boarded before it becomes a theft; the insurer decides whether a frame is repaired or replaced; the network is bought in bulk; the work can be audited.",
        ],
      },
      {
        id: "c7-repair",
        heading: "Authorised repairers and authorised suppliers",
        hold: "Repairer means the person who mends. Supplier means the retailer the insurer uses when it replaces the thing.",
        paras: [
          "Authorised repairer is the motor word. It is the garage on the insurer’s list. Household emergency contractors and the glazing firms on a household wording are the same arrangement under a different trade. The insured often gives up a free choice of tradesman. In return the rate was priced on that channel, the quality is watched, and the job is easier to audit.",
          "Authorised supplier is the household-contents version of the same control. Instead of arguing about a cash figure for a suite, a television or a fridge, the insurer replaces the item through a retailer. Three advantages come up. The retailer guarantee, which often includes a short window — commonly ten or fifteen days — in which the goods can be returned for a full refund. Preferential rates. And no fight about what the cash settlement should have been.",
          "Keep ‘who does the work’ separate from ‘is it covered’. A customer who wants their own garage has not changed the peril. They have stepped off the network. The wording then usually limits what it will pay to a reasonable cost. Read the stem for the worker, then read it again for the event.",
        ],
      },
      {
        id: "c7-risk",
        heading: "Risk control: only the insured risk",
        hold: "Frequency is how often. Severity is how big. The insurer surveys the hazard that hits the cover it has sold, not the insured’s whole business.",
        paras: [
          "A survey is the insurer looking at the thing it might insure and deciding whether the risk is acceptable, and on what terms. The surveyor is not there to advise the client on competitors, labour relations, or the rest of the balance sheet. On an employers’ liability survey the point of machine guarding is that an unguarded machine produces an injury the policy would have to pay. That is the insured risk. A row with a trade union is not.",
          "Two words sort every survey question. Frequency is how often claims happen. Severity is how large each one is. A risk can be frequent and cheap, or rare and ruinous. The survey, the premium and the requirements all move with that pair. If a stem says losses are uncommon but one of them would destroy the site, the word you want is severity.",
          "You will also see ESG, and the Corporate Sustainability Reporting Directive which has been in force since 5 January 2023, mentioned as context for how a modern insurer looks at a commercial risk. Hold it as three labels, not as an essay. Environmental: emissions, use of resources, and the way climate feeds into underwriting. Social: how people are treated, including diversity and labour. Governance: how the firm is run. It does not replace the survey. It sits beside it.",
        ],
      },
      {
        id: "c7-classes",
        heading: "Which risks get a survey",
        paras: [
          "The classes a surveyor is sent to are a list you can recite. Material damage. Business interruption. Theft. Money. Employers’ liability. Public liability and products. Motor fleet. Engineering. Each one looks at a different thing, and the report is not interchangeable. A beautiful fire report does not answer a money question.",
        ],
      },
      {
        id: "c7-fire",
        heading: "A fire survey",
        hold: "Occupation, construction, and protection. Above a sum insured the insurer sets, the survey stops being optional.",
        paras: [
          "Three headings open a material-damage fire survey. What the business does. What the building is made of. What detects and fights a fire. Insurers also set a figure: once the sum insured is above it, they will not write the risk unseen.",
          "On the walk round, the surveyor is looking at how goods are stored, what the processes are, where fire or explosion could start, and the water perils — storm, flood, burst pipes — as well as the fire. Geography matters: earthquake, aircraft, subsidence. The report then always covers the same five things, and the exam likes the last two because they are not the same word.",
          "Management and housekeeping. Whether the sum insured is enough. The estimated maximum loss, the EML, which is how bad a single event could realistically be, not the total sum insured. Requirements: things that must be done, or the risk is not acceptable. Recommendations: things that would be sensible, and that often earn a discount, but that are not the price of being on cover. Mix those last two up and you will miss the item.",
        ],
      },
      {
        id: "c7-bi",
        heading: "Business interruption and money",
        hold: "A small machine can stop a whole factory. The business-interruption survey exists to find that machine. It is a separate report from the material-damage one.",
        paras: [
          "A business-interruption survey starts from the same building, then asks a different question: what would stop the income? The surveyor looks for bottlenecks, where a minor incident produces a long interruption, and for the supply chain. The estimated maximum loss and the requirements are written for the interruption. They are not copied off the material-damage report and relabelled.",
          "Money splits into two places: in a safe, and in transit. Transit is a set of facts, not a vibe. How much is carried. How. How often. How many people and vehicles. Whether the route changes. Whether a specialist carrier is used. Bank branches closing has a specific effect you can be asked: the trip to the bank gets longer, so safe limits and transit limits tend to rise, trips get fewer, and card payments offset some of the cash.",
        ],
      },
      {
        id: "c7-el",
        heading: "Liability, products, fleet, engineering",
        hold: "Employers’ liability surveys concentrate on high-hazard trades. Engineering surveys are the specialist ones, and some inspections are required by law.",
        paras: [
          "Employers’ liability surveys are aimed at the dangerous trades — foundries, civil engineering, that kind of work. On the premises the surveyor looks at warnings, fire exits and guarding, and also at the things that show how the place is run: terms of employment, training, housekeeping, smoking, health and safety, relations with staff, and how dangerous substances are stored. Away from the premises the questions are the safety code and who is supervising.",
          "Public liability looks at the premises the public can be hurt on, and separately at employees who go out and work on someone else’s site. Products recommendations and requirements are practical: store goods within their shelf life, label them clearly, pack them so they are safe (a safety cap is the usual example), warn the user, and run quality control.",
          "A motor fleet is often rated on its own claims history. Where that history is too thin, the underwriter looks at how the fleet is managed, at telematics, at an analysis of the claims that do exist, and at advanced or defensive driving courses. Telematics here means the record of the driving, not a gadget for its own sake: time of day, speed against the kind of road, how smooth the driving is, breaks, motorway miles, total mileage, and how many journeys.",
          "Engineering uses the most specialist surveyors. Boilers, air receivers and lifting plant have to be inspected because the law says so, and that inspection is often the same contract as the insurance. The surveyor’s job is the physical condition of the plant.",
        ],
      },
      {
        id: "c7-req",
        heading: "Requirements, recommendations, and who else helps",
        hold: "A requirement is the price of cover. A recommendation is optional, and often worth money off.",
        paras: [
          "Say the two words as a pair until they stop feeling similar. A requirement brings the risk up to a standard the insurer will accept. Ignore it and they need not cover you. A recommendation is an improvement they would like. Do it and the premium often falls. Do not do it and the cover can still stand.",
          "Three outside bodies turn up as sources of help rather than as insurers. The ABI publishes material for consumers. The Fire Protection Association publishes guidance and video on business fire risk. The Environment Agency, and the equivalent bodies in the devolved nations, issue flood warnings by app, text and phone. None of them is a policy. All of them are the sort of named organisation a short question can hide in the options.",
        ],
      },
      {
        id: "c7-ulr",
        heading: "Uninsured loss recovery",
        hold: "There is no cover. There is a legal right to make the person who caused the loss pay. That is not the Motor Insurers’ Bureau, and it is not the comprehensive uninsured-driver promise.",
        paras: [
          "Uninsured loss recovery exists where the policy did not pay, but someone else is legally responsible. The usual motor list is the one to memorise. The own damage on a third-party-only policy, where the other driver caused it. The excess on a comprehensive policy. A hire car while the insured vehicle is off the road. Injury, if negligence is proved. The money usually comes from the other driver’s insurer, not from a fund.",
          "Insurers and intermediaries will run the chase, or point the customer at it. Solicitors come in when the chase needs a lawyer. Their fees are paid either by a legal-expenses policy or on a no-win-no-fee arrangement. Both of those are still the service. They are not a new section of the motor policy.",
          "Three doors, one accident. Your own policy pays what it covers. Uninsured loss recovery chases a known person for what it did not cover. The Motor Insurers’ Bureau, in the claims chapter, is for an uninsured driver or a driver who cannot be traced. The comprehensive ‘uninsured driver promise’, where a wording has one, is a contractual extra and it needs the other vehicle to be identified. Use the facts in the stem to pick the door. Do not use the word ‘uninsured’ as if it only had one meaning.",
        ],
      },
    ],
  },
  {
    chapter: 8,
    title: "Material circumstances",
    lo: "2.1–2.3",
    weight: "Learning outcome 2 is about 31 questions. This chapter is the law of what must be said, and the hazards the underwriter is pricing.",
    blocks: [
      {
        id: "c8-material",
        heading: "A material circumstance",
        hold: "Material means it would affect a prudent insurer: whether to accept, and if so the premium and the terms. Not what the client finds interesting.",
        paras: [
          "A circumstance is material when a careful insurer would do something different because of it. Take the risk or refuse it. Charge more or less. Add an excess, a warranty, an exclusion, a limit. A new kitchen the client is proud of may change nothing. A flood claim, a flat roof, a young main driver, a workshop that has started hot work: those move the decision.",
          "The duty is not the same for every customer. Consumers sit under one statute. Businesses sit under another. The remedies look similar from a distance and are not identical. Learn them as two columns. Do not invent a percentage reduction. The paper wants the shape: no remedy, a proportionate remedy, or avoidance.",
        ],
      },
      {
        id: "c8-consumer",
        heading: "Consumers: reasonable care not to misrepresent",
        hold: "The consumer statute is the Consumer Insurance (Disclosure and Representations) Act 2012, in force from 6 April 2013. The insurer must ask clear questions. The consumer must take reasonable care not to answer them falsely.",
        paras: [
          "A consumer does not have to volunteer every fact an old commercial proposer had to volunteer. The insurer asks. The questions have to be clear. The consumer’s duty is reasonable care in the answers. A line you will see in short summaries — that the insurer can only turn a claim down if the lie was deliberate or reckless — is too crude to sit an exam on. There are three outcomes, and the middle one still changes the claim.",
          "If the consumer took reasonable care, the insurer has no remedy. The contract stands and the claim is dealt with on the policy as written.",
          "If the consumer was careless, the remedy is proportionate, and it follows what the insurer would have done with the truth. If it would not have written the contract at all, it may avoid the contract and it must return the premium. If it would have charged a higher premium, the claim is reduced in proportion. If it would have imposed different terms, the claim is dealt with as if those terms had been in the contract.",
          "If the misrepresentation was deliberate or reckless, the insurer may avoid the contract, refuse claims, and keep the premium. That is the serious end. It is not the answer for every wrong tick on a form. Sort the stem into reasonable care, careless, or deliberate or reckless before you look at the options.",
        ],
      },
      {
        id: "c8-fair",
        heading: "Non-consumers: fair presentation",
        hold: "The Insurance Act 2015 applies to non-consumer contracts placed or varied from 12 August 2016. The duty is a fair presentation, and it cannot be buried in a pile of paper.",
        paras: [
          "A business proposer must disclose every material circumstance it knows or ought to know, or give the insurer enough information to put a prudent insurer on enquiry. Either route can be a fair presentation. Dumping a data room and hoping the underwriter trips over the fact is not. The presentation has to be clear.",
          "What the insured ‘knows’ is defined. It is the knowledge of senior management and of the people who arrange the insurance. It includes what should have been found in the ordinary course of the business, what a reasonable search would have revealed, and information inside the organisation and in others who hold it for the organisation. If someone suspected a fact and chose not to look, that suspicion counts. A broker’s knowledge can be included. Confidential information the broker holds from a different, unrelated job does not.",
          "The insurer is not allowed to pretend it knows nothing. It is expected to know what it already holds and can get at, what an insurer writing that class would know, and what is common knowledge. A question that says ‘but it was in your own claims file’ is this point.",
        ],
      },
      {
        id: "c8-breach",
        heading: "A qualifying breach, and what the insurer may do",
        hold: "The insurer has to prove the breach was deliberate or reckless before it may avoid and keep the premium. If it cannot, the remedy follows what it would have done with a fair presentation.",
        paras: [
          "Call it a qualifying breach, then ask one question: can the insurer prove the insured was deliberate or reckless? If yes, the insurer may avoid the contract, refuse claims, and keep the premium. If no, avoidance with a kept premium is off the table, and you walk through three quieter remedies.",
          "If the insurer would not have written the risk on any terms, it may avoid, but it returns the premium. If it would have charged more, the claim is cut in proportion to the under-pricing. If it would have imposed different terms — a condition, a warranty, an exclusion, an extension, a sub-limit — the contract is treated as if those terms were there. It cannot avoid merely because it would have written a different wording.",
          "Hold the theft example, because it shows the third remedy cleanly. The insured did not disclose how often it was being stolen from. The insurer would have excluded theft. Theft is then treated as excluded. A fire claim still pays. The insurer only gets to avoid the whole contract if it proves the non-disclosure was deliberate or reckless.",
        ],
      },
      {
        id: "c8-basis",
        heading: "Basis clauses, and what need not be disclosed",
        hold: "A basis-of-contract clause is dead. The Insurance Act 2015 abolished it, and the parties cannot contract back into it. ‘True to the best of my knowledge and belief’ does not turn every answer into a warranty.",
        paras: [
          "Under the old habit, a declaration at the foot of a proposal could convert every answer into a warranty, so that any inaccuracy — even an immaterial one — broke the contract. That device has gone for the contracts the 2015 Act covers, and it cannot be reintroduced by a clever clause. A statement that the answers are true to the best of the proposer’s knowledge and belief is a statement about the answers. It is not a warranty.",
          "There is a list of things that do not have to be disclosed, and it is worth learning as a list. A circumstance that makes the risk better, not worse. Something the insurer already knows, ought to know, or is presumed to know. Something the insurer has waived. Something a survey would have shown. A conviction that is spent. If the stem puts the fact in one of those boxes, the duty did not require it to be said.",
        ],
      },
      {
        id: "c8-spent",
        heading: "Spent convictions",
        hold: "England and Wales: the Rehabilitation of Offenders Act 1974, as amended by the Police, Crime, Sentencing and Courts Act 2022. The extra years run after the sentence. A custodial sentence imposed under 18 is halved before you add them.",
        paras: [
          "A spent conviction is not a material circumstance the proposer has to offer. An unspent one can be. The clock is the sentence, then a buffer after it. For a custodial sentence in England and Wales the buffer depends on the length. Up to 12 months: add one year. More than a year, up to four years: add four years. More than four years: add seven years, unless the sentence is one that is never spent. The two never-spent sentences this chapter names are life, and a sentence of public protection. A community order or a youth rehabilitation order is spent when the order ends. A fine is spent one year after the conviction. A conditional discharge is spent on the last day the order has effect.",
          "Worked the way the paper likes it. Ed is 36. He received a 24-month sentence. That sits in the ‘more than a year, up to four years’ band, so you add four years to the two he served. He still has to declare it until six years after release. If he had been under 18, the custodial length would have been halved before the buffer was added.",
          "Scotland and Northern Ireland do not use this table. Scotland’s rules were reformed by orders in 2013 and 2015 and use the idea of a protected conviction. Northern Ireland still works from the Rehabilitation of Offenders (Northern Ireland) Order 1978. If the stem names a jurisdiction, do not apply the England and Wales years to it.",
        ],
      },
      {
        id: "c8-peril",
        heading: "Peril and hazard",
        hold: "A peril is the event. A hazard is what changes how often that event happens, or how bad it is.",
        paras: [
          "Fire is a peril. Explosion is a peril. Subsidence is a peril. They are the things that happen. A thatched roof is not a peril. It is a hazard: it changes how a fire behaves. A high-value sports car is a hazard on a motor risk, not a peril called ‘sports car’. When the options mix events with features of the thing insured, label each one before you choose. The events are the perils. The features are the hazards.",
        ],
      },
      {
        id: "c8-physical",
        heading: "Physical hazard",
        hold: "Physical hazard is a feature of the risk you could measure or photograph. It includes features of people when those features are about the risk, not about their honesty.",
        paras: [
          "Physical hazard is the measurable character of whatever is being insured. Good and poor sit on the same scale.",
          "Fire: brick, sprinklers and separation are better; timber, thatch and stored chemicals are worse. Theft: proper locks, an alarm and a baker’s shop are better; weak catches, a jeweller and an off-licence are worse. Motor: a garaged car on quiet roads is better; young drivers, a taxi or a sales rep, and a car that is expensive to repair are worse. Employers’ liability: guards, protective equipment and extraction are better; chemicals, dust and noise are worse. Personal accident: clerical work and good health are better; scaffolding, a recurring illness and being very overweight are worse.",
          "The personal-accident examples are still physical. They describe the body and the job, which change how often an accident or an illness happens. They are not a judgement about whether the person is honest. That judgement is the next heading.",
        ],
      },
      {
        id: "c8-moral",
        heading: "Moral hazard",
        hold: "Moral hazard is attitude and conduct: the insured, their employees, and the behaviour around them. You infer it. You do not measure it with a tape.",
        paras: [
          "Moral hazard is how people behave. Carelessness, dishonesty, a claims history that looks like a habit, an insured who will not look after the property. It can sit with the insured, with the people they employ, or with the way things are done around them. The underwriter is reading character and conduct because those change both frequency and severity.",
          "The exam writes a sentence that could be either hazard. ‘The roof is thatch’ is physical. ‘They have claimed three times and the last two looked padded’ is moral. ‘The driver is 19’ is physical. ‘The driver lends the car to anyone who asks’ is moral. Label it in the margin of the question before you touch an option.",
        ],
      },
      {
        id: "c8-form",
        heading: "Proposal forms",
        hold: "Since the 2012 and 2015 Acts, the weight is on the insurer to ask, and then to probe the answer. A modern form is tick boxes and drop-downs, not a blank page.",
        paras: [
          "The proposal is still how most personal and smaller commercial risks are described. The change in the law is whose job the questions are. The insurer has to ask what it needs to know, and it has to follow up an answer that is obviously incomplete. A proposer who was never asked is in a different position from a proposer who was asked and shrugged.",
          "Some questions exist because the way people now use things has changed the risk. Car sharing, and letting a spare room, are the examples. Both are peer-to-peer uses. Both can make a risk the insurer did not think it was writing. The form has to ask. Silence, when the question was there, is how a misrepresentation is built.",
        ],
      },
      {
        id: "c8-questions",
        heading: "The questions that appear on almost every form",
        paras: [
          "Name, including previous trading names, because the claims history may be sitting under the old name. Address, because it rates the risk — motor is the obvious one. Occupation, for three different reasons you should not collapse into one: it rates personal accident; on a liability policy the business description is the scope of the cover; on business interruption it has to catch all of the income, not just the activity someone put in the heading.",
          "Age belongs to personal lines. A young driver, and a higher excess for that driver, is an age question. It is not a question about the age of a company. Past insurance is asked because special terms, a refusal to renew, or a loaded premium are facts a new insurer would want. Other insurances are asked for a different reason again, and it depends on the type of policy. Where the policies are indemnity, the point is contribution, so the same loss is not paid twice in full. Where the policies pay a benefit, especially a weekly benefit, the point is that the benefits must not stack above earnings. That is why other personal accident cover is asked: a weekly benefit that beats wages is a reason not to go back to work.",
          "The form also asks about previous claims. Treat that as its own box. It is not the same question as ‘have you ever been refused insurance’.",
        ],
      },
      {
        id: "c8-specific",
        heading: "Questions that belong to one class",
        paras: [
          "After the general page, the form becomes the class. Motor asks ages, and convictions and prosecutions that are still pending. Liability asks about noise, pollution, work away from the premises, and the contracts the insured signs. Fire asks about processes, storage and construction. Theft asks how the stock splits and what the security is. Cyber is now a conversation the broker has to have: the 2015 Act means a fair presentation includes the data risk, and that conversation needs someone who actually understands it.",
        ],
      },
      {
        id: "c8-other",
        heading: "Other ways the underwriter finds out",
        hold: "The form is one route. A survey, a supplementary questionnaire, a London Market contract, and what is already public are the others. Anything found on the internet still has to be checked with the client.",
        paras: [
          "A survey is the underwriter’s eyes. It includes a plan of the premises, not just a walk to the front door. Supplementary questionnaires exist where the main form is too blunt. Public liability needs to know whether the insured gives professional advice or sells products. A hairdresser is asked about chemical treatments. A hotel is asked about discos and marquees. There are questionnaires for product safety and for fire equipment that might fail, for carrying large amounts of money, and for old buildings, where a letter of intent about the rebuild cost is the usual extra.",
          "In the London Market the presentation is often a Market Reform Contract rather than a household-style proposal. And underwriters do look at the internet and at social media, because lifestyle shows up there. That look is a start. It is checked with the client or the broker before it becomes a fact the premium rests on.",
        ],
      },
    ],
  },
  {
    chapter: 9,
    title: "Underwriting procedures and premium",
    lo: "2.3–2.5, 2.8 and 3.1",
    weight: "Most of this sits inside the 31 underwriting questions. Premium itself is about two questions. Know the formula and when cover actually starts.",
    blocks: [
      {
        id: "c9-reg",
        heading: "Regulation sits on the chain",
        hold: "The FCA’s conduct rules shape how information is gathered, how the negotiation runs, and what the documents must say. Contract certainty is about the information, the process, and the timing — not a prettier schedule.",
        paras: [
          "Nothing in this chapter replaces the peril. It decides whether the firm was allowed to sell, and whether the paperwork was in place when it did. Conduct rules apply to gathering the facts, to the negotiation, and to the documents the customer is given. Contract certainty is the market’s way of saying the deal should be clear at the time it is made: the right information, a proper process, and documents that are not still being invented a month later.",
          "The person in the middle has one of three regulatory shapes. An authorised person. An appointed representative. An introducer appointed representative. Any of them may in fact be a wholesale broker, passing the risk on rather than facing the client as the retail seller. Read the stem for which hat they are wearing before you decide what they were allowed to do.",
        ],
      },
      {
        id: "c9-toba",
        heading: "Terms of business agreements",
        hold: "There are two agreements. One with the insurers. One with the client. An FCA-authorised intermediary trades under them.",
        paras: [
          "A terms of business agreement is the relationship written down. The intermediary has one with each insurer it uses, and one with the client. Authority lives here: who may bind, up to what limit, whose money the premium is while it is in the client account, how complaints move. If the question is ‘could the broker accept this risk for the insurer?’, you are in the agreement with the insurer. If the question is ‘what did the client have to be told about the service?’, you are in the agreement with the client, and in the rules about information before a contract.",
        ],
      },
      {
        id: "c9-before",
        heading: "Before anyone is on cover",
        hold: "Demands and needs come before a recommendation. The client gets a statement of them before the contract is concluded. The recommendation has to be suitable.",
        paras: [
          "Before the contract, the client is told who the intermediary is and what services it offers. A distance sale has a minimum set of information, and then a fuller set in a durable medium. That fuller set arrives before the contract is concluded, or immediately afterwards if it genuinely could not be given before.",
          "The selling sequence is fixed. Find out what the client needs. Only then recommend. Give the client a statement of those demands and needs before the contract is made. A recommendation that does not fit the needs is not saved by a low premium. Protection policies — the ones built around life, health and similar promises — carry extra rules, so that the customer actually understands the product and so that any recommendation is suitable.",
          "Commission and fees are different sentences. A commercial customer is told the commission only if they ask. A fee is always stated. Do not swap those.",
        ],
      },
      {
        id: "c9-quote",
        heading: "Quotations die",
        hold: "A quotation is an offer of terms for a stated time. When that time passes, the insurer need not honour it. It was never cover.",
        paras: [
          "The usual path is: the proposal goes in, the insurer comes back with a premium and any special terms. Private motor and household are often done on the phone or on a website, with no paper form at all. However the number was produced, it is a quotation. It lasts for the period written on it. After that, the insurer does not have to stand by it. A fire the night after a lapsed quote is not a claim on that quote.",
          "What the customer is shown at this stage is generally a key features document. Consumers have cancellation rights when they take out, or renew, specified contracts. A commercial customer is given information that is appropriate, and given it in good time. Those are three different standards. Match the customer in the stem to the standard.",
        ],
      },
      {
        id: "c9-premium",
        heading: "How a premium is built",
        hold: "Premium equals rate times premium base. The rate prices the hazards. The base measures the exposure. Gender must not change the premium or the benefits.",
        paras: [
          "Two numbers, then a multiplication. The rate is the insurer’s price for the hazards: construction, occupation, the driver, the claims. The premium base is how much exposure there is: sum insured, wage roll, turnover, vehicle-years. Premium is rate times that base. You will not be asked to compute a tariff. You will be asked which of the two a fact belongs to.",
          "Some bases cannot be known on day one. Wage roll and turnover are estimates. The premium is then adjustable: a deposit now, an adjustment when the real figure exists. Where there is no sensible thing to multiply by — private motor is the usual case — the premium is flat. It is a price for that car and those drivers, not a rate on a sum insured.",
          "Gender is not a rating factor you are allowed to use. It must not change the premium, and it must not change the benefits. If an option says the premium went up because the driver is a woman, that option is wrong.",
        ],
      },
      {
        id: "c9-docs",
        heading: "The policy, the schedule, the certificate",
        hold: "The policy states the cover, the period, the exclusions, the conditions and the premium. Compulsory classes also need a certificate, which proves the policy is in force. The certificate is not the wording.",
        paras: [
          "The wording is the promise and its edges. The schedule is this insured, this period, these sums, these sections, this excess. Read them together. A certificate is a short proof that a compulsory policy exists — motor, employers’ liability. People confuse ‘the certificate says’ with ‘the policy covers’. The certificate shows there is a policy. The wording decides the claim.",
          "Who produces the information, and when, still matters. The proposer knows the risk. The broker assembles it and must not tidy a material fact away. The insurer asks, surveys and decides. After inception, the insured tells the insurer what the wording or the law requires when the risk changes. A question dated before inception, mid-term, or at renewal is three different duties.",
        ],
      },
      {
        id: "c9-start",
        heading: "When cover actually starts, and the tax",
        hold: "Cover attaches when two things have both happened: the insurer has accepted, and the proposer has paid the premium. Insurance premium tax is charged on most general insurance where the risk is in the UK.",
        paras: [
          "Acceptance alone is not enough, and paying an invoice to a broker who has not yet bound the risk is not enough. Both have to have happened. If a stem says the proposer posted the cheque and the building burned that night, look for whether the insurer had accepted. If it says the insurer accepted and the premium was still unpaid, cover has not attached.",
          "Insurance premium tax is a tax on the premium, not a rating factor. It applies to most general insurance where the risk sits in the UK. It does not tell you whether the loss is covered. Learning outcome 3 is about two questions long. Be able to say rate times base, flat versus adjustable, gender out, cover on acceptance plus payment, and that the tax exists. Then go back to the chain.",
        ],
      },
    ],
  },
  {
    chapter: 10,
    title: "Policy wordings and renewals",
    lo: "2.5–2.8",
    weight: "Still the 31. The cluster is exclusions, conditions, warranties, excesses and what happens at renewal.",
    blocks: [
      {
        id: "c10-form",
        heading: "How a wording is assembled",
        hold: "A scheduled wording is pre-printed text plus a schedule of the things that change. The operative clause is the part that says what is covered.",
        paras: [
          "Most wordings you will meet are scheduled. The clauses are printed in advance. The schedule at the end holds the variables: the name, the period, the sums, the excess, the sections that are on. Personal wordings are often only on a website. The pieces, in the order people expect to find them, are a heading, a recital, a signature, the operative clause, the exclusions and the conditions.",
          "The operative clause is the scope. Everything else is an edge. If you cannot point at the operative clause, you do not yet know what was bought, and you should not be arguing about an exclusion.",
          "Around those pieces you will often also find definitions, a customer-service statement and a complaints procedure. They matter for chapter 13. They do not pay the claim.",
        ],
      },
      {
        id: "c10-excl",
        heading: "Exclusions",
        hold: "A specific exclusion bites on one section. A general exclusion bites on the whole policy. Some general exclusions are market-wide.",
        paras: [
          "An exclusion is a line the cover never crosses. War, wear and tear, the driver’s own property in his custody: if the wording excludes it, you do not go on to ask about the excess or the condition. Specific exclusions live in a section. General exclusions live at the back and apply to every section. Some of those general exclusions are market exclusions, written the same way across many insurers. Do not treat a market exclusion as optional just because it feels harsh.",
        ],
      },
      {
        id: "c10-cond",
        heading: "Conditions, and two kinds of ‘precedent’",
        hold: "A condition precedent to the contract puts the validity of the policy in doubt. A condition precedent to liability has to be met for that claim.",
        paras: [
          "Conditions are duties. The ones that turn up everywhere are the insured’s duties after a loss, average, contribution and subrogation. Average, contribution and subrogation are how the money is shared or recovered. They are not perils. The duties are things the insured must do.",
          "‘Condition precedent’ is two different tools, and the paper uses both. A condition precedent to the contract is so basic that breaking it puts the validity of the contract in doubt. A condition precedent to liability is a step that must be taken before that claim is payable — typically, telling the insurer, or sending the particulars in time. Break the second and this claim may fail. The rest of the policy can still be alive.",
        ],
      },
      {
        id: "c10-money",
        heading: "Excess and franchise",
        hold: "An excess is sliced off every claim. A franchise is a threshold: under it, nothing; once the loss passes it, the whole loss is paid, including the franchise itself.",
        paras: [
          "An excess is the first amount of each claim that the insured keeps. It can be compulsory or voluntary. A voluntary excess is a rating tool: the insured carries the small, frequent losses and the premium comes down. The loss is still covered. The cheque is smaller. If the stem says they bear the first £1,000, you are not looking at an exclusion.",
          "A franchise is not an excess. It can be an amount or a period of time. Below it, the insurer pays nothing. Once the loss passes it, the insurer pays the whole loss, and that includes the franchise. You met the seven-day version on sickness benefit. The shape is the same wherever the wording still uses the word. ‘They pay nothing for the first three days, then they pay all the days including those three’ is a franchise. ‘They pay all the days except the first three’ is an excess.",
        ],
      },
      {
        id: "c10-warr",
        heading: "Warranties",
        hold: "A warranty is a stipulation that a fact is and remains so, or that something will or will not be done. For contracts the Insurance Act 2015 covers, it is suspensive. The insurer is off risk only while it is broken, and only for a loss the warranty was there to prevent.",
        paras: [
          "A warranty is a promise inside the contract. The alarm will be set. The vehicle will only be used as described. The building will not be used for manufacturing. It is not an answer on a proposal form. Those answers are representations, and they live in chapter 8.",
          "Two limits stop the old ‘any breach kills the policy from day one’ answer. For a consumer, FCA rules say the insurer will not refuse a claim because of a warranty breach that had nothing to do with the loss. For the non-consumer contracts the 2015 Act covers, a warranty is suspensive. The insurer is off risk only for as long as the warranty is broken, and only where the loss is connected to the risk that warranty was meant to deal with. Put the alarm right and the cover is back. A fire that had nothing to do with the broken alarm is not a gift to the insurer.",
        ],
      },
      {
        id: "c10-four",
        heading: "Four different reasons to pay nothing",
        hold: "Exclusion: never covered. Condition: a duty, sometimes fatal to the claim. Warranty: a promise, suspensive, and tied to the loss. Representation: something said before the contract, which is misrepresentation if it was false, and is not in the policy.",
        paras: [
          "Sort the stem into one of the four before you read the options. If the event was carved out, it is an exclusion, and it was never a claim. If the insured failed to do something the wording required, it is a condition, and you then ask whether it was precedent to the contract or only to this claim. If the insured broke a promise about a state of affairs, it is a warranty, and you then ask whether they were still in breach and whether the loss is the sort the warranty was aimed at. If the problem is something they said to get the contract, and that something is not a term of the policy, it is a representation. A false representation is a misrepresentation. It is handled with the consumer or non-consumer remedies in chapter 8, not by pretending the form made it a warranty.",
        ],
      },
      {
        id: "c10-renew",
        heading: "Renewal",
        hold: "Most policies last twelve months. The insurer usually wants to renew and has no duty to offer renewal. A consumer renewal notice must show this year’s premium and last year’s, and must tell the customer to check the cover is still right and that they can shop around.",
        paras: [
          "A renewal is a new contract. The facts come back onto the table. There is no general right to be offered the same policy again. In practice the insurer wants the renewal. That desire is not a duty.",
          "The notice has to go out in time, and it has to be informative. For a consumer it has to show the renewal premium and the premium they paid last year, side by side. It also has to tell them to check that the cover still fits, and that they are free to compare it with other offers. A notice that only says ‘we have renewed you at £600’ has missed the comparison.",
          "The premium is paid at once or by instalments. Instalments do not shrink the price. They spread it. A consumer’s cooling-off right on a renewal is not the same thing as the insurer cancelling mid-term because an instalment bounced. And a question about a new extension that nobody mentioned at renewal is a disclosure question with a date on it, not a wording question.",
        ],
      },
    ],
  },
  {
    chapter: 11,
    title: "Valid claims and settlement",
    lo: "4 and 5",
    weight: "About 21 questions on claims, plus about 2 on applying policy conditions to a claim. This is the other large block after underwriting.",
    blocks: [
      {
        id: "c11-valid",
        heading: "Valid, invalid, or only partly met",
        hold: "The insured proves an insured peril and the amount. The insurer checks that the cover applies, that this claimant is entitled, and that the conditions were met.",
        paras: [
          "A claim starts as an assertion. The insured has to show that an insured peril happened and what it cost. The insurer then tests three things: the policy responds to that event, the person asking is the person entitled to ask, and the conditions have been complied with. Miss one and it is not a valid claim. It is not ‘a bit valid’.",
          "Part payment is ordinary, and it is not a refusal. The sum insured or the limit is below the loss. Average applies because the property was underinsured. An excess comes off. In each of those the loss was covered and the cheque is smaller. Learn them as payments.",
          "A refusal is a different sentence. The peril was excluded, the event was outside the period, the claimant has no right to the money, a condition precedent that still defeats the claim was broken, or the claim was dishonest. Late notice is only fatal where the condition and the law make it so. Look in the stem for whether the delay actually hurt the insurer before you tick ‘refuse’.",
        ],
      },
      {
        id: "c11-duties",
        heading: "What has to happen after a loss",
        hold: "Implied duties: behave as if uninsured, tell the authorities, stop the loss spreading, do not obstruct the investigation. Express duties are the claims conditions.",
        paras: [
          "Some duties exist even when the wording is quiet. Act as a sensible uninsured person would. Tell the police or the other authority the event belongs to. Stop the damage getting worse. Do not get in the way of the investigation. On top of those, the claims conditions say it expressly: notice promptly, tell the police where that is required, take reasonable steps against further damage, and send proof and details in the time the wording allows.",
          "The claim form is long and it is different for each class. Check the form against the policy first — is this event even in the wording? — and only then check that the amount is reasonable. Supporting evidence is whatever proves that class of loss. A doctor’s note is the usual one on sickness. Invoices, estimates, photographs and proof of ownership do the same job on property. A loss adjuster investigates a larger loss. The adjuster does not, by writing a report, decide the law.",
        ],
      },
      {
        id: "c11-share",
        heading: "Contribution, average, subrogation",
        hold: "Contribution shares one loss between insurers. Average cuts a claim because the sum insured was too low. Subrogation lets the insurer take the insured’s rights against the person who caused the loss.",
        paras: [
          "Contribution arises when more than one insurer is liable to the same insured for the same loss. They need not be liable for the same amount. The contribution condition pushes the insured to claim from each of them in proportion, so that nobody is paid twice and no single insurer is left with the whole loss by accident.",
          "Average is the underinsurance rule on property. Pay the loss times the sum insured, divided by the full value. If the building was insured for half of what it would cost to reinstate, the insured is their own insurer for the other half, and a partial loss is paid in that same proportion. Do not invent a worked sum in the exam unless the stem gives you the three figures. The relationship is the mark.",
          "The subrogation condition lets the insurer step into the insured’s rights against a third party, once the insurer has paid. The insurer does not recover more than it paid, and it is not suing its own insured for the same insured loss. Contribution is between insurers. Subrogation is against the outside person who caused the damage.",
          "If everyone already agrees the insurer is liable, and the only fight is about the amount, an arbitration clause can send that fight to arbitration. It does not decide whether there was liability in the first place. Liability admitted, quantum disputed: that is the shape.",
        ],
      },
      {
        id: "c11-adr",
        heading: "Sorting it out without a trial",
        hold: "The Civil Procedure Rules require the courts to encourage alternative dispute resolution. A mediator does not decide. A conciliator recommends.",
        paras: [
          "Alternative dispute resolution is the attempt to finish the argument without a judge. Mediation is a facilitator. The parties settle, or they do not. The mediator does not impose an answer. Conciliation looks similar from the waiting room and is different in one respect: the conciliator recommends an outcome. Arbitration, where the wording provides for it, is a private decision, and the amount-only version was in the previous note.",
          "The Financial Ombudsman Service is for eligible complainants, after the firm’s own process. It is not a court, and it is not open to every commercial claimant. Eligibility is a chapter 13 point. The existence of a disagreement is not, by itself, a ticket to the ombudsman.",
        ],
      },
      {
        id: "c11-market",
        heading: "Market agreements",
        hold: "A market agreement is insurers arranging among themselves how a recurring mess is shared. It does not rewrite the customer’s wording.",
        paras: [
          "Insurers sometimes agree, between themselves, not to pursue each other in situations that cost more to argue about than to pay. The ABI memorandum of understanding on subrogated motor claims is the named example: some insurers have agreed not to seek contribution in stated cases, for example personal effects damaged in a motor accident. The customer is kept out of the middle. Their policy still says what it says. The agreement is about the insurers’ books.",
        ],
      },
      {
        id: "c11-mib",
        heading: "The Motor Insurers’ Bureau",
        hold: "Uninsured drivers: injury is unlimited, third-party property is capped at £1,000,000, and there has to be no policy in force. Untraced drivers: death or injury only, and only if that driver would have been liable. Property is not in the untraced agreement.",
        paras: [
          "The Motor Insurers’ Bureau is a fund with two agreements, and they do not match. Under the uninsured drivers agreement, a victim with a court judgment can be paid for third-party injury, which is unlimited, and for third-party property, up to £1,000,000, where no policy is in force. Under the untraced drivers agreement, the claim is for death or injury, and the victim has to show that the untraced driver would have been liable. Do not add property damage to the untraced agreement. It is not there.",
          "Keep the three motor doors apart, because the stems use the same adjectives. The bureau is for no insurance, or for a driver who cannot be found. Uninsured loss recovery, in chapter 7, chases a known person for a loss the victim’s own policy did not pay. A comprehensive ‘uninsured driver promise’ is a term of the victim’s own policy, and it needs the other vehicle to be identified. Same crash, three mechanisms.",
        ],
      },
      {
        id: "c11-settle",
        heading: "How a claim is actually paid",
        hold: "Money, repair, replacement, or reinstatement. On a liability claim the money goes to the third party. On a total loss the insurer takes the salvage.",
        paras: [
          "Settlement is not always a cheque to the insured. The insurer can pay money, pay for repairs, replace the item, or reinstate — which means it takes over the rebuilding. On a liability claim the money is for the third party, not a windfall for the insured. If the insured is insolvent, the Third Parties (Rights against Insurers) Act 2010 lets that third party claim against the insurer directly.",
          "A total loss has a second half. The insurer, having paid for the thing as a total loss, is entitled to the salvage. If stolen or lost goods later turn up, they belong to the insurer. In practice the insurer often offers them back to the insured if the insured repays the settlement.",
        ],
      },
      {
        id: "c11-reserve",
        heading: "Reserves and recoveries",
        hold: "A reserve is a realistic estimate made when the claim arrives. It feeds the accounts and the rating. It is not a promise to pay that figure.",
        paras: [
          "As soon as a claim is known, someone puts a number on what it is likely to cost. That number is the reserve. It has to be realistic, because the accounts and next year’s rates are built on it. You will not be asked for a formula. You may be asked why the figure exists, and why an unrealistic one hurts.",
          "After payment, the insurer looks for its money back from anywhere the law allows. Contribution from another insurer. Subrogation against the person who caused the loss. And the found-goods route above, where the thing itself comes back. Those are recoveries. They are not a second claim by the insured.",
        ],
      },
      {
        id: "c11-fraud",
        heading: "Fraud",
        hold: "A dishonest claim is not average and it is not a high excess. It can cost the claim, and it feeds the next premium everyone else pays.",
        paras: [
          "The handler is looking for what does not fit, and the tools around them are now part of the syllabus. The Insurance Fraud Bureau, the Insurance Fraud Investigators Group and the Insurance Fraud Register are the industry bodies. The Claims and Underwriting Exchange holds personal-lines claims history. The Art Loss Register tracks art. MIAFTR2 tracks total losses and thefts, which is how a second claim on the same vehicle gets caught. The Motor Insurance Database holds which vehicles are registered and which of them are insured. Technology, including systems sold as artificial intelligence, is used in the assessment. You do not need to know a product name. You need to know what each register is for.",
          "Why the industry cares is three sentences. Fraud worsens the result. Premiums rise. A successful fraud invites the next one. Inventing a stolen ring is not an underinsurance problem. It is a different wrong, and the remedy is not ‘pay a proportion’.",
        ],
      },
    ],
  },
  {
    chapter: 12,
    title: "Data, security and technology",
    lo: "6",
    weight: "About 5 questions. Enough to drop an easy mark. Not enough to displace underwriting and claims.",
    blocks: [
      {
        id: "c12-classes",
        heading: "Three classes of data",
        hold: "Public, corporate, personal. Confidential data is the corporate or the personal, not the public.",
        paras: [
          "Sort the information before you sort the duty. Public data is information anyone can have. Corporate data belongs to the firm: accounts, pricing, a client list. Personal data is about a living person who can be identified. Confidential is not a fourth class sitting beside those. It is the word for corporate or personal data that is not meant to be shared.",
          "The threats are different, which is why the class matters. Corporate data has to be protected from being altered on purpose, from being destroyed on purpose, and from industrial espionage. Personal data has to be protected from being disclosed to someone who should not have it, and from being used to blackmail. A stolen rating manual and a stolen medical proposal are not the same incident.",
        ],
      },
      {
        id: "c12-dp",
        heading: "What the data-protection rules ask",
        hold: "Personal data is information about an identifiable living individual. The duties this chapter wants you to hold are accuracy, fairness and security. A breach has to be reported. The fines are far higher than under the old Act.",
        paras: [
          "UK data-protection law applies to the proposal forms, the claims files and the medical notes. Personal data means a living individual who can be picked out from the information. The duties you should be ready to name from this chapter are that the data is accurate, that it is used fairly, and that it is kept secure. Do not spend revision time reciting a longer list you will not be able to finish under a clock.",
          "Some personal data is sensitive and is treated more tightly. The list to remember is ethnicity, race, religion, politics, health and sexuality. Health is the one that arrives on a medical or a personal-accident proposal. The person the data is about has rights, and the two this chapter names are erasure and portability. If there is a breach, reporting it is compulsory. The fines available now are much higher than they were under the previous Act. You do not need a figure. You need to know the direction of travel, and that leaving a proposal on a train is a security incident rather than a customer-service slip.",
        ],
      },
      {
        id: "c12-store",
        heading: "Storage, disposal, security",
        hold: "Restricted access, backup, protection against theft, respect for copyright, and storage and disposal that are actually secure.",
        paras: [
          "Holding the data properly is a list, not a mood. Access is restricted to the people who need it. There is a backup. Theft is planned for, both of the machine and of the paper. Copyright in the material is respected. Storage is secure, and so is disposal: shredding, secure deletion, a contractor who is themselves under a duty. A bin bag in the car park is the wrong answer.",
          "Security is who can open the system. Passwords that are not shared. Screens that lock. Laptops that are encrypted. Paper that does not go home unless the rule allows it. A mobile phone is easier to lose than a desktop and harder to secure. That single comparison is examinable.",
        ],
      },
      {
        id: "c12-cma",
        heading: "The Computer Misuse Act 1990",
        hold: "The Act is a deterrent against unauthorised access. It created three criminal offences: unauthorised access; unauthorised access with intent to commit further offences; and unauthorised acts that impair a computer.",
        paras: [
          "The Computer Misuse Act 1990 is the criminal law that sits next to the data-protection duties. Its point is to deter people from getting into computers they are not allowed to use. It created three offences. The first is unauthorised access. The second is unauthorised access with intent to commit further offences. The third is unauthorised acts that impair the operation of a computer. You can be asked what the Act is for, and that there are three offences. You are not being asked to quote section numbers.",
        ],
      },
      {
        id: "c12-tech",
        heading: "The technology that changes the risk",
        hold: "An aggregator returns several quotes from one enquiry. Telematics records how and when a car is driven. Insurers also sell cyber cover. This chapter is the duty; cyber cover is the product, back in liability.",
        paras: [
          "An aggregator is a portal. The customer enters the risk once and several quotes come back. The internet of things is ordinary equipment on a network, sending information about the customer as it happens. Telematics, on a motor policy, is a high-frequency motion sensor: it records how the car is driven and when. Social media is used for a conversation that is aimed at that customer rather than at a mailing list. All of this produces more data than the old filing cabinet, so the storage has to get better, not just bigger.",
          "The same firms that hold the data also sell insurance against attacks on it. That product is cyber cover, and it lives with the liability classes. Do not answer a data-protection question with a cyber policy, or a cyber-policy question with a lecture about fairness. The stem will tell you which one it is.",
        ],
      },
    ],
  },
  {
    chapter: 13,
    title: "Customer service",
    lo: "7",
    weight: "About 3 questions. Short, and still on the paper. The marks are definitions and the claims-handling duties.",
    blocks: [
      {
        id: "c13-what",
        heading: "What customer service is",
        hold: "Customer service is the work a firm does so that customers stay, and so that they speak well of it. A poster is not a standard.",
        paras: [
          "The definition is practical. It is the activities that keep customers and that make them willing to recommend the firm. It is not a slogan on the wall. Good service keeps the customers you have, brings new ones, makes the firm a place people want to work, and the profit follows those three. If a question asks why a firm bothers, that is the chain.",
          "Consumers now know they have rights, and they expect them to be used. Firms have answered by adding services and by publishing care charters. A charter that nobody measures is still a poster. The next heading is how it becomes real.",
        ],
      },
      {
        id: "c13-who",
        heading: "Who counts as a customer",
        hold: "External customers buy, or they stand in the chain: brokers, agencies, third-party administrators, investors. Internal customers are employees served by other employees.",
        paras: [
          "The person who pays the premium is a customer. So is a broker, an agency, a claims administrator and an investor, when the firm is dealing with them. Those are external. Internal customers are the staff who rely on other staff — the claims handler who needs the underwriter’s file, the underwriter who needs the accounts. A question about ‘the customer’ may not have a policyholder in it at all.",
        ],
      },
      {
        id: "c13-standard",
        heading: "Standards, and what competence means",
        hold: "A performance standard is the minimum quality. Staff are appraised against it, then rewarded or trained. FCA competence means the person can do the job without supervision.",
        paras: [
          "A standard states the minimum: the phone answered in a stated time, a claim acknowledged the same day, a refusal explained in writing with a reason and a route to complain. Staff are appraised against that minimum. If they meet it, they can be rewarded. If they do not, they are trained. Hoping they will be nicer is not an appraisal.",
          "Competence, in the FCA’s sense, is knowledge and expertise enough to carry out the function without someone standing over the person. The PRA makes the same link between training and competence. You implement a standard by training, by measuring the thing you promised, and by correcting the miss. Vulnerable customers — bereavement, illness, low literacy, a first language that is not English — are still customers. The standard has to work for them, which may mean a slower conversation or a different channel.",
        ],
      },
      {
        id: "c13-fca",
        heading: "Fair treatment and claims",
        hold: "FCA Principle 6 is treating customers fairly, and it has to be driven from the top. Management information has to show customer outcomes. ICOBS says claims are handled promptly and fairly, with guidance, and are not rejected unreasonably.",
        paras: [
          "Principle 6 is the short statement: pay due regard to the interests of customers and treat them fairly. It is not a paragraph for the complaints team. It is supposed to be embedded from the top of the firm, and the management information has to show what actually happened to customers, not how many calls were answered. Every process, including underwriting and not only the call centre, gets examined for the service it gives.",
          "On claims, the ICOBS standard is the one to recite. Handle the claim promptly and fairly. Give the customer guidance. Do not reject a claim unreasonably. Separately, the Enterprise Act gives a damages claim where the insured can prove that a late settlement caused them loss. Late is not only a conduct issue. It can be money.",
          "An intermediary handling a claim owes due care, skill and diligence. Conflicts are avoided, or they are disclosed and the client approves them. That matters most where the intermediary has been given authority to settle claims itself. A binder and a quiet conflict is the fact pattern.",
        ],
      },
      {
        id: "c13-complain",
        heading: "Complaints",
        hold: "Eligible complainants get the FCA complaint rules and a route to the Financial Ombudsman Service, and they must be told. Everyone else still gets a procedure that records the complaint and answers it.",
        paras: [
          "Eligibility decides the route, not whether the firm may ignore the person. An eligible complainant is handled under the FCA rules and can go to the Financial Ombudsman Service, and the firm has to tell them that. A person who is not eligible does not get that route. The firm still needs a way to register what they are unhappy about and to answer it. Ignoring either of them is itself a failure.",
          "None of this changes which peril pays. It changes whether the firm is allowed to treat the person this way while it decides. A complaint has a clock, a record and a proper answer.",
        ],
      },
      {
        id: "c13-data",
        heading: "Fair use starts at collection",
        hold: "Data has to be obtained fairly if it is going to be used fairly. A claims decision built on data that was collected by a trick is already broken.",
        paras: [
          "Chapter 12’s duties and this chapter’s duties meet in one sentence. If the firm wants to use personal data fairly — to price, to pay, to decline — it had to obtain that data fairly in the first place. A hidden question, a purpose the customer was never told, or a file shared with someone who had no business seeing it, fails here even before you ask whether the premium was right.",
        ],
      },
    ],
  },
];
