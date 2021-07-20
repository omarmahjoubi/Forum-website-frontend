import React from 'react';
import { useMutation,useQuery, gql} from '@apollo/client';
import { useFormik } from 'formik';


const PSEUDO_QUERY = gql`
    {
        users  {
             pseudo
        }   
    }
`;


const validate = values =>  {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required!'
    }
    else if (values.firstName.length < 3 ) {
        errors.firstName = 'the given value is too short (minimum length = 3)!'
    }
    else if (values.firstName.length > 50) {
        errors.firstName = 'the given value is too long (maximum length = 50)'
    }
    else if (!/^[A-Za-z]+$/i.test(values.firstName)){
        errors.firstName = 'the given value is invalid. Please use only letters'
    }



    if (!values.lastName) {
        errors.lastName = 'Required!'
    }
    else if (values.lastName.length < 3 ) {
        errors.lastName = 'the given value is too short (minimum length = 3)!'
    }
    else if (values.lastName.length > 50) {
        errors.lastName = 'the given value is too long (maximum length = 50)'
    }
    else if (!/^[^ ]+$/i.test(values.lastName)){
        errors.lastName = 'the given value is invalid. Please remove spaces'
    }

    if (!values.pseudo) {
        errors.pseudo = 'Required!'
    }
    else if (values.pseudo.length < 3 ) {
        errors.pseudo = 'the given value is too short (minimum length = 3)!'
    }
    else if (values.pseudo.length > 50) {
        errors.pseudo = 'the given value is too long (maximum length = 50)'
    }

    

    if (!values.password) {
        errors.password = 'Required!'
    }
    else if (values.password.length < 8 ) {
        errors.password = 'the given value is too short (minimum length = 8)!'
    }
    else if (values.password.length > 70) {
        errors.password = 'the given value is too long (minimum length = 70)'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required!'
    }
    else if (!(values.password === values.confirmPassword)) {
        errors.confirmPassword = 'Password confirmation and password must match'
    } 

    return errors;

    
    
}





const CREATE_USER = gql`mutation createUser(
    $firstName: String!
    $lastName: String!
    $pseudo: String!
    $password: String!
  ) {
    signup(firstName: $firstName, lastName: $lastName,pseudo: $pseudo,password: $password) {
      user {
          id
          firstName
          lastName
          pseudo
      }
      token
    }
  }
`;


const SignUp = () => {
    
    
    
    const { loading, data } = useQuery(PSEUDO_QUERY);
    let pseudos = []; // array containing pseudo in database
    if (loading === false ) {   
        data.users.map((user) => {
            pseudos.push(user.pseudo)
        })
    }
    console.log(pseudos)

    const formik = useFormik ({initialValues : {
        firstName : '',
        lastName : '',
        pseudo : '',
        password : '',
        confirmPassword : ''
    },
    validate,
    onSubmit : values => {
       
       if (pseudos.includes(values.pseudo)) {
            alert("This pseudo is already used")
       } else {
       createUser()
       }
    }})

    const [createUser] = useMutation(CREATE_USER, {
        variables : {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName ,
        pseudo: formik.values.pseudo,
        password: formik.values.password
        }
    });

    

    return (
        <div className="uk-container uk-margin-top uk-margin-medium-top">
            <div className="uk-section uk-section-muted uk-padding">
                <h2 className="uk-margin-medium-top">Sign up form</h2>
                <form className="uk-form-horizontal uk-margin-large-top"
                    onSubmit={formik.handleSubmit}>

                    <div className="uk-margin-top">
                        <label className="uk-form-label uk-form-width-small" htmlFor="firstName">First Name : </label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="firstName" type="text"  name="firstName" onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.firstName}   placeholder="Enter your first name" />
                            {formik.errors.firstName && formik.touched.firstName ? <div className="uk-text-danger">{formik.errors.firstName}</div> : null}
                        </div>
                    </div>

                    <div className="uk-margin-top">
                        <label className="uk-form-label uk-form-width-small" htmlFor="lasttName">last Name : </label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="lastName" type="text"  name="lastName" onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.lastName} placeholder="Enter your last name"/>
                            {formik.errors.lastName && formik.touched.lastName ? <div className="uk-text-danger">{formik.errors.lastName}</div> : null}
                        </div>
                    </div>

                    <div className="uk-margin-top">
                        <label className="uk-form-label uk-form-width-small" htmlFor="pseudo">Pseudo: </label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="pseudo"  type="text" name="pseudo" onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.pseudo} placeholder="Enter your pseudo" />
                            {formik.errors.pseudo && formik.touched.pseudo ? <div className="uk-text-danger">{formik.errors.pseudo}</div> : null}
                        </div>
                    </div>

                    <div className="uk-margin-top">
                        <label className="uk-form-label uk-form-width-small" htmlFor="password">Password: </label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="password"  type="password" name="password" onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.password} placeholder="Enter your password" />
                            {formik.errors.password && formik.touched.password ? <div className="uk-text-danger">{formik.errors.password}</div> : null}
                        </div>
                    </div>

                    <div className="uk-margin-top">
                        <label className="uk-form-label uk-form-width-small" htmlFor="confirmPassword">Confirm your password: </label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="confirmPassword" type="password" name="confirmPassword" onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.confirmPassword} placeholder="retype your password" />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="uk-text-danger">{formik.errors.confirmPassword}</div> : null}
                        </div>
                    </div>
                    <button type="submit" className="uk-button uk-button-primary uk-margin-top uk-float-right">Sign up</button>



                </form>
            </div>
        </div>
    )

}

export default SignUp;