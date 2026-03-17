/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Heart, 
  Sparkles, 
  User, 
  Mail, 
  Instagram, 
  Github, 
  MessageCircle,
  ChevronRight,
  Languages,
  Palette,
  Brush,
  Info,
  Youtube,
  Gamepad2,
  Tv,
  AtSign,
  Users,
  Cake,
  ThumbsUp,
  ThumbsDown,
  Ban,
  BookOpen,
  Ghost
} from 'lucide-react';

type Language = 'KR' | 'EN' | 'JP';

interface Content {
  hero: string;
  quote: string;
  aboutMe: {
    title: string;
    personalityIdentityTitle: string;
    languages: {
      label: string;
      items: string[];
    };
    dream: {
      label: string;
      text: string;
    };
    personality: {
      label: string;
      mbti: string;
      enneagram: string;
      eq: string;
    };
    identity: {
      label: string;
      tags: string[];
      descriptions: {
        panromantic: string;
        asexual: string;
        nonbinary: string;
      };
    };
    genres: {
      label: string;
      subtitle: string;
      items: string[];
      details: string[];
    };
    likes: {
      label: string;
      text: string;
    };
    dislikes: {
      label: string;
      text: string;
    };
    triggers: {
      label: string;
      text: string;
    };
    birthday: {
      label: string;
      text: string;
    };
    copyright: {
      label: string;
      items: string[];
    };
  };
}

