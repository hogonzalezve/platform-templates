# 🚀 Platform Templates Repository

Este repositorio contiene plantillas de Backstage Scaffolder para la automatización de deployments usando Kratix y generación automática de nombres únicos. **Recientemente actualizado para corregir problemas de ArgoCD sync.**

## 🎯 Características (Actualizadas)

- ✅ **Generación automática de sufijos únicos** para evitar colisiones de nombres
- ✅ **Templates organizados** para diferentes tipos de recursos
- ✅ **Integración con Kratix** sin valores hardcodeados incorrectos
- ✅ **Skeletons corregidos** que usan valores por defecto del Promise
- ✅ **ArgoCD Sync Compatible** - Sin más errores de CRDs faltantes

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

## 🔧 Fix Crítico Implementado

### ❌ **Problema ArgoCD Resuelto** - Database CRD Missing

**Síntoma previo**:
```
The Kubernetes API could not find database.example.org/PostgreSQLInstance for requested resource
```

**Causa raíz**: Los skeletons tenían valores hardcodeados incorrectos:
```yaml
# ❌ ANTES (Incorrecto)
database:
  claimApiVersion: "database.example.org/v1alpha1"
  claimKind: "PostgreSQLInstance"
```

**Solución implementada**: ✅
```yaml
# ✅ DESPUÉS (Corregido)
database:
  enabled: ${{ values.databaseEnabled }}
  # NO más valores hardcodeados
  # Usa valores por defecto del Promise
```

### 🎯 **Beneficios del Fix**

- ✅ **ArgoCD Sync Success**: No más errores de CRDs faltantes
- ✅ **Promise Defaults**: Usa automáticamente valores correctos del Promise
- ✅ **Flexibilidad**: Permite override cuando sea necesario
- ✅ **Mantenibilidad**: Cambios centralizados en el Promise

### 📝 **Archivos Corregidos**

- `skeletons/app-model-a-request/${{ values.uniqueFilename }}.yaml`
- Eliminadas líneas: `claimApiVersion` y `claimKind` hardcodeadas

### 🔍 **Verificación**

```bash
# Verificar template corregido
git log --oneline -1
# Resultado: "fix: remove hardcoded database claimApiVersion and claimKind"

# Verificar que funciona
kubectl get xpostgresqlinstances -A
```