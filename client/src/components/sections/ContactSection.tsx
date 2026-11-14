import { useState, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { personalData } from "@/data/personalData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  RectangleEllipsis,
  Phone,
  Linkedin,
  Github,
  MessageCircleMore,
  Mail,
  CheckCircle,
  Send,
} from "lucide-react";

// Custom Paper Airplane Icon Component
const PaperAirplaneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3l18 9-18 9 3-9z" />
    <path d="M6 12h12" />
  </svg>
);

// Paths to your custom .lottie animation files
const successAnimationPath = "/success.lottie";
const errorAnimationPath = "/error.lottie";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPath, setAnimationPath] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (showAnimation) return;

    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", data);
      // Success - show success animation and keep it visible
      setAnimationPath(successAnimationPath);
      setShowAnimation(true);
      form.reset();
      // Animation stays until user leaves or refreshes page
    } catch (error) {
      // Error - show error animation and keep it visible
      setAnimationPath(errorAnimationPath);
      setShowAnimation(true);
      // Animation stays until user leaves or refreshes page
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcons = [
    {
      icon: <Linkedin className="h-4 w-4" />,
      url: personalData.social.linkedin,
    },
    { icon: <Github className="h-4 w-4" />, url: personalData.social.github },
    {
      icon: <MessageCircleMore className="h-4 w-4" />,
      url: personalData.social.whatsapp,
    },
    {
      icon: <Mail className="h-4 w-4" />,
      url: personalData.social.email,
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-16 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <RectangleEllipsis className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="opacity-80">{personalData.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="opacity-80">{personalData.phone}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-6">Follow Me</h3>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Lottie Animation */}
            {showAnimation && (
              <div className="absolute inset-0 z-50 pointer-events-none">
                <DotLottieReact
                  src={animationPath}
                  style={{ 
                    width: 550, 
                    height: 550,
                    position: 'absolute',
                    bottom: '10px',
                    right: '50%',
                    transform: 'translateX(50%)'
                  }}
                  loop={false}
                  autoplay={true}
                />
              </div>
            )}

            {!showAnimation && (
              <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`space-y-4 transition-opacity duration-300 ${showAnimation ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email"
                          className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Subject"
                          className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Your message"
                          className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <Button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting || showAnimation}
                  className="w-full px-6 py-3 bg-white text-primary font-medium rounded-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
