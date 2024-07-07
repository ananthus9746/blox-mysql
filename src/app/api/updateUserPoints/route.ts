import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import { RowDataPacket } from 'mysql2';

// Define types for expected results
interface Referral extends RowDataPacket {
    blox_id: number;
    referral_points: number;
}

interface User extends RowDataPacket {
    user_id: number;
    name: string;
    user_points: number;
}

interface Points extends RowDataPacket {
    total: number | null;
}

export async function GET() {
    try {
        // Fetch all users
        const [users] = await pool.query<User[]>('SELECT user_id FROM blox_user_cef6');

        for (const user of users) {
            // Calculate total referral points
            const [referralPoints] = await pool.query<Points[]>('SELECT SUM(referral_points) AS total FROM blox_referral_be82 WHERE blox_id = ?', [user.user_id]);

            // Calculate total user points
            const totalPoints = referralPoints[0].total || 0;

            // Update the user's total points in the database
            await pool.query('UPDATE blox_user_cef6 SET user_points = ? WHERE user_id = ?', [totalPoints, user.user_id]);
        }

        return NextResponse.json({ message: 'User points updated successfully' });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'Error updating user points', error: error.message }, { status: 500 });
    }
}
