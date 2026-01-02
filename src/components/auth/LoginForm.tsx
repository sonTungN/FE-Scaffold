import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";

interface LoginFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	email: string;
	setEmail: (value: string) => void;
	password: string;
	setPassword: (value: string) => void;
	isLoading: boolean;
}

function LoginForm({
	handleSubmit,
	email,
	setEmail,
	password,
	setPassword,
	isLoading,
}: LoginFormProps) {
	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email
						</label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Password
						</label>
						<Input
							id="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<Button
						type="submit"
						className="w-full border-b-2 border-black!"
						disabled={isLoading}
					>
						{isLoading ? "Logging in..." : "Login"}
					</Button>
					<p className="text-sm text-gray-500 text-center mt-4">
						Admin: Use admin@gmail.com and sonTung1901@
					</p>
				</form>
			</CardContent>
		</Card>
	);
}

export default LoginForm;
