import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../services/api'
import type { AxiosError } from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface FormData {
    email: string
    password: string
}

const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // console.log("Login successful:", data);
            toast.success(data.message)
            navigate('/home')
        },
        onError: (error: AxiosError) => {
            console.error(
                'Login failed:',
                error.response?.data || error.message
            )
            const errorMsg =
                (error.response?.data as { message?: string })?.message ||
                'Something went wrong'
            if (error.response) {
                toast.error(errorMsg)
            }
        },
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        loginMutation.mutate(data)
    }

    return (
        <div className="flex justify-center items-center bg-custom h-screen w-screen gap-4 px-8 py-6">
            <div className="flex flex-col items-center gap-12 w-80 h-81">
                <p className="font-bold font-sans leading-[38px] tracking-[0%] text-[30px] h-[38px]">
                    Welcome back!
                </p>
                <form
                    action="#"
                    className="flex flex-col gap-6 w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        type="text"
                        {...register('email', {
                            required: 'Email is required!',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Please enter a valid email address!',
                            },
                        })}
                        placeholder="Email"
                        className="w-full indent-1.5 p-2 border rounded-md border-gray-300"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}

                    <input
                        type="password"
                        {...register('password', {
                            required: 'Password is required!',
                            minLength: {
                                value: 6,
                                message:
                                    'Password must be at least 6 characters!',
                            },
                        })}
                        placeholder="Password"
                        className="w-full indent-1.5 p-2 border rounded-md border-gray-300"
                    />
                    {errors.password && (
                        <p className="text-red-500">
                            {errors.password.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full max-w-[320px] h-auto min-h-[60px] p-[16px] px-[24px] gap-[8px] rounded-[8px] border border-[#2B3A67] bg-[#2B3A67] text-white shadow-btnShadow cursor-pointer text-lg font-semibold leading-[28px] tracking-[0%]"
                    >
                        {loginMutation.isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Login
