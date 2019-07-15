const importModules = [];
const exportModules = [];
const dataModules = [];
const visModules = [];

export function addImportModule(importModule) {
  importModules.push(importModule);
}

export function addExportModule(exportModule) {
  exportModules.push(exportModule);
}

export function getImportModules() {
  return importModules;
}

export function getExportModules() {
  return exportModules;
}
