# TP12 · React Context

Implementación del trabajo práctico sobre el clon móvil de Instagram para gatos. La aplicación Expo permite recorrer el feed, abrir una publicación, marcarla con Me gusta, guardarla y consultar las publicaciones desde el perfil.

## Context aplicado

1. **Estado compartido:** publicaciones del feed, cantidad de Me gusta y estado de guardado de cada publicación.
2. **Archivo:** `src/context/InstagramContext.tsx`. Crea el Context con `createContext`, expone `InstagramProvider` y el hook `useInstagram`, que consume el Context con `useContext`.
3. **Provider:** `App`, en `App.tsx`, envuelve la navegación completa con `InstagramProvider` para compartir el mismo estado entre las pantallas.
4. **Consumidores:** `FeedScreen`, `ProfileScreen`, `Publicacion` y `PostDetailScreen` consumen el estado con `useInstagram`. Al marcar Me gusta o guardar desde el feed o el detalle, la actualización aparece en las demás pantallas.
5. **Justificación:** el feed y el perfil muestran las mismas publicaciones, mientras que la pantalla de detalle permite interactuar con ellas. Mantener likes y guardados en un único estado global evita duplicar estado local y que los componentes muestren valores distintos al navegar.

## Ejecutar

Requiere Node.js compatible con Expo y npm.

```bash
npm install
npx expo start
```

Para abrir en Android, iOS o web, usá las opciones que muestra Expo o ejecutá `npm run android`, `npm run ios` o `npm run web`.

Repositorio de referencia: [gzolotow/tp6](https://github.com/gzolotow/tp6), carpeta `instagram-gatos-mobile`.
