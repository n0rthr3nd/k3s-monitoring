# Sistema de Despliegue Automático (CI/CD) - k3s-monitoring

Este proyecto utiliza un sistema de despliegue continuo basado en **GitHub Actions**, **GHCR (GitHub Container Registry)** y **ArgoCD**.

## Arquitectura del Sistema

El flujo de trabajo sigue el modelo de "GitOps" con versionado semántico:

1.  **Versionado**: El archivo `VERSION` en la raíz es la fuente de verdad.
2.  **Automatización**: El script `release.sh` gestiona el incremento de versión y la creación de tags.
3.  **Pipeline**: GitHub Actions compila imágenes multi-arquitectura (amd64/arm64) y las sube a GHCR.
4.  **Despliegue**: ArgoCD monitoriza el repositorio y aplica los cambios en el clúster automáticamente al detectar un cambio en el tag de la imagen en `k8s/deployment.yaml`.

## Cómo realizar un Release

Para desplegar una nueva versión, utiliza el script `release.sh`:

```bash
# Para correcciones de errores (1.0.0 -> 1.0.1)
./release.sh patch "Descripción del fix"

# Para nuevas funcionalidades (1.0.0 -> 1.1.0)
./release.sh minor "Descripción de la funcionalidad"
```

### ¿Qué hace el script?
1.  Calcula la siguiente versión.
2.  Actualiza el archivo `VERSION`.
3.  Actualiza la imagen en `k8s/deployment.yaml` (ej: `v1.0.0` -> `v1.0.1`).
4.  Crea un commit de release y un **Git Tag** (ej: `v1.0.1`).
5.  Sube el commit y el tag a GitHub, lo que dispara el Pipeline de compilación.

## Pipeline de GitHub Actions

El workflow en `.github/workflows/ci-cd.yml` realiza las siguientes tareas:
*   **Tests**: Ejecuta los tests de frontend (Karma/ChromeHeadless).
*   **Build**: Compila la imagen Docker para `linux/amd64` y `linux/arm64` (Raspberry Pi).
*   **Tags**: Genera etiquetas en GHCR para la versión específica (`v1.0.x`), la rama (`main`) y el tag `latest`.
*   **Sync**: Notifica a la API de ArgoCD para forzar una sincronización inmediata de la aplicación `k3s-monitoring`.

## Ventajas de este sistema
*   **Inmutabilidad**: Cada despliegue usa un tag único, evitando problemas de caché de `latest`.
*   **Rollbacks**: Si una versión falla, revertir el cambio en Git provoca un rollback inmediato y seguro.
*   **Multi-arquitectura**: Soporte nativo para Raspberry Pi 5 y servidores x86.

---
🤖 *Documentación generada automáticamente por Gemini CLI.*
