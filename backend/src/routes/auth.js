const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");

const router = express.Router();


// ==============================
// REGISTER
// ==============================

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


        // Required fields
        if (
            !firstName ||
            !lastName ||
            !password ||
            (!email && !mobile)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "First name, last name, password and email or mobile are required."
            });
        }


        // Password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters long."
            });
        }


        // Check email
        if (email) {

            const emailCheck = await pool.query(
                "SELECT id FROM users WHERE email = $1 LIMIT 1",
                [email]
            );

            if (emailCheck.rows.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "An account with this email already exists."
                });
            }
        }


        // Check mobile
        if (mobile) {

            const mobileCheck = await pool.query(
                "SELECT id FROM users WHERE mobile = $1 LIMIT 1",
                [mobile]
            );

            if (mobileCheck.rows.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "An account with this mobile number already exists."
                });
            }
        }


        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);


        // Create user
        const result = await pool.query(
            `
            INSERT INTO users (
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
                $1, $2, $3, $4, $5,
                $6, $7, $8, $9, $10, $11
            )
            RETURNING
                id,
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
                firstName,
                lastName,
                email || null,
                mobile || null,
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


        // Create JWT
        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "7d"
            }
        );


        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user
        });


    } catch (error) {

        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create account."
        });
    }
});


// ==============================
// LOGIN
// ==============================

router.post("/login", async (req, res) => {
    try {

        const {
            emailOrMobile,
            password
        } = req.body;


        if (!emailOrMobile || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Email/mobile and password are required."
            });
        }


        // Find user
        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE email = $1
               OR mobile = $1
            LIMIT 1
            `,
            [emailOrMobile]
        );


        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email/mobile or password."
            });
        }


        const user = result.rows[0];


        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password_hash
            );


        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email/mobile or password."
            });
        }


        // Create JWT
        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "7d"
            }
        );


        // Never send password hash
        delete user.password_hash;


        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user
        });


    } catch (error) {

        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to login."
        });
    }
});


module.exports = router;
