import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'orders.json');

// GET all orders
export async function GET() {
  try {
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const orders = JSON.parse(fileData);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve orders queue' }, { status: 500 });
  }
}

// POST new order
export async function POST(request) {
  try {
    const orderData = await request.json();
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const orders = JSON.parse(fileData);

    const newOrder = {
      id: "OR-" + Math.floor(1000 + Math.random() * 9000),
      customer: orderData.customer,
      address: orderData.address,
      phone: orderData.phone,
      items: orderData.items,
      total: parseFloat(orderData.total),
      status: "Pending",
      date: new Date().toLocaleString()
    };

    orders.push(newOrder);
    fs.writeFileSync(dataFilePath, JSON.stringify(orders, null, 2));

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit order' }, { status: 500 });
  }
}

// PUT (update status)
export async function PUT(request) {
  try {
    const { id, status } = await request.json();
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    let orders = JSON.parse(fileData);

    orders = orders.map(order => order.id === id ? { ...order, status } : order);
    fs.writeFileSync(dataFilePath, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
