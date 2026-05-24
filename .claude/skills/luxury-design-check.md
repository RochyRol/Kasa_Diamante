# Luxury Design Check — Kasa Diamante

Skill de verificación estética para cualquier trabajo de diseño en Kasa Diamante.
Ejecutar los 4 filtros en orden antes de declarar el trabajo como terminado.

## Paleta oficial
- **Negro mate**: `#080808` / `#0E0E0E` — velvety, no vacío puro
- **Blanco puro**: `#F8F5EE` / `#EDE9DF` — cálido, no frío
- **Dorado rico**: `#D4AF37` (Clásico) — oro real, no champagne
- **Transición**: negro y blanco se difuminan con gradientes y orbes blur

## Filtro 1 — ¿Se parece al diseño anterior?
**Regla**: Si la primera impresión recuerda al diseño previo (todo negro + texto crema + gold sutil y apagado), hay que rediseñar.

**Checklist**:
- [ ] ¿Hay secciones con fondo blanco que contrasten con el negro? (si no → rediseñar)
- [ ] ¿El dorado es `#D4AF37` o richer, no champagne `#C9A96E`? (si no → actualizar variables)
- [ ] ¿El fondo tiene alguna animación visible (orbes, patrón, sweep)? (si no → rediseñar)
- [ ] ¿Las transiciones entre secciones son gradientes difuminados, no cortes duros? (si no → añadir gradientes)

## Filtro 2 — ¿Hay elementos innecesarios?
**Regla**: Minimalismo. Si ves algo que no aporte valor directo, elimínalo.

**Checklist**:
- [ ] ¿Hay animaciones decorativas que distraigan en lugar de elevar? (si sí → reducir opacity o eliminar)
- [ ] ¿Hay texto redundante o elementos repetidos sin propósito? (si sí → eliminar)
- [ ] ¿Cada elemento tiene un propósito visual claro? (si no → simplificar)
- [ ] ¿Las tarjetas tienen más de 2 efectos hover simultáneos? (si sí → simplificar)

## Filtro 3 — ¿Es minimalista Y lujoso a la vez?
**Regla**: Lujo minimalista = espacio generoso + detalles precisos + pocos elementos de alto impacto.

**Checklist**:
- [ ] ¿Hay suficiente espacio en blanco (negativo) entre secciones? (padding mínimo 120px)
- [ ] ¿Las animaciones de fondo son sutiles pero perceptibles (opacity 0.03-0.18)? 
- [ ] ¿El dorado se usa como acento puntual, no como color de relleno masivo?
- [ ] ¿La tipografía tiene dignidad — tamaños grandes, letter-spacing generoso?
- [ ] ¿Las tarjetas tienen glassmorphism (backdrop-filter blur) en lugar de fondos sólidos opacos?

## Filtro 4 — ¿Podría confundirse con el diseño anterior?
**Regla**: Si al hacer screenshot y comparar con la versión anterior hay duda, es insuficiente.

**Checklist**:
- [ ] ¿El contraste negro/blanco es dramático y visible? (si no → intensificar secciones blancas)
- [ ] ¿La paleta de dorado es notablemente más rica/saturada? (si no → usar `#D4AF37`, no `#C9A96E`)
- [ ] ¿Las animaciones de fondo son más visibles que antes? (si no → aumentar opacity de orbes)
- [ ] ¿Las transiciones entre secciones oscuras y claras son difuminadas? (si no → añadir gradientes)

## Cómo aplicar la skill

```
/luxury-design-check
```

Al correr la skill, aplicar los 4 filtros en orden. Si alguno falla, corregir antes de continuar al siguiente. Solo declarar el trabajo terminado cuando los 4 pasan.

## Secciones protegidas — NO modificar
- `home-story.jsx` y clases `.kd-story-*`, `.scene-*` — animación de scroll hogar
- `floor-plan.jsx` y clases `.kd-fp-*`, `.kd-plan-*` — planner interactivo
- `.micasa-*`, `.picker-*` — funcionalidad del planner
