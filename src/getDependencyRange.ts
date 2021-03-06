import { packagePropertyByDesignation } from "./designations";
import { getDependencyDesignation } from "./getDependencyDesignation";

const depErrorMsg = "Dependency not found within package metadata.";

export function getDependencyRange(
  dependencyName: string,
  packageMeta: GetMonorepoPackages.PackageMeta
) {
  const designation = getDependencyDesignation(dependencyName, packageMeta);

  if (!designation) {
    throw new Error(depErrorMsg);
  }

  const property = packagePropertyByDesignation[designation];
  const dependencies = packageMeta[property];

  if (!dependencies) {
    throw new Error(depErrorMsg);
  }

  return (dependencies as GetMonorepoPackages.DependenciesHashTable)[
    dependencyName
  ];
}
