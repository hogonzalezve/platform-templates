# 🚀 Platform Templates Repository

Este repositorio contiene plantillas de Backstage Scaffolder para la automatización de deployments usando Kratix y generación automática de nombres únicos.

## 🎯 Características

- ✅ **Generación automática de sufijos únicos** para evitar colisiones de nombres
- ✅ **Templates organizados** para diferentes tipos de recursos
- ✅ **Integración con Kratix** para deployment automático
- ✅ **Skeletons reutilizables** para diferentes casos de uso

## 📁 Estructura Limpia y Organizada

```
platform-templates/
├── catalog-info.yaml           # Registro de templates en Backstage
├── templates/                  # Templates de Backstage
│   ├── app-model-a-request.yaml   # Deploy aplicaciones con nombres únicos
│   └── app-model-a-delete.yaml    # Eliminar aplicaciones
└── skeletons/                  # Estructuras de archivos
    ├── app-model-a-request/        # Skeleton para deployments
    ├── app-model-a-delete/         # Skeleton para eliminaciones
    └── otros...
```

## 🎯 Templates Disponibles

### 1. **AppModelA Request** (`app-model-a-request.yaml`)
- **Propósito**: Deploy automático de aplicaciones con nombres únicos
- **Características**: 
  - Genera sufijo aleatorio automáticamente (ej: `myapp-x7k2`)
  - Previene colisiones de nombres en Kubernetes
  - Integración completa con Kratix

### 2. **AppModelA Delete** (`app-model-a-delete.yaml`)
- **Propósito**: Eliminación controlada de aplicaciones
- **Características**: 
  - Selector de aplicaciones existentes
  - Confirmación de eliminación requerida

## 🔧 Custom Action: Random Suffix

Los templates utilizan la custom action `ntt:utils:randomSuffix`:

```yaml
# Genera nombres únicos automáticamente
- id: generate-unique-suffix
  action: ntt:utils:randomSuffix
  input:
    length: 4           # Caracteres a generar
    type: 'alphanumeric' # alphanumeric|numeric|alpha
    prefix: '-'         # Prefijo opcional
```

**Resultado**: `myapp` → `myapp-x7k2` ✨