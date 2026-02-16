import { ExperienceItem, SkillCategory, Certification, Stat } from './types';
import { Layers, Database, Users, Map as MapIcon } from 'lucide-react';
import React from 'react';

export const HERO_DATA = {
  name: "Oleg Bizin",
  title: "GIS Professional (GISP)",
  subtitle: "Enterprise GIS Architect & Developer",
  email: "oleg.bizin87@gmail.com",
  location: "Desert Hot Springs, CA",
  phone: "323-504-1312",
  status: "Authorized to work in the U.S. (No sponsorship) • Open to relocation within California • Remote / Hybrid OK"
};

export const SUMMARY = "GIS professional (GISP) with 15+ years building and scaling enterprise GIS across the public sector and energy. Core strengths: geospatial data architecture (12+ domains/250+ layers), ETL & CAD–GIS pipelines (FME/Python), spatial QA/QC, metadata/catalogs, and cartographic styling at scale (2,000+ styles). Committed to reproducible, measurable outcomes.";

export const STATS: Stat[] = [
  { label: "Years Experience", value: "15+", icon: <Layers className="w-6 h-6" /> },
  { label: "Data Layers Managed", value: "250+", icon: <Database className="w-6 h-6" /> },
  { label: "Users Scaled", value: "3,000+", icon: <Users className="w-6 h-6" /> },
  { label: "Styles Created", value: "2,000+", icon: <MapIcon className="w-6 h-6" /> },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Software & Platforms",
    skills: ["ArcGIS Pro", "ArcGIS Enterprise", "FME Desktop/Server", "QGIS", "GeoServer", "PostgreSQL/PostGIS", "AutoCAD Map 3D", "Metashape"]
  },
  {
    category: "Development & Scripting",
    skills: ["Python (GDAL, pyproj, PyQGIS)", "SQL", "Git", "Web Services (WMS/WFS/REST)", "Process Automation", "ML-assisted Classification"]
  },
  {
    category: "Technical Architecture",
    skills: ["Data Modeling", "ETL & Interoperability", "Spatial QA/QC", "Coordinate Reference Systems", "Metadata Standards", "Topological Correction"]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "1",
    role: "Deputy Project Manager (GIS)",
    company: "Gazprom CPS",
    location: "Remote",
    period: "Jun 2022 – Present",
    description: "Full-lifecycle enterprise GIS for Gazprom’s project division—from scoping/TOR and architecture through build, integration, rollout, testing, and operations.",
    achievements: [
      "Architected a unified enterprise geodata model across 12+ domains and 250+ layers.",
      "Established QA/QC playbooks resolving contractor format fragmentation.",
      "Curated cartographic standards end-to-end; authored topo symbology (2,000+ styles).",
      "Integrated GIS with 4 corporate systems (PM, Land, CAD Vault) for automated refresh.",
      "Reduced pre-project data package preparation time by ~30% via centralized storage."
    ]
  },
  {
    id: "2",
    role: "Expert GIS Analyst",
    company: "Gazprom Neft",
    location: "Tyumen, RU",
    period: "Nov 2019 – Jun 2022",
    description: "Built, rolled out, and scaled a high-load enterprise GIS on an open-source stack for a top-5 Russian energy company.",
    achievements: [
      "Scaled adoption from 0→3,000+ users in 3y making GIS the #1 internal IS by user count.",
      "Designed enterprise data models/classifiers for 200+ layers.",
      "Delivered 10+ enterprise integrations enabling end-to-end data flows.",
      "Established QA/QC pipelines (FME/QGIS) and robust ETL (CAD-GIS).",
      "Productionized ML-based vector-feature classification within ETL."
    ]
  },
  {
    id: "3",
    role: "Senior GIS Specialist",
    company: "Center for Cadastral Valuation",
    location: "Tyumen, RU",
    period: "Sep 2019 – Oct 2019",
    description: "Stood up the geospatial data infrastructure for a newly formed government institution.",
    achievements: [
      "Built the initial spatial data platform from scratch in 2 weeks (GeoPackage/PostGIS).",
      "Engineered spatial-analysis algorithms for price factors.",
      "Consolidated regional datasets into a single source of truth."
    ]
  },
  {
    id: "4",
    role: "Senior GIS Specialist",
    company: "CSOFT-Terra",
    location: "Tyumen, RU",
    period: "Apr 2012 – Sep 2019",
    description: "Implemented municipal/regional GIS platforms end-to-end for government agencies and private clients.",
    achievements: [
      "Delivered 7 GIS rollouts & 15+ prototypes (urban planning, cadaster, utilities).",
      "Processed hundreds of GB of spatial data; produced multi-theme cartographic projects.",
      "Built/operated ETL pipelines (GeoMedia, FME) with validation."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "GISP Certification #162112", issuer: "GISCI", year: "2025" },
  { name: "Foundations of Project Management", issuer: "Google/Coursera", year: "2023" },
  { name: "Deep Learning Specialization", issuer: "Coursera", year: "2020" },
];

export const EDUCATION = {
  degree: "Applied Computer Science in Geography",
  details: "Specialist (5-year program), U.S. bachelor’s equivalent",
  university: "Tyumen State University, Russia",
  years: "2004 – 2010"
};