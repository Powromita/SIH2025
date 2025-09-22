import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Login</CardTitle>
          <CardDescription className="text-gray-500">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input {...register('email')} placeholder="Email" type="email" className="w-full" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Input {...register('password')} placeholder="Password" type="password" className="w-full" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;