import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";

export function canManageUsers(user) {
  return user && user.id_role === 1;
}
export function canManageJPO(user) {
  return user && (user.id_role === 1 || user.id_role === 2);
}
export function canSeeStats(user) {
  return user && user.id_role <= 3;
}

const Register = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.id_role !== 1) {
    window.location.href = "/"; // ou navigate("/") si tu utilises react-router
    return null;
  }

  return (
    <div>
      <RegisterForm />
      {user && user.id_role === 1 && (
        <button>Action réservée à l’admin</button>
      )}
    </div>
  );
};

export default Register;