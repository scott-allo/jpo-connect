import { canManageUsers, canManageJPO, canSeeStats } from "../utils/roles";

const user = JSON.parse(localStorage.getItem("user"));

if (!canManageUsers(user)) {
  // Redirige ou masque la page
}

export const ROLES = {
  ADMIN: 1,
  RESPONSABLE: 2,
  SALARIE: 3,
  VISITEUR: 4,
};

export function canManageUsers(user) {
  return user && user.id_role === ROLES.ADMIN;
}
export function canManageJPO(user) {
  return user && (user.id_role === ROLES.ADMIN || user.id_role === ROLES.RESPONSABLE);
}
export function canSeeStats(user) {
  return user && user.id_role <= ROLES.SALARIE;
}
export function canModerateComments(user) {
  return user && (user.id_role === ROLES.ADMIN || user.id_role === ROLES.RESPONSABLE);
}
export function canManageInscriptions(user) {
  return user && user.id_role <= ROLES.SALARIE;
}
export function canInscrireJPO(user) {
  return !!user;
}
export function canComment(user) {
  return !!user;
}