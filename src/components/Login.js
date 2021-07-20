import React from 'react';
import { useFormik } from 'formik'
import { useMutation, gql } from '@apollo/client';
import { useSelector,useDispatch } from 'react-redux';
import { logIn } from '../slices/sessionSlice' 
import { useHistory } from 'react-router-dom';

const LOGIN = gql`mutation loginUser( 
    $pseudo: String!
    $password: String!
  ) { login(pseudo : $pseudo ,password : $password) {
    user {
      pseudo
    }
    token
  }
  }
`;


const Login = () => {

    const dispatch = useDispatch()
    
    const history = useHistory() ;

    const formik = useFormik({
        initialValues: {
            pseudo: '',
            password: ''
        },
        onSubmit : ( values) => {
            
            login().then( response => {
                console.log(response)
                if (response.data.login.user.pseudo === formik.values.pseudo) {
                    alert("Connexion au forum réalisé avec succès")
                    localStorage.setItem("userState","Logged in")
                    localStorage.setItem("userPseudo",response.data.login.user.pseudo)
                    sessionStorage.setItem('token', response.data.login.token)
                    console.log("user token ======> ", response.data.login.token)
                    console.log("user connection status [login form] =====> " ,localStorage.getItem("userState"))
                    history.push("/topic")
                    const pseudo = response.data.login.user.pseudo
                    const token = response.data.login.token 
                    dispatch({ type : 'session/logIn' , payload : { pseudo : pseudo , token : token}})
                }
            }).catch( err => {
                console.log(err)
            });
            
        }
        
    });
    console.log(formik)

    const [login, {loading,data}] = useMutation(LOGIN, {
        variables : {
        pseudo: formik.values.pseudo,
        password: formik.values.password
        }
        });


    return (
        <div className="uk-container uk-margin-top uk-margin-medium-top">
            <div className="uk-section uk-section-muted uk-padding">
                <h2 className="uk-margin-medium-top">Welcome to forumy</h2>
                <form className="uk-form-horizontal uk-margin-large-top"
                    onSubmit={formik.handleSubmit}>

                    <div className="uk-margin-top">
                        <label className="uk-form-label uk-form-width-small" htmlFor="pseudo">Pseudo : </label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="pseudo" type="text" name="pseudo" onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.pseudo} placeholder="Enter your first name" />
                        </div>
                    </div>


                    <div className="uk-margin-top">
                        <label className="uk-form-label uk-form-width-small" htmlFor="password">Password: </label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-large" id="password" type="password" name="password" onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.password}  placeholder="Enter your password" />
                        </div>
                    </div>
                    <button type="submit" className="uk-button uk-button-primary uk-margin-top uk-float-right">login</button>



                </form>
            </div>
        </div>
    )
}

export default Login;

