export const formatDepartment = (department: string) => {
  return (department.match(/[A-Z]/g) ?? []).join("");
};
