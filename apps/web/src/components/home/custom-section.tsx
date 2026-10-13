import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Fake data for FAQ
const faqs = [
  { question: "What services do you offer?", answer: "We provide end-to-end telecommunications infrastructure services, including survey, design, build, and integration." },
  { question: "How experienced is your team?", answer: "Our team consists of industry veterans with decades of combined experience in network deployment and optimization." },
  { question: "Do you support 5G integration?", answer: "Yes, we specialize in seamless 5G network integration and legacy system upgrades." }
];

// Fake data for cards
const features = [
  { title: "Rapid Deployment", description: "Accelerate your network rollout with our streamlined processes." },
  { title: "Quality Assurance", description: "Rigorous testing and validation at every stage of the lifecycle." },
  { title: "24/7 Support", description: "Round-the-clock monitoring and maintenance for your infrastructure." },
  { title: "Scalable Solutions", description: "Future-proof designs that grow with your network demands." },
  { title: "Cost Optimization", description: "Efficient resource allocation to maximize your ROI." },
  { title: "Sustainable Practices", description: "Eco-friendly approaches to network building and operation." }
];

export function CustomSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-9xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24"
        >
          {/* Section 1: First Paragraph Section */}
          <motion.div variants={itemVariants} className="text-center max-w-7xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Empowering the Future of Connectivity
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We stand at the forefront of the digital revolution, bridging the gap between current limitations and future possibilities. Our comprehensive approach ensures that every network we build is robust, reliable, and ready for tomorrow's demands.
            </p>
          </motion.div>

          {/* Section 2: Second Paragraph Section */}
          <motion.div variants={itemVariants} className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6 border border-border/50 backdrop-blur-sm">
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">
              A Commitment to Excellence
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Our mission goes beyond laying cables and installing antennas. We are dedicated to creating seamless communication ecosystems that empower communities and drive businesses forward. Through innovation and unwavering dedication, we redefine what's possible in telecommunications.
            </p>
          </motion.div>

          {/* Section 3: FAQ Section */}
          <motion.div variants={itemVariants} className="max-w-7xl mx-auto w-full space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h3>
              <p className="text-muted-foreground">Find answers to common questions about our services.</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-left text-lg hover:no-underline hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Section 4: 6 Cards Section */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="text-center space-y-4 max-w-7xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold">Core Capabilities</h3>
              <p className="text-muted-foreground">Explore the features that set us apart in the industry.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
      
      {/* Background ambient effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
}
