"use client";

import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

interface CardSectionProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
}

const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ Icon, title, description, features }, ref) => {
    return (
      <div
        ref={ref}
        className="group relative bg-(--bg-secondary)/20 hover:bg-(--bg-secondary)/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-(--border-secondary) overflow-hidden"
      >
        <div className="relative z-10 space-y-4">
          <div className="inline-flex p-3 bg-(--bg-tertiary)/10 rounded-lg">
            <Icon className="w-6 h-6 text-(--text-tertiary)" />
          </div>

          <div className="text-xl md:text-2xl font-bold">{title}</div>

          <p className="text-(--text-muted) text-[12px] sm:text-[16px] md:text-lg">
            {description}
          </p>

          {features && (
            <div className="flex flex-wrap gap-2 pt-4">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 bg-(--bg-tertiary)/10 text-xs sm:text-[16px] text-(--text-tertiary) rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

CardSection.displayName = "CardSection";

export default CardSection;
