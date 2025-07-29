import { Link, useNavigate } from 'react-router-dom';
import CardComponent from '../../shared/components/CardComponent';
import { useForm, SubmitHandler } from "react-hook-form"
import { signupSchema, SignupSchema } from '../../shared/utils/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordInput from '../../shared/components/FormInputs/PasswordInput';

export default function SignupPage() {
  const navigate = useNavigate();

  function HandleSignup() {
    navigate('/signin')
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupSchema>({ mode: 'onSubmit', resolver: zodResolver(signupSchema) })
  const onSubmit: SubmitHandler<SignupSchema> = (data) => {
    console.log(data)
    HandleSignup()
  }
  console.log("name", watch("name"))
  console.log("email", watch("email"))
  console.log("password", watch("password"))

  return (
    <div className='d-flex align-items-center justify-content-center w-100 mt-10rem'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardComponent title='Sign Up'>
          <div className='min-w-30rem d-flex align-items-center justify-content-center'>
            <div className='col'>
              <div>
                <div className="d-flex flex-row justify-content-between mb-3">
                  <label htmlFor="fullName" className="col-form-label">Full Name</label>
                  <div className="col-9">
                    <input type="text" id="fullName" defaultValue="Joni" {...register("name")} placeholder='Name' className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <p className='invalid-feedback d-block'>{errors.name?.message}</p>
                  </div>
                </div>
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
                    <PasswordInput id='inputPassword' name='password' defaultValue="" errors={errors} placeholder='Password' register={register} />
                    <p className='invalid-feedback d-block'>{errors.password?.message}</p>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between mb-3">
                  <label htmlFor="inputConfirmPassword" className="col-form-label">Confirm Password</label>
                  <div className="col-9">
                    <PasswordInput id='inputConfirmPassword' name='confirm_password' defaultValue="" errors={errors} placeholder='Confirm Password' register={register} />
                    <p className='invalid-feedback d-block'>{errors.confirm_password?.message}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column mb-3 text-center">
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <Link to='/signin'>
                  Sign In?
                </Link>
              </div>
            </div>
          </div>
        </CardComponent>
      </form>
    </div>
  )
}