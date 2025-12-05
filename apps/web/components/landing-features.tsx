'use client';

import { motion } from 'motion/react';
import {
  Code2,
  RefreshCw,
  CreditCard,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const features = [
  {
    id: '01',
    title: 'API & Widget',
    description:
      'Embed our powerful search engine directly into your website. Similar to Levam, but faster and more customizable.',
    icon: Code2,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'group-hover:border-amber-500/50',
  },
  {
    id: '02',
    title: 'Inventory Sync',
    description:
      'Real-time synchronization of your parts database. Never oversell or lose track of stock again.',
    icon: RefreshCw,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'group-hover:border-blue-500/50',
  },
  {
    id: '03',
    title: 'Global Payments',
    description:
      'Accept payments from anywhere in the world. Integrated with major payment gateways for B2B and B2C.',
    icon: CreditCard,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'group-hover:border-emerald-500/50',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-32 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-amber-500 font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm tracking-wider uppercase">
                Why PMV Docs?
              </span>
            </div>
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl text-neutral-900 leading-tight">
              Everything you need to run <br />
              your{' '}
              <span className="text-neutral-400">automotive business.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="max-w-sm text-neutral-500 text-lg leading-relaxed">
              A complete suite of tools designed to help you sell more parts to
              more people, with less effort.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={cn(
                'group relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-neutral-100',
                feature.borderColor,
              )}
            >
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300',
                      feature.bgColor,
                      feature.color,
                    )}
                  >
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <span className="font-mono text-xs font-medium text-neutral-300 group-hover:text-neutral-900 transition-colors">
                    {feature.id}
                  </span>
                </div>

                <h3 className="text-2xl font-medium mb-4 text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  {feature.description}
                </p>
              </div>

              <div className="flex items-center text-sm font-medium text-neutral-900 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
