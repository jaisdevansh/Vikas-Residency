import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Wifi, Tv, Wind, CheckCircle2, MapPin } from "lucide-react";
import { getRooms } from "@/backend/services/property.service";

export const revalidate = 60; // ISR for room pages

// Rich templates for description, additional slide images, and features for each room
const roomTemplates: Record<string, any> = {
  "1": {
    description: "Immerse yourself in the spiritual essence of Varanasi in our breathtaking Premium Ganga View Room. Specially designed for ultimate relaxation, this spacious sanctuary features stunning views, powerful Air Conditioning (AC) to beat the heat, seamless high-speed WiFi for all your connectivity needs, and a large Flat-screen TV for your entertainment. Every corner is crafted to blend authentic Indian hospitality with modern, luxurious comfort.",
    images: ["/r1.2.jpeg", "/r1.jpeg", "/r1.3.jpeg"],
    video: "/r1.4.mp4",
    features: [
      "2 Comfortable Beds", 
      "Powerful Air Conditioning (AC)", 
      "High-Speed Free WiFi",
      "Large Flat-screen Smart TV",
      "Modern Attached Bathroom",
      "Complimentary Premium Toiletries",
      "On-Demand Tour Guide Available"
    ]
  },
  "2": {
    description: "Enjoy a comfortable and spacious stay in our Family Suite. Perfect for small groups or families visiting Varanasi, this room offers generous space, powerful Air Conditioning (AC), and seamless high-speed WiFi. A large Flat-screen TV ensures entertainment for everyone, making it the perfect sanctuary after a long day at the ghats.",
    images: ["/r2.jpeg", "/r2.jpeg", "/r2.jpeg"],
    features: [
      "4 Comfortable Beds", 
      "Powerful Air Conditioning (AC)", 
      "High-Speed Free WiFi",
      "Large Flat-screen Smart TV",
      "Modern Attached Bathroom",
      "Complimentary Premium Toiletries",
      "24/7 Dedicated Room Service"
    ]
  },
  "3": {
    description: "Experience premium comfort at an affordable price point in our Deluxe Comfort Room. Beautifully decorated and offering a relaxed ambience, this room features high-speed WiFi, powerful AC, and cozy bedding. An excellent choice for couples or solo travelers who wish to experience the serenity of Varanasi.",
    images: ["/r3.jpg", "/r1.jpeg", "/r1.2.jpeg"],
    features: [
      "Comfortable Double Bed", 
      "Air Conditioning (AC)", 
      "High-Speed Free WiFi",
      "Smart Flat-screen TV",
      "Modern Attached Bathroom",
      "Complimentary Toiletries"
    ]
  },
  "4": {
    description: "Our Standard Room offers the perfect balance of budget-friendly pricing and essential modern amenities. Equipped with high-speed WiFi and AC, it provides a quiet, restful space to recharge after exploring Kashi's narrow lanes and ancient temples.",
    images: ["/r4.jpg", "/r3.jpg", "/r1.jpeg"],
    features: [
      "Comfortable Double Bed", 
      "Air Conditioning (AC)", 
      "High-Speed Free WiFi",
      "Attached Bathroom",
      "Clean Towels & Linen"
    ]
  },
  "5": {
    description: "Perfect for backpackers, students, and solo pilgrims, our Budget Single Room offers a cozy, private place to stay at an unbeatable price. Fully air-conditioned and featuring free WiFi, it has everything the solo adventurer needs.",
    images: ["/r5.jpg", "/r4.jpg", "/r3.jpg"],
    features: [
      "Comfortable Single Bed", 
      "Air Conditioning (AC)", 
      "High-Speed Free WiFi",
      "Private Bathroom",
      "24/7 Security"
    ]
  }
};

