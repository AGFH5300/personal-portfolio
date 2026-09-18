import { useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Github, Linkedin, Mail, MessageCircleMore, Phone, Send } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalData } from "@/data/personalData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const successAnimationPath = "/success.lottie";
const errorAnimationPath = "/error.lottie";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPath, setAnimationPath] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    if (showAnimation) return;
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", data);
      setAnimationPath(successAnimationPath);
      setShowAnimation(true);
      form.reset();
    } catch {
      setAnimationPath(errorAnimationPath);
      setShowAnimation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcons = [
    { label: "LinkedIn", icon: Linkedin, url: personalData.social.linkedin },
    { label: "GitHub", icon: Github, url: personalData.social.github },
    { label: "WhatsApp", icon: MessageCircleMore, url: personalData.social.whatsapp },
    { label: "Email", icon: Mail, url: personalData.social.email },
  ];

  const fieldClass =
    "border-border bg-background text-foreground placeholder:text-muted-foreground/65 focus-visible:ring-primary/35";

  return (
    <section id="contact" className="border-t border-border bg-[hsl(var(--surface-alt))] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-pixel-square mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground">Get in touch</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Want to discuss a project, collaboration or student initiative? Send me a message.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="font-pixel-square text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Direct
            </p>

            <div className="mt-5 space-y-4">
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-3 text-sm text-foreground transition hover:text-primary"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                <span className="min-w-0 truncate">{personalData.email}</span>
              </a>

              <a
                href={`tel:${personalData.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-foreground transition hover:text-primary"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </span>
                <span>{personalData.phone}</span>
              </a>
            </div>

            <div className="my-6 h-px bg-border" />

            <p className="font-pixel-square text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialIcons.map(({ label, icon: Icon, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative min-h-[470px] overflow-hidden rounded-xl border border-border bg-card p-6">
            {showAnimation && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-card/95 backdrop-blur-sm">
                <DotLottieReact
                  src={animationPath}
                  style={{ width: 320, height: 320 }}
                  loop={false}
                  autoplay
                />
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className={fieldClass} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" className={fieldClass} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What would you like to discuss?" className={fieldClass} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={7}
                          placeholder="Write your message..."
                          className={`${fieldClass} resize-none`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting || showAnimation}
                  className="w-full gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