const translations: Record<Language, Content> = {
  KR: {
    hero: "Whispers of color and stardust. An artistic journey through soft dreams and whimsical imagination.",
    quote: "I want to see the world through art.",
    aboutMe: {
      title: "ABOUT ME",
      personalityIdentityTitle: "성격 & 정체성",
      languages: {
        label: "언어",
        items: [
          "한국어🇰🇷: 모국어",
          "영어🇱🇷: 어느정도 들을 수는 있지만 아직 어렵다",
          "일본어🇯🇵: 학습 중"
        ]
      },
      dream: {
        label: "꿈",
        text: "저는 꿈을 심어주는 웹툰작가가 되는 것이 꿈입니다."
      },
      personality: {
        label: "성격",
        mbti: "MBTI: INFP 중재자",
        enneagram: "애니어그램: 4W5 보헤미안",
        eq: "정서 지능 높음⬆️"
      },
      identity: {
        label: "성적 지향성과 정체성",
        tags: ["논바이너리 Non-binary", "팬로맨틱 Panromantic", "에이섹슈얼 Asexual"],
        descriptions: {
          nonbinary: "논바이너리 (Non-binary): 스스로의 젠더 정체성이 남성이나 여성이라는 이분법에 속하지 않는다고 느끼는 것을 말해요.",
          panromantic: "팬로맨틱 (Panromantic): '범성'에 해당하는 부분으로, 상대방의 성별이나 젠더 정체성과 관계없이, 사람 그 자체에게 정서적이고 로맨틱한 끌림을 느끼는 지향성을 뜻 해요.",
          asexual: "에이섹슈얼 (Asexual): '무성애'에 해당하는 부분으로, 타인에게 성적 끌림을 느끼지 않는 지향성 이예요"
        }
      },
      genres: {
        label: "좋아하는 장르",
        subtitle: "모든 장르 및 All종족",
        items: ["My OC", "판타지"],
        details: [
          "HL & BL & GL & 논커플링",
          "애니메이션 & 웹툰 & 소설 & 게임 & 노래",
          "인간 & 인외 & 크리쳐 & 오브젝트 & 스틱맨"
        ]
      },
      likes: {
        label: "좋아",
        text: "모든 동물 (조류, 파충류 설치류 등), 친절함, 그림을 그리고 캐릭터 설정을 짜는 것, 공상"
      },
      dislikes: {
        label: "싫어",
        text: "사람"
      },
      triggers: {
        label: "지뢰",
        text: "선 넘는 무례함, 각종 혐오, 우익 장르, 논란 있는 장르 (외에 딱히 가리는 장르는 없습니다.)"
      },
      birthday: {
        label: "생일",
        text: "9월 24일"
      },
      copyright: {
        label: "저작권",
        items: [
          "제가 그린 그림 등의 저작권은 모두 제게 있습니다.",
          "트레, 도용, 배포, AI, 상업적 이용이 불가합니다.",
          "리퀘스트 하실 때 참고 바랍니다."
        ]
      }
    }
  },
  EN: {
    hero: "Whispers of color and stardust. An artistic journey through soft dreams and whimsical imagination.",
    quote: "I want to see the world through art.",
    aboutMe: {
      title: "ABOUT ME",
      personalityIdentityTitle: "Personality & Identity",
      languages: {
        label: "Languages",
        items: [
          "Korean🇰🇷: Native",
          "English🇱🇷: Can understand somewhat but still difficult",
          "Japanese🇯🇵: Learning"
        ]
      },
      dream: {
        label: "Dream",
        text: "My dream is to become a webtoon artist who plants dreams in people's hearts."
      },
      personality: {
        label: "Personality",
        mbti: "MBTI: INFP Mediator",
        enneagram: "Enneagram: 4W5 Bohemian",
        eq: "High Emotional Intelligence⬆️"
      },
      identity: {
        label: "Orientation & Identity",
        tags: ["Non-binary", "Panromantic", "Asexual"],
        descriptions: {
          panromantic: "Panromantic: Romantic attraction towards people regardless of their gender identity.",
          asexual: "Asexual: Experiencing little or no sexual attraction to others.",
          nonbinary: "Non-binary: A gender identity that does not fit into the male/female binary."
        }
      },
      genres: {
        label: "Favorite Genres",
        subtitle: "All Genres & All Races",
        items: ["My OC", "Fantasy"],
        details: [
          "HL & BL & GL & Non-coupling",
          "Animation & Webtoon & Novel & Game & Song",
          "Human & Non-human & Creature & Object & Stickman"
        ]
      },
      likes: {
        label: "Likes",
        text: "All animals (birds, reptiles, rodents, etc.), kindness, drawing and character setting, daydreaming"
      },
      dislikes: {
        label: "Dislikes",
        text: "People"
      },
      triggers: {
        label: "Triggers",
        text: "Rudeness, hatred, right-wing genres, controversial genres (no other specific triggers)"
      },
      birthday: {
        label: "Birthday",
        text: "September 24th"
      },
      copyright: {
        label: "Copyright",
        items: [
          "All rights to the artworks I draw belong to me.",
          "Tracing, theft, distribution, AI use, and commercial use are prohibited.",
          "Please keep this in mind when making requests."
        ]
      }
    }
  },
  JP: {
    hero: "Whispers of color and stardust. An artistic journey through soft dreams and whimsical imagination.",
    quote: "I want to see the world through art.",
    aboutMe: {
      title: "ABOUT ME",
      personalityIdentityTitle: "性格 & アイデンティティ",
      languages: {
        label: "言語",
        items: [
          "韓国語🇰🇷: 母国語",
          "英語🇱🇷: ある程度聞き取れますが、まだ難しいです",
          "日本語🇯🇵: 学習中"
        ]
      },
      dream: {
        label: "夢",
        text: "私は夢を植え付けるウェブトゥーン作家になるのが夢です。"
      },
      personality: {
        label: "性格",
        mbti: "MBTI: INFP 仲介者",
        enneagram: "エニアグラム: 4W5 ボヘミアン",
        eq: "高い感情指数⬆️"
      },
      identity: {
        label: "性的指向とアイデンティティ",
        tags: ["ノンバイナリー Non-binary", "パンロマンティック Panromantic", "アセクシュアル Asexual"],
        descriptions: {
          panromantic: "パンロマンティック (Panromantic): 相手の性別やジェンダーアイデンティティに関係なく、人そのものに情緒的・ロマンティックな惹きつけを感じる指向を意味します。",
          asexual: "アセクシュアル (Asexual): 他人に対して性的惹きつけを感じない指向です。",
          nonbinary: "ノンバイナリー (Non-binary): 自身のジェンダーアイデンティティが男性か女性かという二分法に属さないと感じることを言います。"
        }
      },
      genres: {
        label: "好きなジャンル",
        subtitle: "全ジャンル & 全種族",
        items: ["My OC", "ファンタジー"],
        details: [
          "HL & BL & GL & ノンカップリング",
          "アニメ & ウェブトゥーン & 小説 & ゲーム & 歌",
          "人間 & 人外 & クリーチャー & オブジェクト & スティックマン"
        ]
      },
      likes: {
        label: "好き",
        text: "すべての動物（鳥類、爬虫類、齧歯類など）、親切さ、絵を描くこと、キャラクター設定、空想"
      },
      dislikes: {
        label: "嫌い",
        text: "人"
      },
      triggers: {
        label: "地雷",
        text: "無礼、各種嫌悪、右翼ジャンル、論議のあるジャンル（他に特に選ぶジャンルはありません）"
      },
      birthday: {
        label: "誕生日",
        text: "9月24日"
      },
      copyright: {
        label: "著作権",
        items: [
          "私が描いた絵などの著作権はすべて私にあります。",
          "トレース、盗用、配布、AI、商業的利用は禁止されています。",
          "リクエストの際は参考にしてください。"
        ]
      }
    }
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('KR');
  const [showIdentityInfo, setShowIdentityInfo] = useState(false);

  const content = translations[lang];

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Language Switcher */}
      <nav className="fixed top-6 glass px-6 py-3 rounded-full flex items-center gap-6 z-50">
        <div className="flex items-center gap-2 text-slate-500">
          <Languages size={18} />
          <span className="text-xs font-bold tracking-widest uppercase hidden sm:inline">Language</span>
        </div>
        <div className="flex gap-4">
          {(['KR', 'EN', 'JP'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`text-sm font-medium transition-all duration-300 px-3 py-1 rounded-full ${
                lang === l 
                ? 'bg-pastel-purple text-slate-800 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {l === 'KR' ? '한국어' : l === 'EN' ? 'English' : '日本語'}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-3xl w-full mt-16 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 flex flex-col items-center"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-4">
              <div className="absolute inset-0 bg-pastel-purple/20 rounded-full blur-3xl animate-pulse" />
              <img 
                src="/cat_illustration.webp" 
                alt="Solip dy Mascot"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('.webp')) {
                    target.src = "/cat_illustration.gif";
                  } else if (target.src.endsWith('.gif')) {
                    target.src = "/cat_illustration.png";
                  } else if (target.src.endsWith('.png')) {
                    target.src = "https://picsum.photos/seed/cat/400/400";
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl sm:text-8xl font-cursive text-slate-800 tracking-tight">
                Solip dy
              </h1>
              <div className="flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-pastel-purple to-transparent rounded-full" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="space-y-6"
          >
            <p className="text-xl sm:text-2xl text-slate-600 italic leading-relaxed max-w-2xl mx-auto font-light">
              "{content.hero}"
            </p>
            <div className="flex items-center justify-center gap-3 text-pastel-purple">
              <Sparkles size={20} />
              <p className="text-lg font-medium tracking-wide text-slate-500">
                {content.quote}
              </p>
              <Sparkles size={20} />
            </div>
          </motion.div>
        </section>

        {/* About Me Section - Part 1: ABOUT ME */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-dreamy p-8 sm:p-12 space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pastel-purple/30 rounded-2xl text-slate-700">
              <User size={24} />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-slate-800 text-engraved font-letter">{content.aboutMe.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Languages Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Globe size={16} className="text-pastel-blue" /> {content.aboutMe.languages.label}
              </h3>
              <ul className="space-y-2">
                {content.aboutMe.languages.items.map((item, i) => (
                  <li key={i} className="text-slate-700 text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pastel-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dream Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Heart size={16} className="text-pastel-pink" /> {content.aboutMe.dream.label}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">{content.aboutMe.dream.text}</p>
            </div>

            {/* Birthday Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Cake size={16} className="text-pastel-pink" /> {content.aboutMe.birthday.label}
              </h3>
              <p className="text-slate-700 font-medium">{content.aboutMe.birthday.text}</p>
            </div>
          </div>
        </motion.section>

        {/* About Me Section - Part 2: Personality & Identity */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-dreamy p-8 sm:p-12 space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pastel-blue/30 rounded-2xl text-slate-700">
              <Palette size={24} />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-slate-800 text-engraved font-letter">{content.aboutMe.personalityIdentityTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Personality Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Brush size={16} className="text-pastel-purple" /> {content.aboutMe.personality.label}
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-pastel-blue/30 px-3 py-1 rounded-lg text-sm text-slate-700">{content.aboutMe.personality.mbti}</span>
                  <span className="bg-pastel-pink/30 px-3 py-1 rounded-lg text-sm text-slate-700">{content.aboutMe.personality.enneagram}</span>
                </div>
                <p className="text-slate-600 font-medium italic text-sm">{content.aboutMe.personality.eq}</p>
              </div>
            </div>

            {/* Identity Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4 lg:col-span-2">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Info size={16} className="text-pastel-purple" /> {content.aboutMe.identity.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {content.aboutMe.identity.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium bg-white/60 border border-slate-100 px-3 py-1.5 rounded-full text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => setShowIdentityInfo(!showIdentityInfo)}
                className="text-xs font-bold text-pastel-purple hover:text-slate-800 transition-colors flex items-center gap-1 group"
              >
                {lang === 'KR' ? '자세히 보기' : lang === 'EN' ? 'Learn more' : '詳細を見る'}
                <ChevronRight size={14} className={`transition-transform duration-300 ${showIdentityInfo ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showIdentityInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/60 rounded-2xl p-4 mt-2 space-y-3 text-xs text-slate-600 leading-relaxed border border-white/20">
                      <p>{content.aboutMe.identity.descriptions.nonbinary}</p>
                      <p>{content.aboutMe.identity.descriptions.panromantic}</p>
                      <p>{content.aboutMe.identity.descriptions.asexual}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* About Me Section - Part 3: Genres & Preferences */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-dreamy p-8 sm:p-12 space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pastel-purple/30 rounded-2xl text-slate-700">
              <BookOpen size={24} />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-slate-800 text-engraved font-letter">{content.aboutMe.genres.label}</h2>
          </div>

          <div className="space-y-6">
            {/* Genres Section */}
            <div className="bg-white/40 p-8 rounded-3xl border border-white/20 space-y-8">
              <div className="text-center space-y-2">
                <p 
                  className="text-xs font-bold text-purple-900/40 tracking-tight italic"
                  style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(0,0,0,0.05)' }}
                >
                  {content.aboutMe.genres.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-wrap justify-center md:justify-end gap-3 content-center">
                  {content.aboutMe.genres.items.map((item, i) => (
                    <div key={i} className="px-6 py-2 bg-white rounded-full border border-pastel-purple/20 shadow-sm">
                      <span className="text-slate-700 font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-center md:text-left border-l-0 md:border-l border-slate-100 md:pl-8">
                  {content.aboutMe.genres.details.map((detail, i) => (
                    <p key={i} className="text-xs text-slate-500 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Likes Card */}
              <div className="bg-emerald-50/30 p-6 rounded-3xl border border-emerald-100/50 space-y-3">
                <h3 className="text-xl font-bold text-emerald-600/60 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                  <ThumbsUp size={16} /> {content.aboutMe.likes.label}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {content.aboutMe.likes.text}
                </p>
              </div>

              {/* Dislikes Card */}
              <div className="bg-rose-50/30 p-6 rounded-3xl border border-rose-100/50 space-y-3">
                <h3 className="text-xl font-bold text-rose-600/60 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                  <ThumbsDown size={16} /> {content.aboutMe.dislikes.label}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {content.aboutMe.dislikes.text}
                </p>
              </div>

              {/* Triggers Card */}
              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-200/50 space-y-3">
                <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                  <Ban size={16} /> {content.aboutMe.triggers.label}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  {content.aboutMe.triggers.text}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* About Me Section - Part 4: Copyright */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-dreamy p-8 sm:p-12 space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pastel-purple/30 rounded-2xl text-slate-700">
              <Ghost size={24} />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-slate-800 text-engraved font-letter">{content.aboutMe.copyright.label}</h2>
          </div>
          <ul className="space-y-4 text-slate-600">
            {content.aboutMe.copyright.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pastel-purple shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* SNS Section */}
        <section className="space-y-8 text-center">
          <h2 className="text-3xl font-cursive text-slate-800">SNS</h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {[
              { icon: <Youtube />, label: 'YouTube', href: 'https://www.youtube.com/@solip-dy', color: 'hover:text-red-500' },
              { icon: <Instagram />, label: 'Instagram', href: 'https://www.instagram.com/solip.dy/', color: 'hover:text-pink-500' },
              { icon: <AtSign />, label: 'Threads', href: 'https://www.threads.com/@solip.dy', color: 'hover:text-slate-800' },
              { icon: <Tv />, label: 'Chzzk', href: 'https://chzzk.naver.com/dd5ace546a6aaef2d5103ca628a02878', color: 'hover:text-emerald-500' },
              { icon: <Gamepad2 />, label: 'Steam', href: 'https://steamcommunity.com/profiles/76561199487270172', color: 'hover:text-blue-600' },
              { icon: <MessageCircle />, label: 'Discord', href: 'https://www.discord.com/users/914029045975515136', color: 'hover:text-indigo-500' },
              { icon: <Users />, label: 'Fan Server', href: 'https://discord.gg/C5n6n7q4yH', color: 'hover:text-indigo-400' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className={`flex flex-col items-center gap-2 text-slate-400 transition-all duration-300 ${social.color}`}
              >
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50 group-hover:shadow-md">
                  {social.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 text-center space-y-4">
        <p className="text-sm text-slate-400 font-light tracking-widest">
          © 2024 Solip dy. All rights reserved.
        </p>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pastel-pink" />
          <div className="w-2 h-2 rounded-full bg-pastel-blue" />
          <div className="w-2 h-2 rounded-full bg-pastel-purple" />
        </div>
      </footer>
    </div>
  );
};

export default App;
