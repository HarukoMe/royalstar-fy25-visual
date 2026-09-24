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
    weight: "Study text sections A–C.",
    blocks: [
      {
        id: "s1a",
        heading: "Private motor insurance",
        hold: "Four levels, one policy form. The schedule picks the sections. Injury is unlimited. Third-party property is not.",
        paras: [
          "This is the class that affects the most people, and it is compulsory. You must not drive, or be in charge of, a vehicle on a public road unless there is a policy for injury to other people and damage to their property. Insurers usually print one wording and let the schedule switch sections on. Comprehensive uses the whole form. Third party only uses a much smaller part of it.",
          "Road Traffic Act only is the floor under the Road Traffic Act 1988, as later amended. It covers use on a road or other public place: bodily injury or death of third parties, including passengers, with no limit; damage to their property, limited to £1.2 million from 31 December 2016 (the EU minimum moved to €1.2 million on 1 January 2017, and the property figure is meant to be revisited with inflation every five years); the claimant’s costs and the cost of handling the claim; and the emergency treatment and hospital charges the Act itself sets, which the policy must pay when they are demanded. Visiting another country in the scheme, the policy must give the higher of that country’s minimum and the UK minimum. Employees travelling as passengers in the course of employment are covered; the driver is not — the employer’s liability to the driver sits on an employers’ liability policy. Almost nobody is sold RTA-only any more. Once third-party property damage became compulsory, and again after the Fifth Motor Insurance Directive, the gap to third party only was too small. The cover insurers actually start from is third party only.",
          "Third party only keeps the RTA cover and usually adds the rest of the territory, not only the road: the UK, the Isle of Man and the Channel Islands, and some wordings give the full policy in the EU for a limited time in the year. Private-car third-party property goes up to £20 million. Driving a car that is not yours is often included, sometimes a motorcycle too, but not every insurer gives it, and those that do have a market wording so the extension cannot be used to get a police-seized car released. Other people are covered when they drive or use the car on the insured’s order or with permission, unless the certificate has already cut that down to named drivers or a spouse. Passengers, employers and business partners are indemnified if they are held responsible. Defence costs are in, and there is a limited sum for representation after a prosecution for a motoring offence that may itself produce a claim. Two exclusions sit on this section. Property owned by, held in trust by, or in the custody of the person claiming — including the vehicle itself — is out. So is a liability that another policy already covers, which matters when the insured is driving someone else’s car.",
          "Third party, fire and theft adds the insured’s own vehicle, but only if it is damaged by fire, lightning or explosion, damaged in a theft or an attempt (some wordings add taking without consent), or stolen and not recovered. People buy it when they will not pay for comprehensive and still want the large risks. It keeps the two third-party exclusions and adds loss of use: no taxis, no hire, while the car is being repaired or recovered.",
          "Comprehensive is the one most people buy. On top of third party, fire and theft it pays accidental and malicious damage to the insured’s car. It is written like an all-risks cover: everything is in unless it is listed out. The usual holes are accessories and spare parts unless they are on the car or in the insured’s garage; wear and tear and depreciation; loss of use, though some insurers now give a limited version; mechanical or electrical breakdown, with the important rider that if the failure causes a collision — brakes fail, the car hits something — the resulting damage is covered; and tyres damaged by a puncture or a burst. Driving other cars, where it is given, is still third party only. There is no cover for damage to the car being driven. A young or inexperienced driver carries an extra excess on top of the policy excess. Inexperienced means a provisional licence, or a full licence held for less than a year. Some insurers go further and remove the driving-other-cars benefit entirely under 25. The benefits that usually come with comprehensive, rather than as extras, are a personal accident capital sum for the insured or spouse in any car they are driving or travelling in (specified injuries such as loss of a limb or sight, sometimes a weekly benefit), medical expenses for the insured or a passenger on top of the compulsory emergency treatment, often somewhere between £250 and £500, and a modest sum for clothing and personal belongings in the car, often around £250 and not uncommonly £1,000.",
          "No-claims discount is in the wording, not an optional extra. No-claims bonus is the same thing. The scale varies. Something like 12% after one claim-free year, and 50% or more after five, would not be strange. A claim usually knocks the entitlement back two years. For a small extra premium a full discount can be protected against a defined number of claims. A guaranteed discount, after say five clean years, can be bought ‘for life’, but that promise is about the discount, not about the premium it is taken off. The insurer can still move the starting price.",
          "The uninsured-driver promise, on those comprehensive policies that have it, deals with a crash against a vehicle that has no insurance. It usually protects the no-claims discount and waives the excess, but only if the insured can give full details of the other vehicle. A hit-and-run, where those details do not exist, is outside it. That is a different door from the Motor Insurers’ Bureau agreements in chapter 11.",
          "Optional extensions sit on top of whatever level was bought. Glass is already in comprehensive, and can be added to a lower level for a premium. A glass claim on its own does not touch the no-claims discount. Personal belongings can be increased, and many insurers now sell add-ons for child seats, wheelchairs, and satnavs. A young driver under about 25 who really is an occasional extra can be added for a premium. If that young driver is actually the main driver but does not own the car, the risk is rated on their age and experience, not the owner’s. Loss of use is excluded from the standard comprehensive cover and then sold back, capped per day. Most insurers will pay for a replacement car for a limited time. Courtesy cars from the approved repairer are marketed as free, but the garage’s charge includes them, so they are already in the premium. Extra personal accident benefits can raise the lump sums, add a weekly benefit, or add rehabilitation such as physiotherapy, scans and chiropractic treatment. Foreign use is two different promises. Every UK policy already has to give the greater of the visited country’s minimum and the home minimum. The same cover the insured bought at home is an extension: they tell the insurer, and it is often an extra premium, though some give continental use free for up to 30 days in the year. A green card is the international certificate of that cover. The book records the older list of countries where it was not required, and then the change: on 30 June 2021 the Commission said the UK could join the Green Card Free Circulation Area — the 30 EEA countries plus Andorra, Bosnia and Herzegovina, Serbia and Switzerland — from 2 August 2021, so a green card is not required for those countries. The Motor Insurers’ Bureau still advised insurers to keep issuing them until 2 September 2021. A Spanish bail bond, the old promise to put up a sum, usually up to £1,000, to get a driver out of custody, repayable by the policyholder, is no longer a legal requirement, and most insurers have stopped issuing it. Election use is not always treated as social, domestic and pleasure. Insurers usually do not charge, except for a parliamentary election. A road-safety rally may be free. Racing is for a few specialist insurers, and it costs. Caravans and trailers have third-party cover while attached. Wider caravan cover is a separate non-motor policy. A trailer can be made comprehensive on the motor policy. Breakdown, where it is sold, means a control centre. The insured pays labour and parts unless the breakdown follows an accident the policy covers. Some wordings also pay the call-out, an hour of roadside labour, and a tow to a garage. It is an extra premium. Motor legal expenses, after an accident that is not the insured’s fault, pay lawyers up to a figure in the order of £100,000 for the uninsured losses — excess, travel — and for injury. A joint policy, two names, may or may not cost more, depending on whether both people want to drive other cars. That benefit is usually deleted or given to only one of them. If one joint insured injures the other, the policy treats them as if each had their own policy, so the injured one can claim against the negligent one. A multi-car policy can take several vehicles, sometimes five or six, all registered at the same address, comprehensive or third party fire and theft as chosen, usually cheaper, and with a separate no-claims discount on each. Misfuelling is the loss from putting the wrong fuel in.",
          "General exclusions apply to every section: an unlicensed driver; use outside what the policy allows; contractual liability; war; radioactive contamination and explosive nuclear assemblies; riot and civil commotion in Northern Ireland, for the insured’s own damage; sonic bangs; and pollution unless it comes from one identifiable event. Apart from the use exclusion, those are market exclusions. An unroadworthy vehicle is a further usual exclusion. To be indemnified, the driver must hold a licence, or have held one and not be disqualified from holding or getting one. Nobody is indemnified if they know the driver has no licence. The Road Traffic Act still makes the insurer pay an RTA liability even where the wording excludes it, because the point of the Act is the injured person. The insurer may then recover what it paid from the insured, and the policy says so. Use outside the certificate is its own exclusion, and the sharing economy is where it now bites. Peer-to-peer hiring out of the car is usually excluded from a personal policy. The platforms answer that with a separate policy for the rental period, which replaces the renter’s own insurance and protects the owner. A lift for a neighbour, with no profit, should still be inside the policy. Taking people to a different workplace starts to move the use from social, domestic and pleasure into commuting or business, and that has to have been asked for.",
        ],
      },
      {
        id: "s1b",
        heading: "Motorcycle insurance",
        hold: "A motorcycle is any cycle propelled mechanically, mopeds included. The policy is for one specified machine.",
        paras: [
          "The Road Traffic Act 1988 applies, and the four levels of cover are the same as for a car, so the chapter does not repeat them. What changes is the shape of the comprehensive wording. Accessories and spare parts are not covered for theft unless the motorcycle itself is stolen at the same time. Liability indemnifies the insured, or their personal representatives if they have died, other people allowed to ride, and users for social, domestic and pleasure. There is no personal accident benefit, no medical expenses beyond the emergency treatment fee, and no personal effects.",
          "Extensions, for an extra premium, are a trailer on a solo machine; riding other motorcycles, which is usually left out on a modest bike and is being withdrawn in the same way as driving other cars; and a discount for insuring more than one machine with the same insurer. Mobility vehicles, including class 3 invalid carriages, scooters and powered wheelchairs, have been written on motorcycle policies. Insurance is recommended and is not compulsory. Specialist policies exist for accidental damage, theft, third-party liability, personal accident, and breakdown. The limitations are the same as on a private car.",
        ],
      },
      {
        id: "s1c",
        heading: "Commercial motor insurance",
        hold: "The policy is about the vehicle. Goods on it are goods in transit, a different class. A limit exists because of what these vehicles can hit.",
        paras: [
          "The vehicles in this section are goods-carrying vehicles, which are the largest group; passenger-carrying vehicles such as hire cars, buses and coaches; agricultural and forestry vehicles; and special types — ambulances, cranes, fork-lifts. The insurance is about the vehicle while it is driven, parked, or carried by sea or air between parts of the UK. It does not insure the load.",
          "Most insurers use one commercial wording and amend it for the vehicle. Some issue a separate policy for agricultural and forestry vehicles and for certain special types. The levels of cover are the same four. Injury is still unlimited. Third-party property, which is £20 million on a private car, is usually something like £5 million here, and for general haulage the standard offer can be as low as the £1.2 million compulsory floor. Higher limits are sold. Loading and unloading is inside the third-party cover, and for the driver or attendant it extends past the edge of the road. Anyone may drive on the insured’s order or with permission. Someone may use the vehicle for social, domestic and pleasure without being the driver. Passengers are covered for their own negligent acts. Legal costs follow the private-motor pattern. Loss or damage covers the vehicle and the spare parts and accessories while they are on it. Unlike a private car, parts that have been taken off are not covered. Trailers: third-party cover while attached is now standard, and some policies make that comprehensive. A disabled vehicle being towed is usually third party only, so the towed vehicle and its goods are not covered, though some insurers now give comprehensive cover to that broken-down vehicle while it is attached. Two private-car benefits are simply left out. Driving other vehicles is omitted because the range is too wide. Personal accident, medical expenses, and clothing are not in the standard commercial wording.",
          "Extensions, usually for a premium, include a higher property limit; medical expenses or personal accident, which is rarely asked for; belongings for a long-distance driver; windscreen cover if it is missing or thin; indemnity to a hirer, either free where the negligence is the insured’s or their employee’s while the hirer has the vehicle, or for a premium where the hirer’s own negligence is covered; indemnity to a principal where a contract requires it; carnival floats, which must be notified and may be loaded; sheets and ropes, which are easily stolen and are usually covered only if locked on the vehicle, or else under goods in transit; loss of use up to 80% of the leasing or hire charges after accidental damage, fire or theft in Great Britain and Western Europe, dearer for Western Europe and for young drivers; and tools in transit, usually only on comprehensive, meaning non-powered hand tools, or tools of the trade that fit the business on the schedule. The general exclusions match the private car, except use: the insurer is not liable if the vehicle is used other than as the schedule says, or if it is racing, pace-making, on a reliability trial, or speed testing.",
        ],
      },
    ],
  },
  {
    chapter: 2,
    title: "Health insurance",
    lo: "1.1",
    weight: "Study text sections A and B. Two products. One pays a benefit. One pays for treatment.",
    blocks: [
      {
        id: "s2a",
        heading: "Personal accident and sickness insurance",
        hold: "This is a benefit policy, not indemnity. The sum is paid if the contingency happens, whether or not there was a financial loss. There is no contribution between benefit policies.",
        paras: [
          "The policy is annual. Occupation is the main rating factor for the accident section and not for the sickness section. Insurers put occupations into classes and price the accident risk from the class. Cover is often sold in units, and the proposer buys as many as their earnings will support. Weekly benefit is kept near normal earnings. The reason is not a suspicion that the person will injure themselves. It is that a genuine claimant may stay off work if the benefit beats wages. That is why the proposal asks about other policies: the insurer adds the weekly benefits together. The same cover is sold on its own and as an add-on to travel, motor and household.",
          "Accident means an identifiable, fortuitous cause, and there is a time limit from the accident to the result the policy names. Some wordings require the injury to cause death or disablement independently of any other cause. Capital sums pay for death and for specified injuries. Weekly benefit, commonly up to 104 weeks, pays for temporary total disablement. Some insurers pay a reduced weekly amount for temporary partial disablement. Permanent total disablement is usually a capital sum, less often a ten-year annuity.",
          "Sickness pays a weekly benefit, again commonly up to 104 weeks, if the person cannot do their usual occupation. It is normally subject to a seven-day franchise. Ill for less than seven days, nothing is paid. Ill for longer, the whole period is paid, including those seven days. A franchise is a threshold. An excess would have been sliced off every claim. Sickness that shows itself in the first 21 days is generally excluded, so the insurer is not picking up an illness that had already started. Death, where it is covered, often has to happen within twelve months of the event. A capital sum can start around £20,000. Loss of sight means total and irrecoverable loss. The same sum is often paid whether one eye or both are lost, though some insurers now pay more for both. Loss of a limb is usually only if it happens within 12 or 24 months, and some wordings include loss of use. Again the sum is often fixed however many limbs are lost, with some insurers paying more for both. Permanent total disablement may not be paid until 12 or 24 months have passed, because that is how long it takes to know it is both permanent and total. Permanent partial disablement is not standard. Where it is sold, it is a percentage of the capital sum for specified parts, such as a finger or a toe, on a scale below the loss of the whole limb. Temporary total disablement is a weekly benefit, for example £200, for up to 104 weeks, or a higher weekly figure for only 52. Temporary partial disablement is accident only, not sickness: the person cannot do a substantial part of their normal business. The weekly figure has traditionally been about 40% of the total-disablement benefit. Medical expenses on this policy are the cost of treatment after an accident: a qualified practitioner, appliances, hospital, nursing home and ambulance. They are not the separate healthcare product in the next section.",
        ],
      },
      {
        id: "s2b",
        heading: "Medical expenses insurance",
        hold: "Also called healthcare insurance. It pays for private treatment outside the NHS. It does not pay because someone cannot work, and it does not cover long-term residential care.",
        paras: [
          "The point of the policy is choice: which consultant, which hospital, and when. Employers often buy it for staff, or for a group of staff, as a benefit of the job. Unlike personal accident, where the premium stays fairly flat across the ages the insurer will accept, this premium tends to rise as the person gets older.",
          "In-patient cover pays hospital charges (theatre, dressings, consultations), specialist fees (surgeon and anaesthetist), and extra costs such as an ambulance and nursing. Day care is available on a similar basis. There is not a standard policy with optional extensions. There is a range of standalone policies. The expensive one is generous. The cheap one limits the hospital accommodation and can require the person to use the NHS if the treatment can be done within, say, six weeks of diagnosis. Conditions treated in the five years before the application are usually excluded.",
        ],
      },
    ],
  },
  {
    chapter: 3,
    title: "Package policies",
    lo: "1.1",
    weight: "Study text sections A–C. Household, travel, and commercial packages. There is no single standard household wording.",
    blocks: [
      {
        id: "s3a",
        heading: "Household insurance",
        hold: "Buildings are what you would leave behind. The buildings sum insured is the cost of rebuilding, at the moment the rebuilding is finished. New for old is not indemnity.",
        paras: [
          "The home, and the things in a rented home, are why this policy exists. It covers buildings and contents against fire, extra perils and theft, plus valuables, personal effects and public liability, with optional extensions. Some of those extensions have grown into policies of their own. Others have been added because of how people now live and work. Settlement, where the thing cannot be repaired, is one of two promises. Indemnity, or market value, deducts wear and tear and pays for a replacement of the same age and condition. It is rarely chosen now, and some insurers do not offer it. New for old, or reinstatement, pays the cost of a new replacement. Wear and tear is still deducted for clothing and household linen, and a deduction can also be made if the sum insured is too low or the property is over a stated age, such as five years.",
          "There is no such thing as one standard household policy. Insurers sell a full package or a thinner one with extras, often branded as standard and standard-plus, with different limits. The chapter concentrates on the cover most of them give: buildings and contents. An overall excess, or a different excess for each contingency, is normal.",
          "Buildings means the structure of the private dwelling, including garages, sheds, greenhouses and other outbuildings, swimming pools, tennis courts, walls, gates, fences and paths. The working test is what you would normally leave behind when you move: a fitted kitchen, electrical fittings, double glazing. Wordings also commonly name the house with its garage and outbuildings, landlord’s fixtures and fittings, patios, terraces, footpaths and drives, and hedges. Perils are not identical across insurers. The ones the chapter walks through include fire, lightning, explosion and earthquake; riot, civil commotion, strikes, labour or political disturbances, malicious damage and vandalism, which usually stop if the building is unfurnished or unoccupied for more than 30 or 60 days in the year, and malicious damage usually needs both an excess and a report to the police; storm or flood, which excludes frost, subsidence, heave and landslip, and damage to gates, fences and hedges, and always carries an excess; falling trees or branches, which excludes walls, gates, fences and hedges; and then escape of water, escape of oil, theft, impact, subsidence, aerials, accidental damage to underground services, breakage of glass and sanitary fittings, fees and debris removal, loss of rent, and an accidental-damage extension. Contents has its own limits, some automatic extra cover, its own optional extensions and its own exclusions. Legal liability can arise from the building or from the contents. Optional extensions, bought on top, include personal possessions, money and credit cards, bicycles, freezer contents, caravans, small craft, sports equipment, personal accident and hospital cash and creditor insurance, domestic animals, legal expenses, identity fraud, and personal cyber.",
        ],
      },
      {
        id: "s3b",
        heading: "Travel insurance",
        hold: "There is no standard travel wording. Figures in this section are what the market tends to do, not a tariff. Single-trip cover is usually for three months at most. Annual multi-trip exists for people who travel often.",
        paras: [
          "The risks start before the journey: cancellation, injury, death, medical bills, lost possessions, and liability to other people, in the UK or abroad, holiday or business. Most policies are sold in two or three levels with different limits. Personal accident is usually a benefit somewhere between £10,000 and £30,000 for death, loss of eyes or limbs, or permanent total disablement. The death benefit is usually cut for a child under 16. Some insurers add a weekly benefit. Winter sports, water-skiing, pot-holing and mountaineering are excluded unless they are bought back or insured on their own. Medical expenses cover treatment, extra hotel and travel, the cost of bringing the patient home (including an air ambulance), and extra expenses of someone in the party. The other usual sections are loss of deposits, baggage and personal effects and money, personal liability, delayed baggage, hospital cash, travel interruption and travel delay.",
        ],
      },
      {
        id: "s3c",
        heading: "Commercial insurance",
        hold: "A package exists for a small trade that needs several classes in one wording. A large risk, or a risk one insurer cannot write well, is still better as separate policies. The building is often rated on its own because the package is priced off the trade.",
        paras: [
          "A shopkeeper or a small hotel faces fire, interruption, theft, money, glass and liability together. The package puts those in one policy, tailored to the trade, and often wider than a generic wording. Rating for a shop is usually geared to the contents sum insured, so the fabric of the building is insured or at least rated separately. Almost everything in the premises is covered, including stock. Wines, spirits and cigarettes are often capped, and the cap can be lifted for a premium. A percentage uplift for seasonal stock is often automatic. Fixtures, fittings and internal decorations the tenant is responsible for are included, unless the insured owns the building, in which case buildings cover has to be arranged, though some packages can be extended to include it. Limits differ a lot between insurers. The figures in any one wording are examples of the market, not the market. Cyber and data privacy is a common optional extension.",
        ],
      },
    ],
  },
  {
    chapter: 4,
    title: "Property insurance",
    lo: "1.1",
    weight: "Study text sections A–E. These are the commercial property classes, built up peril by peril. Household perils were in chapter 3.",
    blocks: [
      {
        id: "s4a",
        heading: "Fire and special perils insurance",
        hold: "Unless it is already inside a package, a standard fire policy is the base of most business property insurance. Special perils are added. The cover is built, not pre-packed.",
        paras: [
          "The policy compensates for damage to buildings, stock and other contents. In commercial business it is normal to add named perils rather than to buy a household-style bundle. All-risks cover exists and is increasingly used, but it is the next section. Standard fire is three things. Fire, but not explosion resulting from fire, not earthquake or subterranean fire, and not the property’s own spontaneous fermentation or heating, or a process that applies heat. Spontaneous fermentation takes out the item that ignited by itself. If that fire then spreads to other insured property, the spread is still covered. Lightning is listed on its own, so there does not have to be a fire: lightning damage is covered as lightning. Explosion is not fire. The standard policy only gives a limited explosion cover, restricted to boilers and similar plant used for domestic purposes, and to gas used for lighting or heating the building. The ABI published a recommended Standard Fire and Special Perils Policy for material damage. In that wording, DAMAGE in capitals means loss, destruction or damage to the property insured. Everything else — storm, flood, escape of water, impact, riot, malicious damage, earthquake, sprinkler leakage, subsidence — is a special peril that is added.",
        ],
      },
      {
        id: "s4b",
        heading: "All risks insurance",
        hold: "The name over-promises. It is accidental loss or damage unless the wording excludes it. It is an improvement on fire and special perils, not cover against every risk.",
        paras: [
          "Customers wanted a wider policy than one built by adding perils. The ABI recommended wording is the Standard All Risks Policy for material damage. Where fire and special perils lets you choose perils, each with its own exclusions, all risks covers accidental loss, destruction or damage to the property insured. It is recoverable if it was accidental so far as the insured is concerned and the cause is not excluded. There are no optional extensions: anything not excluded is already in. The exclusions are long, because insurers will not take what a fire policy already refuses, and they fall into groups: absolute exclusions (war, nuclear, terrorism, Northern Ireland, pollution, marine, property more specifically insured, consequential loss, and trade risks such as faulty workmanship); gradually operating causes such as rust, corrosion and change in temperature, which are only written with care; and the rest of the list on the wording in front of you.",
        ],
      },
      {
        id: "s4c",
        heading: "Theft insurance",
        hold: "The Theft Act 1968 is wider than a business theft policy. The Act does not require force. The policy does.",
        paras: [
          "The property is the same sort of contents as a fire policy, not the building itself, except that damage to the building during a theft or attempt is covered if the insured has to repair it, usually up to a limit. Fire wordings rarely split stock. Theft wordings always do, with specific sums for the stock thieves want. There is no ABI standard theft wording, unlike fire and all risks, but insurers do not differ much. A typical operative clause is theft involving entry to or exit from the premises by forcible and violent means. Violence here means violence to property, not necessarily to a person, and it need not be extreme. A tighter wording excludes entry by a key, by a trick, or by hiding while the premises are open. If the person then has to force a way out, cover can still apply. Keys taken by threats or force against directors, employees or their families are usually covered. The Act’s own definition — dishonest appropriation with intent to permanently deprive — would include shoplifting, which this policy is built to leave out. Household theft, in chapter 3, follows the Act and does not add a force requirement. Do not mix the two.",
        ],
      },
      {
        id: "s4d",
        heading: "Glass insurance",
        hold: "Fixed glass, on an all-risks basis, almost always settled by replacement. Fire, lightning and explosion are left to the fire policy.",
        paras: [
          "This is not only plate glass. It includes sheet, silvered, wired and ornamental lettered glass. The standard cover is destruction or damage to all fixed glass: windows, doors, fanlights, showcases, mirrors and glazed partitions, plus the cost of boarding up until the glass is replaced. Scratching and chipping are usually excluded. Alarm foil, lettering and display on the glass are in, and so is damage to the frame. The insurer may repair, replace, reinstate or pay cash, and in practice it replaces, through a glazing firm it has an arrangement with. Optional extras, for a premium, are damage to shopfront contents from the broken glass, and washbasins and sanitary fittings in a hairdressing salon. Fire, lightning and explosion are excluded because they belong on the fire policy. An excess in the region of £50 is a common way of keeping small claims off the policy. A motor windscreen is chapter 1, not this.",
        ],
      },
      {
        id: "s4e",
        heading: "Money insurance",
        hold: "Money is attractive and easy to steal, so it has its own policy, written as all risks of loss or theft. The definition is wider than notes and coins.",
        paras: [
          "Each insurer’s definition differs, and it is a long list. It always includes cash, bank and currency notes, cheques, postal and money orders, postage stamps, national insurance cards and luncheon vouchers. Cover is on an all-risks basis. Limits still change with where the money is: in a safe, on the premises, or in transit. A theft of stock is the theft section. Dishonesty by an employee is not solved by calling it money.",
        ],
      },
    ],
  },
  {
    chapter: 5,
    title: "Pecuniary insurance",
    lo: "1.1",
    weight: "Study text sections A and B. The loss is money: legal costs, or earnings after damage. It is not the property policy.",
    blocks: [
      {
        id: "s5a",
        heading: "Legal expenses insurance",
        hold: "It pays legal costs. It does not pay the damages. Civil claims, not prosecutions by the state. Bought before the event, or after the event, are different policies.",
        paras: [
          "The purpose is indemnity for the cost of legal advice, or of pursuing or defending a civil action. A civil action is not a criminal prosecution. The state prosecutes crimes and punishes. A civil claim is one party seeking redress: compensation, or something like an injunction. The cover began for individuals in consumer and domestic disputes, often as an extra on a home or motor policy, and it now extends to companies. Insurers commonly outsource the cover, and the helpline, to a specialist.",
          "A before-the-event policy is bought in case a dispute happens later. An after-the-event policy is bought once the person has already decided to sue or defend, and it covers the other side’s costs. After-the-event policies are usually standalone. The chapter then concentrates on commercial policies. There are two. A group legal benefit policy covers a group with a common purpose, such as employees and their immediate families, and where an employer buys it, it is a staff benefit. The member chooses among employment, personal, motor and conveyancing. Employment includes defending a claim arising out of the job, awards under legislation such as the Equality Act 2010, and the cost of claiming for wrongful dismissal, discrimination, or an injury at work. A commercial legal protection policy covers the firm as employer, manufacturer, property owner or trader. Employment legislation is why the firm needs it. On top of the legal costs, it can pay for the insured’s and the employees’ time in court. Cover is limited per claim. There is no overall limit for the year.",
        ],
      },
      {
        id: "s5b",
        heading: "Business interruption insurance",
        hold: "Property insurance rebuilds the thing. Business interruption pays the earnings that thing was going to produce, and the extra cost of keeping the trade going. No material damage, no standard interruption claim.",
        paras: [
          "After a fire, a property policy that is adequate puts the building and contents back. It does not pay for the fact that the business could not earn while that was happening. That future loss cannot be counted on the day of the fire. It is counted when the earning power returns, by reinstatement or by some other route. The extra money spent immediately to keep turnover up is part of the same loss. The names for it are time loss, consequential loss, and loss of profits. The policy pays the loss of earnings and those additional expenses. The sum insured is built from turnover or from gross profit, not from the rebuild cost. The material damage warranty is the hinge: the interruption claim depends on a valid claim for the damage itself.",
          "The chapter is explicit about disease and denial of access, because of COVID-19. Some wordings extend to denial of access where the surrounding property is not itself damaged, and to illness, and to action by a public authority. The disease usually has to be a human disease, notifiable, and often it has to be on a list in the wording. Those extensions do not pay the full business-interruption sum insured. They pay a much smaller amount. The wordings differ between insurers. The FCA took a test case to settle a set of those wording arguments. Do not treat a disease question as an ordinary fire-follows-damage claim.",
          "Standard perils and special perils on the interruption policy follow the property policy. All-risks and engineering are further ways of writing the same interruption cover. Optional extensions exist. The indemnity period is the length of time the policy will pay. It is not ‘until renewal’.",
        ],
      },
    ],
  },
  {
    chapter: 6,
    title: "Liability insurance",
    lo: "1.1",
    weight: "Study text sections A–H. Employers’ liability and motor are the two compulsory liability classes. The others are specific or open, and the trigger differs.",
    blocks: [
      {
        id: "s6a",
        heading: "Employers’ liability insurance",
        hold: "Compulsory in Great Britain under the Employers’ Liability (Compulsory Insurance) Act 1969. The legal minimum is £5 million. Insurers have written £10 million since January 1995. Injury or disease, arising out of and in the course of employment. Not the employee’s property.",
        paras: [
          "If you are negligent you can be made to pay damages and costs to the person who proves the injury came from that negligence. An employer’s version of that risk is injury to an employee, and the policy exists so that a lost case, or the settlement that is negotiated in the shadow of earlier awards, is paid by the insurer. Most claims never reach a hearing. The 1969 Act requires employers in Great Britain, with stated exceptions, to insure against bodily injury or disease sustained by employees arising out of and in the course of employment in the business. A certificate used to have to be displayed at each place of business. The 2008 amendment regulations, from 1 October 2008, removed that. An electronic copy is enough if employees can reasonably get at it. The 1998 regulations raised the minimum limit from £2 million to £5 million. Disease and some accidents take years to appear. The employer may have changed insurer, been taken over, or stopped trading, and the insurer may have done the same. The old tracing service of 1999 was replaced in 2011 by the Employers’ Liability Tracing Office, an industry body with an online enquiry. From April 2012 the FCA has required ELTO members to put policy details, and the historic records a claim may trigger, on the Employers’ Liability Database. Every employer gives the insurer an employer reference number. That number stays attached to that employer at that time even if the firm is taken over, stops trading, or moves tax office. There is no single standard wording. Policies define who counts as an employee. Because the cover is compulsory, insurers cannot simply cut the liability away from the injured employee, but they can recover from the employer where the policy allows it.",
        ],
      },
      {
        id: "s6b",
        heading: "Public liability insurance",
        hold: "An open policy. Employers’ liability, products and professional indemnity are specific. Public liability is what is left once those, and the other exclusions, are taken out.",
        paras: [
          "It indemnifies the business for legal liability to the public for injury, death, disease or illness, and for loss of or damage to property, in connection with the business and during the period of insurance. Damages include the claimant’s costs. The liability is not only negligence, though negligence is most of the claims. Nuisance, trespass and liability under statute are in the same phrase. The business may injure someone with its premises, a sign, goods left outside, or a trap-door. Optional extensions and a long exclusion list then put employees back to employers’ liability, products to the products section, advice to professional indemnity, and motor to motor.",
        ],
      },
      {
        id: "s6c",
        heading: "Product liability insurance",
        hold: "Injury or damage from goods supplied, happening during the period. Usually written with the public liability policy, not as a policy on its own. A yearly aggregate normally caps the whole year.",
        paras: [
          "Manufacturers, intermediaries and retailers can all be liable for injury, illness or damage from goods they supply: bad design, faulty manufacture, misuse, poor instructions, contamination, or damage before supply. The standard cover is legal liability for bodily injury or property damage during the period of insurance, arising out of goods the insured manufactured, constructed, altered, repaired, serviced, treated, sold, supplied or distributed. A third party’s consequential loss is covered only when it flows directly from injury or damage the insured is legally liable for. It is usual to set a yearly aggregate for all injury and damage in the period, often the same figure as the any-one-occurrence limit. Public-liability exclusions apply, and so do contractual liability, damage to the goods supplied, faulty design or formula, and unsuitability or failure to perform. A product that simply stops working, with nobody hurt and nothing else damaged, is an extended warranty, not this.",
        ],
      },
      {
        id: "s6d",
        heading: "Directors’ and officers’ D&O insurance",
        hold: "Two promises. The director’s own liability, when the company will not indemnify them. And the company’s liability, when it is allowed to indemnify them. The basis is claims made.",
        paras: [
          "At common law a director’s first duty is to the company, not to the shareholders. The Companies Act 2006 requires honesty, good faith, and reasonable care and skill, and it sets duties to the company, shareholders, employees, creditors and the public: act within powers, promote the success of the company, exercise independent judgment, take reasonable care, avoid conflicts, not take benefits from third parties, and declare an interest in a proposed transaction. The policy then does two jobs. It covers directors and officers in their personal capacity when they cannot claim an indemnity from the company. It covers the company where the company is allowed to indemnify them, for example by repaying defence costs. Benefits include allegations of negligence, manslaughter and health and safety claims, breach of trust, breach of duty, breach of warranty of authority, defamation and negligence, and the cost of representation at official investigations. Claims made means a claim notified to the insurer or the insured during the period, regardless of when the underlying event happened. Exclusions include circumstances that were known before inception, prior and pending litigation, a jurisdiction clause that may apply English law and shut out the United States or Canada, bodily injury and property damage, pollution, improper personal gain, fraud or dishonesty, insured-versus-insured claims, breach of professional duty (that is professional indemnity), and fines, penalties and punitive damages.",
        ],
      },
      {
        id: "s6e",
        heading: "Professional indemnity insurance",
        hold: "A claim that injury or loss came from the professional’s actions or advice. In common with directors’ and officers’ cover, it is claims made. Dishonesty of the insured is excluded. So is what belongs on public liability.",
        paras: [
          "Public liability does not answer a client who lost money because the advice was wrong. This policy does. The basis is claims made: the claim is notified in the period. Risks that are the subject of a public liability policy are excluded, and so, possibly, are claims arising outside the UK. Dishonesty of the insured is a usual exclusion. A burned carpet is not this. A negligent survey is not public liability.",
        ],
      },
      {
        id: "s6f",
        heading: "Trustee insurance",
        hold: "Pension fund trustees and charity trustees are separate sections. Pension trustee cover, like professional indemnity, is always claims made.",
        paras: [
          "The Pensions Act 1995 and the regulations under it put wide duties on pension trustees. A trustee can be personally liable for their own failure and for another trustee’s. They can also face a civil penalty from The Pensions Regulator, and they are expected to report irregularity in how the employer or its advisers carry out those duties. The policy is for internal maladministration of the fund: court awards against the trustees, losses to the fund and the employer, and defence costs. A wrongful act is, in essence, a breach or alleged breach of duty or trust, neglect, error or omission. Charity trustees are the other half of the section, with their own limits. Neither wording is employers’ liability, and neither is directors’ and officers’ cover.",
        ],
      },
      {
        id: "s6g",
        heading: "Cyber insurance",
        hold: "Property, pecuniary and liability, from cyber events. Ordinary policies were not built for this, and some now exclude it. There is no standard cyber wording.",
        paras: [
          "The risk is an attack that watches, blocks, steals or destroys a system, for advantage, for a ransom, or as activism, plus the personal-data duties under the UK GDPR and the Data Protection Act 2018. The ABI has described the cover as a business essential. Most policies pay for damage to or loss of information on the systems, and also for managing the incident, because the reputation and the regulator are part of the loss. Home working has made the same point for individuals. First-party pieces include digital assets, network downtime and incident costs, cyber extortion, reputational damage, and theft of funds. Third-party pieces include another party’s data, including data stored with someone else, transmitting malware, regulatory action and fines, breach notification, and defamation or infringement of intellectual property. Read the exclusions on the wording in front of you. They are not uniform.",
        ],
      },
      {
        id: "s6h",
        heading: "Extended warranties",
        hold: "The maker’s guarantee is usually twelve months. This insurance stretches the repair promise, often up to five years. A television that catches fire is products or household. A television that fails in month fourteen is this.",
        paras: [
          "It is sold to people buying consumer durables, usually electrical. Cover is free repair after an electrical or mechanical defect. Retailers market it. Some credit cards give a version free when the appliance is bought on the card. The risk is underwritten by an authorised insurer or a Lloyd’s syndicate. Some policies cover every electrical item in the house rather than the one receipt. The premium may be annual or a single premium for the five years. A typical sum insured is £2,500 in the period, for parts and labour. If the item is beyond economic repair inside five years of purchase, some insurers replace it with the nearest current model. Repairs often have to be done by the supplier. Exclusions include ignoring the maker’s instructions or handling the item negligently, risks a household contents policy would already cover, war, and the cost of bulbs, aerials, external wires, knobs, handles and drive belts. Household contents does not make this policy unnecessary, because contents responds to insured perils, not to a motor that simply wears out.",
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
    title: "Underwriting procedures and premium payment",
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
        hold: "The contract starts when the insurer has accepted, terms are agreed, and the policyholder has paid or agreed to pay. The policy is evidence of that contract. It is not the contract. Losing the paper does not end the cover.",
        paras: [
          "A policy is issued so both sides can see what was agreed: the cover, the period, the exclusions, the conditions and the premium. Contract certainty asks for the actual policy within seven working days of inception or renewal for a consumer, and within thirty days for a commercial customer. Until that document exists, a cover note is the temporary evidence that cover has been granted — a printed form or a letter — and it is replaced when the policy, and any certificate, is issued. Typical reasons for a cover note are a survey still to be done, a proposal form still to arrive, or a new driver added while a declaration of age, experience and convictions is outstanding.",
          "Insurance premium tax is a tax on the premium, not a rating factor. It applies to most general insurance where the risk sits in the UK. It does not tell you whether the loss is covered. Learning outcome 3 is about two questions long. Be able to say rate times base, flat versus adjustable, gender out, acceptance plus payment or an agreement to pay, and that the tax exists. Then go back to the chain.",
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
    title: "Valid claims and claims settlement",
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
    title: "Confidential information, technology and data protection",
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
