import { useAuth } from '@/contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsGithub } from 'react-icons/bs';

type fromData = {
  email: string;
  password: string;
};

const LogIn: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const { login, socialLogin } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fromData>();

  const handleLogin = (data: { email: string; password: string }) => {
    setLoading(true);
    login(data.email, data.password)
      .then((result: { user: { uid: string } }) => {
        if (result?.user?.uid) {
          setError('');
          router.push('/');
          toast.success('login success');
          setLoading(false);
        }
      })
      .catch((error: { message: string }) => {
        setError(error.message);
        // e.target.reset();
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    socialLogin(googleProvider)
      .then((result: { user: { uid: string } }) => {
        if (result?.user?.uid) {
          setError('');
          router.push('/');
          toast.success('login success');
          setLoading(false);
        }
      })
      .catch((error: { message: string }) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-screen relative">
      <div className=" w-full  absolute h-auto  ">
        <div className="flex items-center py-4 px-6 space-x-2">
          <p className="text-5xl text-primary">
            <BsGithub />
          </p>
          <h1 className="text-2xl font-bold  ">
            G-Hub
            <span className="text-primary"> Manager</span>
          </h1>
        </div>
      </div>

      <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-transparent  lg:bg-gradient-to-r from-primary/30 to-primary lg:shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-center text-4xl font-bold px-20">
                      Sign in
                    </h5>
                    <p className="text-sm text-gray-600 font-bold text-center">
                      Sign in to access your account
                    </p>
                    <p className=" text-red-500 mt-5 text-center">
                      {error.slice(10, error.length)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      id="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      {...register('email', {
                        required: true,
                      })}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>

                    {errors.email && (
                      <span className="text-red-500 text-xs ">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      {...register('password', {
                        required: true,
                        minLength: 6,
                      })}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>

                    {errors.password && errors.password.type === 'required' && (
                      <span className="text-red-500 text-xs ">
                        This is required
                      </span>
                    )}
                    {errors.password &&
                      errors.password.type === 'minLength' && (
                        <span className="text-red-500 text-xs ">
                          Password must have 6 character
                        </span>
                      )}
                  </div>
                  <div className=" space-y-4 mt-5">
                    <button
                      type="submit"
                      className={`btn-primary  font-semibold w-full text-white text-md rounded-md px-4 py-1`}
                    >
                      {loading ? 'loading....' : 'Sign in'}
                    </button>
                    <div className="divider">or</div>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="btn-success font-semibold w-full text-primary border border-gray-300 text-md rounded-md px-4 py-1 hover:bg-primary hover:text-white"
                    >
                      Sign In With Google
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 font-semibold text-center mt-8">
                    {`  Don't `}Have an Account{' '}
                    <Link
                      href="/signup"
                      className="text-primary hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
