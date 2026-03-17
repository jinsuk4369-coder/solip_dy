import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ButterflyIcon = ({ className, active }: { className?: string, active?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 ${className}`}>
    <path d="M12 12c-2-2-5-2-5 0s3 2 5 0z" />
    <path d="M12 12c2-2 5-2 5 0s-3 2-5 0z" />
    <path d="M12 12c-3-3-8-2-8 2s5 5 8 2z" />
    <path d="M12 12c3-3 8-2 8 2s-5 5-8 2z" />
  </svg>
);

const items = [
  { title: "MBTI: INFP 중재자", content: "내면의 뜨거운 열정과 깊은 감수성으로 세상을 따뜻하게 바라보며 평화와 조화를 추구합니다." },
  { title: "애니어그램: 4w5 보헤미안", content: "자신만의 고유한 정체성을 중시하며, 세상을 예리하게 관찰하는 지적인 호기심을 지녔습니다." },
  { title: "하위 유형: SP 4 (자기보존)", content: "깊은 감수성을 겉으로 과시하지 않고 조용히 품어내는 외유내강형입니다. 독립심이 강하며, 혼자만의 시간 속에서 감정을 단단하게 승화시킵니다." },
  { title: "별자리: 천칭자리", content: "관계의 조화와 균형을 중시하며, 일상 속에서도 특유의 세련된 미적 감각을 발휘합니다." },
  { title: "정서 지능 높음 ⬆️", content: "타인의 마음에 깊이 공감하고 배려하며, 섬세하고 유연하게 소통하는 따뜻함을 갖추고 있습니다." }
];

export const PersonalityAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number, e: React.MouseEvent) => {
    const target = e.currentTarget;
    const icon = target.querySelector('.butterfly-icon');
    if (!icon) return;

    // Particle effect: Create multiple glass butterflies
    for (let i = 0; i < 6; i++) {
      const clone = icon.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.top = icon.getBoundingClientRect().top + 'px';
      clone.style.left = icon.getBoundingClientRect().left + 'px';
      clone.style.zIndex = '1000';
      clone.style.pointerEvents = 'none';
      clone.style.color = 'rgba(255, 255, 255, 0.6)';
      clone.style.transition = 'all 1.5s ease-out';
      document.body.appendChild(clone);

      setTimeout(() => {
        const angle = (Math.random() - 0.5) * Math.PI;
        const distance = 100 + Math.random() * 100;
        clone.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 50}px) scale(${0.5 + Math.random()})`;
        clone.style.opacity = '0';
      }, 10);

      setTimeout(() => clone.remove(), 1500);
    }

    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2 max-w-2xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80">
          <button
            onClick={(e) => handleToggle(index, e)}
            className={`w-full flex items-center justify-between p-4 transition-colors duration-300 ${openIndex === index ? 'bg-pastel-purple/10' : ''}`}
          >
            <span className="text-lg font-medium text-slate-700">{item.title}</span>
            <div className={`butterfly-icon transition-all duration-500 ${openIndex === index ? 'animate-bounce-slow' : 'hover:animate-pulse'}`}>
              <ButterflyIcon active={openIndex === index} />
            </div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="p-4 pt-0 text-slate-600 leading-relaxed">{item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
