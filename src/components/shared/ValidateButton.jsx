'use client';

import React from "react";
import Link from "next/link";
import LogOut from "../auth/LogOut";

const ValidateButton = ({ session }) => {
  console.log("sessionssssssssssssssssss", session);

  // Check if the session object has a user property to ensure it's valid
  const isAuthenticated = session && session.user;

  return (
    <div>
      {!isAuthenticated ? (
        <Link href="/dashboard">Dashboard</Link> // User is authenticated
      ) : (
        <LogOut />
      )}
    </div>
  );
};

export default ValidateButton;
