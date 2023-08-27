"use client";
import axiosInstance from "@/helpers/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "react-hot-toast";

const SignupPage = () => {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: "",
		password: "",
		username: ""
	});
	const [buttonDisabled, setButtonDisabled] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const onSignup = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.post("/users/signup", user);
			toast.success(response.data.message);
			router.push("/login");
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<Toaster />
			<h1>{loading ? "Processing" : "Signup"}</h1>
			<hr />
			<label htmlFor='username'>Username</label>
			<input
				className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
				autoComplete='off'
				id='username'
				type='text'
				value={user.username}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
				placeholder='username'
			/>
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
			<button onClick={onSignup} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
				{buttonDisabled ? "No signup" : "Signup"}
			</button>
			<Link href='/login'>Visit login page</Link>
		</div>
	);
};

export default SignupPage;
// export default tokenMiddleware(SignupPage);
