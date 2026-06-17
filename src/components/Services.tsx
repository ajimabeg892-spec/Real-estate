/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Landmark, Compass, Coins, Verified } from 'lucide-react';

export default function Services() {
  const serviceList = [
    {
      icon: landmarkIcon,
      title: 'Acquisition Representing',
      subtitle: 'Premium Buying Advisory',
      description: 'We act strictly as a singular client representative, navigating complex private off-market listings, executing comparative legal analyses, and negotiating favorable closing covenants with complete confidentiality.',
      benefits: ['Full buyer representation rights', 'Unlisted asset database matching', 'Custom structural due diligences']
    },
    {
      icon: compassIcon,
      title: 'Private Asset Placements',
      subtitle: 'Premium Selling Curations',
      description: 'Your legacy deserves custom curation. We structure confidential property campaigns to direct qualified ultra-high-net-worth investors, avoiding mass public syndications to preserve your listing value.',
      benefits: ['Closed group private presentations', 'Aesthetic visual direction alignment', 'High-security private show controls']
    },
    {
      icon: coinsIcon,
      title: 'Investment Portfolio Advisory',
      subtitle: 'Sovereign Capital Allocations',
      description: 'Analyzing physical real estate structures as productive financial assets. We advise on tax-efficient holding trusts, dual-citizenship programs, zoning plays, and multi-generational family estate planning.',
      benefits: ['Global micro-market tracking digests', 'Tax-optimized trust creations', 'Disruptive capital yielding reviews']
    },
    {
      icon: verifiedIcon,
      title: 'White-Glove Concierge Trust',
      subtitle: 'Complete Estate Governance',
      description: 'Ensuring your physical sanctuary stays pristine. Our bespoke estate management spans security vetting, culinary crew placements, helicopter tarmac clearances, and absolute asset physical uptime controls.',
      benefits: ['24/7 designated estate managers', 'Private protective service details', 'Custom property physical health checks']
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-luxury-charcoal/20 select-none border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Heading */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="sans-text text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium block mb-3">
            Elite Capabilities
          </span>
          <h2 className="serif-header text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide leading-tight">
            Consultancy Modules Built For <br />
            <span className="italic font-medium text-luxury-gold/90">Asset Sovereignty.</span>
          </h2>
          <div className="w-20 h-[1px] bg-luxury-gold mt-6" />
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {serviceList.map((service, idx) => (
            <motion.div
              id={`service-card-${idx}`}
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-luxury-coal/50 border border-white/5 rounded-2xl p-8 hover:border-luxury-gold/25 hover:shadow-2xl hover:shadow-luxury-gold/5 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon Row */}
                <div className="flex justify-between items-start mb-6 w-full">
                  <div className="w-12 h-12 rounded-xl bg-luxury-charcoal flex items-center justify-center text-luxury-gold border border-white/5 group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all duration-500">
                    {service.icon}
                  </div>
                  <span className="sans-text text-[10px] text-gray-400 font-light tracking-[0.2em]">{service.subtitle}</span>
                </div>

                {/* Typography details */}
                <h3 className="serif-header text-xl font-light text-[#fafaf7] group-hover:text-luxury-gold tracking-wide transition-colors duration-300 mb-4">
                  {service.title}
                </h3>
                <p className="sans-text text-xs text-gray-400 font-light leading-relaxed tracking-wide mb-8">
                  {service.description}
                </p>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2 border-t border-white/5 pt-6 text-gray-300">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="sans-text text-[11px] font-light flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Icons
const landmarkIcon = <Landmark size={20} className="stroke-[1.5]" />;
const compassIcon = <Compass size={20} className="stroke-[1.5]" />;
const coinsIcon = <Coins size={20} className="stroke-[1.5]" />;
const verifiedIcon = <Verified size={20} className="stroke-[1.5]" />;
