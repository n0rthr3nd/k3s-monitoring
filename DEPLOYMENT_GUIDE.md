# Arquitectura de Despliegue GitOps: K3S + ArgoCD + GitHub Actions

Este documento describe la solución de CI/CD implementada para los proyectos `k3s-monitoring` y `home-manager`, basada en el modelo de **GitOps Proactivo**.

## 1. Concepto de la Solución
Hemos implementado una arquitectura de **Despliegue Basado en Pull con Notificación de Push**. 

*   **GitHub Actions (CI)**: Se encarga de la parte pesada (compilación y empaquetado). Construye imágenes multi-arquitectura (ARM64 para la Raspberry Pi y AMD64) y las sube a GitHub Container Registry (GHCR).
*   **ArgoCD (CD)**: Gestiona el estado del clúster. 
*   **ArgoCD Image Updater**: Es el componente clave. Monitoriza el registro de imágenes (GHCR) y, cuando detecta una nueva versión (basada en el SHA del commit), actualiza automáticamente el despliegue en el clúster sin necesidad de modificar los archivos YAML en Git.

## 2. Ventajas de esta Arquitectura
1.  **Seguridad**: El clúster no necesita estar expuesto a Internet para recibir despliegues. Es el clúster el que "tira" de las imágenes.
2.  **Inmutabilidad**: Cada despliegue usa el SHA único del commit, lo que permite rollbacks instantáneos y precisos.
3.  **Eficiencia**: Uso de runners de GitHub para ahorrar recursos en la Raspberry Pi.
4.  **Desacoplamiento**: Los secretos sensibles (como tokens de API) se gestionan localmente en el clúster, protegidos de miradas externas en repositorios públicos.

---

## 3. Guía Paso a Paso de Implementación

### Paso 1: Configuración del Registro Global (K3S)
Para evitar errores de autenticación (401 Unauthorized) en cada proyecto, configuramos las credenciales de GHCR a nivel de nodo en K3S.
*   Archivo: `/etc/rancher/k3s/registries.yaml`
*   Acción: Añadir el usuario y Personal Access Token (PAT) de GitHub con permisos `read:packages`.
*   Comando: `sudo systemctl restart k3s`.

### Paso 2: Preparación de ArgoCD (RBAC y Usuario)
Creamos un usuario dedicado para que GitHub Actions pueda comunicarse con ArgoCD.
1.  **Cuenta**: Creamos el usuario `github-actions` en el ConfigMap `argocd-cm`.
2.  **Permisos**: En `argocd-rbac-cm`, asignamos permisos de `get` y `sync` para las aplicaciones específicas.
3.  **Token**: Generamos un API Token con `argocd account generate-token`.

### Paso 3: Instalación de ArgoCD Image Updater
Instalamos el componente que vigila las imágenes:
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/v0.12.2/manifests/install.yaml
```

### Paso 4: Configuración de la Aplicación en ArgoCD
Creamos la App apuntando al repositorio de la nueva organización con anotaciones especiales:
*   `image-list`: Lista de imágenes a vigilar.
*   `allow-tags`: Filtro por regex para usar solo etiquetas `sha-`.
*   `update-strategy`: `latest` (para elegir la versión más reciente en el registro).
*   `write-back-method`: `argocd` (para actualizar el estado vivo sin escribir en Git).
*   `ignoreDifferences`: Configurado para que ArgoCD no sobreescriba los Secretos creados manualmente en el clúster.

### Paso 5: Implementación del Pipeline (GitHub Actions)
Creamos `.github/workflows/ci-cd.yml` con:
1.  **Buildx**: Para soporte multi-plataforma (ARM64/AMD64).
2.  **Metadata**: Generación automática de tags basados en el SHA del commit.
3.  **Robust Sync**: Un paso final de `curl` que avisa a ArgoCD para que sincronice de inmediato, pero configurado con timeout para que no falle el build si el DNS (DuckDNS) falla.

### Paso 6: Gestión de Secretos en el Clúster
Para proyectos públicos:
1.  Añadir el archivo de secreto real al `.gitignore`.
2.  Crear un archivo `.example` como plantilla.
3.  Aplicar el secreto manualmente en el clúster con `kubectl apply` o `kubectl create secret --from-literal`.

---

## 4. Mantenimiento Diario
*   **Actualizar**: Solo haz `git push origin main`.
*   **Monitorear Build**: Pestaña "Actions" en GitHub.
*   **Monitorear Despliegue**: Dashboard de ArgoCD o `kubectl logs -f deployment/argocd-image-updater -n argocd`.
