# Unfilteredqa

Unfilteredqa is a productized vehicle seller page service built by Viridian Network LLC.

The first revenue target is simple: help private vehicle sellers filter serious buyers, reduce wasted messages, and build trust before a sale begins.

Instead of trying to launch a full marketplace immediately, this project starts as a manual service backed by a reusable web app foundation.

## Core Offer

Unfilteredqa creates clean vehicle listing pages with structured buyer inquiry forms, seller trust signals, FAQs, contact buttons, and buyer seriousness questions.

The goal is to give a seller one shareable page they can post on Facebook Marketplace, Craigslist, OfferUp, text messages, QR codes, or local groups.

## Offer Tiers

### Starter — $49 one-time

Includes:

- One vehicle listing page
- Structured buyer inquiry form
- Seller trust section
- FAQ section
- Contact button
- Buyer seriousness questions

Best for sellers who need a simple, clean page that filters low-effort buyers.

### Better — $99 one-time

Includes everything in Starter, plus:

- Cleaner page design
- Shareable QR code
- Buyer response tracker
- Copywriting for the listing
- Facebook Marketplace / Craigslist description rewrite

Best for sellers who want a stronger listing presentation and a better way to manage buyer interest.

### Premium — $199 one-time

Includes everything in Better, plus:

- Buyer qualification script
- Negotiation prep
- Scam warning checklist
- Seven days of listing support

Best for sellers who want help handling messages, avoiding scams, and negotiating with more confidence.

## Target Customer

Primary niche:

- Private vehicle sellers
- People selling used cars, trucks, motorcycles, work vehicles, or project vehicles
- Sellers who are tired of lowball offers, fake buyers, repeated questions, and no-shows

Secondary future niches:

- Equipment sellers
- Trailer sellers
- Small local marketplaces
- Service businesses that need customer intake pages

## Problem

Private sellers waste time dealing with:

- “Is this available?” messages
- Lowball offers
- No-shows
- Scam attempts
- Repeated questions
- Unclear buyer intent
- Lack of trust before meeting in person

## Solution

Unfilteredqa gives sellers a structured vehicle page that helps buyers answer important questions before contacting the seller.

A strong seller page can include:

- Vehicle details
- Price and negotiation notes
- Condition summary
- Maintenance notes
- Known issues
- Seller credibility signals
- Common questions
- Buyer inquiry form
- Serious buyer questions
- Contact instructions
- QR code for easy sharing

## Manual Delivery Model

This is not a SaaS product yet.

The first version is a productized service:

1. Find a seller who needs help.
2. Collect vehicle details and photos.
3. Build or configure their vehicle listing page.
4. Add inquiry questions and trust signals.
5. Provide a shareable link and/or QR code.
6. Help the seller use the page in their existing marketplace posts.
7. Use feedback to improve the reusable app.

This allows the project to generate revenue before the full platform is automated.

## Seller Intake Questions

Use these questions to build a page for each seller:

### Vehicle Details

- Year, make, and model
- Trim level
- Mileage
- VIN, if the seller is comfortable sharing it
- Title status
- Asking price
- Location or general pickup area
- Transmission type
- Fuel type
- Exterior and interior color

### Condition

- Overall condition
- Known mechanical issues
- Recent repairs or maintenance
- Tire condition
- Brake condition
- Accident history, if known
- Warning lights on the dash
- Any leaks, noises, or drivability concerns

### Seller Trust Signals

- Reason for selling
- How long the seller has owned it
- Maintenance records available
- Clean title status
- Willingness to meet in a safe public location
- Whether test drives are allowed
- Preferred payment method

### Buyer Qualification

- Are you ready to buy within the next 7 days?
- Do you have cash, financing, or trade-in plans?
- Have you reviewed the known issues and condition notes?
- What time are you available to see the vehicle?
- Are you asking full price, making an offer, or requesting more information?

## Sales Message

Example outreach message:

```text
Hey, I’m building a service that helps private vehicle sellers avoid time-wasters and filter serious buyers.

I can create a clean vehicle page for your car with photos, details, FAQs, trust signals, and a short buyer form so people answer the important questions before messaging you.

I’m offering the first few pages for $49 while I build my portfolio. Would you want me to make one for your listing?
```

## 30-Day Revenue Goal

Conservative target:

- 5 Starter pages at $49 = $245
- 2 Better pages at $99 = $198
- Total: $443

Strong target:

- 10 Starter pages at $49 = $490
- 5 Better pages at $99 = $495
- 1 Premium page at $199 = $199
- Total: $1,184

Aggressive target:

- 15 Starter pages at $49 = $735
- 10 Better pages at $99 = $990
- 3 Premium pages at $199 = $597
- Total: $2,322

## Product Roadmap

### Phase 1 — Productized Service

- Build pages manually
- Use static templates
- Collect seller feedback
- Track which sections help sellers most
- Close first paid customers

### Phase 2 — Semi-Automated Tool

- Add reusable vehicle listing templates
- Add form submission handling
- Add seller dashboard or Google Sheets tracking
- Add QR code generation
- Add lead quality scoring

### Phase 3 — Hosted Seller Platform

- Seller accounts
- Multiple listings per seller
- Paid checkout
- Automated page generation
- Buyer response dashboard
- Marketplace-style discovery features

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS

## Local Setup

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

## Production Build

Create the production build:

```sh
npm run build
```

The generated static site will be written to `dist`.

## HostGator Deployment

1. Run `npm run build`.
2. Open the generated `dist` directory.
3. Upload the contents of `dist` into HostGator `public_html`.

Upload the files and folders inside `dist`, not the `dist` folder itself.

The `public/.htaccess` file is included so Vite/React client-side routes resolve through `index.html` on Apache/cPanel hosting.
