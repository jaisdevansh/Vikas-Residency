"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Calendar, Users, User, Phone, Mail, CheckCircle, AlertCircle, X } from "lucide-react";

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{message: string, type: "success" | "error"} | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      guest_name: formData.get('name'),
      guest_email: formData.get('email'),
      guest_phone: formData.get('phone'),
      guests: parseInt(formData.get('guests') as string, 10) || 1,
      check_in: formData.get('check_in'),
      check_out: formData.get('check_out'),
      room_id: 1, // Default room ID
    };

    try {
      // Create WhatsApp message
      const emailText = data.guest_email ? `%0A*Email*: ${data.guest_email}` : '';
      const text = `*New Booking Request!*%0AThis user booked the room:%0A%0A*Name*: ${data.guest_name}%0A*Phone*: ${data.guest_phone}${emailText}%0A*Check-in*: ${data.check_in}%0A*Check-out*: ${data.check_out}%0A*Guests*: ${data.guests}`;
      
      // Open WhatsApp in new tab
      window.open(`https://wa.me/919795756509?text=${text}`, '_blank');
      
      // We still run the backend API call in the background for record keeping
      fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(err => console.error('Background API error:', err));
      
      showToast("Booking request initiated successfully!");
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      showToast('Failed to process booking. Please try again or call us directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-primary dark:bg-[#0a0908] relative overflow-hidden z-10">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready for an Unforgettable Stay?</h2>
            <div className="w-20 h-1 bg-accent mb-8" />
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Book directly with us to get the best rates, complimentary breakfast, and flexible cancellation policies. We guarantee a premium experience from the moment you arrive.
            </p>
            
            <div className="bg-card/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 mb-8">
              <h3 className="text-xl font-bold text-accent mb-4">Direct Booking Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle className="text-accent" size={20} /> <span>Pay for the luxury, not commission markup</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-accent" size={20} /> <span>Exclusive direct concessions & discounts</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-accent" size={20} /> <span>Early check-in priority (subject to availability)</span></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center sm:items-start gap-1 text-xl font-serif">
              <span className="mb-2">Or call us directly:</span>
              <a href="tel:+919795756509" className="text-accent font-bold hover:underline">
                +91 97957 56509
              </a>
              <a href="tel:+918318635270" className="text-accent font-bold hover:underline">
                +91 83186 35270
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="text-3xl font-serif text-primary mb-8">Book Your Stay</h3>
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="text-accent w-24 h-24 mb-6" />
                  <h4 className="text-2xl font-bold text-primary mb-2">Booking Request Sent!</h4>
                  <p className="text-foreground/70 mb-8">
                    Thank you for choosing Vikas Residency. Our team will contact you shortly to confirm your reservation.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Book Another Room
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                        <Calendar size={16} /> Check-in Date
                      </label>
                      <input 
                        name="check_in"
                        type="date" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 dark:border-white/10 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                        <Calendar size={16} /> Check-out Date
                      </label>
                      <input 
                        name="check_out"
                        type="date" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 dark:border-white/10 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                        <Users size={16} /> Guests
                      </label>
                      <select name="guests" className="w-full px-4 py-3 rounded-xl border border-primary/20 dark:border-white/10 bg-transparent dark:bg-white/5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition appearance-none">
                        <option value="1" className="text-gray-900 bg-white dark:text-white dark:bg-[#1a1815]">1 Guest</option>
                        <option value="2" className="text-gray-900 bg-white dark:text-white dark:bg-[#1a1815]">2 Guests</option>
                        <option value="3" className="text-gray-900 bg-white dark:text-white dark:bg-[#1a1815]">3 Guests</option>
                        <option value="4" className="text-gray-900 bg-white dark:text-white dark:bg-[#1a1815]">4 Guests</option>
                        <option value="5+" className="text-gray-900 bg-white dark:text-white dark:bg-[#1a1815]">5+ Guests</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                        <User size={16} /> Full Name
                      </label>
                      <input 
                        name="name"
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 dark:border-white/10 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                        <Phone size={16} /> Phone Number
                      </label>
                      <input 
                        name="phone"
                        type="tel" 
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 dark:border-white/10 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                        <Mail size={16} /> Email Address (Optional)
                      </label>
                      <input 
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 dark:border-white/10 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      variant="gold" 
                      size="lg" 
                      className="flex-1 w-full text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 w-full text-lg border-primary dark:border-white/20 text-primary dark:text-white hover:bg-primary hover:text-white"
                    >
                      Call for Best Price
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white font-medium z-50 ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75 transition-opacity">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
