import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST() {
    try {
        // Insert sample users
        await pool.query('INSERT INTO blox_user_cef6 (name) VALUES (?)', ['Alice']);
        await pool.query('INSERT INTO blox_user_cef6 (name) VALUES (?)', ['Bob']);

        // Insert sample referral data
        await pool.query('INSERT INTO blox_referral_be82 (direct_referrals, total_referrals, referral_code, otp_enabled, referral_points) VALUES (?, ?, ?, ?, ?)', [10, 20, 'REF123', true, 100]);
        await pool.query('INSERT INTO blox_referral_be82 (direct_referrals, total_referrals, referral_code, otp_enabled, referral_points) VALUES (?, ?, ?, ?, ?)', [5, 15, 'REF456', false, 50]);

        return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'Error seeding database', error: error.message }, { status: 500 });
    }
}
