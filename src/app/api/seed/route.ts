import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
    return NextResponse.json({
        message: "Use POST method to seed the database",
    });
}

export async function POST() {
    try {
        // Insert sample users
        await pool.query('INSERT INTO users (name) VALUES (?)', ['John Doe']);
        await pool.query('INSERT INTO users (name) VALUES (?)', ['Jane Smith']);

        // Insert sample referral data
        await pool.query('INSERT INTO referrals (user_id, points) VALUES (?, ?)', [1, 50]);
        await pool.query('INSERT INTO referrals (user_id, points) VALUES (?, ?)', [1, 30]);
        await pool.query('INSERT INTO referrals (user_id, points) VALUES (?, ?)', [2, 20]);

        // Insert sample usage data
        await pool.query('INSERT INTO usage_data (user_id, points) VALUES (?, ?)', [1, 70]);
        await pool.query('INSERT INTO usage_data (user_id, points) VALUES (?, ?)', [2, 40]);
        await pool.query('INSERT INTO usage_data (user_id, points) VALUES (?, ?)', [2, 60]);

        return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: 'Error seeding database', error: error.message }, { status: 500 });
    }
}