export async function generateStaticParams() {
  try {
    const rooms = await getRooms();
    if (rooms && rooms.length > 0) {
      return rooms.map((room: any) => ({
        id: String(room.id),
      }));
    }
  } catch (err) {
    console.error("Failed to generate static params for rooms:", err);
  }
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RoomDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const idStr = resolvedParams.id;

  // Let's query room details from database/mock endpoint
  let dbRoom: any = null;
  try {
    const rooms = await getRooms();
    if (rooms && rooms.length > 0) {
      dbRoom = rooms.find((r: any) => String(r.id) === idStr);
    }
  } catch (err) {
    console.error("Failed to fetch room detail:", err);
  }

  // Local fallback rooms in case the backend is down
  const localRooms = [
    { id: "1", name: "Premium Comfort Room", price: "3500.00", capacity: 2, image_url: "/r1.2.jpeg" },
    { id: "2", name: "Spacious Family Room", price: "5500.00", capacity: 4, image_url: "/r2.jpeg" },
    { id: "3", name: "Deluxe Comfort Room", price: "2500.00", capacity: 2, image_url: "/r2.1.jpeg" },
    { id: "4", name: "Standard Room", price: "1500.00", capacity: 2, image_url: "/r2.3.jpeg" },
    { id: "5", name: "Budget Single Room", price: "1000.00", capacity: 1, image_url: "/r2.4.jpeg" },
  ];

  // Resolve room from either db or local fallback
  const resolvedRoomData = dbRoom || localRooms.find(r => r.id === idStr || `r${r.id}` === idStr);

  if (!resolvedRoomData) {
    notFound();
  }

  // Get matching template key
  const templateKey = idStr.startsWith('r') ? idStr.substring(1) : idStr;
  const template = roomTemplates[idStr] || roomTemplates[templateKey] || {
    description: `Enjoy a comfortable stay in our ${resolvedRoomData.name}. Perfect for travelers visiting Varanasi, this room offers standard capacity, powerful Air Conditioning (AC), and seamless high-speed WiFi. A large flat-screen TV ensures entertainment, making it the perfect sanctuary after a long day at the ghats.`,
    images: [resolvedRoomData.image_url || "/r1.2.jpeg"],
    features: [
      `${resolvedRoomData.capacity} Persons capacity`, 
      "Air Conditioning (AC)", 
      "High-Speed Free WiFi",
      "Flat-screen TV",
      "Attached Bathroom"
    ]
  };

  // Build images array, inserting custom uploaded cover image if available
  let images = template.images && template.images.length > 0 
    ? [...template.images] 
    : [resolvedRoomData.image_url || "/r1.2.jpeg"];
    
  if (resolvedRoomData.image_url) {
    images[0] = resolvedRoomData.image_url;
  }

  // Format price dynamically
  const formattedPrice = `₹${Number(resolvedRoomData.price).toLocaleString('en-IN')}`;

  const room = {
    name: resolvedRoomData.name,
    price: formattedPrice,
    description: template.description,
    images: images,
    video: template.video,
    features: template.features,
  };

  return (
    <main className="pt-32 pb-24 bg-beige min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link href="/rooms" className="text-primary/60 hover:text-primary mb-4 inline-block font-medium transition-colors">
              &larr; Back to all rooms
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-2">{room.name}</h1>
            <div className="flex items-center text-foreground/70 gap-2">
              <MapPin size={18} />
              <span>Vikas Residency, Varanasi</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-3xl font-bold text-primary">{room.price}</p>
            <p className="text-sm text-foreground/60">per night</p>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16 h-auto lg:h-[600px]">
          {/* Main Video/Image */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-lg h-[300px] sm:h-[400px] lg:h-full bg-black group">
            {room.video ? (
              <video 
                src={room.video} 
                controls 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
                poster={room.images[0]}
              />
            ) : (
              <Image
                src={room.images[0]}
                alt={`${room.name} main`}
                fill
                className="object-cover"
              />
            )}
          </div>
          
          {/* Side Images */}
          <div className={`grid grid-cols-2 ${room.images.length > 3 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-4 lg:h-full`}>
            {room.images.slice(1).map((img: string, idx: number) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg h-[150px] sm:h-[200px] lg:h-full group">
                <Image
                  src={img}
                  alt={`${room.name} ${idx + 2}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif text-primary mb-6">About this room</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-10">
              {room.description}
            </p>

            <div className="h-px w-full bg-primary/10 mb-10" />

            <h3 className="text-2xl font-serif text-primary mb-6">What this room offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 text-foreground/80">
                  <CheckCircle2 className="text-accent" size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-8 shadow-xl sticky top-32 border border-primary/5">
              <h3 className="text-2xl font-bold text-primary mb-6">Reserve {room.name}</h3>
              <div className="flex gap-4 mb-8 text-primary/70 justify-center">
                <div className="flex flex-col items-center gap-1 bg-beige p-3 rounded-xl flex-1">
                  <Wind size={24} />
                  <span className="text-xs font-medium">AC</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-beige p-3 rounded-xl flex-1">
                  <Wifi size={24} />
                  <span className="text-xs font-medium">WiFi</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-beige p-3 rounded-xl flex-1">
                  <Tv size={24} />
                  <span className="text-xs font-medium">TV</span>
                </div>
              </div>
              
              <Link href="/contact" className="block">
                <Button className="w-full py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                  Book Now
                </Button>
              </Link>
              <p className="text-center text-sm text-foreground/60 mt-4">
                No credit card needed to reserve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
