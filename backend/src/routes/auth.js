const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");

const router = express.Router();


// =====================================================
// HELPER — CREATE USERNAME
// =====================================================

function createUsername(firstName, lastName, id) {

    const first = String(firstName || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    const last = String(lastName || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    return `${first}.${last}${id}`;
}


// =====================================================
// REGISTER
// POST /api/auth/register
// =====================================================

router.post("/register", async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            mobile,
            password,
            dateOfBirth,
            gender,
            community,
            surname,
            kul,
            city
        } = req.body;


        // -------------------------------------------------
        // REQUIRED FIELDS
        // -------------------------------------------------

        if (
            !firstName ||
            !lastName ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "First name, last name and password are required."
            });
        }


        // -------------------------------------------------
        // PASSWORD VALIDATION
        // -------------------------------------------------

        if (password.length < 8) {

            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters long."
            });
        }


        // -------------------------------------------------
        // NORMALIZE EMAIL / MOBILE
        // -------------------------------------------------

        const normalizedEmail =
            email
                ? String(email).trim().toLowerCase()
                : null;

        const normalizedMobile =
            mobile
                ? String(mobile).trim()
                : null;


        // -------------------------------------------------
        // CHECK EMAIL
        // -------------------------------------------------

        if (normalizedEmail) {

            const emailCheck = await pool.query(
                `
                SELECT id
                FROM users
                WHERE email = $1
                LIMIT 1
                `,
                [normalizedEmail]
            );

            if (emailCheck.rows.length > 0) {

                return res.status(409).json({
                    success: false,
                    message:
                        "An account with this email already exists."
                });
            }
        }


        // -------------------------------------------------
        // CHECK MOBILE
        // -------------------------------------------------

        if (normalizedMobile) {

            const mobileCheck = await pool.query(
                `
                SELECT id
                FROM users
                WHERE mobile = $1
                LIMIT 1
                `,
                [normalizedMobile]
            );

            if (mobileCheck.rows.length > 0) {

                return res.status(409).json({
                    success: false,
                    message:
                        "An account with this mobile number already exists."
                });
            }
        }


        // -------------------------------------------------
        // HASH PASSWORD
        // -------------------------------------------------

        const passwordHash =
            await bcrypt.hash(password, 12);


        // -------------------------------------------------
        // RESERVE NEXT USER DATABASE ID
        //
        // This allows us to create:
        // SS100001
        // SS100002
        // SS100003
        // etc.
        // -------------------------------------------------

        const idResult = await pool.query(
            `
            SELECT nextval(
                pg_get_serial_sequence('users', 'id')
            ) AS id
            `
        );

        const databaseId =
            Number(idResult.rows[0].id);


        // -------------------------------------------------
        // CREATE PUBLIC USER ID
        // -------------------------------------------------

        const userId =
            `SS${String(databaseId).padStart(6, "0")}`;


        // -------------------------------------------------
        // CREATE USERNAME
        // Example:
        // priya.rauth1
        // neha.basfor2
        // -------------------------------------------------

        const username =
            createUsername(
                firstName,
                lastName,
                databaseId
            );


        // -------------------------------------------------
        // CREATE USER
        // -------------------------------------------------

        const result = await pool.query(
            `
            INSERT INTO users (
                id,
                user_id,
                username,
                first_name,
                last_name,
                email,
                mobile,
                password_hash,
                date_of_birth,
                gender,
                community,
                surname,
                kul,
                city
            )

            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11,
                $12,
                $13,
                $14
            )

            RETURNING
                id,
                user_id,
                username,
                first_name,
                last_name,
                email,
                mobile,
                date_of_birth,
                gender,
                community,
                surname,
                kul,
                city,
                created_at
            `,
            [
                databaseId,
                userId,
                username,
                firstName.trim(),
                lastName.trim(),
                normalizedEmail,
                normalizedMobile,
                passwordHash,
                dateOfBirth || null,
                gender || null,
                community || null,
                surname || null,
                kul || null,
                city || null
            ]
        );


        const user = result.rows[0];


        // -------------------------------------------------
        // CREATE JWT
        // -------------------------------------------------

        const token = jwt.sign(
            {
                userId: user.id,
                publicUserId: user.user_id,
                username: user.username
            },

            process.env.JWT_SECRET,

            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "7d"
            }
        );


        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Account created successfully.",

            token,

            user

        });


    } catch (error) {

        console.error(
            "REGISTER ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to create account."

        });
    }
});


// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================

router.post("/login", async (req, res) => {

    try {

        const {
            emailOrMobile,
            password
        } = req.body;


        // -------------------------------------------------
        // REQUIRED
        // -------------------------------------------------

        if (
            !emailOrMobile ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "User ID, username, email/mobile and password are required."

            });
        }


        const loginValue =
            String(emailOrMobile)
                .trim()
                .toLowerCase();


        // -------------------------------------------------
        // FIND USER
        //
        // Login can use:
        // User ID
        // Username
        // Email
        // Mobile
        // -------------------------------------------------

        const result = await pool.query(
            `
            SELECT *
            FROM users

            WHERE LOWER(user_id) = $1
               OR LOWER(username) = $1
               OR LOWER(email) = $1
               OR mobile = $1

            LIMIT 1
            `,
            [loginValue]
        );


        // -------------------------------------------------
        // USER NOT FOUND
        // -------------------------------------------------

        if (result.rows.length === 0) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid User ID/username/email/mobile or password."

            });
        }


        const user =
            result.rows[0];


        // -------------------------------------------------
        // CHECK PASSWORD
        // -------------------------------------------------

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password_hash
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid User ID/username/email/mobile or password."

            });
        }


        // -------------------------------------------------
        // CREATE JWT
        // -------------------------------------------------

        const token = jwt.sign(

            {
                userId: user.id,
                publicUserId: user.user_id,
                username: user.username
            },

            process.env.JWT_SECRET,

            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "7d"
            }
        );


        // -------------------------------------------------
        // NEVER SEND PASSWORD HASH
        // -------------------------------------------------

        delete user.password_hash;


        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Login successful.",

            token,

            user

        });


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to login."

        });
    }
});


// =====================================================
// EXPORT
// =====================================================

module.exports = router;
