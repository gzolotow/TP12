import React, { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Post } from '../types';

const captions = [
  'Un rayito de sol y una siesta perfecta ☀️🐱',
  'La mirada que te convence de darle otro snack 😹',
  'Domingo de mimos y ronroneos 🤍',
  'Pequeños momentos, grandes ronroneos 🐾',
  '¿Alguien más trabaja con esta supervisión? 💻',
  'Encontró el lugar más cómodo de toda la casa ✨',
  'Modo experto en cajas activado 📦',
  'Saludos desde Buenos Aires, humanos 🌿',
  'La siesta es sagrada. No molestar 😴',
  'Un michi feliz cambia cualquier día 💛',
  'Patas suaves, corazón enorme 🐈',
  '¿Quién podría decirle que no a esa carita?',
];

const initialPosts: Post[] = captions.map((caption, index) => ({
  id: `gato-${index + 1}`,
  imageUrl: `https://cataas.com/cat?width=700&height=700&position=center&${index}`,
  username: 'gatitos.ar',
  userAvatar: `https://cataas.com/cat?width=80&height=80&position=center&avatar=${index}`,
  caption,
  likes: 1280 + index * 847,
  comments: [
    { id: `c-${index}-1`, username: 'michi.baires', text: 'Qué belleza 😻' },
    { id: `c-${index}-2`, username: 'felinos.ok', text: 'Necesitaba ver esto hoy 💛' },
  ],
  timeAgo: `${index + 1} h`,
  isLiked: false,
  isSaved: false,
}));

interface InstagramContextValue {
  posts: Post[];
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
}

const InstagramContext = createContext<InstagramContextValue | undefined>(undefined);

export function InstagramProvider({ children }: PropsWithChildren) {
  const [posts, setPosts] = useState(initialPosts);

  const toggleLike = (postId: string) => {
    setPosts((current) => current.map((post) => post.id === postId
      ? { ...post, isLiked: !post.isLiked, likes: post.likes + (post.isLiked ? -1 : 1) }
      : post));
  };

  const toggleSave = (postId: string) => {
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, isSaved: !post.isSaved } : post));
  };

  const value = useMemo(() => ({ posts, toggleLike, toggleSave }), [posts]);
  return <InstagramContext.Provider value={value}>{children}</InstagramContext.Provider>;
}

export function useInstagram() {
  const context = useContext(InstagramContext);
  if (!context) throw new Error('useInstagram debe usarse dentro de InstagramProvider.');
  return context;
}
