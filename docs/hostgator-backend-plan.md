# HostGator Backend Plan

This project uses a React/Vite frontend and will use a HostGator-friendly backend for production accounts, listings, and buyer inquiries.

## Recommended Architecture

```txt
React / Vite frontend
  -> PHP API endpoints in /api
  -> MySQL database through cPanel / phpMyAdmin
```

This is a practical setup for typical HostGator shared hosting plans because PHP and MySQL are commonly available through cPanel.

## Important Security Note

The current frontend local account flow is only for MVP demos.

Do not treat browser localStorage accounts as production authentication. Real user accounts should be handled by the backend with hashed passwords, database records, server-side validation, and secure session handling.

## Account Model

Users should have one account and an active role.

A user can switch between:

- Buyer
- Seller

This avoids forcing users to create separate buyer and seller accounts.

## Main Database Tables

### users

Stores account identity and the user's currently active role.

Fields:

- id
- name
- email
- password_hash
- active_role
- created_at
- updated_at

### vehicle_listings

Stores seller vehicle pages.

Fields:

- id
- seller_id
- year
- make
- model
- trim
- mileage
- price
- title_status
- condition_summary
- known_issues
- location
- contact_preference
- status
- created_at
- updated_at

### buyer_inquiries

Stores buyer interest and qualification responses.

Fields:

- id
- listing_id
- buyer_id
- buyer_name
- buyer_email
- buyer_phone
- readiness
- financing_status
- offer_amount
- message
- created_at

## API Endpoint Plan

Place backend files under:

```txt
public_html/api/
```

Recommended endpoints:

```txt
api/register.php
api/login.php
api/logout.php
api/me.php
api/switch-role.php
api/create-listing.php
api/update-listing.php
api/listings.php
api/listing.php
api/buyer-inquiry.php
api/seller-leads.php
```

## Role Behavior

### Buyer Mode

Buyer mode should allow the user to:

- Browse vehicle listings
- Save or inspect listings
- Submit buyer inquiry forms
- Track inquiries sent

### Seller Mode

Seller mode should allow the user to:

- Create vehicle seller pages
- Edit listing details
- View buyer inquiries
- Track serious buyer leads
- Access seller scripts and scam checklists

## Development Phases

### Phase 1 — Demo Auth

- Use localStorage-based frontend accounts
- Allow users to choose Buyer or Seller
- Allow role switching from account page
- Use mock listings and mock leads

### Phase 2 — HostGator PHP/MySQL Backend

- Create MySQL database in cPanel
- Add tables from `database/schema.sql`
- Add PHP API endpoints
- Connect React frontend to the API

### Phase 3 — Production Hardening

- Add password hashing with PHP `password_hash`
- Add login verification with `password_verify`
- Add server-side validation
- Add rate limiting where possible
- Add HTTPS-only deployment
- Add input sanitization
- Add prepared SQL statements
- Add file upload controls for vehicle photos

## Deployment Notes

1. Run the React build:

```sh
npm run build
```

2. Upload the contents of `dist` to HostGator `public_html`.

3. Upload PHP API files to:

```txt
public_html/api/
```

4. Create the MySQL database in cPanel.

5. Import `database/schema.sql` through phpMyAdmin.

6. Create a private backend config file for database credentials.

Never commit live production database passwords to GitHub.
