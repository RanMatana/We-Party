import React from 'react'
// import clsx from 'clsx';
import { Button, makeStyles, IconButton, FilledInput, InputAdornment, FormControl, TextField, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Logo from '../Assets/Logo.png';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    margin: {
        margin: theme.spacing(1),
    },
    header_login: {
        marginBottom: 100,
        backgroundColor: '#FFFFFF',
        height: 350,
        width: 350,
        opacity: 0.8,
    },
    header_p: {
        paddingTop: 1,
        height: 60,
        marginBottom: 20,
        backgroundColor: 'black',
        color: 'white',
        borderStyle: 'solid',
    },
}));

function Login(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        email: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleChangeName = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    async function btnLogin() {
        if (values.email === "admin-we-party" && values.password === "10643775") {
            props.history.push({
                pathname: '/home/'
            });
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className={classes.root}>
                    <div className="App-header">
                        <div>
                            <img style={{ width: 250, height: 250 }} src={Logo} alt="logo" />
                        </div>
                        <div className={classes.header_login}>
                            <div className={classes.header_p}>
                                <p >Hey ADMIN</p>
                            </div>
                            <div className={classes.margin}>
                                <TextField id="filled-basic" label="Email" variant="filled" style={{ width: 270 }} onChange={handleChangeName('email')} />
                            </div>
                            {/* clsx(classes.margin, classes.textField) */}
                            <div style={{ margin: 30 }}>
                                <FormControl className={classes.margin} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <Button
                                    onClick={btnLogin}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}>Login</Button>
                            </div>
                        </div>
                    </div>
                </div >
            </header>
        </div>
    );
}
export default withRouter(Login);