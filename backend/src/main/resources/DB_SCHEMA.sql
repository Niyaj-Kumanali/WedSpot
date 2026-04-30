CREATE TABLE users (
       id              BIGSERIAL       NOT NULL PRIMARY_KEY,
       name            VARCHAR(255),
       email           VARCHAR(255)    NOT NULL UNIQUE,
       password        VARCHAR(255)    NOT NULL,
       role            VARCHAR(50)     NOT NULL DEFAULT 'CLIENT',
       phone_number    VARCHAR(20),
       address         VARCHAR(255),
       enabled         BOOLEAN         NOT NULL DEFAULT TRUE,
       created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
       updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);
DROP TABLE IF EXISTS BOOKINGS;
CREATE TABLE bookings (
      id              BIGSERIAL       PRIMARY KEY,
      client_id       BIGINT          NOT NULL,
      event_date      DATE            NOT NULL,
      event_location  VARCHAR(255),
      guest_count     INT,
      total_amount    NUMERIC(10, 2),
      advance_paid    NUMERIC(10, 2),
      status          VARCHAR(20)     NOT NULL DEFAULT 'PENDING',
      notes           TEXT,
      created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMP       NOT NULL DEFAULT NOW(),

      CONSTRAINT chk_booking_status CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'))
);

DROP TABLE IF EXISTS VENDOR_SERVICES;
CREATE TABLE vendor_services (
     id              BIGSERIAL       PRIMARY KEY,
     name            VARCHAR(255)    NOT NULL,
     description     TEXT,
     image_url       VARCHAR(255),
     price           DOUBLE PRECISION NOT NULL,
     location        VARCHAR(255),
     category            VARCHAR(255),
     vendor_id       BIGINT          NOT NULL,
     booking_id      BIGINT,         -- THE LINK: This connects the service to a booking
     created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
     updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE TABLE service_tags (
      service_id BIGINT NOT NULL,
      tag VARCHAR(255)
);

CREATE TABLE reviews (
     id BIGSERIAL PRIMARY KEY,
     service_id BIGINT NOT NULL,
     user_id BIGINT NOT NULL,
     rating DOUBLE PRECISION NOT NULL,
     comment TEXT,
     created_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

