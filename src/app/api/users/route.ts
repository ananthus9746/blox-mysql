import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        return NextResponse.json(users);
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
    }
}
