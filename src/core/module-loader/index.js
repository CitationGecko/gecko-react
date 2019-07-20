const importModules = [];
const exportModules = [];
const dataModules = [];
const visModules = [];

export function addImportModule(importModule) {
  importModules.push(importModule);
}

export function getImportModules() {
  return importModules;
}

export function addExportModule(exportModule) {
  exportModules.push(exportModule);
}

export function getExportModules() {
  return exportModules;
}

export function addDataModule(dataModule) {
  dataModules.push(dataModule);
}

export function getDataModules() {
  return dataModules;
}
