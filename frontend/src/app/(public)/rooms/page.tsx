import { Metadata } from "next";
import RoomsClient from "./RoomsClient";
import { getRooms } from "@/backend/services/property.service";

export const metadata: Metadata = {
  title: "Premium & Budget Rooms",
  description: "Explore our luxurious and budget-friendly rooms at Vikas Residency Varanasi. Book directly for the best prices.",
};
export const revalidate = 60; // ISR with 1-minute revalidation

export default async function RoomsPage() {
  let dbRooms: any[] = [];
  try {
    dbRooms = await getRooms();
  } catch (err) {
    console.error("Failed to fetch rooms:", err);
  }
  
  const formattedRooms = dbRooms.map((room: any) => ({
    id: String(room.id),
    name: room.name,
    price: `₹${room.price}`,
    image: room.image_url || "/r1.2.jpeg",
    features: [`${room.capacity} Persons capacity`, "Air Conditioning", "Free WiFi"],
    category: room.price >= 2000 ? "premium" : "budget",
  }));

  const rooms = formattedRooms.length > 0 ? formattedRooms : [
    {
      id: "1",
      name: "Premium Comfort Room",
      price: "₹3,500",
      image: "/r1.2.jpeg",
      features: ["2 Persons capacity", "Air Conditioning", "Free WiFi"],
      category: "premium",
    },
    {
      id: "2",
      name: "Spacious Family Room",
      price: "₹5,500",
      image: "/r2.jpeg",
      features: ["4 Persons capacity", "Air Conditioning", "Free WiFi"],
      category: "premium",
    },
    {
      id: "3",
      name: "Deluxe Comfort Room",
      price: "₹2,500",
      image: "/r3.jpg",
      features: ["2 Persons capacity", "Air Conditioning", "Free WiFi"],
      category: "budget",
    },
    {
      id: "4",
      name: "Standard Room",
      price: "₹1,500",
      image: "/r4.jpg",
      features: ["2 Persons capacity", "Air Conditioning", "Free WiFi"],
      category: "budget",
    },
    {
      id: "5",
      name: "Budget Single Room",
      price: "₹1,000",
      image: "/r5.jpg",
      features: ["1 Person capacity", "Air Conditioning", "Free WiFi"],
      category: "budget",
    }
  ];

  return (
    <main className="pt-32 pb-24 bg-beige min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6">Our Accommodations</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Carefully curated spaces designed for the spiritual traveler. Find your perfect sanctuary in Varanasi.
          </p>
        </div>

        {/* Client component for filtering and interactive cards */}
        <RoomsClient initialRooms={rooms} />
      </div>
    </main>
  );
}
