INSERT INTO user (name, mail, password, created_at, updated_at)
SELECT 'User 1', 'user1@mail.fr', 'password1', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM user WHERE mail = 'user1@mail.fr');

INSERT INTO user (name, mail, password, created_at, updated_at)
SELECT 'User 2', 'user2@mail.fr', 'password2', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM user WHERE mail = 'user2@mail.fr');

INSERT INTO user (name, mail, password, created_at, updated_at)
SELECT 'User 3', 'user3@mail.fr', 'password3', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM user WHERE mail = 'user3@mail.fr');

INSERT INTO agent (name, mail, password, created_at, updated_at)
SELECT 'Admin', 'admin@admin.fr', 'adminpassword', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM agent WHERE mail = 'admin@admin.fr');