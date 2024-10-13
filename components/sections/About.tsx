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
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%]"
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
            <div className="flex flex-col gap-4 md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 rounded-lg object-cover object-top md:h-14 md:w-14"
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
    src: '/pic1.jpg',
    ctaText: 'Play',
    ctaLink: 'https://www.linkedin.com/in/sheel-taskar/',
    content: () => {
      return (
        <p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for her melancholic and cinematic music style. Born Elizabeth
          Woolridge Grant in New York City, she has captivated audiences worldwide with her haunting voice and introspective lyrics. <br />{' '}
          <br /> Her songs often explore themes of tragic romance, glamour, and melancholia, drawing inspiration from both contemporary and
          vintage pop culture. With a career that has seen numerous critically acclaimed albums, Lana Del Rey has established herself as a
          unique and influential figure in the music industry, earning a dedicated fan base and numerous accolades.
        </p>
      );
    }
  },
  {
    description: 'Content Writer · Frontend Developer',
    title: 'Supril Singh',
    src: '/pic2.jpg',
    ctaText: 'Play',
    ctaLink: 'https://www.linkedin.com/in/supril-singh/',
    content: () => {
      return (
        <p>
          Babu Maan, a legendary Punjabi singer, is renowned for his soulful voice and profound lyrics that resonate deeply with his
          audience. Born in the village of Khant Maanpur in Punjab, India, he has become a cultural icon in the Punjabi music industry.{' '}
          <br /> <br /> His songs often reflect the struggles and triumphs of everyday life, capturing the essence of Punjabi culture and
          traditions. With a career spanning over two decades, Babu Maan has released numerous hit albums and singles that have garnered him
          a massive fan following both in India and abroad.
        </p>
      );
    }
  },

  {
    description: 'Client Outreach · Backend Developer',
    title: 'Harshit Gupta',
    src: '/pic3.jpg',
    ctaText: 'Play',
    ctaLink: 'https://www.linkedin.com/in/harshit-gupta-a2111312a/',
    content: () => {
      return (
        <p>
          Metallica, an iconic American heavy metal band, is renowned for their powerful sound and intense performances that resonate deeply
          with their audience. Formed in Los Angeles, California, they have become a cultural icon in the heavy metal music industry. <br />{' '}
          <br /> Their songs often reflect themes of aggression, social issues, and personal struggles, capturing the essence of the heavy
          metal genre. With a career spanning over four decades, Metallica has released numerous hit albums and singles that have garnered
          them a massive fan following both in the United States and abroad.
        </p>
      );
    }
  }
];
