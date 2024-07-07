import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
    user_id: number;
    name: string;
    user_points: number;
}

export async function GET() {
    try {
        const [users] = await pool.query<User[]>('SELECT * FROM blox_user_cef6');
        return NextResponse.json(users);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
    }
}
