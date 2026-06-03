CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    active_role ENUM('buyer','seller') DEFAULT 'buyer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE vehicle_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    year INT,
    make VARCHAR(100),
    model VARCHAR(100),
    trim_level VARCHAR(100),
    mileage INT,
    price DECIMAL(12,2),
    title_status VARCHAR(100),
    condition_summary TEXT,
    known_issues TEXT,
    location VARCHAR(255),
    contact_preference VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

CREATE TABLE buyer_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    buyer_id INT NULL,
    buyer_name VARCHAR(255),
    buyer_email VARCHAR(255),
    buyer_phone VARCHAR(50),
    readiness VARCHAR(100),
    financing_status VARCHAR(100),
    offer_amount DECIMAL(12,2),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES vehicle_listings(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);
