import React from 'react';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: React.ReactNode;
}