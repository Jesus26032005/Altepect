# Altépet Landing Page

Landing page estática lista para GitHub Pages.

## Archivos

```text
altepet-landing-v3/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── logo-altepet.png
```

## Incluye

- Logo real de Altépet en navbar, sección principal y footer.
- Paleta oficial:
  - Azul profundo: `#0F3A5F`
  - Verde jade: `#26A69A`
  - Fondo: `#F8F9FA`
  - Texto: `#4A5568`
  - Bordes: `#E2E8F0`
- Imágenes externas desde Unsplash.
- Menú hamburguesa responsive.
- Dark mode.
- Animaciones suaves.
- FAQ.
- Formulario listo para conectar con Formspree, EmailJS o Supabase.

## Nota sobre imágenes externas

Las imágenes se cargan desde URLs externas de Unsplash. Para producción, conviene descargarlas, optimizarlas y guardarlas en `assets/`.

## Cambios de esta versión corregida

- Logo dentro de tarjeta clara adaptable para que se vea bien en modo claro y oscuro.
- Sección piloto corregida: en modo oscuro conserva azul profundo y jade, evitando el bloque celeste con bajo contraste.
