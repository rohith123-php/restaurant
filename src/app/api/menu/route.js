import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'menu.json');

// GET all menu items
export async function GET() {
  try {
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const menuItems = JSON.parse(fileData);
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
}

// POST a new menu item
export async function POST(request) {
  try {
    const newItem = await request.json();
    
    // Read current data
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const menuItems = JSON.parse(fileData);
    
    // Create new item with a unique ID
    const newEntry = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
      image: newItem.image || '/chicken_biryani.png' // default image if none provided
    };
    
    // Add to array and save
    menuItems.push(newEntry);
    fs.writeFileSync(dataFilePath, JSON.stringify(menuItems, null, 2));
    
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
  }
}

// DELETE a menu item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }
    
    // Read current data
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    let menuItems = JSON.parse(fileData);
    
    // Filter out the deleted item
    menuItems = menuItems.filter(item => item.id !== id);
    
    // Save new array
    fs.writeFileSync(dataFilePath, JSON.stringify(menuItems, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete from database' }, { status: 500 });
  }
}
