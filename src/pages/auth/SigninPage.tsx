import { Link, useNavigate } from 'react-router-dom';
import CardComponent from '../../shared/components/CardComponent';
import { useForm, SubmitHandler } from "react-hook-form"
import { signinSchema, SigninSchema } from '../../shared/utils/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordInput from '../../shared/components/FormInputs/PasswordInput';

export default function SigninPage() {
  const navigate = useNavigate();

  function HandleSignin() {
    navigate('/home')
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SigninSchema>({ mode: 'onSubmit', resolver: zodResolver(signinSchema) })
  const onSubmit: SubmitHandler<SigninSchema> = (data) => {
    console.log('onSubmit', data)
    HandleSignin()
  }
  console.log("email", watch("email"))
  console.log("password", watch("password"))

  return (
    <div className='d-flex align-items-center justify-content-center w-100 mt-10rem'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardComponent title='Sign In'>
          <div className='min-w-30rem d-flex align-items-center justify-content-center'>
            <div className='col'>
              <div>
                <div className="d-flex flex-row justify-content-between mb-3">
                  <label htmlFor="staticEmail" className="col-form-label">Email</label>
                  <div className="col-9">
                    <input type="text" id="staticEmail" defaultValue="test@mail.com" {...register("email")} placeholder='Email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <p className='invalid-feedback d-block'>{errors.email?.message}</p>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between mb-3">
                  <label htmlFor="inputPassword" className="col-form-label">Password</label>
                  <div className="col-9">
                    <PasswordInput id='inputPassword' name='password' defaultValue="1234" errors={errors} placeholder='Password' register={register} />
                    <p className='invalid-feedback d-block'>{errors.password?.message}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column mb-3 text-center">
                <button type="submit" className="btn btn-primary">Sign In</button>
                <Link to='/signup'>
                  Sign Up?
                </Link>
              </div>
            </div>
          </div>
        </CardComponent>
      </form>
    </div>
  )
}