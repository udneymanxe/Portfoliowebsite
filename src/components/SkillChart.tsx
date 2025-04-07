
import React, { useEffect, useRef } from 'react';

interface SkillItem {
  name: string;
  level: number; // 0-100
  color: string;
}

interface SkillChartProps {
  skills: SkillItem[];
}

const SkillChart: React.FC<SkillChartProps> = ({ skills }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = document.querySelectorAll('.skill-bar');
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.classList.add('w-full');
              }, 100 * index);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (chartRef.current) {
      observer.observe(chartRef.current);
    }
    
    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={chartRef} className="w-full max-w-3xl mx-auto">
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={index} className="skill-segment">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium">{skill.name}</h3>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="skill-bar h-full rounded-full w-0 transition-all duration-1000 ease-out"
                style={{ 
                  backgroundColor: skill.color,
                  width: '0%', // Start at 0, will animate to actual width
                  maxWidth: `${skill.level}%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillChart;
