/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';

const Player = ReactPlayer as any;

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
  ChevronDown,
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
  Ghost,
  Scale,
  Flower2,
  Music,
  Key,
  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  VolumeX,
  Cat,
  Flame,
  Star,
  Puzzle,
  Telescope,
  Anchor,
  Waves
} from 'lucide-react';

type Language = 'KR' | 'EN' | 'JP';

// ==========================================
// 🔗 미디어 링크 설정 (Media Links Configuration)
// 이곳에 직접 링크(Direct Link)를 넣어주세요!
// ==========================================
const MEDIA_LINKS = {
  // 1. 'Solip dy' 위쪽 메인 그림 링크
  mainImage: "https://github.com/jinsuk4369-coder/solip_dy/blob/main/src/main.png?raw=true",
  
  // 2. 'mascot' 카드의 아랫쪽 그림 링크
  mascotImage: "https://github.com/jinsuk4369-coder/solip_dy/blob/main/src/solnyang.png?raw=true",
  
  // 3. 'PLAYLIST' 음악/동영상 링크 (YouTube, SoundCloud, 직접 파일(mp3 등) 링크 지원)
  playlistAudio: "https://www.youtube.com/embed/ZBIg90S5vaI"
};

interface Content {
  hero: string;
  quote: string;
  aboutMe: {
    title: string;
    personalityIdentityTitle: string;
    personalityIdentitySubtitle: string;
    archive: {
      insightful: {
        title: string;
        quote: string;
        tags: string;
      };
      talent: {
        title: string;
        tags: string;
      };
    };
    languages: {
      label: string;
      items: string[];
    };
    dream: {
      label: string;
      text: string;
    };
    hobbies: {
      label: string;
      text: string;
    };
    personality: {
      label: string;
      mbti: string;
      enneagram: string;
      subtype: string;
      zodiac: string;
      oe: string;
      scid: string;
      eq: string;
      details: {
        mbti: { title: string; content: string };
        enneagram: { title: string; content: string };
        subtype: { title: string; content: string };
        zodiac: { title: string; content: string };
        oe: { title: string; content: string };
        scid: { title: string; content: string };
        eq: { title: string; content: string };
      };
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
      viewDetails: string;
      zodiac: string;
      monthFlower: string;
      birthFlower: string;
    };
    playlist: {
      title: string;
      nowPlaying: string;
      trackTitle: string;
      artist: string;
      description: string;
      watchOnYoutube: string;
    };
    copyright: {
      label: string;
      items: string[];
    };
    mascot: {
      label: string;
      namePrefix: string;
      nameHighlight: string;
      species: string;
      description: string;
      paletteLabel: string;
      colors: {
        name: string;
        hex: string;
      }[];
    };
    worldview: {
      label: string;
      title: string;
      description: string;
      dimensionsLabel: string;
      dimensions: {
        category: string;
        items: string;
      }[];
      footer: string;
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
      personalityIdentitySubtitle: "침묵의 아카이브",
      archive: {
        insightful: {
          title: "고요한 통찰자",
          quote: "\"비물질적인 가치를 소중히 여기며, 조용한 확신으로 조직의 중심을 잡습니다.\"",
          tags: "(MBTI: INFP | Enneagram: 4w5 | Libra)"
        },
        talent: {
          title: "보관된 재능",
          tags: "#외유내강 #심미안 #데이터와_감성의_조화 #High_EQ"
        }
      },
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
      hobbies: {
        label: "취미",
        text: "그림 🎨 | 독서 📚 | 영화·애니 감상 🍿\n\n캐릭터 & 세계관 구상 🌌 | 애니메이션 & 일러스트 & 만화 제작 🎬"
      },
      personality: {
        label: "성격",
        mbti: "INFP",
        enneagram: "4w5",
        subtype: "SP 4 (자기보존)",
        zodiac: "천칭자리",
        oe: "O80/E20",
        scid: "SCID",
        eq: "High EQ",
        details: {
          mbti: { title: "MBTI: INFP 중재자:", content: "내면의 뜨거운 열정과 깊은 감수성으로 세상을 따뜻하게 바라보며 평화와 조화를 추구합니다." },
          enneagram: { title: "애니어그램: 4w5 보헤미안:", content: "자신만의 고유한 정체성을 중시하며, 세상을 예리하게 관찰하는 지적인 호기심을 지녔습니다." },
          subtype: { title: "하위 유형: SP 4 (자기보존):", content: "깊은 감수성을 겉으로 과시하지 않고 조용히 품어내는 외유내강형입니다. 독립심이 강하며, 혼자만의 시간 속에서 감정을 단단하게 승화시킵니다." },
          zodiac: { title: "별자리: 천칭자리:", content: "관계의 조화와 균형을 중시하며, 일상 속에서도 특유의 세련된 미적 감각을 발휘합니다." },
          oe: { title: "Big 5 (O80 / E20):", content: "높은 개방성으로 새로운 세계를 탐구하며, 혼자만의 시간에서 에너지를 채우는 탐험가." },
          scid: { title: "DISC (SCID):", content: "신뢰를 바탕으로 한 정서적 안정감(S)과 논리적인 신중함(C)을 결합하여, 복잡한 상황 속에서도 흔들림 없이 견고하고 완벽한 질서를 구축합니다." },
          eq: { title: "정서 지능 높음 ⬆️:", content: "타인의 마음에 깊이 공감하고 배려하며, 섬세하고 유연하게 소통하는 따뜻함을 갖추고 있습니다." }
        }
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
        text: "9월 24일",
        viewDetails: "자세히 보기",
        zodiac: "천칭자리",
        monthFlower: "아스터 (믿음, 지혜)",
        birthFlower: "오렌지 꽃 (순결)"
      },
      playlist: {
        title: "PLAYLIST",
        nowPlaying: "NOW PLAYING",
        trackTitle: "The Forgotten Girl",
        artist: "zippy",
        description: "읽고, 보고, 상상합니다. 새로운 세계관과 캐릭터를 구상하여 예술적으로 그려내요.",
        watchOnYoutube: "Watch on YouTube"
      },
      copyright: {
        label: "저작권",
        items: [
          "제가 그린 그림 등의 저작권은 모두 제게 있습니다.",
          "트레, 도용, 배포, AI, 상업적 이용이 불가합니다.",
          "art사용,커미션,리퀘스트 하실 때 참고 바랍니다."
        ]
      },
      mascot: {
        label: "mascot",
        namePrefix: "영혼 고양이, ",
        nameHighlight: "솔냥이",
        species: "Anima pat",
        description: "우주를 헤매는 반투명한 흰색 영혼 고양이입니다.\n이마에 얹어진 잎사귀와 꼬리에 매달린 '솔방울'은 솔냥이가 품고 있는 아련한 사연과 미련을 상징합니다. 누군가 솔방울에 얽힌 맺힌 마음을 풀어주면, 환하게 웃으며 소원을 하나 들어주고 자신의 별로 무사히 '졸업'하게 됩니다.",
        paletteLabel: "Color Palette",
        colors: [
          { name: "라벤더 (반투명 우주)", hex: "#C1B4FA" },
          { name: "민트 (솔잎 줄기)", hex: "#A2DAC0" },
          { name: "브라운 (솔방울)", hex: "#B86028" },
          { name: "옐로우 (별빛 오드아이)", hex: "#FCD264" }
        ]
      },
      worldview: {
        label: "Worldview",
        title: "🌌 꿈결 우주",
        description: "천계와 마계, 동화적 공간 등 다채로운 차원이 공존하며 무한한 이야기가 펼쳐지는 세계관입니다.",
        dimensionsLabel: "주요 차원 (Dimensions)",
        dimensions: [
          { category: "초월과 질서", items: "🕊 천계 | 🦇 마계 | ⌛ 관리자(四神)" },
          { category: "운명과 시간", items: "🌟 별자리 | 🐀 띠/해" },
          { category: "환상과 미지", items: "🐾 Childhood Dreams | 💐 Lewisia | 🥚 늑대 선생" }
        ],
        footer: "무수히 많은 세계(🌐)가 서로 교차하며 새로운 서사를 만들어냅니다."
      }
    }
  },
  EN: {
    hero: "Whispers of color and stardust. An artistic journey through soft dreams and whimsical imagination.",
    quote: "I want to see the world through art.",
    aboutMe: {
      title: "ABOUT ME",
      personalityIdentityTitle: "Personality & Identity",
      personalityIdentitySubtitle: "Archive of Silence",
      archive: {
        insightful: {
          title: "Silent Insightful",
          quote: "\"Valuing immaterial worth, holding the center of the organization with quiet conviction.\"",
          tags: "(MBTI: INFP | Enneagram: 4w5 | Libra)"
        },
        talent: {
          title: "Archived Talent",
          tags: "#IronHandInAVelvetGlove #AestheticSense #HarmonyOfDataAndEmotion #High_EQ"
        }
      },
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
      hobbies: {
        label: "Hobbies",
        text: "Drawing 🎨 | Reading 📚 | Movies & Anime 🍿\n\nCharacter & World Building 🌌 | Animation & Illustration & Comic Production 🎬"
      },
      personality: {
        label: "Personality",
        mbti: "INFP",
        enneagram: "4w5",
        subtype: "SP 4 (Self-Preservation)",
        zodiac: "Libra",
        oe: "O80/E20",
        scid: "SCID",
        eq: "High EQ",
        details: {
          mbti: { title: "MBTI: INFP Mediator:", content: "I view the world warmly with inner passion and deep sensitivity, pursuing peace and harmony." },
          enneagram: { title: "Enneagram: 4w5 Bohemian:", content: "I value my own unique identity and possess intellectual curiosity that keenly observes the world." },
          subtype: { title: "Subtype: SP 4 (Self-Preservation):", content: "I am a strong-willed, gentle-on-the-outside, tough-on-the-inside type who quietly cherishes deep sensitivity. I am independent and solidify my emotions in solitude." },
          zodiac: { title: "Zodiac: Libra:", content: "I value harmony and balance in relationships, and I naturally express a refined aesthetic sense in my daily life." },
          oe: { title: "Big 5 (O80 / E20):", content: "An explorer who explores new worlds with high openness and recharges energy in solitude." },
          scid: { title: "DISC (SCID):", content: "Combining emotional stability based on trust (S) and logical prudence (C), I build a solid and perfect order without wavering even in complex situations." },
          eq: { title: "High Emotional Intelligence ⬆️:", content: "I have an excellent ability to sensitively perceive and handle the emotions of myself and others, and I possess a warmth that communicates delicately and flexibly." }
        }
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
        text: "September 24th",
        viewDetails: "View Details",
        zodiac: "Libra",
        monthFlower: "Aster (Faith, Wisdom)",
        birthFlower: "Orange Flower (Chastity)"
      },
      playlist: {
        title: "PLAYLIST",
        nowPlaying: "NOW PLAYING",
        trackTitle: "The Forgotten Girl",
        artist: "zippy",
        description: "Read, watch, and imagine. I build new worlds and characters, drawing them artistically.",
        watchOnYoutube: "Watch on YouTube"
      },
      copyright: {
        label: "Copyright",
        items: [
          "All rights to the artworks I draw belong to me.",
          "Tracing, theft, distribution, AI use, and commercial use are prohibited.",
          "Please keep this in mind for art usage, commissions, and requests."
        ]
      },
      mascot: {
        label: "mascot",
        namePrefix: "Soul Cat, ",
        nameHighlight: "Solnyangi",
        species: "Anima pat",
        description: "A translucent white soul cat wandering through space.\nThe leaf on its forehead and the 'pinecone' hanging from its tail symbolize the lingering stories and regrets Solnyangi holds. If someone resolves the feelings tied to the pinecone, it will smile brightly, grant one wish, and safely 'graduate' to its own star.",
        paletteLabel: "Color Palette",
        colors: [
          { name: "Lavender (Translucent Universe)", hex: "#C1B4FA" },
          { name: "Mint (Pine Needle Stem)", hex: "#A2DAC0" },
          { name: "Brown (Pinecone)", hex: "#B86028" },
          { name: "Yellow (Starlight Odd-eye)", hex: "#FCD264" }
        ]
      },
      worldview: {
        label: "Worldview",
        title: "🌌 Ethereal Worlds",
        description: "A worldview where diverse dimensions such as the celestial realm, the demon realm, and fairy-tale spaces coexist, unfolding infinite stories.",
        dimensionsLabel: "Main Dimensions",
        dimensions: [
          { category: "Transcendence & Order", items: "🕊 Celestial | 🦇 Demon | ⌛ Guardians (Four Gods)" },
          { category: "Destiny & Time", items: "🌟 Constellations | 🐀 Zodiac" },
          { category: "Fantasy & Unknown", items: "🐾 Childhood Dreams | 💐 Lewisia | 🥚 Wolf Teacher" }
        ],
        footer: "Countless worlds (🌐) intersect to create new narratives."
      }
    }
  },
  JP: {
    hero: "Whispers of color and stardust. An artistic journey through soft dreams and whimsical imagination.",
    quote: "I want to see the world through art.",
    aboutMe: {
      title: "ABOUT ME",
      personalityIdentityTitle: "性格 & アイデンティティ",
      personalityIdentitySubtitle: "沈黙のアーカイブ",
      archive: {
        insightful: {
          title: "静かな洞察者",
          quote: "「非物質的な価値を大切にし、静かな確信で組織の中心を担います。」",
          tags: "(MBTI: INFP | Enneagram: 4w5 | Libra)"
        },
        talent: {
          title: "保管された才能",
          tags: "#外柔内剛 #審美眼 #データと感性の調和 #High_EQ"
        }
      },
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
      hobbies: {
        label: "趣味",
        text: "絵 🎨 | 読書 📚 | 映画・アニメ鑑賞 🍿\n\nキャラクター & 世界観構想 🌌 | アニメーション & イラスト & 漫画制作 🎬"
      },
      personality: {
        label: "性格",
        mbti: "INFP",
        enneagram: "4w5",
        subtype: "SP 4 (自己保存)",
        zodiac: "天秤座",
        oe: "O80/E20",
        scid: "SCID",
        eq: "High EQ",
        details: {
          mbti: { title: "MBTI: INFP 仲介者:", content: "内面の熱い情熱と深い感受性で世界を温かく見つめ、平和と調和を追求します。" },
          enneagram: { title: "エニアグラム: 4w5 ボヘミアン:", content: "自分だけの固有のアイデンティティを重視し、世界を鋭く観察する知的好奇心を持っています。" },
          subtype: { title: "サブタイプ: SP 4 (自己保存):", content: "深い感受性を外に出さず、静かに内に秘める外柔内剛型です。独立心が強く、一人の時間の中で感情をしっかりと昇華させます。" },
          zodiac: { title: "星座: 天秤座:", content: "関係における調和とバランスを重視し、日常生活の中でも特有の洗練された美的感覚を発휘します。" },
          oe: { title: "Big 5 (O80 / E20):", content: "高い開放性で新しい世界を探求し、一人の時間でエネルギーを満たす探検家。" },
          scid: { title: "DISC (SCID):", content: "信頼に基づく情緒的安定感(S)と論理的な慎重さ(C)を組み合わせ、複雑な状況の中でも揺らぐことなく堅固で完璧な秩序を構築します。" },
          eq: { title: "高い感情知能 ⬆️:", content: "自分と他人の感情を繊細に察して扱う能力に優れており、周囲の人の心深くまで共感し、柔らかく柔軟にコミュニケーションをとる温かさを持っています。" }
        }
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
        text: "9月24日",
        viewDetails: "詳細を見る",
        zodiac: "天秤座",
        monthFlower: "アスター (信じる心, 知恵)",
        birthFlower: "オレンジの花 (純潔)"
      },
      playlist: {
        title: "プレイリスト",
        nowPlaying: "再生中",
        trackTitle: "The Forgotten Girl",
        artist: "zippy",
        description: "読み、見て、想像します。新しい世界観とキャラクターを構想し、芸術的に描き出します。",
        watchOnYoutube: "YouTubeで見る"
      },
      copyright: {
        label: "著作権",
        items: [
          "私が描いた絵などの著作権はすべて私にあります。",
          "トレース、盗用、配布、AI、商業的利用は禁止されています。",
          "artの使用、コミッション、リクエストの際は参考にしてください。"
        ]
      },
      mascot: {
        label: "mascot",
        namePrefix: "魂の猫、",
        nameHighlight: "ソルニャンイ",
        species: "Anima pat",
        description: "宇宙を彷徨う半透明の白い魂の猫です。\n額に乗った葉っぱと尻尾にぶら下がった「松ぼっくり」は、ソルニャンイが抱いている切ない事情と未練を象徴しています。誰かが松ぼっくりにまつわるわだかまりを解いてあげると、明るく笑って願いを一つ叶え、自分の星へと無事に「卒業」することになります。",
        paletteLabel: "Color Palette",
        colors: [
          { name: "ラベンダー (半透明の宇宙)", hex: "#C1B4FA" },
          { name: "ミント (松の葉の茎)", hex: "#A2DAC0" },
          { name: "ブラウン (松ぼっくり)", hex: "#B86028" },
          { name: "イエロー (星明かりのオッドアイ)", hex: "#FCD264" }
        ]
      },
      worldview: {
        label: "Worldview",
        title: "🌌 夢幻世界",
        description: "天界や魔界、童話的な空間など、多彩な次元が共存し、無限の物語が繰り広げられる世界観です。",
        dimensionsLabel: "主要次元 (Dimensions)",
        dimensions: [
          { category: "超越と秩序", items: "🕊 天界 | 🦇 魔界 | ⌛ 管理者(四神)" },
          { category: "運命と時間", items: "🌟 星座 | 🐀 干支" },
          { category: "幻想と未知", items: "🐾 Childhood Dreams | 💐 Lewisia | 🥚 狼先生" }
        ],
        footer: "無数の世界(🌐)が互いに交差し、新しい物語を作り出します。"
      }
    }
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('KR');
  const [showIdentityInfo, setShowIdentityInfo] = useState(false);
  const [showPersonalityInfo, setShowPersonalityInfo] = useState(false);
  const [showBirthdayDetails, setShowBirthdayDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const playerRef = useRef<any>(null);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleProgress = (state: any) => {
    if (state.played !== undefined) setPlayed(state.played);
    if (state.playedSeconds !== undefined) setCurrentTime(state.playedSeconds);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

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
                src={MEDIA_LINKS.mainImage}
                alt="Solip dy Mascot"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                referrerPolicy="no-referrer"
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

          {/* Playlist Section - Moved here */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pastel-purple/30 rounded-2xl text-slate-700">
                <Music size={24} />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter text-slate-800 text-engraved font-letter">{content.aboutMe.playlist.title}</h2>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-white/40 backdrop-blur-md rounded-[3rem] p-8 border border-white/30 shadow-xl relative overflow-hidden">
                {/* Volume Control (Top Left) */}
                <div className="absolute top-8 left-8 z-20">
                  <div className="relative group flex items-center">
                    <button 
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
                    >
                      {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div className="absolute left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-20 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center shadow-sm border border-white/40 z-10 ml-2">
                      <input 
                        type="range" 
                        min={0} 
                        max={1} 
                        step="any" 
                        value={volume} 
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-purple"
                      />
                    </div>
                  </div>
                </div>

                {/* Hidden Player */}
                <div className="hidden">
                  <Player
                    ref={playerRef}
                    url={MEDIA_LINKS.playlistAudio}
                    playing={isPlaying}
                    loop={isLooping}
                    volume={volume}
                    onProgress={(state: any) => handleProgress(state)}
                    onReady={(player: any) => setDuration(player.getDuration())}
                    config={{
                      file: {
                        forceAudio: true,
                        attributes: {
                          controlsList: 'nodownload'
                        }
                      }
                    }}
                  />
                </div>

                {/* Decorative Sparkles */}
                <div className="absolute top-10 left-10 text-pastel-purple animate-pulse">✦</div>
                <div className="absolute top-20 right-12 text-pastel-pink animate-pulse delay-75">✧</div>
                
                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                    {content.aboutMe.playlist.nowPlaying}
                  </span>
                </div>

                {/* Album Art */}
                <div className="relative flex justify-center mb-8">
                  <div className="w-56 h-56 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-800 relative z-10">
                    <img 
                      src="https://picsum.photos/seed/forgotten/400/400" 
                      alt="Album Art"
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-pastel-purple/20 to-transparent" />
                  </div>
                  {/* Floating Decoration */}
                  <div className="absolute -bottom-2 -right-2 text-pastel-pink/60 transform rotate-12 z-20">
                    <Sparkles size={32} />
                  </div>
                </div>

                {/* Track Info */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{content.aboutMe.playlist.trackTitle}</h3>
                  <p className="text-pastel-purple font-semibold text-sm"><span className="text-[#dfc5fa]">{content.aboutMe.playlist.artist}</span></p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div 
                    className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;
                      playerRef.current?.seekTo(percentage);
                    }}
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-pastel-purple to-pastel-pink rounded-full transition-all duration-300" 
                      style={{ width: `${played * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-slate-400">{formatTime(currentTime)}</span>
                    <span className="text-[10px] font-bold text-slate-400">{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="flex items-center gap-3 w-16">
                    <button className="text-pastel-pink hover:scale-110 transition-transform">
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-6 justify-center">
                    <button 
                      className="text-slate-600 hover:text-slate-800 transition-colors"
                      onClick={() => playerRef.current?.seekTo(0)}
                    >
                      <SkipBack size={24} fill="currentColor" />
                    </button>
                    <button 
                      onClick={togglePlay}
                      className="w-14 h-14 bg-gradient-to-tr from-[#a5c6fa] to-pastel-purple rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all"
                    >
                      {isPlaying ? (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-6 bg-white rounded-full" />
                          <div className="w-1.5 h-6 bg-white rounded-full" />
                        </div>
                      ) : (
                        <Play size={28} fill="currentColor" className="ml-1" />
                      )}
                    </button>
                    <button 
                      className="text-slate-600 hover:text-slate-800 transition-colors"
                      onClick={() => playerRef.current?.seekTo(duration - 1)}
                    >
                      <SkipForward size={24} fill="currentColor" />
                    </button>
                  </div>

                  <div className="flex items-center justify-end w-16">
                    <button 
                      className={`transition-colors ${isLooping ? 'text-pastel-purple' : 'text-slate-400 hover:text-slate-600'}`}
                      onClick={() => setIsLooping(!isLooping)}
                    >
                      <Repeat size={20} />
                    </button>
                  </div>
                </div>

                {/* YouTube Link */}
                <div className="text-center">
                  <a 
                    href="https://www.youtube.com/watch?v=ZBIg90S5vaI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/60 hover:bg-white/80 border border-white/40 rounded-full text-slate-700 font-bold text-xs transition-all shadow-sm group"
                  >
                    <Youtube size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
                    {content.aboutMe.playlist.watchOnYoutube}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Description Text - Moved outside for better visibility */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center px-4"
            >
              <p className="text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
                {content.aboutMe.playlist.description}
              </p>
            </motion.div>
          </motion.section>
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
                <Heart size={16} className="text-[#facad9]" /> {content.aboutMe.dream.label}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">{content.aboutMe.dream.text}</p>
            </div>

            {/* Hobbies Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Gamepad2 size={16} className="text-[#facad9]" /> {content.aboutMe.hobbies.label}
              </h3>
              <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-line">{content.aboutMe.hobbies.text}</p>
            </div>

            {/* Birthday Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Cake size={16} className="text-[#facad9]" /> {content.aboutMe.birthday.label}
              </h3>
              <div className="space-y-3">
                <p className="text-slate-700 font-medium">{content.aboutMe.birthday.text}</p>
                
                <button 
                  onClick={() => setShowBirthdayDetails(!showBirthdayDetails)}
                  className="text-xs font-bold text-[#dfc5fa] hover:text-slate-800 transition-colors flex items-center gap-1 group"
                >
                  <span className="text-[#dfc5fa]">{content.aboutMe.birthday.viewDetails}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showBirthdayDetails ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showBirthdayDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white/60 rounded-2xl p-4 space-y-3 text-xs text-slate-600 border border-white/20">
                        <div className="flex items-center gap-2">
                          <Scale size={14} className="text-pastel-blue" />
                          <span className="font-medium">{content.aboutMe.birthday.zodiac}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flower2 size={14} className="text-pastel-purple" />
                          <span className="font-medium">{content.aboutMe.birthday.monthFlower}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flower2 size={14} className="text-pastel-pink" />
                          <span className="font-medium">{content.aboutMe.birthday.birthFlower}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
            {/* Insightful Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4 lg:col-span-2">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Flame size={16} className="text-[#facad9]" /> {content.aboutMe.archive.insightful.title}
              </h3>
              <div className="space-y-3">
                <p className="text-slate-600 font-medium italic text-sm leading-relaxed">{content.aboutMe.archive.insightful.quote}</p>
                <p className="text-xs text-slate-500 font-medium">{content.aboutMe.archive.insightful.tags}</p>
              </div>
            </div>

            {/* Talent Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4 lg:col-span-1">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Star size={16} className="text-[#facad9]" /> {content.aboutMe.archive.talent.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {content.aboutMe.archive.talent.tags.split(' ').map((tag, i) => (
                  <span key={i} className="text-xs font-medium bg-white/60 border border-slate-100 px-3 py-1.5 rounded-full text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Personality Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4 lg:col-span-2">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Brush size={16} className="text-[#facad9]" /> {content.aboutMe.personality.label}
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-pastel-blue/30 px-3 py-1 rounded-lg text-sm text-slate-700 flex items-center gap-1.5">
                    <Puzzle size={14} className="text-blue-500" /> {content.aboutMe.personality.mbti}
                  </span>
                  <span className="bg-pastel-pink/30 px-3 py-1 rounded-lg text-sm text-slate-700 flex items-center gap-1.5">
                    <Star size={14} className="text-pink-500" /> {content.aboutMe.personality.enneagram}
                  </span>
                  <span className="bg-pastel-green/30 px-3 py-1 rounded-lg text-sm text-slate-700 flex items-center gap-1.5">
                    <Scale size={14} className="text-emerald-500" /> {content.aboutMe.personality.zodiac}
                  </span>
                  <span className="bg-purple-100/50 px-3 py-1 rounded-lg text-sm text-slate-700 flex items-center gap-1.5">
                    <Telescope size={14} className="text-purple-400" /> {content.aboutMe.personality.oe}
                  </span>
                  <span className="bg-orange-100/50 px-3 py-1 rounded-lg text-sm text-slate-700 flex items-center gap-1.5">
                    <Anchor size={14} className="text-orange-400" /> {content.aboutMe.personality.scid}
                  </span>
                  <span className="bg-blue-100/50 px-3 py-1 rounded-lg text-sm text-slate-700 flex items-center gap-1.5">
                    <Waves size={14} className="text-blue-400" /> {content.aboutMe.personality.eq}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowPersonalityInfo(!showPersonalityInfo)}
                className="text-xs font-bold text-pastel-purple hover:text-slate-800 transition-colors flex items-center gap-1 group"
              >
                {lang === 'KR' ? <span className="text-[#dfc5fa]">자세히 보기</span> : lang === 'EN' ? <span className="text-[#dfc5fa]">Learn more</span> : <span className="text-[#dfc5fa]">詳細を見る</span>}
                <ChevronRight size={14} className={`transition-transform duration-300 ${showPersonalityInfo ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showPersonalityInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/60 rounded-2xl p-4 mt-2 space-y-3 text-xs text-slate-600 leading-relaxed border border-white/20">
                      <p><strong><Puzzle size={14} className="inline text-blue-500 mr-1" />{content.aboutMe.personality.details.mbti.title}</strong> {content.aboutMe.personality.details.mbti.content}</p>
                      
                      <p><strong><Star size={14} className="inline text-pink-500 mr-1" />{content.aboutMe.personality.details.enneagram.title}</strong> {content.aboutMe.personality.details.enneagram.content}</p>
                      <p className="pl-4">↳ <strong>{content.aboutMe.personality.details.subtype.title}</strong> {content.aboutMe.personality.details.subtype.content}</p>
                      
                      <p><strong><Scale size={14} className="inline text-emerald-500 mr-1" />{content.aboutMe.personality.details.zodiac.title}</strong> {content.aboutMe.personality.details.zodiac.content}</p>
                      
                      <p><strong><Telescope size={14} className="inline text-purple-400 mr-1" />{content.aboutMe.personality.details.oe.title}</strong> {content.aboutMe.personality.details.oe.content}</p>
                      
                      <p><strong><Anchor size={14} className="inline text-orange-400 mr-1" />{content.aboutMe.personality.details.scid.title}</strong> {content.aboutMe.personality.details.scid.content}</p>
                      
                      <p><strong><Waves size={14} className="inline text-blue-400 mr-1" />{content.aboutMe.personality.details.eq.title}</strong> {content.aboutMe.personality.details.eq.content}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Identity Card */}
            <div className="bg-white/40 p-6 rounded-3xl border border-white/20 space-y-4 lg:col-span-2">
              <h3 className="text-xl font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 text-engraved font-letter">
                <Info size={16} className="text-[#facad9]" /> {content.aboutMe.identity.label}
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
                {lang === 'KR' ? <span className="text-[#dfc5fa]">자세히 보기</span> : lang === 'EN' ? <span className="text-[#dfc5fa]">Learn more</span> : <span className="text-[#dfc5fa]">詳細を見る</span>}
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

        {/* Mascot Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-dreamy p-8 sm:p-12 space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pastel-pink/30 rounded-2xl text-slate-700">
              <Cat size={24} />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-slate-800 text-engraved font-letter">{content.aboutMe.mascot.label}</h2>
          </div>
          
          <div className="bg-white/40 p-8 rounded-3xl border border-white/20 space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                <img 
                  src={MEDIA_LINKS.mascotImage}
                  alt="Mascot" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pastel-purple/20 to-transparent" />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-lg font-bold text-slate-800 flex items-baseline justify-center md:justify-start flex-wrap">
                  <span className="mr-1">{content.aboutMe.mascot.namePrefix}</span>
                  <span className="bg-gradient-to-b from-[#C1B4FA] to-[#6F83BE] bg-clip-text text-transparent font-extrabold text-3xl relative inline-block mx-1">
                    {content.aboutMe.mascot.nameHighlight}
                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-pastel-pink/30 -z-10 rounded-full"></span>
                  </span>
                </h3>
                <p className="text-pastel-purple font-semibold">(<span className="text-[#dfc5fa]">{content.aboutMe.mascot.species}</span>)</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {content.aboutMe.mascot.description}
            </p>
            
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                <Palette size={16} /> {content.aboutMe.mascot.paletteLabel}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.aboutMe.mascot.colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/50 p-3 rounded-2xl border border-white/30">
                    <div className="w-10 h-10 rounded-xl shadow-sm" style={{ backgroundColor: color.hex }} />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{color.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{color.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Worldview Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-dreamy p-8 sm:p-12 space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pastel-blue/30 rounded-2xl text-slate-700">
              <Globe size={24} />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-slate-800 text-engraved font-letter">{content.aboutMe.worldview.label}</h2>
          </div>
          
          <div className="bg-white/40 p-8 rounded-3xl border border-white/20 space-y-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">{content.aboutMe.worldview.title}</h3>
            </div>
            
            <p className="text-slate-700 leading-relaxed text-center max-w-2xl mx-auto">
              {content.aboutMe.worldview.description}
            </p>
            
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-400 tracking-widest uppercase flex items-center justify-center gap-2">
                <Sparkles size={16} /> {content.aboutMe.worldview.dimensionsLabel}
              </h4>
              <div className="space-y-4">
                {content.aboutMe.worldview.dimensions.map((dim, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-4 bg-white/30 rounded-2xl border border-white/20">
                    <span className={`text-xs font-bold ${['초월과 질서', '운명과 시간', '환상과 미지'].includes(dim.category) ? 'text-[#dfc5fa]' : 'text-pastel-purple'} min-w-[120px]`}>{dim.category}</span>
                    <span className="text-sm text-slate-700">{dim.items}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-xs text-slate-500 italic text-center border-t border-white/20 pt-6">
              {content.aboutMe.worldview.footer}
            </p>
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
        <div className="flex flex-col items-center gap-2">
          <Key size={16} className="text-slate-400 opacity-70" />
          <p className="font-cursive text-2xl text-slate-600 drop-shadow-md">
            Thanks for visiting my world.
          </p>
        </div>
        <p className="text-sm text-slate-400 font-light tracking-widest">
          © 2026 by Solip dy. All rights reserved.
        </p>
        <div className="w-16 h-px bg-slate-300 mx-auto my-4" />
        <p className="text-xs text-slate-400 font-light tracking-widest opacity-60">
          Published: 2021. 01. 17
        </p>
        <p className="text-xs text-slate-400 font-light tracking-widest opacity-60">
          Last Updated: 2026. 03. 19
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-pastel-pink" />
          <div className="w-2 h-2 rounded-full bg-pastel-blue" />
          <div className="w-2 h-2 rounded-full bg-pastel-purple" />
        </div>
      </footer>
    </div>
  );
};

export default App;
