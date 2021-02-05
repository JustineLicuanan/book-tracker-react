import { registerSchema } from '@book-tracker/shared';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { routes } from '../../../constants/routes';
import { queryKeys } from '../../../constants/queryKeys';
import { client } from '../../../client';
import { UserWithError } from '../../../query-types/User';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}));

interface RegisterValues {
	email: string;
	password: string;
}

const RegisterForm = () => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const registerMutation = useMutation(
		async (values: RegisterValues) => {
			const { register } = await client.request(
				gql`
					mutation($email: String!, $password: String!) {
						register(input: { email: $email, password: $password }) {
							user {
								id
								email
								books {
									id
									title
									completed
								}
							}

							errors {
								path
								message
							}
						}
					}
				`,
				values
			);

			return register as UserWithError;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData(queryKeys.ME.key, data);
			},
		}
	);

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Register
				</Typography>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={registerSchema}
					onSubmit={async (values) => {
						await registerMutation.mutateAsync(values);
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<form className={classes.form} noValidate onSubmit={handleSubmit}>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								type='email'
								name='email'
								autoComplete='off'
								placeholder='e.g.: bob@gmail.com'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								error={!!errors.email && touched.email}
								helperText={errors.email && touched.email ? errors.email : ''}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='off'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								error={!!errors.password && touched.password}
								helperText={
									errors.password && touched.password ? errors.password : ''
								}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
								disabled={isSubmitting}
							>
								Register
							</Button>
							<Grid container>
								<Grid item>
									<Link to={routes.login.path} className={classes.link}>
										{'Already have an account? Login here.'}
									</Link>
								</Grid>
							</Grid>
						</form>
					)}
				</Formik>
			</div>
		</Container>
	);
};

export default RegisterForm;
