"use client";
import axiosInstance from "@/helpers/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "../styles.module.scss";

function LoginPage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: "",
		password: ""
	});
	const [buttonDisabled, setButtonDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.post("/users/login", user);
			toast.success(response.data.message);
			router.push("/profile");
		} catch (error) {
			if (error instanceof Error) {
				console.error("Error::", error.message);
				toast.error(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) setButtonDisabled(false);
		else setButtonDisabled(true);
	}, [user]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<Toaster />
			<h1 className={`${styles["text-red"]} text-lg ${styles["text-red_font-weight"]}`}> {loading ? "Processing" : "Login"}</h1>
			<hr />
			<label htmlFor='email'>email</label>
			<input
				className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
				autoComplete='off'
				id='email'
				type='text'
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
				placeholder='email'
			/>
			<label htmlFor='password'>password</label>
			<input
				className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
				autoComplete='off'
				id='password'
				type='password'
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
				placeholder='password'
			/>
			<button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' disabled={buttonDisabled}>
				Login here
			</button>
			<Link href='/signup'>Visit Signup page</Link>
		</div>
	);
}
export default LoginPage;
