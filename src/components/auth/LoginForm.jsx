"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCookie } from "@/hooks/useCookie";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setCookie } = useCookie({ key: "authToken", days: 7 });


  // console.log(require('crypto').randomBytes(32).toString('base64'))

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      // Replace with your backend endpoint
      const response = await axios.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Handle successful login
      console.log("Login successful:", response.data);
      toast.success(response.data.message);
      router.push("/dashboard");
      setCookie(response.data.token)
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-200 py-20">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
