import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getAvailability, reserveTable, type ReservationConfirmation, type TimeSlot } from "@/lib/restaurant";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(7, "Phone must be at least 7 characters."),
  email: z.string().email("Invalid email address."),
  date: z.date({ required_error: "A date of reservation is required." }),
  time: z.string({ required_error: "Please select a time." }),
  guests: z.coerce.number().min(1).max(20),
  occasion: z.string().optional(),
  specialRequests: z.string().optional(),
});

export function Reservation() {
  const [successData, setSuccessData] = useState<ReservationConfirmation | null>(null);
  const [availability, setAvailability] = useState<TimeSlot[]>([]);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      guests: 2,
      occasion: "none",
      specialRequests: "",
      time: "",
    },
  });

  const selectedDate = form.watch("date");
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  useEffect(() => {
    let isActive = true;

    async function loadAvailability() {
      if (!formattedDate) {
        setAvailability([]);
        return;
      }

      setIsAvailabilityLoading(true);

      try {
        const slots = await getAvailability(formattedDate);
        if (isActive) {
          setAvailability(slots);
        }
      } finally {
        if (isActive) {
          setIsAvailabilityLoading(false);
        }
      }
    }

    void loadAvailability();

    return () => {
      isActive = false;
    };
  }, [formattedDate]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitError(null);

    try {
      const confirmation = await reserveTable({
        ...values,
        date: format(values.date, "yyyy-MM-dd"),
        occasion: values.occasion && values.occasion !== "none" ? values.occasion : undefined,
        specialRequests: values.specialRequests?.trim() ? values.specialRequests.trim() : undefined,
      });

      setSuccessData(confirmation);
      form.reset({
        name: "",
        phone: "",
        email: "",
        guests: 2,
        occasion: "none",
        specialRequests: "",
        time: "",
      } as any);
      setAvailability([]);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to complete the reservation.");
    }
  }

  return (
    <section id="reservation" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-background/90 z-10"></div>
      <div 
        className="absolute inset-0 opacity-20 bg-center bg-cover z-0" 
        style={{ backgroundImage: "url('/images/gallery-5.png')" }}
      ></div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl mx-auto bg-card border border-border p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl text-foreground mb-4">Reserve a Table</h2>
            <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
            <p className="text-foreground/70">Join us for an unforgettable experience.</p>
          </div>

          <AnimatePresence mode="wait">
            {successData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl text-foreground mb-2">Reservation Confirmed</h3>
                <p className="text-foreground/70 mb-6">We look forward to hosting you, {successData.name}.</p>
                <div className="bg-background p-6 border border-border inline-block text-left mb-8">
                  <p className="text-sm text-foreground/50 uppercase tracking-widest mb-1">Booking ID</p>
                  <p className="font-mono text-primary text-xl mb-4">{successData.bookingId}</p>
                  <p className="text-foreground">{format(new Date(successData.date), "MMMM d, yyyy")} at {successData.time}</p>
                  <p className="text-foreground">{successData.guests} Guest(s)</p>
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    onClick={() => setSuccessData(null)}
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Make Another Reservation
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {submitError ? (
                      <div className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {submitError}
                      </div>
                    ) : null}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-background border-border focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" className="bg-background border-border focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs">Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" className="bg-background border-border focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs">Number of Guests</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                              <FormControl>
                                <SelectTrigger className="bg-background border-border focus:ring-primary">
                                  <SelectValue placeholder="Select guests" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-card border-border">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                  <SelectItem key={num} value={String(num)} className="hover:bg-primary/20">
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </SelectItem>
                                ))}
                                <SelectItem value="9">9+ (Call us)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-end">
                            <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs mb-2">Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal bg-background border-border hover:bg-background/80 hover:text-foreground",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs">Time</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDate || isAvailabilityLoading}>
                              <FormControl>
                                <SelectTrigger className="bg-background border-border focus:ring-primary">
                                  <SelectValue placeholder={!selectedDate ? "Select a date first" : isAvailabilityLoading ? "Loading..." : "Select time"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-card border-border">
                                {availability?.length === 0 && (
                                  <SelectItem value="none" disabled>No slots available</SelectItem>
                                )}
                                {availability?.map((slot) => (
                                  <SelectItem 
                                    key={slot.time} 
                                    value={slot.time} 
                                    disabled={!slot.available}
                                    className="hover:bg-primary/20"
                                  >
                                    {slot.time} {!slot.available && "(Booked)"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="occasion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs">Special Occasion (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background border-border focus:ring-primary">
                                <SelectValue placeholder="None" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border">
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="birthday">Birthday</SelectItem>
                              <SelectItem value="anniversary">Anniversary</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs">Special Requests (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Dietary requirements, seating preferences..." 
                              className="resize-none bg-background border-border focus-visible:ring-primary min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg tracking-widest uppercase mt-4 rounded-none"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Confirming..." : "Reserve Table"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
