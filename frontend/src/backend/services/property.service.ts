export async function getRooms() {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
    const res = await fetch(`${backendUrl}/api/rooms`, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.rooms || [];
  } catch (error) {
    console.warn("Failed to fetch rooms from backend, using mock data");
    // Fallback mock data
    return [
      { id: 1, name: "Premium Ganga View Room", price: 3500, capacity: 2, image_url: "/r1.2.jpeg" },
      { id: 2, name: "Family Suite", price: 5500, capacity: 4, image_url: "/r2.jpeg" },
      { id: 3, name: "Deluxe Comfort Room", price: 2500, capacity: 2, image_url: "/r3.jpg" },
      { id: 4, name: "Standard Room", price: 1500, capacity: 2, image_url: "/r4.jpg" },
      { id: 5, name: "Budget Single Room", price: 1000, capacity: 1, image_url: "/r5.jpg" }
    ];
  }
}

export async function getPropertyDetails() {
  return {
    name: "Vikas Residency",
    location: "Varanasi",
    amenities: ["WiFi", "AC", "TV"]
  };
}

export async function initializeDatabase() {
  return { success: true, message: "Database initialized (mocked)" };
}
