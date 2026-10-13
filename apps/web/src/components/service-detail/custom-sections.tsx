import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from '@/components/ui/reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Service } from '@/data/services';

export function CustomSections({ service }: { service: Service }) {
  const reduce = useReducedMotion();
  const sections = service.customSections ?? [];

  if (!sections.length) return null;

  return (
    <div className="w-full flex flex-col">
      {sections.map((section, index) => {
        // Section 1 vs Section 2 info styles
        const isAlternateInfo = index % 2 !== 0 && (!('kind' in section) || section.kind === 'info');
        const isInfoSection = !('kind' in section) || section.kind === 'info';
        const hasImage = isInfoSection && Boolean(section.image);

        return (
          <section
            key={`${section.kind ?? 'info'}-${section.title}-${index}`}
            className={`w-full py-20 md:py-32 relative overflow-hidden ${isAlternateInfo ? 'bg-muted/30 border-y border-border/50' : 'bg-background'
              }`}
          >
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-12xl">
              <Reveal>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
                  className={`w-full ${
                    hasImage
                      ? 'grid grid-cols-1 items-center gap-8 text-left lg:grid-cols-2 lg:gap-12'
                      : 'flex flex-col items-center space-y-8 text-center'
                  }`}
                >
                  <div className={`w-full space-y-4 ${hasImage ? '' : 'max-w-9xl'}`}>
                    <h2 className={`text-3xl md:text-5xl font-bold tracking-tight text-foreground ${hasImage ? 'text-left' : ''}`}>
                      {section.title}
                    </h2>
                    {section.description && (
                      <div className={`space-y-5 text-lg md:text-xl text-muted-foreground leading-relaxed ${hasImage ? 'text-left' : ''}`}>
                        {section.description
                          .split(/\n\s*\n/)
                          .filter((paragraph) => paragraph.trim())
                          .map((paragraph, paragraphIndex) => (
                            <p key={paragraphIndex}>
                              {paragraph.trim()}
                            </p>
                          ))}
                      </div>
                    )}

                    {/* INFO SECTION (Bullets if any) */}
                    {(!('kind' in section) || section.kind === 'info') && section.bullets?.length ? (
                      <motion.ul
                        className="mt-8 grid grid-cols-2 gap-4 w-full m-auto max-w-7xl text-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          visible: { transition: { staggerChildren: 0.1 } }
                        }}
                      >
                        {section.bullets.map(item => (
                          <motion.li
                            key={item}
                            className="flex items-start gap-3 text-lg text-muted-foreground"
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 }
                            }}
                          >
                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </div>

                  {isInfoSection && section.image && (
                    <motion.figure
                      className="m-0 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-xl shadow-black/10"
                      initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
                    >
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.figure>
                  )}

                  {/* FAQ SECTION */}
                  {'kind' in section && section.kind === 'faq' ? (
                    <div className="w-full max-w-7xl mt-12 text-left">
                      <Accordion type="single" collapsible className="w-full">
                        {section.items.map((item, itemIndex) => (
                          <AccordionItem key={itemIndex} value={`item-${itemIndex}`} className="border-b border-border/50">
                            <AccordionTrigger className="text-left text-lg hover:no-underline hover:text-primary transition-colors py-6">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ) : null}

                  {/* CARDS SECTION */}
                  {'kind' in section && section.kind === 'cards' ? (
                    <div className="w-full mt-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {section.cards.map((card, cardIndex) => (
                          <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: cardIndex * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="h-full"
                          >
                            <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                              <CardHeader>
                                <div className="text-sm font-bold text-primary mb-3">0{cardIndex + 1}</div>
                                <CardTitle className="text-xl leading-tight">{card.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <CardDescription className="text-base leading-relaxed">
                                  {card.description}
                                </CardDescription>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                </motion.div>
              </Reveal>
            </div>

            {/* Ambient Background Glow for alternate sections */}
            {isAlternateInfo && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            )}
          </section>
        );
      })}
    </div>
  );
}
