"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Globe, Zap, Building2, Clock3 } from "lucide-react";
import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";

const locations = [
  { 
    name: "United States", 
    city: "San Francisco", 
    lat: 37.7749, 
    lng: -122.4194,
    region: "Americas",
    coverage: "UTC -8 to -5"
  },
  { 
    name: "United Kingdom", 
    city: "London", 
    lat: 51.5074, 
    lng: -0.1278,
    region: "EMEA",
    coverage: "UTC +0"
  },
  { 
    name: "India", 
    city: "Bangalore", 
    lat: 12.9716, 
    lng: 77.5946,
    region: "APAC",
    coverage: "UTC +5:30"
  },
  { 
    name: "Australia", 
    city: "Sydney", 
    lat: -33.8688, 
    lng: 151.2093,
    region: "APAC East",
    coverage: "UTC +10"
  },
];

const worldTopology = worldAtlas as unknown as Topology<{ countries: GeometryCollection }>;
const world = feature(
  worldTopology,
  worldTopology.objects.countries
) as FeatureCollection<Geometry>;

const graticule = geoGraticule10();

export function GlobalPresence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const rotationRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(500, window.innerWidth - 40);
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.38;

    const projection = geoOrthographic()
      .translate([centerX, centerY])
      .scale(radius)
      .clipAngle(90)
      .precision(0.5);

    const path = geoPath(projection, ctx);

    // Convert lat/lng to orthographic 3D coordinates on sphere
    const latLngTo3D = (lat: number, lng: number, rotation: number) => {
      const latRad = (lat * Math.PI) / 180;
      const lngDeltaRad = ((lng - rotation) * Math.PI) / 180;

      const cosLat = Math.cos(latRad);
      const x = radius * cosLat * Math.sin(lngDeltaRad);
      const y = radius * Math.sin(latRad);
      const z = radius * cosLat * Math.cos(lngDeltaRad);
      
      return { x: centerX + x, y: centerY - y, z };
    };

    const drawGlobe = (rotation: number) => {
      ctx.clearRect(0, 0, size, size);
      projection.rotate([-rotation, 0, 0]);

      // Outer glow
      const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.4);
      outerGlow.addColorStop(0, "rgba(99, 179, 237, 0.15)");
      outerGlow.addColorStop(0.5, "rgba(103, 232, 249, 0.08)");
      outerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, size, size);

      // Globe base with gradient (ocean)
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3, 
        centerY - radius * 0.3, 
        0, 
        centerX, 
        centerY, 
        radius
      );
      gradient.addColorStop(0, "rgba(30, 64, 100, 0.4)");
      gradient.addColorStop(0.5, "rgba(20, 50, 90, 0.35)");
      gradient.addColorStop(1, "rgba(10, 30, 60, 0.3)");
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Globe border glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99, 179, 237, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw real world map data inside globe clipping
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(103, 232, 249, 0.1)";
      ctx.lineWidth = 0.7;
      ctx.stroke();

      ctx.beginPath();
      for (const country of world.features) {
        path(country);
      }
      ctx.fillStyle = "rgba(82, 168, 224, 0.36)";
      ctx.fill();
      ctx.strokeStyle = "rgba(103, 232, 249, 0.55)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      // Connection arcs between locations (draw first, behind markers)
      const locationPoints = locations.map((loc, index) => ({ 
        ...loc, 
        index, 
        point: latLngTo3D(loc.lat, loc.lng, rotation) 
      }));
      
      const visibleLocations = locationPoints.filter(loc => loc.point.z > 0);

      for (let i = 0; i < visibleLocations.length; i++) {
        for (let j = i + 1; j < visibleLocations.length; j++) {
          const loc1 = visibleLocations[i];
          const loc2 = visibleLocations[j];
          
          // Draw curved arc
          ctx.beginPath();
          const midX = (loc1.point.x + loc2.point.x) / 2;
          const midY = (loc1.point.y + loc2.point.y) / 2 - 50;
          ctx.moveTo(loc1.point.x, loc1.point.y);
          ctx.quadraticCurveTo(midX, midY, loc2.point.x, loc2.point.y);
          
          const arcGradient = ctx.createLinearGradient(loc1.point.x, loc1.point.y, loc2.point.x, loc2.point.y);
          arcGradient.addColorStop(0, "rgba(99, 179, 237, 0.6)");
          arcGradient.addColorStop(0.5, "rgba(103, 232, 249, 0.8)");
          arcGradient.addColorStop(1, "rgba(167, 139, 250, 0.6)");
          ctx.strokeStyle = arcGradient;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Animated particle on arc
          const particleProgress = ((Date.now() / 2000) + i * 0.25 + j * 0.1) % 1;
          const t = particleProgress;
          const particleX = (1 - t) * (1 - t) * loc1.point.x + 2 * (1 - t) * t * midX + t * t * loc2.point.x;
          const particleY = (1 - t) * (1 - t) * loc1.point.y + 2 * (1 - t) * t * midY + t * t * loc2.point.y;
          
          // Particle glow
          const particleGlow = ctx.createRadialGradient(particleX, particleY, 0, particleX, particleY, 10);
          particleGlow.addColorStop(0, "rgba(103, 232, 249, 0.8)");
          particleGlow.addColorStop(1, "transparent");
          ctx.fillStyle = particleGlow;
          ctx.fillRect(particleX - 10, particleY - 10, 20, 20);
          
          ctx.beginPath();
          ctx.arc(particleX, particleY, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#67e8f9";
          ctx.fill();
        }
      }

      // Draw location markers
      locations.forEach((location, index) => {
        const point = latLngTo3D(location.lat, location.lng, rotation);
        
        if (point.z > 0) {
          const isHovered = hoveredLocation === index;
          const markerSize = isHovered ? 14 : 10;
          
          // Animated pulse rings
          const time = Date.now() / 1000;
          for (let i = 0; i < 3; i++) {
            const pulseProgress = ((time * 0.5 + i * 0.33) % 1);
            const currentPulseSize = markerSize * (1.5 + pulseProgress * 2.5);
            const pulseOpacity = (1 - pulseProgress) * 0.5;
            
            ctx.beginPath();
            ctx.arc(point.x, point.y, currentPulseSize, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(103, 232, 249, ${pulseOpacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Outer glow
          const markerGlow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, markerSize * 3);
          markerGlow.addColorStop(0, "rgba(103, 232, 249, 0.6)");
          markerGlow.addColorStop(0.5, "rgba(99, 179, 237, 0.3)");
          markerGlow.addColorStop(1, "transparent");
          ctx.fillStyle = markerGlow;
          ctx.fillRect(point.x - markerSize * 3, point.y - markerSize * 3, markerSize * 6, markerSize * 6);

          // Main marker
          ctx.beginPath();
          ctx.arc(point.x, point.y, markerSize, 0, Math.PI * 2);
          const markerGradient = ctx.createRadialGradient(point.x - 2, point.y - 2, 0, point.x, point.y, markerSize);
          markerGradient.addColorStop(0, "#67e8f9");
          markerGradient.addColorStop(1, "#3b82f6");
          ctx.fillStyle = markerGradient;
          ctx.fill();
          
          // Marker border
          ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // City label
          if (isHovered) {
            // Label background
            const labelText = location.city;
            ctx.font = "bold 14px Inter, sans-serif";
            const textWidth = ctx.measureText(labelText).width;
            
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.beginPath();
            ctx.roundRect(point.x - textWidth / 2 - 10, point.y - markerSize - 45, textWidth + 20, 35, 8);
            ctx.fill();
            ctx.strokeStyle = "rgba(103, 232, 249, 0.5)";
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(labelText, point.x, point.y - markerSize - 22);
            
            ctx.font = "11px Inter, sans-serif";
            ctx.fillStyle = "rgba(103, 232, 249, 0.9)";
            ctx.fillText(location.name, point.x, point.y - markerSize - 36);
          }
        }
      });
    };

    const animate = () => {
      rotationRef.current += 0.12;
      drawGlobe(rotationRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredLocation]);

  return (
    <section id="global" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px] animate-pulse-glow" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent mb-4 tracking-wider uppercase">
            <Globe className="w-4 h-4" />
            Global Delivery Grid
          </span>
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl text-white mb-6 text-balance heading-glow">
            One AI Operating Model. <span className="heading-focus">Multiple Markets.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We deliver continuous AI execution across regions with shared standards for reliability, governance, and performance.
          </p>
        </div>

        {/* Globe and Stats Container */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Globe */}
          <div className="relative flex justify-center animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="max-w-full"
                style={{ width: "min(500px, 100%)", height: "auto", aspectRatio: "1" }}
              />
              
              {/* Floating stats around globe */}
              <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 animate-float border-gradient">
                <div className="flex items-center gap-2">
                  <Clock3 className="w-4 h-4 text-accent" />
                  <span className="font-bold text-foreground">24/7</span>
                  <span className="text-xs text-muted-foreground">Coverage</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 animate-float border-gradient" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-bold text-foreground">5</span>
                  <span className="text-xs text-muted-foreground">Time Zones</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-8 glass rounded-xl px-4 py-3 animate-float border-gradient hidden md:flex" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-chart-3" />
                  <span className="font-bold text-foreground">4</span>
                  <span className="text-xs text-muted-foreground">Delivery Hubs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Cards */}
          <div className="space-y-4">
            {locations.map((location, index) => (
              <div
                key={index}
                className="group glass rounded-2xl p-5 glass-hover border-gradient cursor-pointer transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-right-8 duration-700"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
                onMouseEnter={() => setHoveredLocation(index)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:gradient-text transition-all duration-300">
                      {location.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{location.city}</p>
                  </div>
                  
                  {/* Coverage */}
                  <div className="flex gap-6 text-center">
                    <div>
                      <div className="text-sm font-semibold text-cyan-200">{location.region}</div>
                      <div className="text-xs text-muted-foreground">Region</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-cyan-200">{location.coverage}</div>
                      <div className="text-xs text-muted-foreground">Coverage</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
