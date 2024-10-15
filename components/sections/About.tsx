'use client';
import Image from 'next/image';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Play } from 'lucide-react';

export function About() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div id="about">
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05
                }
              }}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-4/5 w-full max-w-[500px] flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-bold text-neutral-700 dark:text-neutral-200">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="text-neutral-600 dark:text-neutral-400">
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="mt-4 rounded-full bg-primary p-3 text-sm font-bold text-white hover:bg-primary/80 dark:text-black md:mt-0"
                  >
                    <Play size={14} strokeWidth={3}></Play>
                  </motion.a>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] dark:text-neutral-400 md:h-fit md:text-sm lg:text-base"
                  >
                    {typeof active.content === 'function' ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto w-full max-w-2xl gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 md:flex-row"
          >
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-28 w-28 rounded-lg object-cover object-top md:h-14 md:w-14"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="text-center font-medium text-neutral-800 dark:text-neutral-200 md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-center text-neutral-600 dark:text-neutral-400 md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="mt-4 rounded-full bg-primary p-3 text-sm font-bold text-white hover:bg-primary/80 dark:text-black md:mt-0"
            >
              <Play size={14} strokeWidth={3}></Play>
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05
        }
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: 'UI/UX Designer · Full Stack Developer',
    title: 'Sheel Taskar',
    src: '/pic1.JPG',
    ctaText: 'Play',
    ctaLink: 'https://www.linkedin.com/in/sheel-taskar/',
    content: () => {
      return (
        <p>
          Meet Sheel, a tech wizard who solves complex problems faster than he can finish a bowl of his legendary Butter Chicken. As a
          full-stack developer and data scientist, he&apos;s basically a one-person tech dream team, turning tangled code into smooth, efficient
          solutions while sprinkling in data insights like magic. <br /> <br /> At LTIMindtree, Sheel played tag with the ever-shifting tech
          landscape, nailing full-stack projects and having a lot of fun. Also, he&apos;s a Liverpool FC fanatic, so expect him to slip a “You&apos;ll
          Never Walk Alone” reference into your next code review. Oh, and if you&apos;re lucky, you might just score an invite to try his famous
          Gulab Jamun!
        </p>
      );
    }
  },
  {
    description: 'Content Writer · Frontend Developer',
    title: 'Supril Singh',
    src: '/pic2.JPG',
    ctaText: 'Play',
    ctaLink: 'https://www.linkedin.com/in/supril-singh/',
    content: () => {
      return (
        <p>
          Meet Supril, a tech wizard with expertise in Java, Python, Go, React, and AWS, boasting over three years of experience building
          scalable solutions. As a Senior Cloud Application Developer at ZS Associates, he&apos;s tackled everything from creating a migration
          toolkit that slashed man-hours by 50% to designing sleek microservices that keep systems running at 99.9% availability. <br />{' '}
          <br /> Supril loves crafting cutting-edge apps, mentoring teammates, and optimizing cloud architectures. When he&apos;s not busy in the
          tech world, you can find him hitting the gym or exploring new travel destinations.
        </p>
      );
    }
  },

  {
    description: 'Client Outreach · Backend Developer',
    title: 'Harshit Gupta',
    src: '/pic3.JPG',
    ctaText: 'Play',
    ctaLink: 'https://www.linkedin.com/in/harshit-gupta-a2111312a/',
    content: () => {
      return (
        <p>
          Meet Harshit, a skilled software engineer with a passion for problem-solving and coding. Specializing in building high-performance
          e-commerce websites, he re-designed and developed a new flow in Go that boosted search index efficiency, releasing it with zero
          bugs. <br /> <br /> His innovations and algorithm integrations led to generating billions in additional monthly revenue. A GATE
          CSE qualifier with experience in clearing MTech interviews for IITs, Harshit brings a sharp technical mind to every project. When
          not optimizing code, he&apos;s driving business value through creative solutions and program management.
        </p>
      );
    }
  }
];
